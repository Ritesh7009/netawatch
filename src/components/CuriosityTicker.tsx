import React from 'react';
import { Sparkles, ArrowRight, ShieldAlert, TrendingUp, Landmark, Scale, Wallet, FileCheck, Award, GitFork } from 'lucide-react';
import { Politician, ViewMode } from '../types';

interface CuriosityTickerProps {
  politicians: Politician[];
  onSelectPolitician: (p: Politician) => void;
  onNavigateToView?: (view: ViewMode) => void;
}

export const CuriosityTicker: React.FC<CuriosityTickerProps> = ({
  politicians,
  onSelectPolitician,
  onNavigateToView,
}) => {
  // Curated live civic audit signals and investigative data
  const tickerItems = [
    {
      id: 't1',
      tag: 'CRIMINAL AUDIT',
      text: '251 OF 543 MPs (46%) DECLARE ACTIVE CRIMINAL CASES IN FORM 26 AFFIDAVITS',
      actionText: 'AUDIT CASES',
      view: 'legal-registry' as ViewMode,
      type: 'view',
      color: '#dc2626',
    },
    {
      id: 't2',
      tag: 'ASSET SURGE',
      text: 'D.K. SURESH — +340% 5-YR ASSET GROWTH (₹593 CR NET WORTH)',
      actionText: 'VIEW DOSSIER',
      politicianId: 'dk-suresh',
      type: 'mp',
      color: '#d97706',
    },
    {
      id: 't3',
      tag: 'SERIOUS IPC/BNS',
      text: '170 MPs FACE CHARGES INCLUDING ATTEMPT TO MURDER, EXTORTION & BRIBERY',
      actionText: 'VIEW REGISTRY',
      view: 'legal-registry' as ViewMode,
      type: 'view',
      color: '#ef4444',
    },
    {
      id: 't4',
      tag: 'ATTENDANCE BENCHMARK',
      text: 'SHASHI THAROOR — 97% ATTENDANCE & 85 PARLIAMENTARY DEBATES',
      actionText: 'OPEN DOSSIER',
      politicianId: 'shashi-tharoor',
      type: 'mp',
      color: '#10b981',
    },
    {
      id: 't5',
      tag: 'MANIFESTO AUDIT',
      text: '48 KEY ELECTION GUARANTEES ACTIVELY MONITORED ACROSS 8 SECTORS',
      actionText: 'TRACK PROMISES',
      view: 'manifesto' as ViewMode,
      type: 'view',
      color: '#16a34a',
    },
    {
      id: 't6',
      tag: 'WEALTH VELOCITY',
      text: 'NAKUL NATH — ₹660 CR DECLARED ASSETS RECORD IN 18TH LOK SABHA',
      actionText: 'VIEW DOSSIER',
      politicianId: 'nakul-nath',
      type: 'mp',
      color: '#f59e0b',
    },
    {
      id: 't7',
      tag: 'DYNASTY RADAR',
      text: '128 MPs WITH CONFIRMED SECOND-OR-THIRD GENERATION DYNASTIC LINEAGES',
      actionText: 'INSPECT RADAR',
      view: 'nepotism-tracker' as ViewMode,
      type: 'view',
      color: '#8b5cf6',
    },
    {
      id: 't8',
      tag: 'MPLADS DISBURSEMENT',
      text: 'NATIONAL AVERAGE MPLADS UTILIZATION AT 88.4% ACROSS 36 STATES & UTS',
      actionText: 'VIEW MAP',
      view: 'map' as ViewMode,
      type: 'view',
      color: '#0284c7',
    },
    {
      id: 't9',
      tag: 'BENCHMARK',
      text: 'NARENDRA MODI — 100% PARLIAMENTARY PARTICIPATION BENCHMARK',
      actionText: 'VIEW DOSSIER',
      politicianId: 'narendra-modi',
      type: 'mp',
      color: '#059669',
    },
  ];

  const handleItemClick = (item: (typeof tickerItems)[0]) => {
    if (item.type === 'mp' && item.politicianId) {
      const found = politicians.find((p) => p.id === item.politicianId);
      if (found) {
        onSelectPolitician(found);
      }
    } else if (item.type === 'view' && item.view && onNavigateToView) {
      onNavigateToView(item.view);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full max-w-full bg-[#141416] text-white border-b border-black/40 overflow-hidden select-none relative z-30 shadow-xs">
      <div className="flex items-center w-full max-w-full h-8 sm:h-9">
        
        {/* Left Fixed Badge with clean border and divider */}
        <div className="flex items-center gap-1.5 bg-[#c44d31] text-white px-2.5 sm:px-3.5 h-full text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-widest shrink-0 z-20 shadow-md">
          <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
          <span className="whitespace-nowrap">LIVE AUDIT</span>
        </div>

        {/* Continuous Smooth Scrolling Marquee with Edge Fade Masks */}
        <div className="relative flex-1 h-full overflow-hidden min-w-0 flex items-center">
          {/* Subtle Left Fade */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-6 sm:w-10 bg-gradient-to-r from-[#141416] to-transparent z-10" />

          {/* Marquee Content */}
          <div className="animate-marquee hover:[animation-play-state:paused] flex items-center gap-6 sm:gap-8 whitespace-nowrap text-xs font-mono pl-4">
            {/* Duplicated for infinite continuous loop */}
            {[...tickerItems, ...tickerItems].map((item, idx) => (
              <button
                key={`${item.id}-${idx}`}
                type="button"
                onClick={() => handleItemClick(item)}
                className="inline-flex items-center gap-2 text-zinc-200 hover:text-white transition-colors cursor-pointer text-[10px] sm:text-[11px] font-medium tracking-wide shrink-0 group py-1"
              >
                <span
                  className="px-1.5 py-0.5 text-[8px] sm:text-[8.5px] uppercase font-bold tracking-wider text-white rounded-xs"
                  style={{ backgroundColor: item.color }}
                >
                  {item.tag}
                </span>

                <span className="text-zinc-300 group-hover:text-white group-hover:underline underline-offset-2">
                  {item.text}
                </span>

                <span className="text-[#b4f82c] text-[9.5px] font-bold tracking-wider group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-0.5 ml-0.5">
                  {item.actionText} →
                </span>

                <span className="text-zinc-600 ml-3">✦</span>
              </button>
            ))}
          </div>

          {/* Subtle Right Fade */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-6 sm:w-10 bg-gradient-to-l from-[#141416] to-transparent z-10" />
        </div>

      </div>
    </div>
  );
};
