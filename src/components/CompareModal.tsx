import React, { useState, useEffect } from 'react';
import { X, Scale, Plus, Trash2, Wallet, Landmark, TrendingUp, ShieldAlert, ArrowRight, Sparkles, ShieldCheck, FileText } from 'lucide-react';
import { Politician } from '../types';
import { PoliticianImage } from './PoliticianImage';

export type ComparisonFocusArea = 'all' | 'parliamentary' | 'financial' | 'legal' | 'initiatives';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  compareList: Politician[];
  allPoliticians: Politician[];
  onRemoveFromCompare: (id: string) => void;
  onAddToCompare: (p: Politician) => void;
  onSelectPolitician: (p: Politician) => void;
  initialFocusArea?: ComparisonFocusArea;
  onInvestigateWithAgent?: (politicianIds: string[], promptObjective?: string) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  compareList,
  allPoliticians,
  onRemoveFromCompare,
  onAddToCompare,
  onSelectPolitician,
  initialFocusArea = 'all',
  onInvestigateWithAgent,
}) => {
  const [focusArea, setFocusArea] = useState<ComparisonFocusArea>(initialFocusArea);

  useEffect(() => {
    if (initialFocusArea) {
      setFocusArea(initialFocusArea);
    }
  }, [initialFocusArea, isOpen]);

  if (!isOpen) return null;

  const remainingPoliticians = allPoliticians.filter(
    (p) => !compareList.some((c) => c.id === p.id)
  );

  const isFocus = (area: ComparisonFocusArea) => focusArea === 'all' || focusArea === area;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Main Container */}
      <div 
        id="compare-modal-content"
        className="relative z-10 w-full max-w-6xl max-h-[94vh] sm:max-h-[92vh] flex flex-col rounded-sm border border-[#18181b]/30 bg-[#faf9f6] shadow-2xl overflow-hidden text-[#18181b]"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#18181b]/15 bg-[#f1ede4] px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xs bg-white text-[#18181b] border border-[#18181b]/20 shadow-2xs flex-shrink-0">
              <Scale className="h-4 w-4 sm:h-5 sm:w-5 text-[#c44d31]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-serif font-black text-[#18181b] tracking-tight">
                  Leader Accountability Matrix
                </h2>
                {focusArea !== 'all' && (
                  <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#c44d31]/10 text-[#c44d31] border border-[#c44d31]/30 uppercase font-bold">
                    Focus: {focusArea}
                  </span>
                )}
              </div>
              <p className="text-[11px] sm:text-xs text-[#52525b] line-clamp-1">
                Comparative audit of {compareList.length} leaders across wealth, attendance, and fund delivery
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onInvestigateWithAgent && compareList.length >= 2 && (
              <button
                onClick={() => {
                  onInvestigateWithAgent(
                    compareList.map((p) => p.id),
                    `Compare ${compareList.map((p) => p.name).join(', ')} based on ${focusArea}`
                  );
                }}
                className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 bg-[#18181b] text-white hover:bg-[#c44d31] rounded-xs text-[11px] font-mono font-bold uppercase transition"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Agent Audit</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="border border-[#18181b]/20 bg-white p-1.5 sm:p-2 text-[#18181b] hover:bg-[#c44d31] hover:text-white transition touch-manipulation min-h-[36px] min-w-[36px] flex items-center justify-center rounded-xs"
              aria-label="Close Comparison"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Focus Area Dimension Selector */}
        {compareList.length > 0 && (
          <div className="flex items-center gap-1.5 px-4 py-2 border-b border-[#18181b]/10 bg-[#faf9f6] overflow-x-auto text-[11px] font-mono">
            <span className="text-[#52525b] text-[10px] uppercase font-bold mr-1 flex-shrink-0">Focus Area:</span>
            {(['all', 'parliamentary', 'financial', 'legal', 'initiatives'] as ComparisonFocusArea[]).map((area) => (
              <button
                key={area}
                onClick={() => setFocusArea(area)}
                className={`px-2.5 py-1 rounded-xs border font-medium uppercase tracking-wider transition-colors flex-shrink-0 ${
                  focusArea === area
                    ? 'bg-[#18181b] text-white border-[#18181b] font-bold shadow-2xs'
                    : 'bg-white text-[#52525b] border-[#18181b]/20 hover:border-[#18181b] hover:text-[#18181b]'
                }`}
              >
                {area === 'all' ? 'All Dimensions' : area}
              </button>
            ))}
          </div>
        )}

        {/* Content Scrollable */}
        <div className="flex-1 overflow-x-auto overflow-y-auto p-3 sm:p-6 bg-[#faf9f6] touch-pan-scroll">
          {compareList.length === 0 ? (
            <div className="py-12 sm:py-16 text-center space-y-3 sm:space-y-4 px-4">
              <Scale className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-[#8a8479]" />
              <h3 className="text-base font-serif font-bold text-[#18181b]">No Leaders Selected for Comparison</h3>
              <p className="text-xs text-[#52525b] max-w-md mx-auto leading-relaxed">
                Select 2 or more politicians from the dashboard or choose from the list below to compare their asset declarations, legislative activity, and track records.
              </p>
              <div className="pt-2 flex flex-wrap justify-center gap-2">
                {allPoliticians.slice(0, 4).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => onAddToCompare(p)}
                    className="flex items-center gap-1.5 border border-[#18181b]/30 bg-white px-3 sm:px-3.5 py-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#18181b] hover:bg-[#18181b] hover:text-white transition touch-manipulation shadow-2xs"
                  >
                    <Plus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    <span>Add {p.name}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="w-full space-y-4 sm:space-y-6">
              
              {/* Header Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {compareList.map((p) => (
                  <div
                    key={p.id}
                    className="relative flex flex-col justify-between border border-[#18181b]/15 bg-white p-3 sm:p-4 shadow-2xs rounded-xs"
                  >
                    {/* Remove button */}
                    <button
                      onClick={() => onRemoveFromCompare(p.id)}
                      className="absolute right-2 top-2 bg-[#f1ede4] p-1.5 text-[#52525b] hover:bg-[#c44d31] hover:text-white transition touch-manipulation rounded-xs"
                      title="Remove from comparison"
                      aria-label="Remove"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>

                    <div className="flex items-start gap-2.5 sm:gap-3">
                      <div className="h-12 w-12 sm:h-14 sm:w-14 overflow-hidden border border-[#18181b]/20 bg-[#f1ede4] flex-shrink-0 rounded-xs">
                        <PoliticianImage
                          src={p.photo}
                          alt={p.name}
                          partyColor={p.partyColor}
                          name={p.name}
                          constituency={p.constituency}
                          state={p.state}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0 pr-4 sm:pr-5">
                        <span
                          className="px-1.5 py-0.5 text-[8px] sm:text-[9px] font-bold uppercase tracking-wider border"
                          style={{ backgroundColor: `${p.partyColor}15`, color: p.partyColor, borderColor: `${p.partyColor}40` }}
                        >
                          {p.partyAbbr}
                        </span>
                        <h4 className="mt-1 font-serif text-xs sm:text-sm font-bold text-[#18181b] truncate">{p.name}</h4>
                        <p className="text-[10px] sm:text-[11px] text-[#52525b] truncate">{p.currentRole}</p>
                      </div>
                    </div>

                    <div className="mt-2.5 sm:mt-3 flex items-center justify-between border-t border-[#18181b]/10 pt-2 text-xs">
                      <span className="text-[#52525b] text-[10px] sm:text-[11px] font-medium truncate">{p.constituency}</span>
                      <button
                        onClick={() => {
                          onClose();
                          onSelectPolitician(p);
                        }}
                        className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#c44d31] hover:underline flex items-center gap-0.5 flex-shrink-0 ml-2"
                      >
                        Inspect <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Add slot if < 4 */}
                {compareList.length < 4 && remainingPoliticians.length > 0 && (
                  <div className="flex flex-col items-center justify-center border border-dashed border-[#18181b]/25 bg-white/60 p-4 sm:p-6 text-center rounded-xs">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#52525b] mb-2">Add Leader</p>
                    <select
                      onChange={(e) => {
                        const pol = remainingPoliticians.find((p) => p.id === e.target.value);
                        if (pol) onAddToCompare(pol);
                      }}
                      defaultValue=""
                      className="w-full border border-[#18181b]/30 bg-[#faf9f6] px-2.5 py-1.5 text-xs font-medium text-[#18181b] focus:outline-none"
                    >
                      <option value="" disabled>Select Leader...</option>
                      {remainingPoliticians.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} ({p.partyAbbr})
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Comparison Metric Rows Table */}
              <div className="border border-[#18181b]/15 bg-white overflow-x-auto text-xs shadow-xs rounded-xs touch-pan-scroll">
                <div style={{ minWidth: `${Math.max(480, (compareList.length + 1) * 140)}px` }}>
                  
                  {/* Section 1: Demographics */}
                  <div className="bg-[#f1ede4] px-3.5 py-2 font-bold uppercase tracking-widest text-[#18181b] border-b border-[#18181b]/15 text-[10px] sm:text-[11px]">
                    Profile & Demographics
                  </div>

                  <div className="divide-y divide-[#18181b]/10">
                    
                    <div 
                      className="grid p-2.5 sm:p-3 items-center gap-2"
                      style={{ gridTemplateColumns: `140px repeat(${compareList.length}, minmax(130px, 1fr))` }}
                    >
                      <span className="font-bold text-[#52525b] uppercase tracking-wider text-[9px] sm:text-[10px]">Coalition</span>
                      {compareList.map((p) => (
                        <span key={p.id} className="font-bold text-[#18181b]">{p.alliance}</span>
                      ))}
                    </div>

                    <div 
                      className="grid p-2.5 sm:p-3 items-center gap-2"
                      style={{ gridTemplateColumns: `140px repeat(${compareList.length}, minmax(130px, 1fr))` }}
                    >
                      <span className="font-bold text-[#52525b] uppercase tracking-wider text-[9px] sm:text-[10px]">Age</span>
                      {compareList.map((p) => (
                        <span key={p.id} className="font-medium text-[#18181b]">{p.age} years</span>
                      ))}
                    </div>

                    <div 
                      className="grid p-2.5 sm:p-3 items-center gap-2"
                      style={{ gridTemplateColumns: `140px repeat(${compareList.length}, minmax(130px, 1fr))` }}
                    >
                      <span className="font-bold text-[#52525b] uppercase tracking-wider text-[9px] sm:text-[10px]">Education</span>
                      {compareList.map((p) => (
                        <span key={p.id} className="text-[#2c2925] truncate pr-2" title={p.education}>{p.education.split(',')[0]}</span>
                      ))}
                    </div>

                    <div 
                      className="grid p-2.5 sm:p-3 items-center gap-2"
                      style={{ gridTemplateColumns: `140px repeat(${compareList.length}, minmax(130px, 1fr))` }}
                    >
                      <span className="font-bold text-[#52525b] uppercase tracking-wider text-[9px] sm:text-[10px]">House</span>
                      {compareList.map((p) => (
                        <span key={p.id} className="text-[#2c2925]">{p.house}</span>
                      ))}
                    </div>
                  </div>

                  {/* Section 2: Wealth & Assets */}
                  {isFocus('financial') && (
                    <>
                      <div className="bg-[#f1ede4] px-3.5 py-2 font-bold uppercase tracking-widest text-[#c44d31] border-t border-b border-[#18181b]/15 flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px]">
                        <Wallet className="h-3.5 w-3.5 flex-shrink-0" />
                        Financials & Disclosed Wealth (ECI Form 26)
                      </div>

                      <div className="divide-y divide-[#18181b]/10">
                        <div 
                          className="grid p-2.5 sm:p-3 items-center gap-2"
                          style={{ gridTemplateColumns: `140px repeat(${compareList.length}, minmax(130px, 1fr))` }}
                        >
                          <span className="font-bold text-[#52525b] uppercase tracking-wider text-[9px] sm:text-[10px]">Total Net Worth</span>
                          {compareList.map((p) => (
                            <span key={p.id} className="font-serif font-black text-[#18181b] text-xs sm:text-sm">
                              ₹{p.assets.totalCr.toFixed(1)} Cr
                            </span>
                          ))}
                        </div>

                        <div 
                          className="grid p-2.5 sm:p-3 items-center gap-2"
                          style={{ gridTemplateColumns: `140px repeat(${compareList.length}, minmax(130px, 1fr))` }}
                        >
                          <span className="font-bold text-[#52525b] uppercase tracking-wider text-[9px] sm:text-[10px]">Movable Assets</span>
                          {compareList.map((p) => (
                            <span key={p.id} className="text-[#2c2925]">
                              ₹{p.assets.movableCr.toFixed(1)} Cr
                            </span>
                          ))}
                        </div>

                        <div 
                          className="grid p-2.5 sm:p-3 items-center gap-2"
                          style={{ gridTemplateColumns: `140px repeat(${compareList.length}, minmax(130px, 1fr))` }}
                        >
                          <span className="font-bold text-[#52525b] uppercase tracking-wider text-[9px] sm:text-[10px]">Immovable Assets</span>
                          {compareList.map((p) => (
                            <span key={p.id} className="text-[#2c2925]">
                              ₹{p.assets.immovableCr.toFixed(1)} Cr
                            </span>
                          ))}
                        </div>

                        <div 
                          className="grid p-2.5 sm:p-3 items-center gap-2"
                          style={{ gridTemplateColumns: `140px repeat(${compareList.length}, minmax(130px, 1fr))` }}
                        >
                          <span className="font-bold text-[#52525b] uppercase tracking-wider text-[9px] sm:text-[10px]">Liabilities</span>
                          {compareList.map((p) => (
                            <span key={p.id} className="text-[#2c2925]">
                              {p.assets.liabilitiesCr > 0 ? `₹${p.assets.liabilitiesCr} Cr` : 'Nil'}
                            </span>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Section 3: Parliamentary Performance */}
                  {isFocus('parliamentary') && (
                    <>
                      <div className="bg-[#f1ede4] px-3.5 py-2 font-bold uppercase tracking-widest text-[#18181b] border-t border-b border-[#18181b]/15 flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px]">
                        <Landmark className="h-3.5 w-3.5 text-[#c44d31] flex-shrink-0" />
                        Parliamentary Performance
                      </div>

                      <div className="divide-y divide-[#18181b]/10">
                        <div 
                          className="grid p-2.5 sm:p-3 items-center gap-2"
                          style={{ gridTemplateColumns: `140px repeat(${compareList.length}, minmax(130px, 1fr))` }}
                        >
                          <span className="font-bold text-[#52525b] uppercase tracking-wider text-[9px] sm:text-[10px]">House Attendance</span>
                          {compareList.map((p) => (
                            <div key={p.id}>
                              <span className={`font-serif font-black text-xs sm:text-sm ${
                                p.parliamentaryRecord.attendancePercent >= 85 ? 'text-[#1b6b47]' : 'text-[#18181b]'
                              }`}>
                                {p.parliamentaryRecord.attendancePercent}%
                              </span>
                              <span className="text-[9px] text-[#52525b] block">vs 79% Nat'l</span>
                            </div>
                          ))}
                        </div>

                        <div 
                          className="grid p-2.5 sm:p-3 items-center gap-2"
                          style={{ gridTemplateColumns: `140px repeat(${compareList.length}, minmax(130px, 1fr))` }}
                        >
                          <span className="font-bold text-[#52525b] uppercase tracking-wider text-[9px] sm:text-[10px]">Debates</span>
                          {compareList.map((p) => (
                            <span key={p.id} className="font-serif font-bold text-[#18181b]">
                              {p.parliamentaryRecord.debatesCount}
                            </span>
                          ))}
                        </div>

                        <div 
                          className="grid p-2.5 sm:p-3 items-center gap-2"
                          style={{ gridTemplateColumns: `140px repeat(${compareList.length}, minmax(130px, 1fr))` }}
                        >
                          <span className="font-bold text-[#52525b] uppercase tracking-wider text-[9px] sm:text-[10px]">Questions</span>
                          {compareList.map((p) => (
                            <span key={p.id} className="text-[#2c2925]">
                              {p.parliamentaryRecord.questionsAsked}
                            </span>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Section 4: MPLADS / Fund Utilization */}
                  {isFocus('initiatives') && (
                    <>
                      <div className="bg-[#f1ede4] px-3.5 py-2 font-bold uppercase tracking-widest text-[#1b6b47] border-t border-b border-[#18181b]/15 flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px]">
                        <TrendingUp className="h-3.5 w-3.5 flex-shrink-0" />
                        MPLADS / Constituency Development
                      </div>

                      <div className="divide-y divide-[#18181b]/10">
                        <div 
                          className="grid p-2.5 sm:p-3 items-center gap-2"
                          style={{ gridTemplateColumns: `140px repeat(${compareList.length}, minmax(130px, 1fr))` }}
                        >
                          <span className="font-bold text-[#52525b] uppercase tracking-wider text-[9px] sm:text-[10px]">Utilization %</span>
                          {compareList.map((p) => (
                            <span key={p.id} className="font-serif font-black text-[#1b6b47] text-xs sm:text-sm">
                              {p.mplads.utilizationPercent}%
                            </span>
                          ))}
                        </div>

                        <div 
                          className="grid p-2.5 sm:p-3 items-center gap-2"
                          style={{ gridTemplateColumns: `140px repeat(${compareList.length}, minmax(130px, 1fr))` }}
                        >
                          <span className="font-bold text-[#52525b] uppercase tracking-wider text-[9px] sm:text-[10px]">Completed Works</span>
                          {compareList.map((p) => (
                            <span key={p.id} className="font-medium text-[#18181b]">
                              {p.mplads.completedProjects} Projects
                            </span>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Section 5: Legal Disclosures */}
                  {isFocus('legal') && (
                    <>
                      <div className="bg-[#f1ede4] px-3.5 py-2 font-bold uppercase tracking-widest text-[#c44d31] border-t border-b border-[#18181b]/15 flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px]">
                        <ShieldAlert className="h-3.5 w-3.5 flex-shrink-0" />
                        Criminal Affidavits & Transparency
                      </div>

                      <div className="divide-y divide-[#18181b]/10">
                        <div 
                          className="grid p-2.5 sm:p-3 items-center gap-2"
                          style={{ gridTemplateColumns: `140px repeat(${compareList.length}, minmax(130px, 1fr))` }}
                        >
                          <span className="font-bold text-[#52525b] uppercase tracking-wider text-[9px] sm:text-[10px]">Pending Cases</span>
                          {compareList.map((p) => (
                            <span
                              key={p.id}
                              className={`font-serif font-bold ${
                                p.criminalRecords.totalCases === 0 ? 'text-[#1b6b47]' : 'text-[#c44d31]'
                              }`}
                            >
                              {p.criminalRecords.totalCases === 0 ? '0 (Clean)' : `${p.criminalRecords.totalCases} Declared`}
                            </span>
                          ))}
                        </div>

                        <div 
                          className="grid p-2.5 sm:p-3 items-center gap-2"
                          style={{ gridTemplateColumns: `140px repeat(${compareList.length}, minmax(130px, 1fr))` }}
                        >
                          <span className="font-bold text-[#52525b] uppercase tracking-wider text-[9px] sm:text-[10px]">Serious IPC Charges</span>
                          {compareList.map((p) => (
                            <span key={p.id} className="text-[#2c2925]">
                              {p.criminalRecords.seriousCases}
                            </span>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                </div>
              </div>

            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-[#18181b]/15 bg-[#f1ede4] px-4 py-3 sm:px-6 sm:py-3.5 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs">
          <div className="flex items-center gap-3 text-[#52525b] text-[10px] sm:text-xs text-center sm:text-left">
            <span>Source: ECI Form 26 & Lok Sabha/Rajya Sabha Secretariats</span>
            {onInvestigateWithAgent && compareList.length >= 2 && (
              <button
                onClick={() => {
                  onInvestigateWithAgent(
                    compareList.map((p) => p.id),
                    `Challenge this comparison between ${compareList.map((p) => p.name).join(', ')} and show verifiable evidence`
                  );
                }}
                className="hidden sm:inline-flex items-center gap-1 text-[#c44d31] hover:underline font-mono font-bold"
              >
                <ShieldCheck className="w-3 h-3" />
                Challenge this analysis &amp; inspect evidence
              </button>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-full sm:w-auto border border-[#18181b] bg-[#18181b] px-5 py-2 font-bold uppercase tracking-wider text-xs text-white hover:bg-[#c44d31] hover:border-[#c44d31] transition touch-manipulation min-h-[36px] shadow-2xs"
          >
            Done Comparing
          </button>
        </div>
      </div>
    </div>
  );
};
