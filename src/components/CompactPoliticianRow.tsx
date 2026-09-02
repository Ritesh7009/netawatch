import React from 'react';
import { motion } from 'motion/react';
import { 
  ShieldAlert, TrendingUp, CheckCircle2, ChevronRight, Scale, 
  Wallet, Landmark, ArrowUpRight
} from 'lucide-react';
import { Politician } from '../types';
import { PoliticianImage } from './PoliticianImage';

interface CompactPoliticianRowProps {
  politician: Politician;
  onSelect: (p: Politician) => void;
  isCompared: boolean;
  onToggleCompare: (p: Politician) => void;
  index?: number;
}

export const CompactPoliticianRow: React.FC<CompactPoliticianRowProps> = ({
  politician,
  onSelect,
  isCompared,
  onToggleCompare,
  index = 0,
}) => {
  const {
    name,
    hindiName,
    photo,
    partyAbbr,
    partyColor,
    alliance,
    currentRole,
    state,
    constituency,
    house,
    parliamentaryRecord,
    assets,
    mplads,
    criminalRecords,
  } = politician;

  // Determine the ONE most critical flagged metric to highlight
  const getFlaggedMetric = () => {
    if (criminalRecords.totalCases > 0) {
      return {
        type: 'danger',
        label: `${criminalRecords.totalCases} Charges (${criminalRecords.seriousCases} Serious IPC)`,
        shortLabel: `${criminalRecords.totalCases} Cases (${criminalRecords.seriousCases} Serious)`,
        icon: ShieldAlert,
        badgeClass: 'bg-rose-50 border-rose-200 text-[#c44d31]',
        iconClass: 'text-[#c44d31]',
      };
    }
    if (assets.growthPercent && assets.growthPercent > 100) {
      return {
        type: 'warning',
        label: `Assets ₹${assets.totalCr.toFixed(1)} Cr (+${assets.growthPercent}% Surge)`,
        shortLabel: `₹${assets.totalCr.toFixed(0)}Cr (+${assets.growthPercent}%)`,
        icon: TrendingUp,
        badgeClass: 'bg-amber-50 border-amber-200 text-amber-900',
        iconClass: 'text-amber-700',
      };
    }
    if (assets.totalCr >= 50) {
      return {
        type: 'neutral',
        label: `Declared: ₹${assets.totalCr.toFixed(1)} Cr Net Worth`,
        shortLabel: `₹${assets.totalCr.toFixed(0)} Cr Assets`,
        icon: Wallet,
        badgeClass: 'bg-[#f1ede4] border-[#18181b]/15 text-[#18181b]',
        iconClass: 'text-[#18181b]',
      };
    }
    if (mplads.utilizationPercent >= 90) {
      return {
        type: 'success',
        label: `MPLADS: ${mplads.utilizationPercent}% Spent (₹${mplads.spentCr} Cr)`,
        shortLabel: `${mplads.utilizationPercent}% MPLADS Spent`,
        icon: Landmark,
        badgeClass: 'bg-emerald-50 border-emerald-200 text-[#1b6b47]',
        iconClass: 'text-[#1b6b47]',
      };
    }
    return {
      type: 'clean',
      label: `Clean Record • ${parliamentaryRecord.attendancePercent}% Attendance`,
      shortLabel: `Clean • ${parliamentaryRecord.attendancePercent}% LS Att.`,
      icon: CheckCircle2,
      badgeClass: 'bg-emerald-50 border-emerald-200 text-[#1b6b47]',
      iconClass: 'text-[#1b6b47]',
    };
  };

  const flaggedMetric = getFlaggedMetric();
  const MetricIcon = flaggedMetric.icon;

  return (
    <motion.div
      id={`compact-row-${politician.id}`}
      layout="position"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ 
        duration: 0.22, 
        delay: Math.min((index % 8) * 0.03, 0.2),
        ease: [0.22, 1, 0.36, 1],
      }}
      onClick={() => onSelect(politician)}
      className="group relative flex items-center justify-between gap-2.5 sm:gap-4 p-3 sm:p-4 bg-white border border-[#18181b]/15 hover:border-[#18181b] hover:shadow-md transition-all duration-200 rounded-xl sm:rounded-2xl cursor-pointer select-none hover:-translate-y-0.5"
    >
      {/* Left Vertical Accent Line with Party Color */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-2 rounded-l-xl sm:rounded-l-2xl"
        style={{ backgroundColor: partyColor }}
      />

      {/* Left Block: Thumbnail & Identity */}
      <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0 flex-1 pl-1.5 sm:pl-2">
        {/* Photo Thumbnail */}
        <div className="relative h-12 w-12 sm:h-14 sm:w-14 overflow-hidden rounded-xl border border-[#18181b]/20 bg-[#f1ede4] flex-shrink-0 shadow-2xs">
          <PoliticianImage
            src={photo}
            alt={name}
            partyColor={partyColor}
            name={name}
            constituency={constituency}
            state={state}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {criminalRecords.totalCases === 0 && (
            <div 
              className="absolute bottom-0 right-0 h-3.5 w-3.5 bg-[#1b6b47] rounded-tl-xs flex items-center justify-center text-white" 
              title="Clean Form 26 Affidavit"
            >
              <CheckCircle2 className="h-2.5 w-2.5 stroke-[3]" />
            </div>
          )}
        </div>

        {/* Identity & Seat info */}
        <div className="min-w-0 flex-1">
          {/* Top metadata tags */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className="px-1.5 py-0.2 text-[9px] font-bold uppercase tracking-wider border rounded-xs leading-none"
              style={{ backgroundColor: `${partyColor}15`, color: partyColor, borderColor: `${partyColor}40` }}
            >
              {partyAbbr}
            </span>
            <span className={`px-1.5 py-0.2 text-[8px] font-bold uppercase tracking-wider border rounded-xs leading-none ${
              alliance === 'NDA'
                ? 'border-orange-500/40 bg-orange-50 text-orange-800'
                : alliance === 'INDIA'
                ? 'border-sky-500/40 bg-sky-50 text-sky-800'
                : 'border-[#18181b]/20 bg-[#f1ede4] text-[#18181b]'
            }`}>
              {alliance}
            </span>
            <span className="text-[9px] text-[#71717a] font-mono uppercase hidden xs:inline">
              {house}
            </span>
          </div>

          {/* Leader Name */}
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <h3 className="font-serif text-sm sm:text-base font-bold text-[#18181b] tracking-tight group-hover:text-[#c44d31] transition-colors truncate">
              {name}
            </h3>
            {hindiName && (
              <span className="text-[10px] text-[#8a8479] font-serif italic hidden md:inline truncate">
                ({hindiName})
              </span>
            )}
          </div>

          {/* Seat & Role */}
          <p className="text-[11px] text-[#52525b] truncate flex items-center gap-1 mt-0.5">
            <span className="font-semibold text-[#18181b]">{constituency}</span>
            <span className="text-[#8a8479]">•</span>
            <span>{state}</span>
            <span className="text-[#8a8479] hidden sm:inline">•</span>
            <span className="hidden sm:inline text-[#52525b] truncate">{currentRole}</span>
          </p>

          {/* Mobile One Flagged Metric (Visible under role on small screens) */}
          <div className="mt-1 flex items-center gap-1 sm:hidden">
            <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 text-[9px] font-bold uppercase border rounded-xs ${flaggedMetric.badgeClass}`}>
              <MetricIcon className="h-2.5 w-2.5 flex-shrink-0" />
              <span className="truncate">{flaggedMetric.shortLabel}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Middle Block: ONE Key Flagged Metric (Tablet & Desktop) */}
      <div className="hidden sm:flex items-center justify-center flex-shrink-0 px-2">
        <div className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold uppercase tracking-wider border rounded-xs shadow-2xs ${flaggedMetric.badgeClass}`}>
          <MetricIcon className={`h-3.5 w-3.5 ${flaggedMetric.iconClass}`} />
          <span>{flaggedMetric.label}</span>
        </div>
      </div>

      {/* Right Block: Actions */}
      <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
        {/* Compare Toggle Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleCompare(politician);
          }}
          className={`flex items-center gap-1 border px-2 sm:px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider transition rounded-xs touch-manipulation min-h-[34px] ${
            isCompared
              ? 'border-[#c44d31] bg-[#c44d31] text-white shadow-2xs'
              : 'border-[#18181b]/20 bg-[#faf9f6] text-[#52525b] hover:border-[#18181b] hover:text-[#18181b]'
          }`}
          title={isCompared ? 'Remove from Comparison' : 'Add to Comparison'}
        >
          <Scale className="h-3 w-3" />
          <span className="hidden md:inline">{isCompared ? 'Compared' : 'Compare'}</span>
        </button>

        {/* Inspect Dossier Action Button */}
        <button
          type="button"
          onClick={() => onSelect(politician)}
          className="flex items-center gap-1 border border-[#18181b] bg-[#18181b] group-hover:bg-[#c44d31] group-hover:border-[#c44d31] text-white px-2.5 sm:px-3 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider transition rounded-xs shadow-2xs touch-manipulation min-h-[34px]"
        >
          <span className="hidden sm:inline">Dossier</span>
          <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.5]" />
        </button>
      </div>
    </motion.div>
  );
};
