import React from 'react';
import { 
  Building2, 
  Landmark, 
  MapPin, 
  Award, 
  TrendingUp, 
  Scale, 
  ExternalLink, 
  History, 
  CheckCircle2, 
  AlertCircle,
  FileCheck2,
  Calendar,
  FileText
} from 'lucide-react';
import { PersonRecord, RepresentativeTerm, PoliticalOffice, EvidenceRecord } from '../../types/representation';

interface RepresentativeCardProps {
  levelLabel: string;
  tierColor: string;
  office: PoliticalOffice;
  person: PersonRecord;
  term: RepresentativeTerm;
  evidence: EvidenceRecord[];
  onOpenDossier?: (id: string) => void;
  onViewHistory?: () => void;
  onViewEvidence?: (evidence: EvidenceRecord[]) => void;
}

export const RepresentativeCard: React.FC<RepresentativeCardProps> = ({
  levelLabel,
  tierColor,
  office,
  person,
  term,
  evidence,
  onOpenDossier,
  onViewHistory,
  onViewEvidence,
}) => {
  const isNationalOrState = office.level === 'national' || office.level === 'state';

  return (
    <div className="bg-white border border-[#18181b]/10 rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between relative overflow-hidden group">
      {/* Top Level Stripe */}
      <div 
        className="absolute top-0 left-0 right-0 h-1.5"
        style={{ backgroundColor: term.partyColor || '#f97316' }}
      />

      <div>
        {/* Header: Tier Tag & Office */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span 
              className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md"
              style={{ backgroundColor: `${tierColor}15`, color: tierColor }}
            >
              {levelLabel}
            </span>
            <span className="text-xs font-mono text-[#71717a]">
              {term.house || office.shortTitle}
            </span>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-mono text-[#15803d] bg-[#f0fdf4] px-2 py-0.5 rounded-full border border-[#86efac]/50">
            <CheckCircle2 className="w-3 h-3 text-[#16a34a]" />
            <span>Verified Term</span>
          </div>
        </div>

        {/* Office Title & Jurisdiction */}
        <h3 className="text-base sm:text-lg font-bold font-serif text-[#18181b] leading-tight">
          {office.title}
        </h3>
        <p className="text-xs font-medium text-[#71717a] mt-0.5 flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-[#a1a1aa] shrink-0" />
          <span>{term.constituencyName} ({term.state})</span>
        </p>

        {/* Representative Info Box */}
        <div className="mt-4 p-3.5 bg-[#f8f6f0] border border-[#18181b]/5 rounded-xl flex items-start gap-3.5">
          {person.photoUrl ? (
            <img
              src={person.photoUrl}
              alt={person.fullName}
              className="w-14 h-14 rounded-xl object-cover object-top border border-[#18181b]/10 shrink-0 shadow-2xs"
              referrerPolicy="no-referrer"
              onError={(e) => {
                // Fallback avatar
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          ) : (
            <div 
              className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold font-serif text-lg shrink-0 shadow-2xs"
              style={{ backgroundColor: term.partyColor || '#18181b' }}
            >
              {person.fullName.charAt(0)}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-bold text-[#18181b] text-sm sm:text-base leading-tight truncate">
                {person.fullName}
              </span>
              {person.hindiName && (
                <span className="text-xs text-[#71717a] font-serif">
                  ({person.hindiName})
                </span>
              )}
            </div>

            {/* Party & Alliance Tag */}
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <span 
                className="text-[11px] font-bold px-2 py-0.5 rounded text-white shadow-2xs"
                style={{ backgroundColor: term.partyColor || '#18181b' }}
              >
                {term.partyAbbr}
              </span>
              <span className="text-xs font-medium text-[#52525b]">
                {term.partyName}
              </span>
              {term.alliance && term.alliance !== 'Independent' && term.alliance !== 'Others' && (
                <span className="text-[10px] font-mono font-bold bg-[#e4e4e7] text-[#27272a] px-1.5 py-0.2 rounded">
                  {term.alliance}
                </span>
              )}
            </div>

            {/* Term Tenure */}
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#71717a] mt-2">
              <Calendar className="w-3.5 h-3.5 text-[#a1a1aa]" />
              <span>
                Term: {term.electionYear} – {term.endDate ? term.endDate.slice(0, 4) : 'Active (Incumbent)'}
              </span>
            </div>
          </div>
        </div>

        {/* Metrics Grid (Parliamentary / Assets / Cases) */}
        <div className="grid grid-cols-3 gap-2 mt-3.5 text-center">
          {/* Metric 1: Parliamentary attendance or election margin */}
          <div className="p-2.5 bg-[#f4f2ea] rounded-xl border border-[#18181b]/5">
            <span className="text-[10px] font-mono text-[#71717a] block uppercase">
              {term.legislativeStats?.attendancePercent ? 'Attendance' : 'Margin Votes'}
            </span>
            <span className="text-xs sm:text-sm font-bold font-mono text-[#18181b]">
              {term.legislativeStats?.attendancePercent ? `${term.legislativeStats.attendancePercent}%` : `${(term.marginVotes || 0).toLocaleString()}`}
            </span>
          </div>

          {/* Metric 2: Assets */}
          <div className="p-2.5 bg-[#f4f2ea] rounded-xl border border-[#18181b]/5">
            <span className="text-[10px] font-mono text-[#71717a] block uppercase">
              Declared Assets
            </span>
            <span className="text-xs sm:text-sm font-bold font-mono text-[#18181b]">
              {term.declaredAssetsCr ? `₹${term.declaredAssetsCr} Cr` : 'Form 26 Verified'}
            </span>
          </div>

          {/* Metric 3: Legal Cases */}
          <div className="p-2.5 bg-[#f4f2ea] rounded-xl border border-[#18181b]/5">
            <span className="text-[10px] font-mono text-[#71717a] block uppercase">
              Criminal Cases
            </span>
            <span className={`text-xs sm:text-sm font-bold font-mono ${
              (term.criminalCasesCount || 0) > 0 ? 'text-[#b91c1c]' : 'text-[#15803d]'
            }`}>
              {term.criminalCasesCount || 0} Cases
            </span>
          </div>
        </div>

        {/* Constitutional Basis */}
        {office.constitutionalReference && (
          <div className="mt-3 text-[11px] text-[#71717a] flex items-center gap-1 font-mono">
            <Landmark className="w-3 h-3 text-[#a1a1aa] shrink-0" />
            <span className="truncate">Statutory Root: {office.constitutionalReference}</span>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="mt-4 pt-3 border-t border-[#18181b]/10 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          {onViewEvidence && evidence.length > 0 && (
            <button
              type="button"
              onClick={() => onViewEvidence(evidence)}
              className="text-xs font-semibold text-[#18181b] hover:text-[#c44d31] bg-[#f4f2ea] hover:bg-[#ece8df] px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1"
              title="Inspect official gazettes & sworn affidavits"
            >
              <FileCheck2 className="w-3.5 h-3.5 text-[#16a34a]" />
              <span>Evidence ({evidence.length})</span>
            </button>
          )}

          {onViewHistory && (
            <button
              type="button"
              onClick={onViewHistory}
              className="text-xs font-medium text-[#71717a] hover:text-[#18181b] px-2 py-1.5 rounded-lg transition-colors flex items-center gap-1"
              title="View past election representatives"
            >
              <History className="w-3.5 h-3.5" />
              <span>Past Terms</span>
            </button>
          )}
        </div>

        {isNationalOrState && onOpenDossier && (
          <button
            type="button"
            onClick={() => onOpenDossier(person.id)}
            className="text-xs font-bold text-white bg-[#18181b] hover:bg-[#27272a] px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 shadow-2xs"
          >
            <span>Full Dossier</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
};
