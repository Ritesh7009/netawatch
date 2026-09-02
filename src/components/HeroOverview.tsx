import React, { useState, useRef, useMemo } from 'react';
import { 
  Search, 
  Scale, 
  Map, 
  FileText, 
  MessageSquare, 
  BookOpen, 
  ShieldCheck, 
  ArrowRight, 
  X, 
  CheckCircle2, 
  Landmark, 
  Clock, 
  FileCheck,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Politician, ViewMode, StatementTopic } from '../types';
import { PoliticianImage } from './PoliticianImage';
import { parseNaturalLanguageQuery } from '../utils/naturalLanguageQuery';
import { DATA_FRESHNESS_INFO } from '../data/methodologyData';

interface HeroOverviewProps {
  politicians: Politician[];
  onSelectPolitician: (p: Politician) => void;
  onOpenAllIndiaDirectory?: () => void;
  onOpenTransparencyGuide?: () => void;
  onNavigateToView?: (view: ViewMode) => void;
  onStartComparison?: (list: Politician[]) => void;
  onFilterStatements?: (topic: StatementTopic | 'All') => void;
}

export const HeroOverview: React.FC<HeroOverviewProps> = ({
  politicians,
  onSelectPolitician,
  onOpenAllIndiaDirectory,
  onOpenTransparencyGuide,
  onNavigateToView,
  onStartComparison,
  onFilterStatements
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  // Autocomplete matching across 543 politicians
  const matchedPoliticians = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    const tokens = q.split(/\s+/).filter(Boolean);

    return politicians.filter((p) => {
      const name = p.name.toLowerCase();
      const hindiName = (p.hindiName || '').toLowerCase();
      const party = p.party.toLowerCase();
      const partyAbbr = p.partyAbbr.toLowerCase();
      const constituency = p.constituency.toLowerCase();
      const state = p.state.toLowerCase();
      const role = (p.currentRole || '').toLowerCase();
      const combined = `${name} ${hindiName} ${party} ${partyAbbr} ${constituency} ${state} ${role}`;
      return tokens.every((token) => combined.includes(token));
    }).slice(0, 6);
  }, [politicians, searchQuery]);

  // Handle Enter or Click on Search
  const handleExecuteSearch = (queryText: string) => {
    if (!queryText.trim()) return;

    // Run Natural Language Parser
    const parsed = parseNaturalLanguageQuery(queryText, politicians);

    if (parsed.type === 'compare' && parsed.politicians && parsed.politicians.length >= 2) {
      if (onStartComparison) {
        onStartComparison(parsed.politicians);
      } else if (onNavigateToView) {
        onNavigateToView('compare');
      }
      setIsFocused(false);
      return;
    }

    if (parsed.type === 'statements') {
      if (onFilterStatements && parsed.statementTopic) {
        onFilterStatements(parsed.statementTopic);
      }
      if (onNavigateToView) {
        onNavigateToView('statements');
      }
      setIsFocused(false);
      return;
    }

    if (parsed.type === 'navigate' && parsed.viewMode && onNavigateToView) {
      onNavigateToView(parsed.viewMode);
      setIsFocused(false);
      return;
    }

    if (parsed.type === 'select-politician' && parsed.selectedPolitician) {
      onSelectPolitician(parsed.selectedPolitician);
      setIsFocused(false);
      return;
    }

    // Fallback: match top autocomplete item or open directory
    if (matchedPoliticians.length > 0) {
      onSelectPolitician(matchedPoliticians[0]);
    } else if (onOpenAllIndiaDirectory) {
      onOpenAllIndiaDirectory();
    }
    setIsFocused(false);
  };

  // Sample Research Queries
  const researchQueries = [
    {
      label: 'Compare Amit Shah, Rahul Gandhi and Shivraj Singh Chouhan',
      action: () => handleExecuteSearch('Compare Amit Shah, Rahul Gandhi and Shivraj Singh Chouhan')
    },
    {
      label: 'Compare public statements on agriculture & MSP',
      action: () => handleExecuteSearch('Compare statements on agriculture')
    },
    {
      label: 'Show parliamentary activity & attendance only',
      action: () => handleExecuteSearch('Show parliamentary activity only')
    },
    {
      label: 'Inspect 251 Disclosed Criminal Charges & Court Registry',
      action: () => onNavigateToView && onNavigateToView('legal-registry')
    }
  ];

  return (
    <section className="relative w-full pt-4 pb-6 border-b border-[#18181b]/15 space-y-6">
      
      {/* Top Banner: Verification Standard & Reporting Period */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#f5f1e8] border border-[#18181b]/15 rounded-xl px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-xs font-mono font-bold text-[#18181b] uppercase tracking-wider">
            Evidence-First Civic Research Platform
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs text-[#52525b] font-mono">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-[#18181b]" />
            <span>Scope: {DATA_FRESHNESS_INFO.reportingPeriod}</span>
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">Sources: Sansad Hansard, ECI Form 26, MoSPI</span>
        </div>
      </div>

      {/* Main Title & Objective Subtitle */}
      <div className="text-center max-w-4xl mx-auto px-2 space-y-2">
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#18181b] leading-[1.12]">
          Independent Civic Research & Parliamentary Evidence
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-[#52525b] max-w-2xl mx-auto leading-relaxed">
          Search, compare, and verify parliamentary attendance, legislative interventions, sworn affidavits, and public statements with direct links to official records.
        </p>
      </div>

      {/* Prominent Natural Language Search Input */}
      <div className="max-w-3xl mx-auto px-2">
        <div className="relative">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleExecuteSearch(searchQuery);
            }}
            className="flex items-center border-2 border-[#18181b] bg-white rounded-2xl p-1.5 shadow-[0_2px_8px_rgba(24,24,27,0.06)] hover:border-[#c44d31] transition"
          >
            <div className="pl-3 pr-2 text-[#71717a]">
              <Search className="h-4 w-4 text-[#18181b]" />
            </div>

            <input
              ref={searchRef}
              type="text"
              placeholder='Search leader, constituency, or try "Compare Amit Shah, Rahul Gandhi and Shivraj"...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 250)}
              className="flex-1 bg-transparent py-2 text-xs sm:text-sm font-medium text-[#18181b] placeholder-[#8a8479] focus:outline-none"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  searchRef.current?.focus();
                }}
                className="p-1.5 text-[#71717a] hover:text-[#18181b] cursor-pointer mr-1"
              >
                <X className="h-4 w-4" />
              </button>
            )}

            <button
              type="submit"
              className="bg-[#18181b] text-white px-4 sm:px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#c44d31] transition flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>Search</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>

          {/* Autocomplete Dropdown */}
          {isFocused && searchQuery.trim() && (
            <div className="absolute left-0 right-0 top-full mt-2 overflow-hidden rounded-xl border border-[#18181b]/20 bg-white p-2 shadow-2xl z-50 animate-in fade-in duration-150">
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#71717a] border-b border-[#18181b]/10 flex justify-between items-center">
                <span>Matched Parliamentarians ({matchedPoliticians.length})</span>
                <span className="text-[9px] text-[#8a8479]">Click or press Enter</span>
              </div>
              {matchedPoliticians.length > 0 ? (
                <div className="divide-y divide-[#18181b]/10 max-h-72 overflow-y-auto">
                  {matchedPoliticians.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        onSelectPolitician(p);
                        setIsFocused(false);
                      }}
                      className="w-full flex items-center gap-3 p-2.5 text-left hover:bg-[#f1ede4] transition-colors rounded-lg group cursor-pointer"
                    >
                      <div className="h-9 w-9 overflow-hidden rounded-lg border border-[#18181b]/20 bg-[#f1ede4] shrink-0">
                        <PoliticianImage name={p.name} photoUrl={p.photo} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-xs sm:text-sm font-serif font-bold text-[#18181b] group-hover:text-[#c44d31] transition truncate">
                            {p.name}
                          </p>
                          <span
                            className="text-[9px] font-bold px-1.5 py-0.2 rounded"
                            style={{ backgroundColor: `${p.partyColor}20`, color: p.partyColor }}
                          >
                            {p.partyAbbr}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#52525b] truncate">{p.constituency}, {p.state} • {p.currentRole || 'MP'}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-[#8a8479] group-hover:text-[#18181b] transition" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-3 text-center text-xs text-[#52525b] space-y-1">
                  <p>No exact name match for "{searchQuery}".</p>
                  <p className="text-[11px] text-[#71717a]">
                    Press <strong>Search</strong> to analyze this query with our natural-language parser.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Suggested Queries */}
        <div className="pt-3 flex flex-wrap items-center justify-center gap-1.5 text-[11px]">
          <span className="text-[#71717a] font-mono font-bold uppercase tracking-wider mr-1">
            Suggested Research:
          </span>
          {researchQueries.map((rq, idx) => (
            <button
              key={idx}
              onClick={rq.action}
              className="bg-[#f5f1e8] hover:bg-[#18181b] text-[#18181b] hover:text-white border border-[#18181b]/15 px-2.5 py-1 rounded-full transition cursor-pointer text-[10.5px] font-medium"
            >
              {rq.label}
            </button>
          ))}
        </div>
      </div>

      {/* Primary Research Task Hub (5 Core Pillars) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 max-w-6xl mx-auto pt-2">
        
        {/* 1. Compare Leaders */}
        <button
          onClick={() => onNavigateToView && onNavigateToView('compare')}
          className="bg-[#fdfcfa] border border-[#18181b]/20 hover:border-[#18181b] p-3.5 sm:p-4 rounded-xl text-left transition hover:shadow-xs cursor-pointer group"
        >
          <div className="flex items-center justify-between text-[#18181b] mb-1.5">
            <Scale className="h-4 w-4 text-[#c44d31] group-hover:scale-110 transition" />
            <ArrowRight className="h-3 w-3 text-[#71717a] group-hover:translate-x-0.5 transition" />
          </div>
          <h3 className="font-serif font-bold text-xs sm:text-sm text-[#18181b]">Compare Leaders</h3>
          <p className="text-[10.5px] text-[#71717a] mt-0.5 leading-tight">Side-by-side Hansard & Form 26 matrix</p>
        </button>

        {/* 2. Public Statements */}
        <button
          onClick={() => onNavigateToView && onNavigateToView('statements')}
          className="bg-[#fdfcfa] border border-[#18181b]/20 hover:border-[#18181b] p-3.5 sm:p-4 rounded-xl text-left transition hover:shadow-xs cursor-pointer group"
        >
          <div className="flex items-center justify-between text-[#18181b] mb-1.5">
            <MessageSquare className="h-4 w-4 text-[#18181b] group-hover:scale-110 transition" />
            <ArrowRight className="h-3 w-3 text-[#71717a] group-hover:translate-x-0.5 transition" />
          </div>
          <h3 className="font-serif font-bold text-xs sm:text-sm text-[#18181b]">Public Statements</h3>
          <p className="text-[10.5px] text-[#71717a] mt-0.5 leading-tight">Dated quotes by topic & official source</p>
        </button>

        {/* 3. Browse 543 Constituencies */}
        <button
          onClick={() => onNavigateToView && onNavigateToView('map')}
          className="bg-[#fdfcfa] border border-[#18181b]/20 hover:border-[#18181b] p-3.5 sm:p-4 rounded-xl text-left transition hover:shadow-xs cursor-pointer group"
        >
          <div className="flex items-center justify-between text-[#18181b] mb-1.5">
            <Map className="h-4 w-4 text-[#18181b] group-hover:scale-110 transition" />
            <ArrowRight className="h-3 w-3 text-[#71717a] group-hover:translate-x-0.5 transition" />
          </div>
          <h3 className="font-serif font-bold text-xs sm:text-sm text-[#18181b]">543 Constituencies</h3>
          <p className="text-[10.5px] text-[#71717a] mt-0.5 leading-tight">Interactive map & state parliamentary stats</p>
        </button>

        {/* 4. Hansard Ledger */}
        <button
          onClick={() => onNavigateToView && onNavigateToView('table')}
          className="bg-[#fdfcfa] border border-[#18181b]/20 hover:border-[#18181b] p-3.5 sm:p-4 rounded-xl text-left transition hover:shadow-xs cursor-pointer group"
        >
          <div className="flex items-center justify-between text-[#18181b] mb-1.5">
            <Landmark className="h-4 w-4 text-[#18181b] group-hover:scale-110 transition" />
            <ArrowRight className="h-3 w-3 text-[#71717a] group-hover:translate-x-0.5 transition" />
          </div>
          <h3 className="font-serif font-bold text-xs sm:text-sm text-[#18181b]">Parliamentary Ledger</h3>
          <p className="text-[10.5px] text-[#71717a] mt-0.5 leading-tight">Sortable attendance & debates database</p>
        </button>

        {/* 5. Methodology & Sources */}
        <button
          onClick={() => onNavigateToView && onNavigateToView('methodology')}
          className="bg-[#fdfcfa] border border-[#18181b]/20 hover:border-[#18181b] p-3.5 sm:p-4 rounded-xl text-left transition hover:shadow-xs cursor-pointer group col-span-2 sm:col-span-1"
        >
          <div className="flex items-center justify-between text-[#18181b] mb-1.5">
            <BookOpen className="h-4 w-4 text-emerald-700 group-hover:scale-110 transition" />
            <ArrowRight className="h-3 w-3 text-[#71717a] group-hover:translate-x-0.5 transition" />
          </div>
          <h3 className="font-serif font-bold text-xs sm:text-sm text-[#18181b]">Methodology & Audit</h3>
          <p className="text-[10.5px] text-[#71717a] mt-0.5 leading-tight">Calculation formulas & source links</p>
        </button>

      </div>

    </section>
  );
};
