import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Map, 
  MapPin, 
  Search, 
  Users, 
  Landmark, 
  TrendingUp, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  ChevronRight, 
  Compass, 
  Layers, 
  CheckCircle2, 
  ExternalLink, 
  Award, 
  Filter, 
  X, 
  Eye, 
  Info,
  Maximize2,
  ZoomIn,
  FileCode,
  ArrowLeft
} from 'lucide-react';
import { Politician } from '../types';
import { STATE_PARLIAMENTARY_STATS, getParliamentaryMacroStats, StateMacroParliamentaryStats } from '../data/stateParliamentaryStats';
import { ALL_543_LOK_SABHA_CONSTITUENCIES, findConstituencyById, getConstituenciesByState } from '../data/all543Constituencies';
import { UserLocationInfo } from '../utils/geolocation';
import { ACCURATE_INDIA_STATES_DATA, findAccurateStateData } from '../data/indiaAccurateMapData';
import { IndiaMap } from './IndiaMap';
import { StateMap } from './StateMap';
import { ConstituencyPanel } from './ConstituencyPanel';

interface InteractiveMapPageProps {
  preloadedPoliticians: Politician[];
  onSelectPolitician: (p: Politician) => void;
  onBackToOverview?: () => void;
  userLocation: UserLocationInfo | null;
}

export type MapOverlayMode = 'coalition' | 'mplads' | 'attendance' | 'affidavits';

export const InteractiveMapPage: React.FC<InteractiveMapPageProps> = ({
  preloadedPoliticians,
  onSelectPolitician,
  onBackToOverview,
  userLocation,
}) => {
  // Navigation level: 'national' (all India) or 'state' (drill-down into selected state)
  const [viewLevel, setViewLevel] = useState<'national' | 'state'>('national');

  // Active selected state (defaults to user's detected state or Madhya Pradesh / Uttar Pradesh)
  const [selectedStateName, setSelectedStateName] = useState<string>(
    userLocation?.state || 'Madhya Pradesh'
  );

  // Active hovered state for real-time hover inspection before clicking
  const [hoveredStateName, setHoveredStateName] = useState<string | null>(null);

  // Active selected constituency for the side drawer panel
  const [selectedConstituencyId, setSelectedConstituencyId] = useState<string | null>(null);

  // Active overlay layer: 'coalition' | 'mplads' | 'attendance' | 'affidavits'
  const [overlayMode, setOverlayMode] = useState<MapOverlayMode>('coalition');

  // Search across all 543 constituencies or states
  const [globalSearch, setGlobalSearch] = useState('');

  // The state currently in preview (either hovered state or selected state)
  const activePreviewStateName = hoveredStateName || selectedStateName;

  // Active preview state macro stats
  const activePreviewStats = useMemo(() => {
    return getParliamentaryMacroStats(activePreviewStateName);
  }, [activePreviewStateName]);

  // Constituencies in the preview state
  const activePreviewConstituencies = useMemo(() => {
    return getConstituenciesByState(activePreviewStateName);
  }, [activePreviewStateName]);

  // Constituencies in the selected state (for drill-down)
  const stateConstituencies = useMemo(() => {
    return getConstituenciesByState(selectedStateName);
  }, [selectedStateName]);

  // Global search matching across all 543 constituencies
  const searchResults = useMemo(() => {
    if (!globalSearch.trim()) return [];
    const q = globalSearch.toLowerCase();
    return ALL_543_LOK_SABHA_CONSTITUENCIES.filter(
      c => c.constituency.toLowerCase().includes(q) ||
           c.state.toLowerCase().includes(q) ||
           c.mpName.toLowerCase().includes(q) ||
           c.party.toLowerCase().includes(q) ||
           c.partyAbbr.toLowerCase().includes(q)
    ).slice(0, 10);
  }, [globalSearch]);

  const handleStateClick = (stateName: string) => {
    setSelectedStateName(stateName);
    setHoveredStateName(null);
    setViewLevel('state');
  };

  return (
    <div className="space-y-6">
      
      {/* Top Breadcrumb & Page Banner */}
      <div className="bg-[#fcfbf9] border-2 border-[#1a1a1a]/15 p-5 sm:p-7 rounded-2xl sm:rounded-3xl shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="bg-[#1a1a1a] text-white px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest rounded-full">
                GEOGRAPHIC AUDIT MAP
              </span>
              <span className="text-xs font-mono text-[#66625b]">
                18th Lok Sabha • 543 Parliamentary Constituencies across 36 States & UTs
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-4xl font-black text-[#1a1a1a] tracking-tight">
              Interactive India Parliamentary & Constituency Map
            </h1>
            <p className="text-xs sm:text-sm text-[#66625b] mt-1 max-w-3xl">
              Tap any State on the geographic map to zoom directly into its constituencies. Click any constituency or MP marker to inspect verified affidavits, attendance, and declared net assets.
            </p>
          </div>

          {/* Quick Tally */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="border border-[#1a1a1a]/20 bg-white px-3.5 py-2 text-center rounded-xl shadow-2xs">
              <div className="text-[10px] font-bold uppercase text-[#f97316]">NDA Alliance</div>
              <div className="font-mono font-black text-sm text-[#1a1a1a]">293 Seats</div>
            </div>
            <div className="border border-[#1a1a1a]/20 bg-white px-3.5 py-2 text-center rounded-xl shadow-2xs">
              <div className="text-[10px] font-bold uppercase text-[#0284c7]">INDIA Alliance</div>
              <div className="font-mono font-black text-sm text-[#1a1a1a]">234 Seats</div>
            </div>
            <div className="border border-[#1a1a1a]/20 bg-white px-3.5 py-2 text-center rounded-xl shadow-2xs">
              <div className="text-[10px] font-bold uppercase text-[#6b7280]">Others / Ind</div>
              <div className="font-mono font-black text-sm text-[#1a1a1a]">16 Seats</div>
            </div>
          </div>
        </div>

        {/* Global Constituency / State Search Bar across all 543 */}
        <div className="mt-4 pt-4 border-t border-[#1a1a1a]/15 relative">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#66625b]" />
              <input
                type="text"
                placeholder="Search across all 543 Constituencies, States, or MPs (e.g. Indore, Varanasi, Wayanad, Baramati, Lucknow)..."
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border-2 border-[#1a1a1a] font-medium text-[#1a1a1a] focus:outline-hidden focus:ring-2 focus:ring-[#c44d31]"
              />
              {globalSearch && (
                <button
                  onClick={() => setGlobalSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#66625b] hover:text-[#1a1a1a]"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {userLocation && (
              <button
                onClick={() => {
                  setSelectedStateName(userLocation.state);
                  setViewLevel('state');
                }}
                className="hidden sm:inline-flex items-center gap-1.5 border-2 border-[#1a1a1a] bg-white px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#1a1a1a] hover:bg-[#f2eee5] transition shrink-0"
              >
                <MapPin className="h-3.5 w-3.5 text-[#c44d31]" />
                <span>My State: {userLocation.state}</span>
              </button>
            )}
          </div>

          {/* Search dropdown suggestions */}
          {searchResults.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-1 bg-white border-2 border-[#1a1a1a] shadow-xl z-50 divide-y divide-[#1a1a1a]/10 max-h-72 overflow-y-auto">
              {searchResults.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedStateName(item.state);
                    setSelectedConstituencyId(item.id);
                    setViewLevel('state');
                    setGlobalSearch('');
                  }}
                  className="w-full px-4 py-2.5 text-left flex items-center justify-between hover:bg-[#f2eee5] transition group"
                >
                  <div>
                    <div className="font-serif font-black text-sm text-[#1a1a1a] group-hover:text-[#c44d31]">
                      {item.constituency}, {item.state}
                    </div>
                    <div className="text-xs text-[#66625b]">
                      MP: <span className="font-bold text-[#1a1a1a]">{item.mpName}</span> ({item.partyAbbr} • {item.alliance})
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold bg-[#f0ece1] px-1.5 py-0.5 text-[#1a1a1a]">
                      {item.attendancePercent}% Att.
                    </span>
                    <ChevronRight className="h-4 w-4 text-[#66625b] group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* SINGLE UNIFIED INTERACTIVE MAP CANVAS */}
      <div className="bg-white border-2 border-[#1a1a1a] p-4 sm:p-5 shadow-md space-y-4 overflow-hidden">
        
        <AnimatePresence mode="wait">
          {viewLevel === 'national' ? (
            /* National India Map View */
            <motion.div
              key="national-view"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02, filter: 'blur(1px)' }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Header Controls for National View */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1a1a1a]/20">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#66625b]">
                    National Overview • Click Any State To Drill Down
                  </span>
                  <h2 className="font-serif text-lg sm:text-xl font-black text-[#1a1a1a]">
                    Republic of India (36 States & Union Territories)
                  </h2>
                </div>

                {/* Layer Switcher */}
                <div className="flex flex-wrap items-center gap-1">
                  <span className="text-[10px] font-bold uppercase text-[#66625b] mr-1 hidden sm:inline">Layer:</span>
                  <button
                    onClick={() => setOverlayMode('coalition')}
                    className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-wider transition ${
                      overlayMode === 'coalition' ? 'bg-[#1a1a1a] text-white' : 'bg-[#f7f5f0] text-[#66625b] hover:text-[#1a1a1a]'
                    }`}
                  >
                    Coalition
                  </button>
                  <button
                    onClick={() => setOverlayMode('mplads')}
                    className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-wider transition ${
                      overlayMode === 'mplads' ? 'bg-[#2d6a4f] text-white' : 'bg-[#f7f5f0] text-[#66625b] hover:text-[#1a1a1a]'
                    }`}
                  >
                    MPLADS %
                  </button>
                  <button
                    onClick={() => setOverlayMode('attendance')}
                    className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-wider transition ${
                      overlayMode === 'attendance' ? 'bg-[#0f766e] text-white' : 'bg-[#f7f5f0] text-[#66625b] hover:text-[#1a1a1a]'
                    }`}
                  >
                    Attendance
                  </button>
                  <button
                    onClick={() => setOverlayMode('affidavits')}
                    className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-wider transition ${
                      overlayMode === 'affidavits' ? 'bg-[#b91c1c] text-white' : 'bg-[#f7f5f0] text-[#66625b] hover:text-[#1a1a1a]'
                    }`}
                  >
                    Clean Records
                  </button>
                </div>
              </div>

              {/* Grid with India Vector Map & State Macro Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4">
                
                {/* Left 7 Cols: The India SVG Map */}
                <div className="lg:col-span-7 bg-[#fbf9f5] border-2 border-[#1a1a1a] p-2 sm:p-4 relative">
                  {/* Live State Hover Summary Bar */}
                  <div className="mb-2 px-3 py-1.5 bg-[#1a1a1a] text-white flex flex-wrap items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className={`inline-block w-2 h-2 rounded-full ${hoveredStateName ? 'bg-[#38bdf8] animate-pulse' : 'bg-[#4ade80]'}`}></span>
                      <span className="text-[#a8a29e] uppercase font-bold text-[10px]">
                        {hoveredStateName ? 'Hovering:' : 'Active State:'}
                      </span>
                      <strong className="text-white font-serif text-sm">
                        {activePreviewStateName}
                      </strong>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-[#c44d31] text-white px-2 py-0.5 text-[10px] font-black uppercase tracking-wider">
                        {activePreviewConstituencies.length || activePreviewStats?.totalSeats || 0} Constituencies Available
                      </span>
                      <span className="hidden sm:inline text-[10px] text-[#fbbf24]">
                        Click state to drill down →
                      </span>
                    </div>
                  </div>

                  <IndiaMap
                    onSelectState={handleStateClick}
                    overlayMode={overlayMode}
                    selectedStateName={selectedStateName}
                    onHoverState={(st) => setHoveredStateName(st)}
                  />

                  {/* Map Legend */}
                  <div className="mt-3 pt-2 border-t border-[#1a1a1a]/10 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                    <div className="flex items-center gap-3">
                      {overlayMode === 'coalition' && (
                        <>
                          <span className="flex items-center gap-1">
                            <span className="h-3 w-3 bg-[#c2410c]"></span> NDA Majority
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="h-3 w-3 bg-[#0369a1]"></span> INDIA Majority
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="h-3 w-3 bg-[#15803d]"></span> Regional / Others
                          </span>
                        </>
                      )}
                      {overlayMode === 'mplads' && (
                        <>
                          <span className="flex items-center gap-1">
                            <span className="h-3 w-3 bg-[#14532d]"></span> &gt;88% (High)
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="h-3 w-3 bg-[#92400e]"></span> 78-88% (Med)
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="h-3 w-3 bg-[#7f1d1d]"></span> &lt;78% (Low)
                          </span>
                        </>
                      )}
                      {overlayMode === 'attendance' && (
                        <>
                          <span className="flex items-center gap-1">
                            <span className="h-3 w-3 bg-[#115e59]"></span> &gt;85% (High)
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="h-3 w-3 bg-[#075985]"></span> 75-85% (Med)
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="h-3 w-3 bg-[#3730a3]"></span> &lt;75% (Low)
                          </span>
                        </>
                      )}
                      {overlayMode === 'affidavits' && (
                        <>
                          <span className="flex items-center gap-1">
                            <span className="h-3 w-3 bg-[#14532d]"></span> &gt;65% Clean
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="h-3 w-3 bg-[#92400e]"></span> 45-65% Clean
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="h-3 w-3 bg-[#7f1d1d]"></span> &lt;45% Clean
                          </span>
                        </>
                      )}
                    </div>
                    <span className="text-[10px] text-[#66625b]">
                      Hover any state for quick stats • Tap to view all constituencies
                    </span>
                  </div>
                </div>

                {/* Right 5 Cols: Dynamic State Summary & 36 States Jump Matrix */}
                <div className="lg:col-span-5 flex flex-col space-y-4">
                  {/* Dynamic State Preview Card */}
                  <div className="bg-[#1a1a1a] text-white p-4 border-2 border-[#1a1a1a] shadow-sm space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-0.5 text-[9px] font-mono uppercase font-black tracking-widest ${
                            hoveredStateName 
                              ? 'bg-[#38bdf8] text-[#1a1a1a]' 
                              : 'bg-[#f97316] text-white'
                          }`}>
                            {hoveredStateName ? '⚡ HOVER PREVIEW' : '📍 ACTIVE STATE'}
                          </span>
                          <span className="text-[10px] font-mono text-[#a8a29e]">
                            {activePreviewStats?.rulingParty || '18th Lok Sabha'}
                          </span>
                        </div>
                        <h3 className="font-serif text-2xl font-black text-[#f2eee5]">
                          {activePreviewStateName}
                        </h3>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedStateName(activePreviewStateName);
                          setHoveredStateName(null);
                          setViewLevel('state');
                        }}
                        className="px-3 py-1.5 bg-[#c44d31] hover:bg-[#a83d25] text-white transition text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm shrink-0"
                      >
                        <span>Explore Seats</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {/* Total Constituencies Highlight */}
                    <div className="bg-white/10 p-2.5 border border-white/15">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[#38bdf8] font-mono font-bold uppercase flex items-center gap-1.5">
                          <Users className="h-3.5 w-3.5" />
                          <span>Total Constituencies:</span>
                        </span>
                        <span className="font-mono text-base font-black text-white bg-[#0284c7]/40 px-2 py-0.5">
                          {activePreviewConstituencies.length || activePreviewStats?.totalSeats || 0} Seats Available
                        </span>
                      </div>
                      <div className="text-[10px] text-[#a8a29e] mt-1 font-mono flex items-center justify-between">
                        <span>100% verified ECI & ADR candidate affidavits</span>
                        <span className="text-[#4ade80] font-bold">18th Lok Sabha</span>
                      </div>
                    </div>

                    {/* Sample Constituencies Available Chips */}
                    {activePreviewConstituencies.length > 0 && (
                      <div className="space-y-1 pt-1">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-[#a8a29e]">
                          Sample Constituencies ({activePreviewConstituencies.length} Total):
                        </div>
                        <div className="flex flex-wrap gap-1 max-h-16 overflow-y-auto">
                          {activePreviewConstituencies.slice(0, 6).map((c) => (
                            <span
                              key={c.id}
                              onClick={() => {
                                setSelectedStateName(activePreviewStateName);
                                setSelectedConstituencyId(c.id);
                                setHoveredStateName(null);
                                setViewLevel('state');
                              }}
                              className="px-1.5 py-0.5 text-[10px] font-mono bg-white/10 hover:bg-white hover:text-[#1a1a1a] text-[#f2eee5] border border-white/10 cursor-pointer transition"
                              title={`View ${c.constituency} (${c.mpName})`}
                            >
                              {c.constituency}
                            </span>
                          ))}
                          {activePreviewConstituencies.length > 6 && (
                            <span className="px-1.5 py-0.5 text-[10px] font-mono text-[#a8a29e]">
                              +{activePreviewConstituencies.length - 6} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {activePreviewStats && (
                      <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-white/15">
                        <div className="bg-white/10 p-2 border border-white/10">
                          <div className="text-[10px] text-[#a8a29e] uppercase font-mono">Seat Distribution</div>
                          <div className="font-mono text-sm font-black text-white">
                            <span className="text-[#fb923c]">{activePreviewStats.ndaSeats} NDA</span>
                            <span className="text-white/40 mx-1">•</span>
                            <span className="text-[#38bdf8]">{activePreviewStats.indiaSeats} INDIA</span>
                          </div>
                          <div className="text-[9px] text-[#d6d3d1]">Others: {activePreviewStats.otherSeats} seats</div>
                        </div>
                        <div className="bg-white/10 p-2 border border-white/10">
                          <div className="text-[10px] text-[#a8a29e] uppercase font-mono">MPLADS Util.</div>
                          <div className="font-mono text-sm font-black text-[#4ade80]">{activePreviewStats.mpladsUtilizationPercent}%</div>
                          <div className="text-[9px] text-[#d6d3d1]">Spent: ₹{activePreviewStats.mpladsSpentCr} Cr</div>
                        </div>
                        <div className="bg-white/10 p-2 border border-white/10">
                          <div className="text-[10px] text-[#a8a29e] uppercase font-mono">Avg Attendance</div>
                          <div className="font-mono text-sm font-black text-[#38bdf8]">{activePreviewStats.avgAttendancePercent}%</div>
                          <div className="text-[9px] text-[#d6d3d1]">Natl: {activePreviewStats.nationalAvgAttendance}%</div>
                        </div>
                        <div className="bg-white/10 p-2 border border-white/10">
                          <div className="text-[10px] text-[#a8a29e] uppercase font-mono">Clean Records</div>
                          <div className="font-mono text-sm font-black text-white">{activePreviewStats.cleanRecordsPercent}%</div>
                          <div className="text-[9px] text-[#d6d3d1]">{activePreviewStats.totalCriminalCases} declared cases</div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 36 States Quick Jump Grid with Seat Counts */}
                  <div className="bg-white border-2 border-[#1a1a1a] p-3 shadow-xs flex-1 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-2 pb-1 border-b border-[#1a1a1a]/15">
                      <span className="text-xs font-bold text-[#1a1a1a] uppercase tracking-wider">
                        All 36 States & UTs Matrix
                      </span>
                      <span className="text-[10px] font-mono text-[#66625b]">
                        Hover to preview • Click to open
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-56 overflow-y-auto pr-1">
                      {ACCURATE_INDIA_STATES_DATA.map((st) => {
                        const stConstituencies = getConstituenciesByState(st.name);
                        const count = stConstituencies.length || getParliamentaryMacroStats(st.name)?.totalSeats || 0;
                        const isHovered = hoveredStateName === st.name;
                        const isSelected = selectedStateName === st.name;

                        return (
                          <button
                            key={st.id}
                            onClick={() => {
                              setSelectedStateName(st.name);
                              setHoveredStateName(null);
                              setViewLevel('state');
                            }}
                            onMouseEnter={() => setHoveredStateName(st.name)}
                            onMouseLeave={() => {
                              if (hoveredStateName === st.name) {
                                setHoveredStateName(null);
                              }
                            }}
                            className={`px-2 py-1.5 text-left text-xs font-bold truncate border transition flex items-center justify-between group ${
                              isSelected
                                ? 'border-[#1a1a1a] bg-[#1a1a1a] text-white'
                                : isHovered
                                ? 'border-[#c44d31] bg-[#f2eee5] text-[#1a1a1a] shadow-xs'
                                : 'border-[#1a1a1a]/20 bg-[#fbf9f5] hover:bg-[#f2eee5] text-[#1a1a1a]'
                            }`}
                          >
                            <span className="truncate mr-1">{st.name}</span>
                            <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 shrink-0 ${
                              isSelected
                                ? 'bg-white text-[#1a1a1a]'
                                : isHovered
                                ? 'bg-[#c44d31] text-white'
                                : 'bg-[#1a1a1a]/10 text-[#1a1a1a]'
                            }`}>
                              {count}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                </div>

              </div>
            </motion.div>
          ) : (
            /* State Drilldown Map View (Same Container) */
            <motion.div
              key={`state-view-${selectedStateName}`}
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -8 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <StateMap
                stateName={selectedStateName}
                onSelectConstituency={(id) => setSelectedConstituencyId(id)}
                selectedConstituencyId={selectedConstituencyId}
                onBackToIndia={() => {
                  setViewLevel('national');
                  setSelectedConstituencyId(null);
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Side Panel for Selected Constituency MP Dossier */}
      <ConstituencyPanel
        constituencyId={selectedConstituencyId}
        onClose={() => setSelectedConstituencyId(null)}
        onSelectPolitician={onSelectPolitician}
        preloadedPoliticians={preloadedPoliticians}
      />

    </div>
  );
};
