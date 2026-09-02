import React from 'react';
import { ShieldAlert, TrendingUp, Scale, CheckCircle2, Award, Zap, AlertTriangle, FileCheck } from 'lucide-react';
import { ViewMode } from '../types';

interface InvestigativeTickerBarProps {
  onNavigate: (mode: ViewMode) => void;
}

export const InvestigativeTickerBar: React.FC<InvestigativeTickerBarProps> = ({ onNavigate }) => {
  const tickerItems = [
    {
      icon: ShieldAlert,
      tag: 'CRIMINAL AUDIT',
      text: '251 of 543 Lok Sabha MPs (46%) declare active criminal cases in Form 26 ECI affidavits',
      actionText: 'View Registry',
      mode: 'legal-registry' as ViewMode,
      color: '#c44d31',
    },
    {
      icon: TrendingUp,
      tag: 'WEALTH VELOCITY',
      text: '124 MPs declare asset growth surpassing +100% since their earliest election affidavit baseline',
      actionText: 'Inspect Radar',
      mode: 'nepotism-tracker' as ViewMode,
      color: '#b45309',
    },
    {
      icon: Scale,
      tag: 'SERIOUS IPC/BNS',
      text: '170 MPs face serious criminal charges including murder attempt, extortion, and bribery',
      actionText: 'Audit Cases',
      mode: 'legal-registry' as ViewMode,
      color: '#dc2626',
    },
    {
      icon: FileCheck,
      tag: 'MANIFESTO TRACKER',
      text: '48 key election guarantees actively monitored across 8 major development sectors',
      actionText: 'Track Promises',
      mode: 'manifesto' as ViewMode,
      color: '#1b6b47',
    },
    {
      icon: Award,
      tag: 'MPLADS UTILIZATION',
      text: 'National average MPLADS expenditure stands at 88.4% across 36 States & Union Territories',
      actionText: 'Open Map',
      mode: 'map' as ViewMode,
      color: '#0284c7',
    },
  ];

  return (
    <div className="relative w-full max-w-full overflow-hidden overflow-x-hidden border-y border-[#18181b]/15 bg-[#18181b] text-[#f8f6f0] py-1.5 sm:py-2 shadow-2xs">
      <div className="w-full max-w-full overflow-hidden min-w-0">
        <div className="flex w-max items-center animate-marquee hover:[animation-play-state:paused] cursor-pointer">
          {/* Render twice for continuous loop */}
          {[...tickerItems, ...tickerItems].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                onClick={() => onNavigate(item.mode)}
                className="inline-flex items-center gap-3 px-4 sm:px-6 text-xs transition-colors hover:text-white group shrink-0"
              >
                <div
                  className="flex items-center gap-1.5 px-2 py-0.5 text-[9px] font-mono font-black uppercase tracking-wider rounded-xs text-white"
                  style={{ backgroundColor: item.color }}
                >
                  <Icon className="h-3 w-3" />
                  <span>{item.tag}</span>
                </div>
                <span className="text-[11px] font-medium text-[#e4e0d5] group-hover:text-white transition-colors">
                  {item.text}
                </span>
                <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-amber-300 underline underline-offset-2 uppercase tracking-wider group-hover:text-amber-200">
                  {item.actionText} →
                </span>
                <span className="text-white/20 ml-2 sm:ml-3">✦</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
