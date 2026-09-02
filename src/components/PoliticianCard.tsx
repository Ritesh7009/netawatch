import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Landmark, Wallet, ShieldAlert, TrendingUp, CheckCircle2, ChevronRight, Scale, Check, User, LayoutGrid, Activity, ExternalLink } from 'lucide-react';
import { Politician } from '../types';
import { PoliticianImage } from './PoliticianImage';
import { AttendanceRadar } from './AttendanceRadar';

interface PoliticianCardProps {
  politician: Politician;
  onSelect: (p: Politician) => void;
  isCompared: boolean;
  onToggleCompare: (p: Politician) => void;
  index?: number;
}

export const PoliticianCard: React.FC<PoliticianCardProps> = ({
  politician,
  onSelect,
  isCompared,
  onToggleCompare,
  index = 0,
}) => {
  const [cardView, setCardView] = useState<'grid' | 'radar'>('grid');

  const {
    name,
    hindiName,
    photo,
    partyAbbr,
    party,
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
    tags,
  } = politician;

  return (
    <motion.div 
      id={`card-${politician.id}`}
      layout="position"
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96, y: -8 }}
      transition={{ 
        duration: 0.28, 
        delay: Math.min((index % 9) * 0.035, 0.25),
        ease: [0.22, 1, 0.36, 1],
        layout: { duration: 0.26, ease: [0.22, 1, 0.36, 1] }
      }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        boxShadow: `0 24px 44px -12px ${partyColor}40, 0 10px 20px -8px rgba(24, 24, 27, 0.12)`,
        transition: { duration: 0.24, ease: [0.22, 1, 0.36, 1] } 
      }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl border border-[#18181b]/15 bg-white p-5 sm:p-6 shadow-sm transition-all duration-300 hover:border-[#18181b]/60 hover:z-20"
    >
      {/* Top Ambient Glow & Accent Bar */}
      <div 
        className="absolute top-0 left-0 right-0 h-2"
        style={{ backgroundColor: partyColor }}
      />
      <div 
        className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full blur-2xl opacity-15 transition-opacity group-hover:opacity-30"
        style={{ backgroundColor: partyColor }}
      />

      <div>
        {/* Card Header: Photo + Vital Badges */}
        <div className="flex items-start gap-3 pt-1">
          <div className="relative flex-shrink-0">
            <div className="relative h-16 w-16 sm:h-20 sm:w-20 overflow-hidden rounded-xs border border-[#18181b]/20 bg-[#f1ede4] shadow-xs">
              <PoliticianImage
                src={photo}
                alt={name}
                partyColor={partyColor}
                name={name}
                constituency={constituency}
                state={state}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Verified Affidavit Icon */}
            <div 
              className="absolute -bottom-1 -right-1 flex h-4.5 w-4.5 sm:h-5 sm:w-5 items-center justify-center rounded-full border border-white bg-[#1b6b47] text-white shadow-xs"
              title="Verified ECI Election Affidavit & Parliamentary Record"
            >
              <CheckCircle2 className="h-2.5 w-2.5 sm:h-3 sm:w-3 stroke-[3]" />
            </div>
          </div>

          {/* Info Block */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span
                className="inline-flex items-center px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider border rounded-xs"
                style={{ backgroundColor: `${partyColor}15`, color: partyColor, borderColor: `${partyColor}40` }}
              >
                {partyAbbr}
              </span>
              <span className={`inline-flex items-center px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider border rounded-xs ${
                alliance === 'NDA'
                  ? 'border-orange-500/40 bg-orange-50 text-orange-800'
                  : alliance === 'INDIA'
                  ? 'border-sky-500/40 bg-sky-50 text-sky-800'
                  : 'border-[#18181b]/20 bg-[#f1ede4] text-[#18181b]'
              }`}>
                {alliance}
              </span>
              <span className="text-[8px] sm:text-[9px] uppercase tracking-wider text-[#71717a] font-mono font-medium">
                {house}
              </span>

              {/* Direct External Verified Profile Portal Redirection */}
              <a
                href={
                  politician.socialLinks?.twitter ||
                  `https://sansad.in/ls/members`
                }
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                title={`Open official records for ${name}`}
                className="ml-auto inline-flex items-center gap-0.5 text-[9px] font-mono text-[#71717a] hover:text-[#c44d31] p-0.5 transition cursor-pointer"
              >
                <ExternalLink className="h-3 w-3" />
                <span className="sr-only">External Profile</span>
              </a>
            </div>

            <h3 className="mt-1 font-serif text-base sm:text-lg lg:text-xl font-bold text-[#18181b] tracking-tight group-hover:text-[#c44d31] transition-colors leading-tight line-clamp-1">
              {name}
            </h3>
            {hindiName && (
              <p className="text-[10px] sm:text-[11px] text-[#8a8479] font-serif italic truncate">{hindiName}</p>
            )}

            <p className="mt-0.5 text-[11px] sm:text-xs font-medium text-[#52525b] line-clamp-1">
              {currentRole}
            </p>
          </div>
        </div>

        {/* Location / Constituency Row */}
        <div className="mt-3 flex items-center justify-between bg-[#faf9f6] px-2.5 py-1.5 border border-[#18181b]/10 text-xs text-[#52525b] rounded-xs">
          <div className="truncate pr-2">
            <span className="text-[#8a8479] uppercase tracking-wider text-[9px] font-bold">Seat: </span>
            <span className="font-semibold text-[#18181b]">{constituency}</span>
          </div>
          <span className="bg-white border border-[#18181b]/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#18181b] flex-shrink-0 rounded-xs">
            {state}
          </span>
        </div>

        {/* Toggle Bar: Metrics Grid vs Attendance Radar */}
        <div className="mt-2.5 mb-1.5 flex items-center justify-between border-b border-[#18181b]/10 pb-1.5">
          <span className="text-[9px] font-bold uppercase tracking-widest text-[#71717a] flex items-center gap-1">
            {cardView === 'radar' ? (
              <>
                <Activity className="h-3 w-3 text-[#c44d31]" />
                <span>Attendance Radar</span>
              </>
            ) : (
              <>
                <LayoutGrid className="h-3 w-3 text-[#18181b]" />
                <span>Key Metrics</span>
              </>
            )}
          </span>
          <div className="flex items-center border border-[#18181b]/20 bg-[#f1ede4] p-0.5 rounded-xs">
            <button
              type="button"
              onClick={() => setCardView('grid')}
              className={`px-2 py-0.5 text-[8px] sm:text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 transition rounded-xs touch-manipulation ${
                cardView === 'grid'
                  ? 'bg-white text-[#18181b] shadow-2xs border border-[#18181b]/20'
                  : 'text-[#71717a] hover:text-[#18181b]'
              }`}
              title="4-Metric Grid (Assets, Attendance, MPLADS, Criminal Cases)"
            >
              <LayoutGrid className="h-2.5 w-2.5" />
              <span>Grid</span>
            </button>
            <button
              type="button"
              onClick={() => setCardView('radar')}
              className={`px-2 py-0.5 text-[8px] sm:text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 transition rounded-xs touch-manipulation ${
                cardView === 'radar'
                  ? 'bg-[#18181b] text-white shadow-2xs'
                  : 'text-[#71717a] hover:text-[#18181b]'
              }`}
              title="Interactive Parliamentary Attendance, Debates & Bills Spider Chart"
            >
              <Activity className="h-2.5 w-2.5 text-[#c44d31]" />
              <span>Radar</span>
            </button>
          </div>
        </div>

        {/* View 1: 4 Core Performance Metrics Grid - Editorial Broadsheet style */}
        {cardView === 'grid' && (
          <div className="grid grid-cols-2 gap-1.5 animate-in fade-in duration-200">
            
            {/* Declared Assets */}
            <div className="border border-[#18181b]/15 bg-[#faf9f6] p-2 rounded-xs">
              <div className="flex items-center justify-between text-[#71717a] text-[9px]">
                <span className="font-bold uppercase tracking-widest truncate">Total Assets</span>
                <Wallet className="h-3 w-3 text-[#c44d31] flex-shrink-0" />
              </div>
              <div className="mt-0.5 font-serif text-sm sm:text-base font-black text-[#18181b] truncate">
                ₹{assets.totalCr >= 100 ? assets.totalCr.toFixed(0) : assets.totalCr.toFixed(1)} Cr
              </div>
              <div className="text-[9px] text-[#8a8479] truncate">
                {assets.liabilitiesCr > 0 ? `Liab: ₹${assets.liabilitiesCr} Cr` : 'Zero Debt'}
              </div>
            </div>

            {/* Parliamentary Attendance */}
            <div className="border border-[#18181b]/15 bg-[#faf9f6] p-2 rounded-xs">
              <div className="flex items-center justify-between text-[#71717a] text-[9px]">
                <span className="font-bold uppercase tracking-widest truncate">Attendance</span>
                <Landmark className="h-3 w-3 text-[#18181b] flex-shrink-0" />
              </div>
              <div className="mt-0.5 flex items-baseline gap-1 truncate">
                <span className={`font-serif text-sm sm:text-base font-black ${
                  parliamentaryRecord.attendancePercent >= 85 ? 'text-[#1b6b47]' : 'text-[#18181b]'
                }`}>
                  {parliamentaryRecord.attendancePercent}%
                </span>
                <span className="text-[8px] text-[#8a8479] truncate">({parliamentaryRecord.debatesCount} deb.)</span>
              </div>
              <div className="text-[9px] text-[#8a8479] truncate">
                Avg: 79%
              </div>
            </div>

            {/* MPLADS Utilization */}
            <div className="border border-[#18181b]/15 bg-[#faf9f6] p-2 rounded-xs">
              <div className="flex items-center justify-between text-[#71717a] text-[9px]">
                <span className="font-bold uppercase tracking-widest truncate">MPLADS Fund</span>
                <TrendingUp className="h-3 w-3 text-[#1b6b47] flex-shrink-0" />
              </div>
              <div className="mt-0.5 font-serif text-sm sm:text-base font-black text-[#1b6b47] truncate">
                {mplads.utilizationPercent}%
              </div>
              <div className="text-[9px] text-[#8a8479] truncate">
                {mplads.completedProjects} works done
              </div>
            </div>

            {/* Criminal Cases */}
            <div className="border border-[#18181b]/15 bg-[#faf9f6] p-2 rounded-xs">
              <div className="flex items-center justify-between text-[#71717a] text-[9px]">
                <span className="font-bold uppercase tracking-widest truncate">Affidavits</span>
                <ShieldAlert className={`h-3 w-3 flex-shrink-0 ${criminalRecords.totalCases > 0 ? 'text-[#c44d31]' : 'text-[#1b6b47]'}`} />
              </div>
              <div className={`mt-0.5 font-serif text-sm sm:text-base font-black truncate ${
                criminalRecords.totalCases === 0 ? 'text-[#1b6b47]' : 'text-[#c44d31]'
              }`}>
                {criminalRecords.totalCases === 0 ? '0 Cases' : `${criminalRecords.totalCases} Pending`}
              </div>
              <div className="text-[9px] text-[#8a8479] truncate">
                {criminalRecords.seriousCases > 0 ? `${criminalRecords.seriousCases} Serious IPC` : '0 Serious IPC'}
              </div>
            </div>

          </div>
        )}

        {/* View 2: Interactive Attendance Radar Spider Chart */}
        {cardView === 'radar' && (
          <div className="animate-in fade-in duration-200">
            <AttendanceRadar 
              politician={politician} 
              compact={true} 
              showBenchmark={true}
            />
          </div>
        )}

        {/* Tags / Key Initiatives preview */}
        <div className="mt-2.5 flex flex-wrap gap-1">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="border border-[#18181b]/15 bg-[#f1ede4] px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wider text-[#18181b] rounded-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-3.5 flex items-center gap-2 border-t border-[#18181b]/15 pt-2.5">
        
        {/* Toggle Compare */}
        <button
          type="button"
          onClick={() => onToggleCompare(politician)}
          className={`flex items-center justify-center gap-1 border px-3 py-2.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider transition touch-manipulation min-h-[44px] rounded-xs cursor-pointer active:scale-95 ${
            isCompared
              ? 'border-[#c44d31] bg-[#c44d31] text-white shadow-2xs'
              : 'border-[#18181b]/30 bg-white text-[#18181b] hover:bg-[#f1ede4]'
          }`}
          title={isCompared ? 'Remove from side-by-side compare' : 'Add to side-by-side comparison'}
        >
          {isCompared ? (
            <>
              <Check className="h-3.5 w-3.5 stroke-[3]" />
              <span>Added</span>
            </>
          ) : (
            <>
              <Scale className="h-3.5 w-3.5" />
              <span>Compare</span>
            </>
          )}
        </button>

        {/* View Full Dossier */}
        <button
          type="button"
          onClick={() => onSelect(politician)}
          className="flex flex-1 items-center justify-center gap-1.5 border border-[#18181b] bg-[#18181b] px-3.5 py-2.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-white shadow-2xs transition-all hover:bg-[#c44d31] hover:border-[#c44d31] touch-manipulation min-h-[44px] rounded-xs cursor-pointer active:scale-98"
        >
          <span>Inspect Dossier</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </button>

      </div>
    </motion.div>
  );
};
