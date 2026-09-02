import React, { useState } from 'react';
import { ACCURATE_INDIA_STATES_DATA, AccurateStateMapData } from '../data/indiaAccurateMapData';
import { getParliamentaryMacroStats } from '../data/stateParliamentaryStats';
import { MapOverlayMode } from './InteractiveMapPage';
import { getConstituenciesByState } from '../data/all543Constituencies';
import { MapPin, Users, TrendingUp, CheckCircle, ArrowRight, Shield } from 'lucide-react';

interface IndiaMapProps {
  onSelectState: (stateName: string) => void;
  overlayMode: MapOverlayMode;
  selectedStateName: string;
  onHoverState?: (stateName: string | null) => void;
}

export const IndiaMap: React.FC<IndiaMapProps> = ({
  onSelectState,
  overlayMode,
  selectedStateName,
  onHoverState,
}) => {
  const [hoveredState, setHoveredState] = useState<AccurateStateMapData | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const getStateFill = (state: AccurateStateMapData, isHovered: boolean, isSelected: boolean) => {
    const stats = getParliamentaryMacroStats(state.name);

    if (overlayMode === 'coalition') {
      if (!stats) return isSelected ? '#1a1a1a' : isHovered ? '#fb923c' : '#f97316';
      if (stats.ndaSeats > stats.indiaSeats && stats.ndaSeats > stats.otherSeats) {
        return isSelected ? '#c2410c' : isHovered ? '#fb923c' : '#f97316';
      }
      if (stats.indiaSeats > stats.ndaSeats && stats.indiaSeats > stats.otherSeats) {
        return isSelected ? '#0369a1' : isHovered ? '#38bdf8' : '#0ea5e9';
      }
      if (stats.otherSeats > stats.ndaSeats && stats.otherSeats > stats.indiaSeats) {
        return isSelected ? '#15803d' : isHovered ? '#4ade80' : '#22c55e';
      }
      return isSelected ? '#374151' : isHovered ? '#9ca3af' : '#6b7280';
    }

    if (overlayMode === 'mplads') {
      const util = stats?.mpladsUtilizationPercent || 75;
      if (util >= 88) return isSelected ? '#14532d' : isHovered ? '#22c55e' : '#16a34a';
      if (util >= 78) return isSelected ? '#92400e' : isHovered ? '#f59e0b' : '#d97706';
      return isSelected ? '#7f1d1d' : isHovered ? '#ef4444' : '#dc2626';
    }

    if (overlayMode === 'attendance') {
      const att = stats?.avgAttendancePercent || 78;
      if (att >= 85) return isSelected ? '#115e59' : isHovered ? '#14b8a6' : '#0d9488';
      if (att >= 75) return isSelected ? '#075985' : isHovered ? '#0284c7' : '#38bdf8';
      return isSelected ? '#3730a3' : isHovered ? '#6366f1' : '#818cf8';
    }

    if (overlayMode === 'affidavits') {
      const clean = stats?.cleanRecordsPercent || 50;
      if (clean >= 65) return isSelected ? '#14532d' : isHovered ? '#22c55e' : '#16a34a';
      if (clean >= 45) return isSelected ? '#92400e' : isHovered ? '#f59e0b' : '#d97706';
      return isSelected ? '#7f1d1d' : isHovered ? '#f87171' : '#ef4444';
    }

    return isSelected ? '#c44d31' : isHovered ? '#d87056' : '#e6e1d6';
  };

  const hoveredStats = hoveredState ? getParliamentaryMacroStats(hoveredState.name) : null;
  const hoveredConstituencies = hoveredState ? getConstituenciesByState(hoveredState.name) : [];
  const totalConstituencies = hoveredConstituencies.length || hoveredStats?.totalSeats || 0;
  const sampleConstituencies = hoveredConstituencies.slice(0, 4).map(c => c.constituency);

  return (
    <div
      className="relative w-full aspect-[800/900] bg-[#fbf9f5] flex items-center justify-center overflow-hidden select-none"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onMouseLeave={() => {
        setHoveredState(null);
        if (onHoverState) onHoverState(null);
      }}
    >
      <svg
        viewBox="0 0 800 900"
        className="w-full h-full filter drop-shadow-sm cursor-pointer"
        style={{ touchAction: 'manipulation' }}
      >
        <defs>
          <filter id="hoverGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Render all 36 States & UTs */}
        {ACCURATE_INDIA_STATES_DATA.map((state) => {
          const isSelected =
            selectedStateName.toLowerCase() === state.name.toLowerCase() ||
            selectedStateName.toLowerCase() === state.rawName.toLowerCase();
          const isHovered = hoveredState?.id === state.id;
          const fillColor = getStateFill(state, isHovered, isSelected);

          return (
            <g
              key={state.id}
              onClick={() => onSelectState(state.name)}
              onMouseEnter={() => {
                setHoveredState(state);
                if (onHoverState) onHoverState(state.name);
              }}
              onMouseLeave={() => {
                if (hoveredState?.id === state.id) {
                  setHoveredState(null);
                  if (onHoverState) onHoverState(null);
                }
              }}
              className="transition-all duration-150"
              filter={isHovered || isSelected ? 'url(#hoverGlow)' : undefined}
            >
              <path
                d={state.path}
                fill={fillColor}
                stroke={isSelected ? '#1a1a1a' : isHovered ? '#ffffff' : '#524e47'}
                strokeWidth={isSelected ? '3' : isHovered ? '2.5' : '0.8'}
                strokeLinejoin="round"
                className="transition-colors duration-150 cursor-pointer"
              />

              {/* State short abbreviation badge */}
              {state.centroid && state.shortCode && (
                <text
                  x={state.centroid.x}
                  y={state.centroid.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className={`pointer-events-none text-[9px] font-mono font-black ${
                    isSelected ? 'fill-white' : isHovered ? 'fill-white' : 'fill-[#1a1a1a]'
                  }`}
                  style={{ 
                    textShadow: isHovered || isSelected 
                      ? '0 0 3px rgba(0,0,0,0.9)' 
                      : '0 0 2px rgba(255,255,255,0.9)' 
                  }}
                >
                  {state.shortCode}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Enhanced Floating State Hover Tooltip */}
      {hoveredState && (
        <div
          className="absolute pointer-events-none z-50 bg-[#1a1a1a] text-white p-3.5 shadow-2xl border-2 border-white/30 text-xs w-72 rounded-xs transform -translate-x-1/2 -translate-y-full -mt-4 transition-all duration-75"
          style={{
            left: `${Math.min(Math.max(tooltipPos.x, 145), 655)}px`,
            top: `${Math.max(tooltipPos.y, 10)}px`,
          }}
        >
          {/* Header */}
          <div className="border-b border-white/20 pb-2 mb-2 flex items-center justify-between">
            <div>
              <div className="font-serif font-black text-base text-[#f2eee5] leading-tight">
                {hoveredState.name}
              </div>
              <div className="text-[10px] font-mono text-[#a8a29e] mt-0.5">
                {hoveredState.region} Region • {hoveredState.shortCode}
              </div>
            </div>
            <span className="text-[10px] font-mono bg-[#c44d31] text-white px-2 py-0.5 font-black uppercase tracking-wider">
              {totalConstituencies} {totalConstituencies === 1 ? 'Seat' : 'Seats'}
            </span>
          </div>

          {/* Prominent Constituency Count Highlight */}
          <div className="bg-white/10 p-2 border border-white/15 mb-2 rounded-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#38bdf8] font-bold flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>Constituencies Available:</span>
              </span>
              <span className="font-mono font-black text-sm text-white bg-[#0284c7]/40 px-1.5 py-0.2 rounded-xs">
                {totalConstituencies} of 543
              </span>
            </div>

            {/* Sample Constituencies Pill Preview */}
            {sampleConstituencies.length > 0 && (
              <div className="text-[10px] text-[#d6d3d1] mt-1.5 font-mono line-clamp-1">
                <span className="text-[#a8a29e]">Key seats: </span>
                {sampleConstituencies.join(', ')}
                {totalConstituencies > 4 ? ` +${totalConstituencies - 4} more` : ''}
              </div>
            )}
          </div>

          {/* Breakdown & Macro Stats */}
          <div className="space-y-1.5 text-[11px]">
            {hoveredStats && (
              <>
                <div className="flex justify-between items-center bg-black/30 px-2 py-1 border border-white/5">
                  <span className="text-[#a8a29e]">Seat Distribution:</span>
                  <span className="font-mono font-bold text-[10px]">
                    <span className="text-[#fb923c] font-black">{hoveredStats.ndaSeats} NDA</span>
                    <span className="text-white/40 mx-1">|</span>
                    <span className="text-[#38bdf8] font-black">{hoveredStats.indiaSeats} INDIA</span>
                    {hoveredStats.otherSeats > 0 && (
                      <>
                        <span className="text-white/40 mx-1">|</span>
                        <span className="text-[#4ade80] font-black">{hoveredStats.otherSeats} Oth</span>
                      </>
                    )}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-1.5 pt-0.5">
                  <div className="bg-white/5 px-2 py-1">
                    <span className="text-[10px] text-[#a8a29e] block">Avg Attendance</span>
                    <span className="font-mono font-bold text-[#4ade80] text-xs">
                      {hoveredStats.avgAttendancePercent}%
                    </span>
                  </div>
                  <div className="bg-white/5 px-2 py-1">
                    <span className="text-[10px] text-[#a8a29e] block">MPLADS Util.</span>
                    <span className="font-mono font-bold text-[#38bdf8] text-xs">
                      {hoveredStats.mpladsUtilizationPercent}%
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Action Prompt */}
          <div className="mt-2.5 pt-1.5 border-t border-white/15 text-[10px] text-[#fbbf24] font-mono uppercase font-bold flex items-center justify-between">
            <span>Click to explore {totalConstituencies} seats</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </div>
        </div>
      )}
    </div>
  );
};

