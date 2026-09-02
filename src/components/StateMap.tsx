import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  Search, 
  Users, 
  MapPin, 
  Landmark, 
  TrendingUp, 
  ShieldCheck, 
  AlertTriangle,
  FileText,
  Sparkles,
  ExternalLink,
  ChevronRight,
  HelpCircle,
  X
} from 'lucide-react';
import { findAccurateStateData, findZoomedStateData, StateDistrictMapData } from '../data/indiaAccurateMapData';
import { getConstituenciesByState, LokSabhaConstituency } from '../data/all543Constituencies';
import { getParliamentaryMacroStats } from '../data/stateParliamentaryStats';

interface StateMapProps {
  stateName: string;
  onSelectConstituency: (constituencyId: string) => void;
  selectedConstituencyId: string | null;
  onBackToIndia: () => void;
}

export const StateMap: React.FC<StateMapProps> = ({
  stateName,
  onSelectConstituency,
  selectedConstituencyId,
  onBackToIndia,
}) => {
  const [constituencySearch, setConstituencySearch] = useState('');
  const [hoveredConstituency, setHoveredConstituency] = useState<LokSabhaConstituency | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const stateData = useMemo(() => findAccurateStateData(stateName), [stateName]);
  const zoomedStateData = useMemo(() => findZoomedStateData(stateName), [stateName]);
  const constituencies = useMemo(() => getConstituenciesByState(stateName), [stateName]);
  const stateStats = useMemo(() => getParliamentaryMacroStats(stateName), [stateName]);

  const filteredConstituencies = useMemo(() => {
    if (!constituencySearch.trim()) return constituencies;
    const q = constituencySearch.toLowerCase();
    return constituencies.filter(
      c => c.constituency.toLowerCase().includes(q) ||
           c.mpName.toLowerCase().includes(q) ||
           c.party.toLowerCase().includes(q) ||
           c.partyAbbr.toLowerCase().includes(q)
    );
  }, [constituencies, constituencySearch]);

  const getDistrictConstituency = (district: StateDistrictMapData): LokSabhaConstituency | undefined => {
    const direct = constituencies.find(
      c => c.constituency.toLowerCase() === district.name.toLowerCase() ||
           (district.code && c.id === district.code)
    );
    if (direct) return direct;

    return constituencies.find(
      c => c.constituency.toLowerCase().includes(district.name.toLowerCase()) ||
           district.name.toLowerCase().includes(c.constituency.toLowerCase())
    );
  };

  return (
    <div className="space-y-4">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white border border-[#1a1a1a]/20">
        <div className="flex items-center gap-2">
          <button
            onClick={onBackToIndia}
            className="px-3 py-1.5 bg-[#1a1a1a] text-white hover:bg-[#c44d31] transition text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to India Map</span>
          </button>
          <div className="text-xs font-mono text-[#66625b]">
            <span>National Map</span>
            <span className="mx-1.5">/</span>
            <strong className="text-[#1a1a1a] font-serif font-black">{stateName}</strong>
          </div>
        </div>

        <div className="text-xs font-mono text-[#66625b] flex items-center gap-2">
          <span className="bg-[#f0ece1] px-2 py-0.5 font-bold text-[#1a1a1a] border border-[#1a1a1a]/10">
            {constituencies.length} Lok Sabha Constituencies
          </span>
          <span className="text-[10px] text-emerald-700 font-bold uppercase">
            18th Lok Sabha
          </span>
        </div>
      </div>

      {/* State Map Graphic Canvas & Constituency Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* State Interactive SVG Viewport */}
        <div className="lg:col-span-7 bg-[#fbf9f5] border border-[#1a1a1a]/20 p-4 relative flex flex-col justify-between min-h-[440px]">
          
          <div className="flex items-center justify-between pb-2 border-b border-[#1a1a1a]/10 mb-2">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#66625b] font-bold">
                State Geographic Boundary
              </span>
              <h3 className="font-serif font-black text-lg text-[#1a1a1a]">
                {stateName}
              </h3>
            </div>
            <div className="text-[11px] text-[#66625b] font-mono">
              Hover constituency for tooltip • Tap to view MP
            </div>
          </div>

          <div
            className="relative w-full aspect-[600/500] flex items-center justify-center overflow-hidden"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
            }}
          >
            {zoomedStateData?.districts && zoomedStateData.districts.length > 0 ? (
              <svg
                viewBox="0 0 600 500"
                className="w-full h-full filter drop-shadow-sm"
              >
                {zoomedStateData.districts.map((district, idx) => {
                  const matchedConstituency = getDistrictConstituency(district);
                  const isSelected = selectedConstituencyId === matchedConstituency?.id ||
                                     selectedConstituencyId === district.code;
                  const isHovered = hoveredConstituency?.id === matchedConstituency?.id;

                  const fillColor = matchedConstituency?.partyColor ||
                    (matchedConstituency?.alliance === 'NDA' ? '#f97316' :
                     matchedConstituency?.alliance === 'INDIA' ? '#0284c7' : '#22c55e');

                  return (
                    <g
                      key={district.code || district.name || idx}
                      onClick={() => {
                        if (matchedConstituency) {
                          onSelectConstituency(matchedConstituency.id);
                        } else if (district.code) {
                          onSelectConstituency(district.code);
                        }
                      }}
                      onMouseEnter={() => {
                        if (matchedConstituency) {
                          setHoveredConstituency(matchedConstituency);
                        }
                      }}
                      onMouseLeave={() => setHoveredConstituency(null)}
                      className="cursor-pointer transition-transform duration-100"
                    >
                      <path
                        d={district.path}
                        fill={isHovered ? '#1a1a1a' : fillColor}
                        stroke={isSelected ? '#1a1a1a' : '#ffffff'}
                        strokeWidth={isSelected ? '2.5' : '1'}
                        opacity={isHovered ? 0.95 : 0.85}
                        className="transition-colors duration-150"
                      />
                      {district.centroid && (
                        <text
                          x={district.centroid.x}
                          y={district.centroid.y}
                          textAnchor="middle"
                          dominantBaseline="central"
                          className="pointer-events-none text-[8px] font-mono font-bold fill-white"
                          style={{ textShadow: '0 0 2px rgba(0,0,0,0.8)' }}
                        >
                          {district.code || district.name.substring(0, 3).toUpperCase()}
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>
            ) : (
              // Fallback State Outline with Centered Vector
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                <svg viewBox="0 0 800 900" className="w-48 h-48 opacity-80 filter drop-shadow-md">
                  {stateData?.path && (
                    <path
                      d={stateData.path}
                      fill="#c44d31"
                      stroke="#1a1a1a"
                      strokeWidth="2"
                    />
                  )}
                </svg>
                <div className="mt-3 font-serif font-black text-sm text-[#1a1a1a]">
                  {stateName} Lok Sabha Representation
                </div>
                <div className="text-xs text-[#66625b] max-w-sm mt-1">
                  Select any constituency from the directory list on the right to inspect verified MP attendance, criminal records, and net assets.
                </div>
              </div>
            )}

            {/* Hover Tooltip for Constituency */}
            {hoveredConstituency && (
              <div
                className="absolute pointer-events-none z-40 bg-[#1a1a1a] text-white p-3 shadow-2xl border border-white/20 text-xs w-64 transform -translate-x-1/2 -translate-y-full -mt-2"
                style={{
                  left: `${Math.min(Math.max(tooltipPos.x, 130), 470)}px`,
                  top: `${Math.max(tooltipPos.y, 40)}px`,
                }}
              >
                <div className="border-b border-white/20 pb-1 mb-1.5 flex items-center justify-between">
                  <span className="font-serif font-black text-sm text-[#f2eee5]">
                    {hoveredConstituency.constituency}
                  </span>
                  <span className={`text-[9px] font-mono px-1 py-0.5 font-bold uppercase ${
                    hoveredConstituency.alliance === 'NDA' ? 'bg-[#f97316] text-white' :
                    hoveredConstituency.alliance === 'INDIA' ? 'bg-[#0284c7] text-white' :
                    'bg-zinc-600 text-white'
                  }`}>
                    {hoveredConstituency.alliance}
                  </span>
                </div>

                <div className="text-xs text-[#d6d3d1] mb-1">
                  MP: <strong className="text-white font-serif">{hoveredConstituency.mpName}</strong>
                </div>

                <div className="text-[11px] text-[#a8a29e]">
                  Party: <span className="text-[#fbbf24] font-bold">{hoveredConstituency.party}</span> ({hoveredConstituency.partyAbbr})
                </div>

                <div className="mt-2 pt-1 border-t border-white/15 flex items-center justify-between text-[10px] text-[#4ade80]">
                  <span>Attendance: {hoveredConstituency.attendancePercent}%</span>
                  <span>Assets: ₹{hoveredConstituency.estimatedNetWorthCr} Cr</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Legend Bar */}
          <div className="pt-2 border-t border-[#1a1a1a]/10 flex items-center justify-between text-[10px] text-[#66625b]">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="h-2.5 w-2.5 bg-[#f97316]"></span> NDA
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2.5 w-2.5 bg-[#0284c7]"></span> INDIA
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2.5 w-2.5 bg-[#22c55e]"></span> Regional / Others
              </span>
            </div>
            <span>Showing all {constituencies.length} seats</span>
          </div>

        </div>

        {/* Right Column: All Constituencies Interactive Directory */}
        <div className="lg:col-span-5 bg-white border border-[#1a1a1a]/20 p-4 flex flex-col justify-between max-h-[580px]">
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#66625b] font-bold">
                  Electoral Constituencies
                </span>
                <h4 className="font-serif font-black text-base text-[#1a1a1a]">
                  All {constituencies.length} Parliamentary Seats
                </h4>
              </div>
            </div>

            {/* Filter / Search Box */}
            <div className="relative mb-3">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#66625b]" />
              <input
                type="text"
                placeholder={`Search constituencies or MPs in ${stateName}...`}
                value={constituencySearch}
                onChange={(e) => setConstituencySearch(e.target.value)}
                className="w-full pl-8 pr-2.5 py-1.5 text-xs bg-[#fbf9f5] border border-[#1a1a1a]/20 focus:outline-hidden focus:border-[#1a1a1a]"
              />
              {constituencySearch && (
                <button
                  onClick={() => setConstituencySearch('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#66625b] hover:text-[#1a1a1a]"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* List of Constituencies */}
          <div className="flex-1 overflow-y-auto divide-y divide-[#1a1a1a]/10 pr-1 space-y-1">
            {filteredConstituencies.length === 0 ? (
              <div className="p-6 text-center text-xs text-[#66625b]">
                No constituencies match "{constituencySearch}"
              </div>
            ) : (
              filteredConstituencies.map((c) => {
                const isSelected = selectedConstituencyId === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => onSelectConstituency(c.id)}
                    className={`w-full text-left p-2.5 rounded-sm transition flex items-start justify-between group ${
                      isSelected
                        ? 'bg-[#1a1a1a] text-white'
                        : 'hover:bg-[#f2eee5] text-[#1a1a1a]'
                    }`}
                  >
                    <div className="flex-1 min-w-0 pr-2">
                      <div className="flex items-center gap-1.5">
                        <span className={`font-serif font-black text-sm truncate ${
                          isSelected ? 'text-white' : 'text-[#1a1a1a] group-hover:text-[#c44d31]'
                        }`}>
                          {c.constituency}
                        </span>
                        <span className={`text-[9px] font-mono px-1 py-0.2 font-bold uppercase ${
                          c.alliance === 'NDA' ? 'bg-[#f97316] text-white' :
                          c.alliance === 'INDIA' ? 'bg-[#0284c7] text-white' :
                          'bg-zinc-600 text-white'
                        }`}>
                          {c.partyAbbr}
                        </span>
                      </div>
                      <div className={`text-xs truncate mt-0.5 ${isSelected ? 'text-zinc-300' : 'text-[#66625b]'}`}>
                        MP: <strong className={isSelected ? 'text-white' : 'text-[#1a1a1a]'}>{c.mpName}</strong>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className={`text-[10px] font-mono font-bold ${
                        isSelected ? 'text-emerald-400' : 'text-emerald-700'
                      }`}>
                        {c.attendancePercent}% Att.
                      </div>
                      <div className={`text-[10px] ${isSelected ? 'text-zinc-300' : 'text-[#66625b]'}`}>
                        ₹{c.estimatedNetWorthCr} Cr
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          <div className="pt-2 border-t border-[#1a1a1a]/10 text-[10px] text-[#66625b] flex items-center justify-between">
            <span>Showing {filteredConstituencies.length} of {constituencies.length}</span>
            <span>Click any constituency to open MP dossier</span>
          </div>

        </div>

      </div>
    </div>
  );
};
