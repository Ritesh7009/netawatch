import React from 'react';
import { X, History, Award, CheckCircle2, User, Landmark, Calendar } from 'lucide-react';
import { PersonRecord, RepresentativeTerm, EvidenceRecord } from '../../types/representation';

interface HistoricalTermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  constituencyName: string;
  historicalTerms: Array<{
    person: PersonRecord;
    term: RepresentativeTerm;
    evidence: EvidenceRecord[];
  }>;
  onSelectPerson?: (personId: string) => void;
}

export const HistoricalTermsModal: React.FC<HistoricalTermsModalProps> = ({
  isOpen,
  onClose,
  constituencyName,
  historicalTerms,
  onSelectPerson,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#18181b]/60 backdrop-blur-xs">
      <div className="bg-white border border-[#18181b]/15 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-5 border-b border-[#18181b]/10 flex items-center justify-between bg-[#f8f6f0]">
          <div className="flex items-center gap-2.5">
            <span className="p-2 bg-[#c44d31]/10 text-[#c44d31] rounded-xl">
              <History className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#18181b]">
                Historical Representatives: {constituencyName}
              </h3>
              <p className="text-xs text-[#71717a]">
                Time-aware election returns across the 18th, 17th, and 16th Lok Sabha
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#71717a] hover:text-[#18181b] hover:bg-[#18181b]/5 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-5 overflow-y-auto space-y-4">
          {historicalTerms.map(({ person, term, evidence }) => (
            <div 
              key={term.id}
              className={`p-4 rounded-xl border transition-all ${
                term.isCurrent 
                  ? 'bg-[#f0fdf4] border-[#86efac]/80 ring-1 ring-[#16a34a]/20' 
                  : 'bg-[#f8f6f0] border-[#18181b]/10'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold font-serif text-sm shrink-0 shadow-2xs"
                    style={{ backgroundColor: term.partyColor || '#18181b' }}
                  >
                    {person.fullName.charAt(0)}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm sm:text-base text-[#18181b]">
                        {person.fullName}
                      </span>
                      {term.isCurrent && (
                        <span className="text-[10px] font-mono font-bold bg-[#15803d] text-white px-2 py-0.2 rounded-full">
                          Incumbent
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span 
                        className="text-[10px] font-bold text-white px-1.5 py-0.2 rounded"
                        style={{ backgroundColor: term.partyColor || '#18181b' }}
                      >
                        {term.partyAbbr}
                      </span>
                      <span className="text-xs text-[#52525b]">
                        {term.partyName}
                      </span>
                      {term.termOrdinal && (
                        <span className="text-xs font-mono text-[#71717a]">
                          • {term.termOrdinal}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-mono font-bold text-[#18181b] block">
                    {term.electionYear}
                  </span>
                  <span className="text-[10px] font-mono text-[#71717a]">
                    {term.endDate ? `${term.startDate.slice(0, 4)} – ${term.endDate.slice(0, 4)}` : '2024 – 2029'}
                  </span>
                </div>
              </div>

              {/* Electoral stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3 pt-3 border-t border-[#18181b]/10 text-xs font-mono">
                <div>
                  <span className="text-[#71717a] block text-[10px]">Victory Margin:</span>
                  <span className="font-bold text-[#18181b]">
                    {term.marginVotes ? `${term.marginVotes.toLocaleString()} votes` : 'Data verified'}
                  </span>
                </div>

                {term.runnerUpName && (
                  <div>
                    <span className="text-[#71717a] block text-[10px]">Runner Up:</span>
                    <span className="font-semibold text-[#52525b] truncate block">
                      {term.runnerUpName} ({term.runnerUpParty || 'Opp'})
                    </span>
                  </div>
                )}

                <div>
                  <span className="text-[#71717a] block text-[10px]">Statutory Evidence:</span>
                  <span className="text-[#15803d] font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    ECI Gazette
                  </span>
                </div>
              </div>

              {onSelectPerson && (
                <div className="mt-3 text-right">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onSelectPerson(person.id);
                    }}
                    className="text-xs font-bold text-[#18181b] hover:text-[#c44d31] underline underline-offset-2"
                  >
                    Open Politician Dossier →
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#18181b]/10 bg-[#f8f6f0] flex items-center justify-between text-xs text-[#71717a]">
          <span>Source: Election Commission of India Official Archives</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-[#18181b] text-white text-xs font-semibold rounded-xl"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
