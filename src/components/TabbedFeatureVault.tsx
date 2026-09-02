import React, { useState, useMemo } from 'react';
import { 
  ShieldAlert, 
  CheckCircle2, 
  TrendingUp, 
  MapPin, 
  Landmark, 
  Filter, 
  ArrowRight, 
  Sparkles,
  Layers,
  Scale
} from 'lucide-react';
import { Politician, ViewMode } from '../types';
import { CompactPoliticianRow } from './CompactPoliticianRow';

interface TabbedFeatureVaultProps {
  politicians: Politician[];
  onSelectPolitician: (p: Politician) => void;
  compareList: Politician[];
  onToggleCompare: (p: Politician) => void;
  onOpenAllIndiaDirectory: () => void;
  onNavigateToView: (view: ViewMode) => void;
}

type VaultTabId = 
  | 'all' 
  | 'flagged' 
  | 'clean' 
  | 'investigation' 
  | 'attendance' 
  | 'party-bjp' 
  | 'party-inc' 
  | 'state-up' 
  | 'state-mh';

export const TabbedFeatureVault: React.FC<TabbedFeatureVaultProps> = ({
  politicians,
  onSelectPolitician,
  compareList,
  onToggleCompare,
  onOpenAllIndiaDirectory,
  onNavigateToView,
}) => {
  const [activeTab, setActiveTab] = useState<VaultTabId>('flagged');

  const tabs: { id: VaultTabId; label: string; icon?: React.ElementType; badge?: string }[] = [
    { id: 'flagged', label: 'Flagged This Week', icon: ShieldAlert, badge: 'High Alert' },
    { id: 'all', label: 'All Leaders', icon: Layers },
    { id: 'clean', label: 'Clean Record', icon: CheckCircle2 },
    { id: 'investigation', label: 'Under Investigation', icon: Scale },
    { id: 'attendance', label: 'Top Attendance (95%+)', icon: Landmark },
    { id: 'party-bjp', label: 'BJP Caucus' },
    { id: 'party-inc', label: 'INC Caucus' },
    { id: 'state-up', label: 'Uttar Pradesh (80)' },
    { id: 'state-mh', label: 'Maharashtra (48)' },
  ];

  // Filtered politicians based on active tab
  const filteredLeaders = useMemo(() => {
    switch (activeTab) {
      case 'flagged':
        return politicians
          .filter((p) => p.criminalRecords.totalCases > 0 || p.assets.totalCr > 50)
          .sort((a, b) => b.criminalRecords.totalCases - a.criminalRecords.totalCases)
          .slice(0, 8);
      case 'clean':
        return politicians
          .filter((p) => p.criminalRecords.totalCases === 0 && p.parliamentaryRecord.attendancePercent >= 80)
          .sort((a, b) => b.parliamentaryRecord.attendancePercent - a.parliamentaryRecord.attendancePercent)
          .slice(0, 8);
      case 'investigation':
        return politicians
          .filter((p) => p.criminalRecords.seriousCases > 0)
          .sort((a, b) => b.criminalRecords.seriousCases - a.criminalRecords.seriousCases)
          .slice(0, 8);
      case 'attendance':
        return politicians
          .filter((p) => p.parliamentaryRecord.attendancePercent >= 90)
          .sort((a, b) => b.parliamentaryRecord.attendancePercent - a.parliamentaryRecord.attendancePercent)
          .slice(0, 8);
      case 'party-bjp':
        return politicians.filter((p) => p.partyAbbr === 'BJP').slice(0, 8);
      case 'party-inc':
        return politicians.filter((p) => p.partyAbbr === 'INC').slice(0, 8);
      case 'state-up':
        return politicians.filter((p) => p.state === 'Uttar Pradesh').slice(0, 8);
      case 'state-mh':
        return politicians.filter((p) => p.state === 'Maharashtra').slice(0, 8);
      case 'all':
      default:
        return politicians.slice(0, 8);
    }
  }, [politicians, activeTab]);

  return (
    <section className="w-full py-8 sm:py-12 border-b border-[#18181b]/15 bg-[#faf9f6]">
      <div className="max-w-6xl mx-auto px-3 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#18181b] text-white px-3 py-0.5 text-[10px] font-mono font-bold uppercase tracking-widest rounded-full mb-2 shadow-xs">
              <Sparkles className="h-3 w-3 text-amber-300" />
              <span>The Vault ✱ Live Filter Stream</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-black tracking-tight text-[#18181b]">
              Audited Leader Categories
            </h2>
            <p className="text-xs sm:text-sm text-[#52525b]">
              Select a specialized scrutiny stream to audit verified parliamentary cohorts.
            </p>
          </div>

          <button
            onClick={() => onNavigateToView('table')}
            className="inline-flex items-center gap-1.5 border border-[#18181b] bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#18181b] hover:bg-[#18181b] hover:text-white transition-colors rounded-full shadow-2xs cursor-pointer self-start sm:self-auto"
          >
            <span>Open 543 Matrix</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Horizontal Tab Row with Right Gradient Mask */}
        <div className="relative mb-6">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar touch-pan-scroll pb-2 border-b border-[#18181b]/15">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-200 whitespace-nowrap cursor-pointer select-none flex-shrink-0 ${
                    isActive
                      ? 'bg-[#18181b] text-white shadow-xs'
                      : 'bg-white text-[#52525b] border border-[#18181b]/20 hover:border-[#18181b] hover:text-[#18181b]'
                  }`}
                >
                  {Icon && <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-white' : 'text-[#71717a]'}`} />}
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className={`text-[8px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive ? 'bg-[#c44d31] text-white' : 'bg-rose-100 text-[#c44d31]'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Fade gradient on mobile right edge */}
          <div className="pointer-events-none absolute right-0 top-0 bottom-2 w-10 bg-gradient-to-l from-[#faf9f6] to-transparent sm:hidden" />
        </div>

        {/* Live Filtered Compact List */}
        <div className="border border-[#18181b]/15 rounded-2xl bg-white shadow-xs overflow-hidden">
          <div className="px-4 py-3 bg-[#f1ede4] border-b border-[#18181b]/15 flex items-center justify-between text-xs font-bold text-[#18181b]">
            <span className="font-mono uppercase tracking-widest text-[10px] text-[#71717a]">
              Displaying {filteredLeaders.length} of 543 Parliamentarians
            </span>
            <span className="text-[10px] text-[#1b6b47] font-mono font-bold flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1b6b47]" />
              ECI Form 26 Validated
            </span>
          </div>

          <div className="divide-y divide-[#18181b]/10">
            {filteredLeaders.map((politician, idx) => (
              <CompactPoliticianRow
                key={politician.id}
                politician={politician}
                onSelect={onSelectPolitician}
                isCompared={compareList.some((p) => p.id === politician.id)}
                onToggleCompare={onToggleCompare}
                index={idx}
              />
            ))}
          </div>

          {/* Bottom Table Action Footer */}
          <div className="p-4 bg-[#faf9f6] border-t border-[#18181b]/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <p className="text-xs text-[#52525b]">
              Need deep sorting across all 543 MPs by attendance, debates, questions, or wealth?
            </p>
            <button
              onClick={() => onNavigateToView('table')}
              className="bg-[#18181b] text-white px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#c44d31] transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <span>View Full 543 Matrix</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
