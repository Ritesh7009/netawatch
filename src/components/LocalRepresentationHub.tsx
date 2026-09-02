import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Compass, Landmark, Users, ArrowUpRight, CheckCircle2, ChevronDown, RefreshCw, Sparkles, Building2, ShieldAlert } from 'lucide-react';
import { Politician } from '../types';
import { MPConstituencyEntry, ALL_CONSTITUENCIES_DIRECTORY } from '../data/allConstituencies';
import { 
  UserLocationInfo, 
  detectUserLocation, 
  getNearbyConstituencies, 
  getStateMajorMinisters, 
  saveUserLocation,
  normalizeStateName
} from '../utils/geolocation';
import { PoliticianImage } from './PoliticianImage';
import { synthesizeMPPolitician } from '../utils/synthesizePolitician';

interface LocalRepresentationHubProps {
  allPoliticians: Politician[];
  onSelectPolitician: (p: Politician) => void;
  onOpenAllIndiaDirectory: () => void;
  locationInfo?: UserLocationInfo | null;
  onLocationChange?: (loc: UserLocationInfo) => void;
}

export const LocalRepresentationHub: React.FC<LocalRepresentationHubProps> = ({
  allPoliticians,
  onSelectPolitician,
  onOpenAllIndiaDirectory,
  locationInfo: externalLocationInfo,
  onLocationChange,
}) => {
  const [internalLocationInfo, setInternalLocationInfo] = useState<UserLocationInfo | null>(null);
  const locationInfo = externalLocationInfo || internalLocationInfo;
  const [loading, setLoading] = useState(!locationInfo);
  const [isChangingLocation, setIsChangingLocation] = useState(false);
  const [selectedStateInput, setSelectedStateInput] = useState(locationInfo?.state || 'Delhi (NCT)');
  const [selectedConstituencyInput, setSelectedConstituencyInput] = useState(locationInfo?.matchedConstituency || 'New Delhi');
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Available unique states from registry
  const availableStates = Array.from(new Set(ALL_CONSTITUENCIES_DIRECTORY.map((c) => c.state))).sort();

  // Constituencies in the active state
  const stateConstituencies = ALL_CONSTITUENCIES_DIRECTORY.filter(
    (c) => c.state.toLowerCase() === selectedStateInput.toLowerCase()
  );

  // Initialize auto-detection on mount if not already provided
  useEffect(() => {
    if (externalLocationInfo) {
      setSelectedStateInput(externalLocationInfo.state);
      setSelectedConstituencyInput(externalLocationInfo.matchedConstituency);
      setLoading(false);
      return;
    }
    let isMounted = true;
    async function initLoc() {
      try {
        setLoading(true);
        const loc = await detectUserLocation();
        if (isMounted) {
          setInternalLocationInfo(loc);
          setSelectedStateInput(loc.state);
          setSelectedConstituencyInput(loc.matchedConstituency);
          if (onLocationChange) onLocationChange(loc);
        }
      } catch (err) {
        console.error('Failed to detect location:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    initLoc();
    return () => {
      isMounted = false;
    };
  }, [externalLocationInfo]);

  // Handle manual location change
  const handleApplyManualLocation = (state: string, constituency: string) => {
    const updated: UserLocationInfo = {
      city: constituency,
      district: constituency,
      state: state,
      country: 'India',
      matchedConstituency: constituency,
      detectionMethod: 'manual',
      timestamp: Date.now(),
    };
    saveUserLocation(updated);
    setInternalLocationInfo(updated);
    if (onLocationChange) onLocationChange(updated);
    setIsChangingLocation(false);
  };

  // Handle GPS force re-detection
  const handleRefreshGPS = async () => {
    setLoading(true);
    try {
      localStorage.removeItem('netawatch_user_location');
      const loc = await detectUserLocation();
      setInternalLocationInfo(loc);
      if (onLocationChange) onLocationChange(loc);
      setSelectedStateInput(loc.state);
      setSelectedConstituencyInput(loc.matchedConstituency);
      setIsChangingLocation(false);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Find sitting MP for user's matched constituency
  const activeConstituencyName = locationInfo?.matchedConstituency || 'New Delhi';
  const activeStateName = locationInfo?.state || 'Delhi (NCT)';

  // 1. Direct matched MP entry from directory
  const currentConstituencyData = ALL_CONSTITUENCIES_DIRECTORY.find(
    (c) => c.constituency.toLowerCase() === activeConstituencyName.toLowerCase()
  ) || ALL_CONSTITUENCIES_DIRECTORY.find(
    (c) => c.state.toLowerCase() === activeStateName.toLowerCase()
  ) || ALL_CONSTITUENCIES_DIRECTORY[0];

  // Check if this MP exists in deep preloaded list
  const preloadedMatch = allPoliticians.find(
    (p) =>
      p.id === currentConstituencyData?.preloadedId ||
      p.name.toLowerCase() === currentConstituencyData?.mpName.toLowerCase() ||
      p.constituency.toLowerCase() === activeConstituencyName.toLowerCase()
  );

  // 2. Nearby constituencies in the same state/region
  const nearbyConstituencies = getNearbyConstituencies(
    currentConstituencyData?.constituency || activeConstituencyName,
    activeStateName,
    3
  );

  // 3. State Major Ministers & Leaders
  const stateMinisters = getStateMajorMinisters(activeStateName, allPoliticians);

  // Helper to view or construct an authentic Politician dossier when clicking any constituency MP
  const handleOpenConstituencyMP = (item: MPConstituencyEntry) => {
    const fullMatch = allPoliticians.find(
      (p) =>
        p.id === item.preloadedId ||
        p.name.toLowerCase() === item.mpName.toLowerCase() ||
        p.constituency.toLowerCase() === item.constituency.toLowerCase()
    );
    const synthesized = synthesizeMPPolitician(item, fullMatch);
    onSelectPolitician(synthesized);
  };

  return (
    <section className="border border-[#18181b]/15 bg-[#faf9f6] shadow-xs relative overflow-hidden rounded-sm">
      
      {/* Top Banner & Location Detection Status */}
      <div className="bg-[#18181b] text-white px-3.5 sm:px-5 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[#f1ede4]">
            <Compass className="h-4 w-4 text-[#c44d31]" />
            <span>Citizen Representation Radar</span>
          </div>
          <span className="text-white/20 hidden sm:inline">|</span>
          <div className="flex items-center gap-1.5 text-white/90">
            <MapPin className="h-3.5 w-3.5 text-[#c44d31]" />
            <span>
              Detected:{' '}
              <strong className="text-white font-serif tracking-wide">
                {loading ? 'Detecting your region...' : `${locationInfo?.city || activeConstituencyName}, ${activeStateName}`}
              </strong>
            </span>
            <span className="text-[9px] text-white/70 bg-white/10 px-1.5 py-0.5 rounded-xs uppercase font-mono">
              {locationInfo?.detectionMethod === 'gps' ? 'GPS Exact' : locationInfo?.detectionMethod === 'ip' ? 'IP Geo' : locationInfo?.detectionMethod === 'manual' ? 'Selected' : 'Default'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsChangingLocation(!isChangingLocation)}
            className="flex items-center gap-1 px-2.5 py-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white transition border border-white/20 rounded-xs"
          >
            <span>{isChangingLocation ? 'Close Selector' : 'Change City/State'}</span>
            <ChevronDown className={`h-3 w-3 transition-transform ${isChangingLocation ? 'rotate-180' : ''}`} />
          </button>
          
          <button
            onClick={handleRefreshGPS}
            title="Re-run GPS scan"
            className="p-1 text-white/70 hover:text-white transition"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-[11px] text-white/60 hover:text-white underline pl-1"
          >
            {isCollapsed ? 'Expand' : 'Hide'}
          </button>
        </div>
      </div>

      {/* Manual Location Selector Dropdown Bar (if toggled) */}
      {isChangingLocation && (
        <div className="bg-[#f1ede4] border-b border-[#18181b]/15 p-3 sm:p-4 animate-in slide-in-from-top-2 duration-150">
          <div className="w-full flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="text-xs font-bold text-[#18181b] flex items-center gap-1.5 flex-shrink-0">
              <Navigation className="h-3.5 w-3.5 text-[#c44d31]" />
              <span>Select Any Indian State & Parliamentary Seat:</span>
            </div>

            <div className="flex flex-1 w-full sm:w-auto flex-wrap items-center gap-2">
              <select
                value={selectedStateInput}
                onChange={(e) => {
                  const newState = e.target.value;
                  setSelectedStateInput(newState);
                  const firstConst = ALL_CONSTITUENCIES_DIRECTORY.find((c) => c.state.toLowerCase() === newState.toLowerCase());
                  if (firstConst) {
                    setSelectedConstituencyInput(firstConst.constituency);
                  }
                }}
                className="text-xs border border-[#18181b]/30 bg-white px-2.5 py-1.5 font-medium text-[#18181b] focus:ring-1 focus:ring-[#18181b]"
              >
                {availableStates.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>

              <select
                value={selectedConstituencyInput}
                onChange={(e) => setSelectedConstituencyInput(e.target.value)}
                className="text-xs border border-[#18181b]/30 bg-white px-2.5 py-1.5 font-medium text-[#18181b] focus:ring-1 focus:ring-[#18181b] flex-1 min-w-[160px]"
              >
                {stateConstituencies.map((c) => (
                  <option key={c.constituency} value={c.constituency}>
                    {c.constituency} (MP: {c.mpName})
                  </option>
                ))}
              </select>

              <button
                onClick={() => handleApplyManualLocation(selectedStateInput, selectedConstituencyInput)}
                className="border border-[#18181b] bg-[#18181b] px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#c44d31] hover:border-[#c44d31] transition shadow-2xs"
              >
                Apply Location
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Representation Dashboard Body */}
      {!isCollapsed && (
        <div className="p-3 sm:p-5 space-y-4">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
            
            {/* LEFT 5 COLS: YOUR SITTING MP & CONSTITUENCY DOSSIER */}
            <div className="lg:col-span-5 bg-white border border-[#18181b]/15 p-4 flex flex-col justify-between shadow-2xs relative rounded-xs">
              <div className="absolute top-0 right-0 bg-[#c44d31] text-white px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider">
                Your Constituency MP
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#71717a]">
                  <Landmark className="h-3.5 w-3.5 text-[#18181b]" />
                  <span>18th Lok Sabha Representative</span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="relative h-18 w-18 sm:h-20 sm:w-20 flex-shrink-0 border border-[#18181b]/20 bg-[#f1ede4] overflow-hidden rounded-xs">
                    <PoliticianImage
                      src={preloadedMatch?.photo || ''}
                      alt={currentConstituencyData.mpName}
                      name={currentConstituencyData.mpName}
                      partyColor={currentConstituencyData.partyColor}
                      constituency={currentConstituencyData.constituency}
                      state={currentConstituencyData.state}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="space-y-1 min-w-0">
                    <h3 className="font-serif text-base sm:text-lg font-black text-[#18181b] leading-tight">
                      {currentConstituencyData.mpName}
                    </h3>
                    <div className="flex flex-wrap items-center gap-1.5 text-xs">
                      <span
                        className="px-1.5 py-0.5 font-bold text-white text-[10px]"
                        style={{ backgroundColor: currentConstituencyData.partyColor }}
                      >
                        {currentConstituencyData.partyAbbr}
                      </span>
                      <span className="border border-[#18181b]/20 bg-[#faf9f6] px-1.5 py-0.5 font-mono text-[10px] font-bold text-[#18181b]">
                        {currentConstituencyData.alliance}
                      </span>
                      <span className="text-[#71717a] text-[11px] truncate">
                        {currentConstituencyData.constituency}, {currentConstituencyData.state}
                      </span>
                    </div>

                    {preloadedMatch?.currentRole && (
                      <p className="text-[11px] font-medium text-[#c44d31] line-clamp-1">
                        {preloadedMatch.currentRole}
                      </p>
                    )}
                  </div>
                </div>

                {/* Micro Key Performance Metric Badges */}
                <div className="grid grid-cols-3 gap-2 border-t border-[#18181b]/10 pt-2.5 text-center font-mono">
                  <div className="bg-[#faf9f6] p-1.5 border border-[#18181b]/10">
                    <div className="text-[9px] uppercase tracking-wider text-[#71717a]">Parliament</div>
                    <div className="text-xs font-bold text-[#18181b]">
                      {preloadedMatch ? `${preloadedMatch.parliamentaryRecord.attendancePercent}%` : `${currentConstituencyData.attendancePercent || 86}%`}
                    </div>
                  </div>
                  <div className="bg-[#faf9f6] p-1.5 border border-[#18181b]/10">
                    <div className="text-[9px] uppercase tracking-wider text-[#71717a]">Net Worth</div>
                    <div className="text-xs font-bold text-[#18181b]">
                      ₹{preloadedMatch ? `${preloadedMatch.assets.totalCr} Cr` : `${currentConstituencyData.estimatedNetWorthCr || 4.2} Cr`}
                    </div>
                  </div>
                  <div className="bg-[#faf9f6] p-1.5 border border-[#18181b]/10">
                    <div className="text-[9px] uppercase tracking-wider text-[#71717a]">MPLADS Spend</div>
                    <div className="text-xs font-bold text-[#1b6b47]">
                      {preloadedMatch ? `${preloadedMatch.mplads.utilizationPercent}%` : '88%'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-[#18181b]/10 flex items-center justify-between">
                <span className="text-[10px] text-[#8a8479]">
                  Form 26 Affidavit & Lok Sabha Records
                </span>
                <button
                  onClick={() => {
                    if (preloadedMatch) {
                      onSelectPolitician(preloadedMatch);
                    } else {
                      handleOpenConstituencyMP(currentConstituencyData);
                    }
                  }}
                  className="inline-flex items-center gap-1 bg-[#18181b] text-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider hover:bg-[#c44d31] transition shadow-2xs"
                >
                  <span>Inspect Dossier</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* RIGHT 7 COLS: NEARBY CONSTITUENCIES & STATE MINISTERS */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
              
              {/* Nearby Constituencies */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#18181b]">
                    <MapPin className="h-3.5 w-3.5 text-[#c44d31]" />
                    <span>Adjacent Constituencies ({activeStateName})</span>
                  </div>
                  <button
                    onClick={onOpenAllIndiaDirectory}
                    className="text-[11px] text-[#c44d31] hover:underline font-bold uppercase tracking-wider"
                  >
                    View All 543 Seats →
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {nearbyConstituencies.map((seat) => (
                    <div
                      key={seat.constituency}
                      onClick={() => handleOpenConstituencyMP(seat)}
                      className="bg-white border border-[#18181b]/15 p-2.5 hover:border-[#18181b] hover:bg-[#faf9f6] transition cursor-pointer flex flex-col justify-between group rounded-xs shadow-2xs"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1 text-[10px] text-[#71717a] mb-1">
                          <span className="font-bold text-[#18181b] truncate">{seat.constituency}</span>
                          <span
                            className="px-1 font-bold text-white text-[8px]"
                            style={{ backgroundColor: seat.partyColor }}
                          >
                            {seat.partyAbbr}
                          </span>
                        </div>
                        <div className="font-serif text-xs font-bold text-[#18181b] group-hover:text-[#c44d31] transition-colors truncate">
                          {seat.mpName}
                        </div>
                      </div>

                      <div className="mt-2 pt-1 border-t border-[#18181b]/10 flex items-center justify-between text-[10px] text-[#71717a]">
                        <span>₹{seat.estimatedNetWorthCr || '3.5'} Cr</span>
                        <span className="text-[#18181b] font-bold group-hover:translate-x-0.5 transition-transform">
                          Inspect →
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Major Ministers & Key Leaders representing this State */}
              <div className="space-y-2 border-t border-[#18181b]/10 pt-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#18181b]">
                    <Building2 className="h-3.5 w-3.5 text-[#18181b]" />
                    <span>Union Ministers & Key Leaders ({activeStateName})</span>
                  </div>
                </div>

                {stateMinisters.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {stateMinisters.slice(0, 3).map((minister) => (
                      <div
                        key={minister.id}
                        onClick={() => onSelectPolitician(minister)}
                        className="bg-white border border-[#18181b]/15 p-2 hover:border-[#18181b] hover:bg-[#faf9f6] transition cursor-pointer flex items-center gap-2.5 group rounded-xs shadow-2xs"
                      >
                        <div className="h-10 w-10 flex-shrink-0 border border-[#18181b]/20 bg-[#f1ede4] overflow-hidden rounded-xs">
                          <PoliticianImage
                            src={minister.photo}
                            alt={minister.name}
                            name={minister.name}
                            partyColor={minister.partyColor}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-serif text-xs font-bold text-[#18181b] truncate group-hover:text-[#c44d31] transition-colors">
                            {minister.name}
                          </div>
                          <div className="text-[10px] text-[#71717a] truncate">
                            {minister.currentRole}
                          </div>
                          <div className="flex items-center gap-1 text-[9px] font-mono mt-0.5">
                            <span
                              className="px-1 font-bold text-white"
                              style={{ backgroundColor: minister.partyColor }}
                            >
                              {minister.partyAbbr}
                            </span>
                            <span className="text-[#8a8479]">₹{minister.assets.totalCr} Cr</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white border border-[#18181b]/15 p-3 text-xs text-[#71717a] flex items-center justify-between">
                    <span>
                      Detailed minister roster for {activeStateName} available in the 543 MP registry.
                    </span>
                    <button
                      onClick={onOpenAllIndiaDirectory}
                      className="font-bold text-[#18181b] hover:underline"
                    >
                      Open Registry →
                    </button>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>
      )}

    </section>
  );
};
