import React, { useState, useMemo, useCallback } from 'react';
import { 
  Users, 
  Landmark, 
  TrendingUp, 
  ShieldAlert, 
  ShieldCheck, 
  Sparkles, 
  Search, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  Filter,
  ArrowUpDown,
  Compass,
  MapPin,
  Maximize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MPConstituencyEntry } from '../data/allConstituencies';
import { Politician } from '../types';
import { PoliticianImage } from './PoliticianImage';
import { StateMacroParliamentaryStats } from '../data/stateParliamentaryStats';
import { synthesizeMPPolitician } from '../utils/synthesizePolitician';
import { findZoomedStateData, StateDistrictMapData } from '../data/indiaAccurateMapData';

interface ConstituencyMapVisualizerProps {
  stateName: string;
  stateStats?: StateMacroParliamentaryStats;
  constituencies: MPConstituencyEntry[];
  preloadedPoliticians: Politician[];
  onSelectPolitician: (p: Politician) => void;
  selectedConstituencyName?: string | null;
  onSelectConstituencyName?: (name: string | null) => void;
}

export const ConstituencyMapVisualizer: React.FC<ConstituencyMapVisualizerProps> = ({
  stateName,
  stateStats,
  constituencies,
  preloadedPoliticians,
  onSelectPolitician,
  selectedConstituencyName,
  onSelectConstituencyName,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [partyFilter, setPartyFilter] = useState('ALL');
  const [allianceFilter, setAllianceFilter] = useState<'ALL' | 'NDA' | 'INDIA' | 'Others'>('ALL');
  const [sortBy, setSortBy] = useState<'name' | 'attendance' | 'assets'>('name');
  const [hoveredDistrict, setHoveredDistrict] = useState<StateDistrictMapData | null>(null);
  const [mapTooltipPos, setMapTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Zoomed SVG state geometry
  const stateZoomData = useMemo(() => {
    return findZoomedStateData(stateName);
  }, [stateName]);

  // Helper to match district to parliamentary constituency
  const getDistrictConstituency = useCallback((districtName: string): MPConstituencyEntry | undefined => {
    if (!districtName || constituencies.length === 0) return undefined;
    const dNorm = districtName.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // 1. Exact / normalized match
    const exact = constituencies.find(c => c.constituency.toLowerCase().replace(/[^a-z0-9]/g, '') === dNorm);
    if (exact) return exact;
    
    // 2. Substring inclusion
    const sub = constituencies.find(c => {
      const cNorm = c.constituency.toLowerCase().replace(/[^a-z0-9]/g, '');
      return cNorm.includes(dNorm) || dNorm.includes(cNorm);
    });
    if (sub) return sub;

    // 3. Word token matching
    const dTokens = districtName.toLowerCase().split(/[\s-]+/);
    const tokenMatch = constituencies.find(c => {
      const cTokens = c.constituency.toLowerCase().split(/[\s-]+/);
      return dTokens.some(dt => dt.length > 3 && cTokens.includes(dt));
    });
    if (tokenMatch) return tokenMatch;

    return undefined;
  }, [constituencies]);

  // Hovered constituency data
  const hoveredConstituency = useMemo(() => {
    if (!hoveredDistrict) return null;
    return getDistrictConstituency(hoveredDistrict.name) || null;
  }, [hoveredDistrict, getDistrictConstituency]);

  // Unique parties in this state
  const availableParties = useMemo(() => {
    const set = new Set<string>();
    constituencies.forEach(c => set.add(c.partyAbbr));
    return Array.from(set).sort();
  }, [constituencies]);

  // Filtered constituencies
  const filteredConstituencies = useMemo(() => {
    return constituencies.filter(c => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = c.constituency.toLowerCase().includes(q);
        const matchMP = c.mpName.toLowerCase().includes(q);
        const matchParty = c.party.toLowerCase().includes(q) || c.partyAbbr.toLowerCase().includes(q);
        if (!matchName && !matchMP && !matchParty) return false;
      }
      if (partyFilter !== 'ALL' && c.partyAbbr !== partyFilter) return false;
      if (allianceFilter !== 'ALL' && c.alliance !== allianceFilter) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'attendance') {
        return (b.attendancePercent || 75) - (a.attendancePercent || 75);
      }
      if (sortBy === 'assets') {
        return (b.estimatedNetWorthCr || 5) - (a.estimatedNetWorthCr || 5);
      }
      return a.constituency.localeCompare(b.constituency);
    });
  }, [constituencies, searchQuery, partyFilter, allianceFilter, sortBy]);

  // Handler to open politician
  const handleOpenMP = (entry: MPConstituencyEntry) => {
    const preloaded = preloadedPoliticians.find(
      p => p.id === entry.preloadedId || p.name.toLowerCase() === entry.mpName.toLowerCase()
    );
    if (preloaded) {
      onSelectPolitician(preloaded);
    } else {
      const synth = synthesizeMPPolitician(entry);
      onSelectPolitician(synth);
    }
  };

  // Find currently active constituency details
  const activeConstituency = useMemo(() => {
    if (!selectedConstituencyName) return null;
    return constituencies.find(c => c.constituency.toLowerCase() === selectedConstituencyName.toLowerCase()) || null;
  }, [constituencies, selectedConstituencyName]);

  return (
    <div className="bg-[#fcfbf9] border-2 border-[#1a1a1a] shadow-md p-4 sm:p-6 space-y-6">
      
      {/* Header with State Constituency Count & Macro Badge */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#1a1a1a]/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-[#c44d31] text-white text-[10px] font-black uppercase tracking-widest px-2 py-0.5">
              STATE CONSTITUENCY MAP
            </span>
            <span className="text-xs font-mono text-[#66625b]">
              18th Lok Sabha (2024–2029)
            </span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-black text-[#1a1a1a] mt-1">
            {stateName}
          </h3>
          <p className="text-xs sm:text-sm text-[#66625b]">
            Showing all <strong className="text-[#1a1a1a] font-bold">{constituencies.length} Parliamentary Constituencies</strong> across {stateName}. Tap any district or seat to inspect its elected representative, assets, and legislative performance.
          </p>
        </div>

        {/* State Summary Badges */}
        {stateStats && (
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="border border-[#1a1a1a]/30 bg-white px-3 py-1.5 flex items-center gap-2">
              <Users className="h-4 w-4 text-[#c44d31]" />
              <div>
                <div className="text-[10px] uppercase font-bold text-[#66625b]">Total Seats</div>
                <div className="font-mono font-bold text-[#1a1a1a]">{stateStats.totalSeats} Lok Sabha</div>
              </div>
            </div>
            <div className="border border-[#1a1a1a]/30 bg-white px-3 py-1.5 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-[#2d6a4f]" />
              <div>
                <div className="text-[10px] uppercase font-bold text-[#66625b]">MPLADS Utilization</div>
                <div className="font-mono font-bold text-[#2d6a4f]">{stateStats.mpladsUtilizationPercent}%</div>
              </div>
            </div>
            <div className="border border-[#1a1a1a]/30 bg-white px-3 py-1.5 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#1a1a1a]" />
              <div>
                <div className="text-[10px] uppercase font-bold text-[#66625b]">Clean Affidavits</div>
                <div className="font-mono font-bold text-[#1a1a1a]">{stateStats.cleanRecordsPercent}%</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* State Geographic Vector Map (When Available) */}
      {stateZoomData && stateZoomData.districts.length > 0 && (
        <div className="border border-[#1a1a1a]/20 bg-white p-3 sm:p-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#1a1a1a]/10 mb-3">
            <div className="flex items-center gap-2">
              <Compass className="h-4 w-4 text-[#c44d31]" />
              <span className="font-serif font-black text-sm text-[#1a1a1a]">
                {stateName} Administrative & District Map ({stateZoomData.districts.length} Districts)
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#66625b]">
              Hover or click any district boundary
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            {/* SVG Visual Map */}
            <div 
              className="lg:col-span-8 relative aspect-[600/500] max-h-[360px] bg-[#fbf9f5] border border-[#1a1a1a]/15 flex items-center justify-center p-2 overflow-hidden select-none"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setMapTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
              }}
            >
              <svg viewBox="0 0 600 500" className="w-full h-full">
                {/* State base outline */}
                <path
                  d={stateZoomData.statePath}
                  fill="#f2eee5"
                  stroke="#1a1a1a"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />

                {/* Internal District Polygons */}
                {stateZoomData.districts.map((district) => {
                  const isHovered = hoveredDistrict?.name === district.name;
                  const isSelected = selectedConstituencyName && (
                    selectedConstituencyName.toLowerCase().includes(district.name.toLowerCase()) ||
                    district.name.toLowerCase().includes(selectedConstituencyName.toLowerCase())
                  );

                  // Find matching constituency for coloring
                  const matchConstituency = getDistrictConstituency(district.name);

                  let fillColor = '#ffffff';
                  if (matchConstituency) {
                    fillColor = matchConstituency.alliance === 'NDA' ? '#fed7aa' : matchConstituency.alliance === 'INDIA' ? '#bae6fd' : '#e5e7eb';
                  }
                  if (isHovered) fillColor = '#fef08a';
                  if (isSelected) fillColor = '#f97316';

                  return (
                    <g
                      key={district.name + (district.code || '')}
                      className="cursor-pointer transition-colors"
                      onMouseEnter={() => setHoveredDistrict(district)}
                      onMouseLeave={() => setHoveredDistrict(null)}
                      onClick={() => {
                        if (matchConstituency && onSelectConstituencyName) {
                          onSelectConstituencyName(matchConstituency.constituency);
                        } else if (onSelectConstituencyName) {
                          onSelectConstituencyName(district.name);
                        }
                      }}
                    >
                      <path
                        d={district.path}
                        fill={fillColor}
                        stroke={isSelected ? '#1a1a1a' : isHovered ? '#1a1a1a' : '#66625b'}
                        strokeWidth={isSelected ? '2.5' : isHovered ? '1.8' : '0.75'}
                        strokeLinejoin="round"
                        className="transition-colors duration-150 hover:opacity-90"
                      />
                      {district.centroid.x > 0 && district.centroid.y > 0 && (
                        <text
                          x={district.centroid.x}
                          y={district.centroid.y}
                          textAnchor="middle"
                          dominantBaseline="central"
                          className="pointer-events-none font-mono"
                          style={{
                            fontSize: '7.5px',
                            fill: isSelected ? '#ffffff' : '#1a1a1a',
                            fontWeight: 700,
                            textShadow: isSelected ? '0 1px 2px rgba(0,0,0,0.8)' : '0 1px 1px rgba(255,255,255,0.9)',
                          }}
                        >
                          {district.name.substring(0, 7)}
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Floating Hover Tooltip for Constituency Polygon */}
              {hoveredDistrict && (
                <div
                  className="absolute pointer-events-none z-40 bg-[#1a1a1a] text-white p-3 shadow-2xl border border-white/20 text-xs w-64 transform -translate-x-1/2 -translate-y-full -mt-3 transition-transform duration-75"
                  style={{
                    left: `${Math.min(Math.max(mapTooltipPos.x, 130), 470)}px`,
                    top: `${Math.max(mapTooltipPos.y, 45)}px`,
                  }}
                >
                  {/* Constituency Name */}
                  <div className="border-b border-white/20 pb-1.5 mb-2 flex items-start justify-between gap-2">
                    <div>
                      <div className="text-[9px] font-mono uppercase tracking-wider text-[#f97316] font-bold">
                        CONSTITUENCY
                      </div>
                      <div className="font-serif font-black text-sm text-[#f2eee5] leading-tight">
                        {hoveredConstituency ? hoveredConstituency.constituency : hoveredDistrict.name}
                      </div>
                    </div>
                    {hoveredConstituency && (
                      <span className={`text-[9px] font-mono font-black px-1.5 py-0.5 uppercase shrink-0 ${
                        hoveredConstituency.alliance === 'NDA' ? 'bg-[#f97316] text-white' :
                        hoveredConstituency.alliance === 'INDIA' ? 'bg-[#0284c7] text-white' :
                        'bg-zinc-700 text-[#f2eee5]'
                      }`}>
                        {hoveredConstituency.alliance}
                      </span>
                    )}
                  </div>

                  {/* MP Name & Primary Party Affiliation */}
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="text-[#a8a29e]">Current MP:</span>
                      <span className="font-serif font-black text-[#f2eee5] text-right truncate max-w-[140px]">
                        {hoveredConstituency ? hoveredConstituency.mpName : 'Representative Pending'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[#a8a29e]">Party Affiliation:</span>
                      <span className="font-mono font-bold text-[#fbbf24] text-right truncate max-w-[140px]">
                        {hoveredConstituency ? hoveredConstituency.party : 'Regional Party'}
                      </span>
                    </div>

                    {hoveredConstituency && (
                      <>
                        <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[10px]">
                          <span className="text-[#a8a29e]">Attendance:</span>
                          <span className="font-mono font-bold text-[#4ade80]">
                            {hoveredConstituency.attendancePercent}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="text-[#a8a29e]">Declared Net Worth:</span>
                          <span className="font-mono font-bold text-[#f2eee5]">
                            ₹{hoveredConstituency.totalAssetsCr} Cr
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="mt-2 pt-1 border-t border-white/15 text-[9px] text-[#fbbf24] font-mono flex items-center justify-between uppercase">
                    <span>Click polygon to select</span>
                    <span>View Dossier →</span>
                  </div>
                </div>
              )}
            </div>

            {/* District Quick Info Card */}
            <div className="lg:col-span-4 bg-[#f7f5f0] border border-[#1a1a1a]/20 p-3.5 space-y-3 text-xs flex flex-col justify-between h-full">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#c44d31] font-bold">
                  SELECTED CONSTITUENCY AUDIT
                </div>
                <div className="font-serif font-black text-base text-[#1a1a1a] mt-0.5">
                  {hoveredConstituency
                    ? hoveredConstituency.constituency
                    : hoveredDistrict
                    ? hoveredDistrict.name
                    : selectedConstituencyName || `${stateName} Overview`}
                </div>
                
                {/* Active MP Summary if found */}
                {(hoveredConstituency || (selectedConstituencyName && getDistrictConstituency(selectedConstituencyName))) ? (
                  (() => {
                    const activeC = hoveredConstituency || getDistrictConstituency(selectedConstituencyName!);
                    if (!activeC) return null;
                    return (
                      <div className="mt-2.5 space-y-2 bg-white p-2.5 border border-[#1a1a1a]/15 text-xs">
                        <div className="flex items-center justify-between border-b border-[#1a1a1a]/10 pb-1.5">
                          <div>
                            <div className="text-[10px] text-[#66625b] uppercase font-medium">Current MP</div>
                            <div className="font-serif font-bold text-sm text-[#1a1a1a]">{activeC.mpName}</div>
                          </div>
                          <span className={`text-[10px] font-mono font-black px-1.5 py-0.5 uppercase ${
                            activeC.alliance === 'NDA' ? 'bg-[#f97316] text-white' :
                            activeC.alliance === 'INDIA' ? 'bg-[#0284c7] text-white' :
                            'bg-zinc-700 text-white'
                          }`}>
                            {activeC.party}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-[10px]">
                          <div>
                            <span className="text-[#66625b] block">Attendance</span>
                            <span className="font-mono font-bold text-[#1a1a1a]">{activeC.attendancePercent}%</span>
                          </div>
                          <div>
                            <span className="text-[#66625b] block">Net Assets</span>
                            <span className="font-mono font-bold text-[#1a1a1a]">₹{activeC.totalAssetsCr} Cr</span>
                          </div>
                        </div>

                        {onSelectPolitician && (
                          <button
                            onClick={() => {
                              const pol = synthesizeMPPolitician(activeC, preloadedPoliticians);
                              onSelectPolitician(pol);
                            }}
                            className="w-full mt-1.5 py-1.5 bg-[#1a1a1a] text-white text-[11px] font-bold uppercase tracking-wider hover:bg-[#c44d31] transition flex items-center justify-center gap-1.5"
                          >
                            <span>Open Full MP Dossier</span>
                            <ChevronRight className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    );
                  })()
                ) : (
                  <p className="text-[11px] text-[#66625b] mt-1.5">
                    Hover or click any district polygon on the left map to inspect its Member of Parliament, party allegiance, attendance, and asset filings.
                  </p>
                )}
              </div>

              <div className="pt-2 border-t border-[#1a1a1a]/15">
                <div className="text-[9px] uppercase tracking-wider font-bold text-[#66625b] mb-1">
                  Alliance Legend
                </div>
                <div className="flex flex-wrap gap-2 text-[10px] font-mono">
                  <span className="flex items-center gap-1">
                    <span className="h-2.5 w-2.5 bg-[#fed7aa] border border-[#1a1a1a]/30"></span> NDA ({constituencies.filter(c => c.alliance === 'NDA').length})
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-2.5 w-2.5 bg-[#bae6fd] border border-[#1a1a1a]/30"></span> INDIA ({constituencies.filter(c => c.alliance === 'INDIA').length})
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-2.5 w-2.5 bg-[#e5e7eb] border border-[#1a1a1a]/30"></span> Others ({constituencies.filter(c => c.alliance === 'Others').length})
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter and Search Bar for Constituencies */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 border border-[#1a1a1a]/20">
        
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#66625b]" />
          <input
            type="text"
            placeholder={`Search ${stateName} constituencies or MPs (e.g. ${constituencies[0]?.constituency || 'Varanasi'})...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#f7f5f0] border border-[#1a1a1a]/20 font-medium text-[#1a1a1a] focus:outline-hidden focus:border-[#1a1a1a]"
          />
        </div>

        {/* Alliance filter */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setAllianceFilter('ALL')}
            className={`px-2 py-1 text-[11px] font-bold uppercase transition ${
              allianceFilter === 'ALL' ? 'bg-[#1a1a1a] text-white' : 'bg-[#f7f5f0] text-[#66625b] hover:text-[#1a1a1a]'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setAllianceFilter('NDA')}
            className={`px-2 py-1 text-[11px] font-bold uppercase transition ${
              allianceFilter === 'NDA' ? 'bg-[#f97316] text-white' : 'bg-[#f7f5f0] text-[#66625b] hover:text-[#1a1a1a]'
            }`}
          >
            NDA
          </button>
          <button
            onClick={() => setAllianceFilter('INDIA')}
            className={`px-2 py-1 text-[11px] font-bold uppercase transition ${
              allianceFilter === 'INDIA' ? 'bg-[#0284c7] text-white' : 'bg-[#f7f5f0] text-[#66625b] hover:text-[#1a1a1a]'
            }`}
          >
            INDIA
          </button>
          <button
            onClick={() => setAllianceFilter('Others')}
            className={`px-2 py-1 text-[11px] font-bold uppercase transition ${
              allianceFilter === 'Others' ? 'bg-[#6b7280] text-white' : 'bg-[#f7f5f0] text-[#66625b] hover:text-[#1a1a1a]'
            }`}
          >
            Others
          </button>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-[10px] uppercase font-bold text-[#66625b]">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[#f7f5f0] border border-[#1a1a1a]/20 px-2 py-1 text-xs font-bold text-[#1a1a1a] focus:outline-hidden"
          >
            <option value="name">Constituency Name (A-Z)</option>
            <option value="attendance">Highest Attendance</option>
            <option value="assets">Declared Assets (₹ Cr)</option>
          </select>
        </div>

      </div>

      {/* Interactive Constituency Grid & Spatial Zones */}
      <div>
        <div className="text-xs font-bold text-[#66625b] uppercase tracking-wider mb-2 flex items-center justify-between">
          <span>{filteredConstituencies.length} Constituencies Available</span>
          <span className="text-[10px] text-[#c44d31]">Click any card to inspect dossier</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-[560px] overflow-y-auto pr-1">
          {filteredConstituencies.map((entry, index) => {
            const isSelected = selectedConstituencyName?.toLowerCase() === entry.constituency.toLowerCase();
            const preloaded = preloadedPoliticians.find(
              p => p.id === entry.preloadedId || p.name.toLowerCase() === entry.mpName.toLowerCase()
            );

            return (
              <motion.div
                key={entry.constituency}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15, delay: Math.min(index * 0.02, 0.3) }}
                onClick={() => {
                  if (onSelectConstituencyName) {
                    onSelectConstituencyName(entry.constituency);
                  }
                }}
                className={`group relative p-3 border text-left cursor-pointer transition-all duration-150 flex flex-col justify-between ${
                  isSelected 
                    ? 'border-[#1a1a1a] bg-[#f2eee5] ring-2 ring-[#c44d31]' 
                    : 'border-[#1a1a1a]/20 bg-white hover:border-[#1a1a1a] hover:bg-[#faf8f5] hover:shadow-sm'
                }`}
              >
                {/* Top row: Constituency Name & Alliance Badge */}
                <div>
                  <div className="flex items-start justify-between gap-1.5">
                    <div>
                      <span className="text-[9px] font-mono font-bold text-[#66625b] uppercase tracking-wider block">
                        SEAT #{index + 1}
                      </span>
                      <h4 className="font-serif font-black text-sm text-[#1a1a1a] group-hover:text-[#c44d31] transition">
                        {entry.constituency}
                      </h4>
                    </div>

                    <span 
                      className="px-1.5 py-0.5 text-[9px] font-black uppercase text-white tracking-wider shrink-0"
                      style={{ backgroundColor: entry.alliance === 'NDA' ? '#f97316' : entry.alliance === 'INDIA' ? '#0284c7' : '#6b7280' }}
                    >
                      {entry.partyAbbr}
                    </span>
                  </div>

                  {/* MP Details & Photo */}
                  <div className="flex items-center gap-2 mt-2 pt-2 border-t border-[#1a1a1a]/10">
                    <div className="h-9 w-9 rounded-none border border-[#1a1a1a] shrink-0 bg-[#e8e4dc] overflow-hidden">
                      {preloaded ? (
                        <PoliticianImage
                          src={preloaded.photoUrl}
                          alt={preloaded.name}
                          className="h-full w-full object-cover object-top"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center font-serif font-black text-xs text-[#66625b]">
                          {entry.mpName.charAt(0)}
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-xs text-[#1a1a1a] truncate">
                        {entry.mpName}
                      </div>
                      <div className="text-[10px] text-[#66625b] truncate">
                        {entry.party}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom metrics row: Assets & Attendance */}
                <div className="mt-3 pt-2 border-t border-[#1a1a1a]/10 flex items-center justify-between text-[11px] font-mono">
                  <div>
                    <span className="text-[9px] text-[#66625b] block">Assets</span>
                    <span className="font-bold text-[#1a1a1a]">
                      {entry.estimatedNetWorthCr ? `₹${entry.estimatedNetWorthCr} Cr` : 'Declared'}
                    </span>
                  </div>

                  <div>
                    <span className="text-[9px] text-[#66625b] block">Attendance</span>
                    <span className="font-bold text-[#2d6a4f]">
                      {entry.attendancePercent ? `${entry.attendancePercent}%` : '85%'}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenMP(entry);
                    }}
                    className="p-1 border border-[#1a1a1a] bg-[#1a1a1a] text-white hover:bg-[#c44d31] hover:border-[#c44d31] transition"
                    title="Open Full Dossier"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Selected Constituency Spotlight Drawer */}
      <AnimatePresence>
        {activeConstituency && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="border-2 border-[#1a1a1a] bg-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 border border-[#1a1a1a] bg-[#f2eee5] shrink-0 overflow-hidden">
                {(() => {
                  const p = preloadedPoliticians.find(
                    item => item.id === activeConstituency.preloadedId || item.name.toLowerCase() === activeConstituency.mpName.toLowerCase()
                  );
                  return p ? (
                    <PoliticianImage
                      src={p.photoUrl}
                      alt={p.name}
                      className="h-full w-full object-cover object-top"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center font-serif font-black text-base text-[#66625b]">
                      {activeConstituency.mpName.charAt(0)}
                    </div>
                  );
                })()}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase bg-[#1a1a1a] text-white px-1.5 py-0.2">
                    {activeConstituency.constituency}
                  </span>
                  <span className="text-xs font-bold text-[#66625b]">
                    {activeConstituency.partyAbbr} ({activeConstituency.alliance})
                  </span>
                </div>
                <h4 className="font-serif font-black text-lg text-[#1a1a1a]">
                  {activeConstituency.mpName}
                </h4>
                <div className="text-xs text-[#66625b]">
                  Elected Member of Parliament (18th Lok Sabha)
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleOpenMP(activeConstituency)}
                className="inline-flex items-center gap-2 border-2 border-[#1a1a1a] bg-[#1a1a1a] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#c44d31] hover:border-[#c44d31] transition shadow-xs"
              >
                <span>View Full MP Audit Dossier</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

