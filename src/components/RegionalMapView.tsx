import React, { useState } from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import { Politician } from '../types';
import { PoliticianImage } from './PoliticianImage';

interface RegionalMapViewProps {
  politicians: Politician[];
  onSelect: (p: Politician) => void;
}

export const RegionalMapView: React.FC<RegionalMapViewProps> = ({ politicians, onSelect }) => {
  const [selectedState, setSelectedState] = useState<string>('All');

  // Group politicians by state
  const statesMap: { [key: string]: Politician[] } = {};
  politicians.forEach((p) => {
    const st = p.state.includes('/') ? p.state.split('/')[0].trim() : p.state;
    if (!statesMap[st]) statesMap[st] = [];
    statesMap[st].push(p);
  });

  const stateNames = Object.keys(statesMap);

  const displayedStates = selectedState === 'All' 
    ? stateNames 
    : stateNames.filter((s) => s === selectedState);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="border border-[#1a1a1a]/20 bg-white p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-none bg-[#f2eee5] border border-[#1a1a1a]/20 text-[#c44d31]">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-serif text-[#1a1a1a] tracking-tight">
                Regional & State Representation Directory
              </h2>
              <p className="text-xs text-[#66625b]">
                Explore leader representation, constituency initiatives, and regional development clusters across India
              </p>
            </div>
          </div>

          {/* State Filter Buttons */}
          <div className="flex flex-wrap gap-1.5 text-xs">
            <button
              onClick={() => setSelectedState('All')}
              className={`rounded-none border px-3 py-1 text-xs font-bold uppercase tracking-wider transition ${
                selectedState === 'All'
                  ? 'border-[#1a1a1a] bg-[#1a1a1a] text-white shadow-sm'
                  : 'border-[#1a1a1a]/25 bg-white text-[#1a1a1a] hover:bg-[#f2eee5]'
              }`}
            >
              All States ({stateNames.length})
            </button>
            {stateNames.map((st) => (
              <button
                key={st}
                onClick={() => setSelectedState(st)}
                className={`rounded-none border px-3 py-1 text-xs font-bold uppercase tracking-wider transition ${
                  selectedState === st
                    ? 'border-[#1a1a1a] bg-[#1a1a1a] text-white shadow-sm'
                    : 'border-[#1a1a1a]/25 bg-white text-[#1a1a1a] hover:bg-[#f2eee5]'
                }`}
              >
                {st} ({statesMap[st].length})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* State Clusters Grid */}
      <div className="space-y-6">
        {displayedStates.map((st) => {
          const leaders = statesMap[st];
          const totalStateMplads = leaders.reduce((acc, l) => acc + l.mplads.spentCr, 0);

          return (
            <div
              key={st}
              className="border border-[#1a1a1a]/20 bg-white p-5 sm:p-6 shadow-sm space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#1a1a1a]/15 pb-3 gap-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-none bg-[#1a1a1a] text-white font-serif font-bold text-xs">
                    {st.slice(0, 2).toUpperCase()}
                  </span>
                  <h3 className="text-lg font-bold font-serif text-[#1a1a1a] tracking-tight">
                    {st} Hub
                  </h3>
                  <span className="border border-[#1a1a1a]/20 bg-[#f2eee5] px-2 py-0.5 text-[10px] font-bold uppercase text-[#66625b]">
                    {leaders.length} {leaders.length === 1 ? 'Leader' : 'Leaders'}
                  </span>
                </div>

                <div className="text-xs text-[#66625b]">
                  Tracked Spend: <strong className="font-bold text-[#2d6a4f]">₹{totalStateMplads.toFixed(1)} Cr</strong>
                </div>
              </div>

              {/* Leaders Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {leaders.map((leader) => (
                  <div
                    key={leader.id}
                    onClick={() => onSelect(leader)}
                    className="group flex flex-col justify-between border border-[#1a1a1a]/15 bg-[#fbf9f4] p-4 hover:border-[#1a1a1a] hover:bg-white cursor-pointer transition shadow-xs"
                  >
                    <div>
                      <div className="flex items-start gap-3">
                        <div className="h-12 w-12 overflow-hidden border border-[#1a1a1a]/20 bg-[#f2eee5] flex-shrink-0">
                          <PoliticianImage
                            src={leader.photo}
                            alt={leader.name}
                            partyColor={leader.partyColor}
                            name={leader.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <span
                              className="px-1.5 py-0.2 text-[9px] font-bold uppercase tracking-wider border"
                              style={{ backgroundColor: `${leader.partyColor}15`, color: leader.partyColor, borderColor: `${leader.partyColor}40` }}
                            >
                              {leader.partyAbbr}
                            </span>
                            <span className="text-[10px] uppercase text-[#66625b]">{leader.house}</span>
                          </div>
                          <h4 className="mt-1 text-sm font-bold font-serif text-[#1a1a1a] group-hover:text-[#c44d31] transition-colors truncate">
                            {leader.name}
                          </h4>
                          <p className="text-[11px] text-[#66625b] truncate">{leader.currentRole}</p>
                        </div>
                      </div>

                      <div className="mt-3 bg-[#f2eee5] px-2.5 py-1.5 border border-[#1a1a1a]/10 text-[11px] text-[#1a1a1a]">
                        <span className="text-[#8a8479]">Constituency: </span>
                        <strong className="text-[#1a1a1a]">{leader.constituency}</strong>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-[#1a1a1a]/10 pt-2 text-xs">
                      <span className="text-[11px] text-[#66625b]">
                        Attendance: <strong className="text-[#2d6a4f]">{leader.parliamentaryRecord.attendancePercent}%</strong>
                      </span>
                      <span className="text-[#c44d31] font-bold uppercase text-[10px] flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                        Inspect <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
