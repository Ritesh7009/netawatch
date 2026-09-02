import React, { useState, useMemo } from 'react';
import { 
  Scale, 
  Search, 
  Filter, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  ShieldAlert, 
  FileText, 
  Download, 
  ExternalLink, 
  ChevronRight, 
  ArrowUpDown,
  Building,
  Gavel,
  Calendar,
  X,
  Layers,
  Sparkles
} from 'lucide-react';
import { Politician, LegalCase, LegalCaseCategory, CaseTemporalStatus, Alliance } from '../types';
import { PoliticianImage } from './PoliticianImage';

interface EnrichedLegalCase {
  politician: Politician;
  caseData: LegalCase;
  inferredTemporal: 'Current' | 'Previous';
}

interface LegalRegistryViewProps {
  politicians: Politician[];
  onSelectPolitician: (p: Politician) => void;
  onBackToOverview?: () => void;
}

export const LegalRegistryView: React.FC<LegalRegistryViewProps> = ({
  politicians,
  onSelectPolitician,
  onBackToOverview,
}) => {
  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [temporalFilter, setTemporalFilter] = useState<'all' | 'Current' | 'Previous'>('all');
  const [judicialStatusFilter, setJudicialStatusFilter] = useState<string>('all');
  const [caseTypeFilter, setCaseTypeFilter] = useState<string>('all');
  const [seriousnessFilter, setSeriousnessFilter] = useState<'all' | 'serious' | 'non-serious'>('all');
  const [allianceFilter, setAllianceFilter] = useState<string>('all');
  const [partyFilter, setPartyFilter] = useState<string>('all');
  const [courtLevelFilter, setCourtLevelFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'oldest' | 'politician-az' | 'serious-first'>('recent');
  const [displayMode, setDisplayMode] = useState<'cards' | 'table'>('cards');

  // Flatten all legal cases across politicians
  const allCases: EnrichedLegalCase[] = useMemo(() => {
    const list: EnrichedLegalCase[] = [];

    politicians.forEach((p) => {
      const details = p.criminalRecords?.details || [];
      details.forEach((c) => {
        const isDisposedOrAcquitted = 
          c.status.toLowerCase().includes('disposed') ||
          c.status.toLowerCase().includes('acquitted') ||
          c.status.toLowerCase().includes('quashed') ||
          c.status.toLowerCase().includes('discharged');

        const inferredTemporal: 'Current' | 'Previous' = c.temporalStatus 
          ? c.temporalStatus 
          : isDisposedOrAcquitted 
          ? 'Previous' 
          : 'Current';

        list.push({
          politician: p,
          caseData: c,
          inferredTemporal,
        });
      });
    });

    return list;
  }, [politicians]);

  // Derive unique filter options
  const uniqueParties = useMemo(() => {
    return Array.from(new Set(allCases.map((item) => item.politician.partyAbbr))).sort();
  }, [allCases]);

  const uniqueJudicialStatuses = useMemo(() => {
    return Array.from(new Set(allCases.map((item) => item.caseData.status))).sort();
  }, [allCases]);

  const uniqueCaseTypes = useMemo(() => {
    const types = new Set<string>();
    allCases.forEach((item) => {
      if (item.caseData.caseType) types.add(item.caseData.caseType);
    });
    return Array.from(types).sort();
  }, [allCases]);

  const uniqueCourtLevels = useMemo(() => {
    const courts = new Set<string>();
    allCases.forEach((item) => {
      if (item.caseData.courtLevel) courts.add(item.caseData.courtLevel);
    });
    return Array.from(courts).sort();
  }, [allCases]);

  // Filter & Sort
  const filteredCases = useMemo(() => {
    return allCases.filter((item) => {
      const { politician, caseData, inferredTemporal } = item;
      const q = searchQuery.toLowerCase().trim();

      // Search Query
      if (q) {
        const matchName = politician.name.toLowerCase().includes(q) || (politician.hindiName && politician.hindiName.includes(q));
        const matchParty = politician.partyAbbr.toLowerCase().includes(q) || politician.party.toLowerCase().includes(q);
        const matchConstituency = politician.constituency.toLowerCase().includes(q) || politician.state.toLowerCase().includes(q);
        const matchCaseNum = caseData.caseNumber.toLowerCase().includes(q);
        const matchCourt = caseData.court.toLowerCase().includes(q);
        const matchDesc = caseData.description.toLowerCase().includes(q);
        const matchSummary = caseData.summaryTag ? caseData.summaryTag.toLowerCase().includes(q) : false;
        const matchIpc = caseData.ipcSections.some((s) => s.toLowerCase().includes(q));
        const matchBns = caseData.bnsEquivalent ? caseData.bnsEquivalent.toLowerCase().includes(q) : false;
        const matchTags = caseData.tags ? caseData.tags.some((t) => t.toLowerCase().includes(q)) : false;

        if (!matchName && !matchParty && !matchConstituency && !matchCaseNum && !matchCourt && !matchDesc && !matchSummary && !matchIpc && !matchBns && !matchTags) {
          return false;
        }
      }

      // Temporal Filter
      if (temporalFilter !== 'all' && inferredTemporal !== temporalFilter) {
        return false;
      }

      // Judicial Status Filter
      if (judicialStatusFilter !== 'all' && caseData.status !== judicialStatusFilter) {
        return false;
      }

      // Case Nature / Category
      if (caseTypeFilter !== 'all' && caseData.caseType !== caseTypeFilter) {
        return false;
      }

      // Seriousness Filter
      if (seriousnessFilter === 'serious' && !caseData.isSerious) return false;
      if (seriousnessFilter === 'non-serious' && caseData.isSerious) return false;

      // Alliance Filter
      if (allianceFilter !== 'all' && politician.alliance !== allianceFilter) return false;

      // Party Filter
      if (partyFilter !== 'all' && politician.partyAbbr !== partyFilter) return false;

      // Court Level
      if (courtLevelFilter !== 'all' && caseData.courtLevel !== courtLevelFilter) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'recent') {
        const yearA = a.caseData.yearFiled || 2000;
        const yearB = b.caseData.yearFiled || 2000;
        return yearB - yearA;
      }
      if (sortBy === 'oldest') {
        const yearA = a.caseData.yearFiled || 2000;
        const yearB = b.caseData.yearFiled || 2000;
        return yearA - yearB;
      }
      if (sortBy === 'politician-az') {
        return a.politician.name.localeCompare(b.politician.name);
      }
      if (sortBy === 'serious-first') {
        if (a.caseData.isSerious === b.caseData.isSerious) {
          return (b.caseData.yearFiled || 0) - (a.caseData.yearFiled || 0);
        }
        return a.caseData.isSerious ? -1 : 1;
      }
      return 0;
    });
  }, [
    allCases,
    searchQuery,
    temporalFilter,
    judicialStatusFilter,
    caseTypeFilter,
    seriousnessFilter,
    allianceFilter,
    partyFilter,
    courtLevelFilter,
    sortBy
  ]);

  // Aggregate Metrics
  const stats = useMemo(() => {
    const total = allCases.length;
    const current = allCases.filter((c) => c.inferredTemporal === 'Current').length;
    const previous = allCases.filter((c) => c.inferredTemporal === 'Previous').length;
    const serious = allCases.filter((c) => c.caseData.isSerious).length;
    const stayed = allCases.filter((c) => c.caseData.status.toLowerCase().includes('stayed')).length;
    const agitation = allCases.filter((c) => c.caseData.caseType === 'Political Protest & Agitation' || c.caseData.caseType === 'Defamation & Speech').length;
    
    // Unique MPs with at least one record
    const mpsWithRecords = new Set(allCases.map((c) => c.politician.id)).size;

    return {
      total,
      current,
      previous,
      serious,
      stayed,
      agitation,
      mpsWithRecords,
    };
  }, [allCases]);

  // Export to CSV Function
  const handleExportCSV = () => {
    const headers = [
      'Politician Name',
      'Party',
      'Alliance',
      'Constituency',
      'State',
      'House',
      'Case Number',
      'Jurisdictional Court',
      'Court Level',
      'Judicial Status',
      'Temporal Stage',
      'Case Nature / Category',
      'Serious Offence',
      'Year Filed',
      'Year Resolved',
      'IPC / Special Law Sections',
      'BNS Equivalent',
      'Case Summary / Allegations',
    ];

    const rows = filteredCases.map((item) => [
      `"${item.politician.name}"`,
      `"${item.politician.partyAbbr}"`,
      `"${item.politician.alliance}"`,
      `"${item.politician.constituency}"`,
      `"${item.politician.state}"`,
      `"${item.politician.house}"`,
      `"${item.caseData.caseNumber.replace(/"/g, '""')}"`,
      `"${item.caseData.court.replace(/"/g, '""')}"`,
      `"${item.caseData.courtLevel || 'Trial Court'}"`,
      `"${item.caseData.status}"`,
      `"${item.inferredTemporal}"`,
      `"${item.caseData.caseType || 'General'}"`,
      `"${item.caseData.isSerious ? 'Yes (Serious IPC)' : 'No (Non-Serious / Agitation)'}"`,
      `"${item.caseData.yearFiled || ''}"`,
      `"${item.caseData.yearResolved || ''}"`,
      `"${item.caseData.ipcSections.join(', ')}"`,
      `"${item.caseData.bnsEquivalent || ''}"`,
      `"${item.caseData.description.replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `parliamentary_legal_cases_ledger_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isAnyFilterActive = 
    searchQuery.trim() !== '' ||
    temporalFilter !== 'all' ||
    judicialStatusFilter !== 'all' ||
    caseTypeFilter !== 'all' ||
    seriousnessFilter !== 'all' ||
    allianceFilter !== 'all' ||
    partyFilter !== 'all' ||
    courtLevelFilter !== 'all' ||
    sortBy !== 'recent';

  const resetFilters = () => {
    setSearchQuery('');
    setTemporalFilter('all');
    setJudicialStatusFilter('all');
    setCaseTypeFilter('all');
    setSeriousnessFilter('all');
    setAllianceFilter('all');
    setPartyFilter('all');
    setCourtLevelFilter('all');
    setSortBy('recent');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Editorial Banner */}
      <div className="relative overflow-hidden border border-[#18181b]/15 bg-white p-5 sm:p-7 rounded-sm shadow-xs">
        <div className="pointer-events-none absolute -right-6 -bottom-6 font-serif text-8xl font-black text-[#18181b]/[0.03] select-none tracking-tighter">
          LEDGER
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="max-w-3xl space-y-2.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 border border-[#18181b]/20 bg-[#f1ede4] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#18181b] rounded-xs">
                <Scale className="h-3 w-3 text-[#c44d31]" />
                Official ECI Form 26 & High Court / Supreme Court Judicial Ledger
              </span>
              <span className="bg-[#18181b] text-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-xs">
                All 18th Lok Sabha & Rajya Sabha MPs
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-[#18181b]">
              Parliamentary Legal Cases & Judicial Proceedings Ledger
            </h1>

            <p className="text-xs sm:text-sm text-[#52525b] leading-relaxed">
              Consolidated registry indexing <strong>all cases (active, pending investigation, stayed, acquitted, discharged, and historical)</strong> declared in sworn candidate affidavits across the Indian Parliament, cross-referenced with modern <em>Bharatiya Nyaya Sanhita (BNS)</em> criminal code mappings.
            </p>
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center gap-2 self-start">
            <button
              onClick={handleExportCSV}
              id="export-legal-cases-csv"
              className="flex items-center gap-1.5 border border-[#18181b] bg-[#18181b] px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#c44d31] hover:border-[#c44d31] transition rounded-xs shadow-xs"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export CSV ({filteredCases.length})</span>
            </button>
            {onBackToOverview && (
              <button
                onClick={onBackToOverview}
                className="flex items-center gap-1 border border-[#18181b]/20 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#18181b] hover:bg-[#f1ede4] transition rounded-xs"
              >
                <span>Back to Overview</span>
              </button>
            )}
          </div>
        </div>

        {/* Macro KPI Strip */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 border-t border-[#18181b]/10 pt-4">
          <div className="bg-[#faf9f6] border border-[#18181b]/10 p-2.5 rounded-xs">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#71717a]">Total Documented Cases</div>
            <div className="mt-1 font-serif text-xl font-bold text-[#18181b]">{stats.total}</div>
            <div className="text-[10px] text-[#71717a]">Across {stats.mpsWithRecords} Parliamentarians</div>
          </div>

          <div className="bg-[#faf9f6] border border-[#c44d31]/20 p-2.5 rounded-xs">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#c44d31]">Active / Current</div>
            <div className="mt-1 font-serif text-xl font-bold text-[#c44d31]">{stats.current}</div>
            <div className="text-[10px] text-[#71717a]">Under Trial or Investigation</div>
          </div>

          <div className="bg-[#faf9f6] border border-[#1b6b47]/20 p-2.5 rounded-xs">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#1b6b47]">Disposed / Acquitted</div>
            <div className="mt-1 font-serif text-xl font-bold text-[#1b6b47]">{stats.previous}</div>
            <div className="text-[10px] text-[#71717a]">Discharged, quashed, or closed</div>
          </div>

          <div className="bg-[#faf9f6] border border-[#d97706]/20 p-2.5 rounded-xs">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#d97706]">Stayed by HC / SC</div>
            <div className="mt-1 font-serif text-xl font-bold text-[#d97706]">{stats.stayed}</div>
            <div className="text-[10px] text-[#71717a]">Appellate court stay in effect</div>
          </div>

          <div className="bg-[#faf9f6] border border-[#18181b]/10 p-2.5 rounded-xs">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#71717a]">Serious IPC Sections</div>
            <div className="mt-1 font-serif text-xl font-bold text-[#18181b]">{stats.serious}</div>
            <div className="text-[10px] text-[#71717a]">Max penalty ≥ 5 years</div>
          </div>

          <div className="bg-[#faf9f6] border border-[#18181b]/10 p-2.5 rounded-xs">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#71717a]">Agitation & Speech</div>
            <div className="mt-1 font-serif text-xl font-bold text-[#18181b]">{stats.agitation}</div>
            <div className="text-[10px] text-[#71717a]">Protest & Defamation cases</div>
          </div>
        </div>
      </div>

      {/* Filter Toolbar Card */}
      <div className="border border-[#18181b]/15 bg-white p-4 rounded-sm shadow-xs space-y-4">
        {/* Search Bar & Mode Switcher */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#71717a]" />
            <input
              type="text"
              id="legal-registry-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by MP name, court, case ID, IPC / BNS section, or keyword..."
              className="w-full rounded-xs border border-[#18181b]/20 bg-white py-1.5 pl-9 pr-9 text-xs sm:text-sm font-medium text-[#18181b] placeholder-[#8a8479] focus:outline-none focus:border-[#18181b]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#71717a] hover:text-[#18181b]"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle: Cards vs Table */}
            <div className="flex items-center border border-[#18181b]/20 p-0.5 bg-[#f1ede4] rounded-xs">
              <button
                onClick={() => setDisplayMode('cards')}
                className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition ${
                  displayMode === 'cards' ? 'bg-[#18181b] text-white shadow-2xs' : 'text-[#52525b] hover:text-[#18181b]'
                }`}
              >
                Detailed Dossier Cards
              </button>
              <button
                onClick={() => setDisplayMode('table')}
                className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition ${
                  displayMode === 'table' ? 'bg-[#18181b] text-white shadow-2xs' : 'text-[#52525b] hover:text-[#18181b]'
                }`}
              >
                Compact Audit Table
              </button>
            </div>
          </div>
        </div>

        {/* Dropdown Filters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2 text-xs">
          {/* 1. Temporal Filter */}
          <div className="space-y-1">
            <label className="text-[9px] font-bold uppercase tracking-wider text-[#71717a]">Stage</label>
            <select
              value={temporalFilter}
              onChange={(e) => setTemporalFilter(e.target.value as any)}
              className="w-full border border-[#18181b]/20 bg-white p-1.5 text-xs text-[#18181b] focus:outline-none focus:border-[#18181b] rounded-xs"
            >
              <option value="all">All Stages ({allCases.length})</option>
              <option value="Current">Active / Current ({stats.current})</option>
              <option value="Previous">Previous / Disposed ({stats.previous})</option>
            </select>
          </div>

          {/* 2. Judicial Status */}
          <div className="space-y-1">
            <label className="text-[9px] font-bold uppercase tracking-wider text-[#71717a]">Judicial Status</label>
            <select
              value={judicialStatusFilter}
              onChange={(e) => setJudicialStatusFilter(e.target.value)}
              className="w-full border border-[#18181b]/20 bg-white p-1.5 text-xs text-[#18181b] focus:outline-none focus:border-[#18181b] rounded-xs"
            >
              <option value="all">All Statuses</option>
              {uniqueJudicialStatuses.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          {/* 3. Case Nature / Category */}
          <div className="space-y-1">
            <label className="text-[9px] font-bold uppercase tracking-wider text-[#71717a]">Case Nature</label>
            <select
              value={caseTypeFilter}
              onChange={(e) => setCaseTypeFilter(e.target.value)}
              className="w-full border border-[#18181b]/20 bg-white p-1.5 text-xs text-[#18181b] focus:outline-none focus:border-[#18181b] rounded-xs"
            >
              <option value="all">All Categories</option>
              {uniqueCaseTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* 4. Seriousness */}
          <div className="space-y-1">
            <label className="text-[9px] font-bold uppercase tracking-wider text-[#71717a]">IPC Seriousness</label>
            <select
              value={seriousnessFilter}
              onChange={(e) => setSeriousnessFilter(e.target.value as any)}
              className="w-full border border-[#18181b]/20 bg-white p-1.5 text-xs text-[#18181b] focus:outline-none focus:border-[#18181b] rounded-xs"
            >
              <option value="all">All Offences</option>
              <option value="serious">Serious IPC Only ({stats.serious})</option>
              <option value="non-serious">Non-Serious / Agitation ({stats.total - stats.serious})</option>
            </select>
          </div>

          {/* 5. Alliance */}
          <div className="space-y-1">
            <label className="text-[9px] font-bold uppercase tracking-wider text-[#71717a]">Coalition</label>
            <select
              value={allianceFilter}
              onChange={(e) => setAllianceFilter(e.target.value)}
              className="w-full border border-[#18181b]/20 bg-white p-1.5 text-xs text-[#18181b] focus:outline-none focus:border-[#18181b] rounded-xs"
            >
              <option value="all">All Coalitions</option>
              <option value="NDA">NDA Coalition</option>
              <option value="INDIA">INDIA Coalition</option>
              <option value="Others">Independent / Others</option>
            </select>
          </div>

          {/* 6. Party */}
          <div className="space-y-1">
            <label className="text-[9px] font-bold uppercase tracking-wider text-[#71717a]">Party</label>
            <select
              value={partyFilter}
              onChange={(e) => setPartyFilter(e.target.value)}
              className="w-full border border-[#18181b]/20 bg-white p-1.5 text-xs text-[#18181b] focus:outline-none focus:border-[#18181b] rounded-xs"
            >
              <option value="all">All Parties</option>
              {uniqueParties.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* 7. Sort By */}
          <div className="space-y-1">
            <label className="text-[9px] font-bold uppercase tracking-wider text-[#71717a]">Sort Order</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full border border-[#18181b]/20 bg-white p-1.5 text-xs text-[#18181b] focus:outline-none focus:border-[#18181b] rounded-xs"
            >
              <option value="recent">Year (Newest First)</option>
              <option value="oldest">Year (Oldest First)</option>
              <option value="serious-first">Serious Offences First</option>
              <option value="politician-az">Politician Name (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Filter Summary & Reset */}
        <div className="flex items-center justify-between border-t border-[#18181b]/10 pt-2.5 text-xs text-[#71717a]">
          <div>
            Showing <strong className="text-[#18181b] font-bold">{filteredCases.length}</strong> of {allCases.length} parliamentary legal proceedings
          </div>
          {isAnyFilterActive && (
            <button
              onClick={resetFilters}
              className="text-xs font-bold text-[#c44d31] hover:underline"
            >
              Reset All Filters ×
            </button>
          )}
        </div>
      </div>

      {/* Main Results View */}
      {filteredCases.length > 0 ? (
        displayMode === 'cards' ? (
          /* Cards Grid Feed */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredCases.map((item, idx) => {
              const { politician, caseData, inferredTemporal } = item;
              const isDisposed = 
                caseData.status.toLowerCase().includes('disposed') ||
                caseData.status.toLowerCase().includes('acquitted') ||
                caseData.status.toLowerCase().includes('quashed') ||
                caseData.status.toLowerCase().includes('discharged');
              const isStayed = caseData.status.toLowerCase().includes('stayed');

              return (
                <div
                  key={`${politician.id}-${caseData.caseNumber}-${idx}`}
                  className="border-2 border-[#18181b]/15 bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-xs hover:shadow-md hover:border-[#18181b]/50 transition-all duration-200 space-y-4 hover:-translate-y-0.5"
                >
                  {/* Card Header: Politician Info & Judicial Status */}
                  <div className="flex items-start justify-between gap-3 border-b border-[#18181b]/10 pb-3">
                    {/* Politician Identity */}
                    <div 
                      onClick={() => onSelectPolitician(politician)}
                      className="flex items-center gap-3.5 cursor-pointer group"
                    >
                      <div className="h-12 w-12 overflow-hidden border border-[#18181b]/20 bg-[#f1ede4] rounded-xl shrink-0 group-hover:border-[#c44d31] transition shadow-2xs">
                        <PoliticianImage
                          src={politician.photo}
                          alt={politician.name}
                          name={politician.name}
                          partyColor={politician.partyColor}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-serif font-bold text-base text-[#18181b] group-hover:text-[#c44d31] transition">
                            {politician.name}
                          </h3>
                          {politician.hindiName && (
                            <span className="text-[10px] text-[#71717a] hidden sm:inline">
                              ({politician.hindiName})
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] text-[#71717a] mt-0.5">
                          <span 
                            className="font-bold px-1.5 py-0.5 rounded-xs text-white"
                            style={{ backgroundColor: politician.partyColor }}
                          >
                            {politician.partyAbbr}
                          </span>
                          <span>•</span>
                          <span>{politician.constituency}, {politician.state}</span>
                          <span>•</span>
                          <span>{politician.house}</span>
                        </div>
                      </div>
                    </div>

                    {/* Status Pill */}
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className={`px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider border rounded-xs ${
                        isStayed
                          ? 'border-[#d97706]/40 bg-[#d97706]/10 text-[#d97706]'
                          : isDisposed
                          ? 'border-[#1b6b47]/40 bg-[#1b6b47]/10 text-[#1b6b47]'
                          : 'border-[#c44d31]/40 bg-[#c44d31]/10 text-[#c44d31]'
                      }`}>
                        {caseData.status}
                      </span>
                      <span className="text-[9px] font-bold text-[#71717a] uppercase">
                        {inferredTemporal === 'Current' ? 'Active Proceeding' : 'Historical Record'}
                      </span>
                    </div>
                  </div>

                  {/* Case Nature Badges */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {caseData.caseType && (
                      <span className="border border-[#18181b]/15 bg-[#f1ede4] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#18181b] rounded-xs">
                        {caseData.caseType}
                      </span>
                    )}

                    {caseData.courtLevel && (
                      <span className="border border-[#18181b]/15 bg-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#71717a] rounded-xs">
                        {caseData.courtLevel}
                      </span>
                    )}

                    {caseData.isSerious ? (
                      <span className="border border-[#c44d31] bg-[#c44d31] text-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-xs">
                        Serious IPC Offence
                      </span>
                    ) : (
                      <span className="border border-[#18181b]/15 bg-white text-[#71717a] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-xs">
                        Non-Serious / Agitation
                      </span>
                    )}
                  </div>

                  {/* Summary & Details */}
                  <div className="space-y-1">
                    {caseData.summaryTag && (
                      <h4 className="font-serif font-bold text-sm text-[#18181b]">
                        {caseData.summaryTag}
                      </h4>
                    )}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] font-mono text-[#71717a]">
                      <span><strong>Case ID:</strong> {caseData.caseNumber}</span>
                      {caseData.yearFiled && <span><strong>Filed:</strong> {caseData.yearFiled}</span>}
                      {caseData.yearResolved && <span><strong>Resolved:</strong> {caseData.yearResolved}</span>}
                    </div>
                    <p className="text-xs text-[#2c2925] leading-relaxed pt-1">
                      {caseData.description}
                    </p>
                  </div>

                  {/* Jurisdictional Forum */}
                  <div className="bg-[#faf9f6] border border-[#18181b]/10 p-2.5 text-xs text-[#71717a] flex items-start gap-2 rounded-xs">
                    <Scale className="h-4 w-4 text-[#71717a] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#18181b]">Jurisdictional Court:</strong> {caseData.court}
                    </div>
                  </div>

                  {/* Statutory IPC & BNS Sections */}
                  <div className="space-y-1 pt-1 border-t border-[#18181b]/10">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-[#71717a]">
                        IPC / Special Sections:
                      </span>
                      {caseData.ipcSections.map((sec, sIdx) => (
                        <span
                          key={sIdx}
                          className="border border-[#c44d31]/30 bg-[#c44d31]/10 px-1.5 py-0.2 text-[9px] font-mono font-bold text-[#c44d31] rounded-xs"
                        >
                          {sec}
                        </span>
                      ))}
                    </div>

                    {caseData.bnsEquivalent && (
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-[#1b6b47]">
                          BNS Criminal Code:
                        </span>
                        <span className="border border-[#1b6b47]/30 bg-[#1b6b47]/10 px-1.5 py-0.2 text-[9px] font-mono font-bold text-[#1b6b47] rounded-xs">
                          {caseData.bnsEquivalent}
                        </span>
                      </div>
                    )}

                    {/* Tags */}
                    {caseData.tags && caseData.tags.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1 pt-1">
                        {caseData.tags.map((tg, tgIdx) => (
                          <span
                            key={tgIdx}
                            className="border border-[#18181b]/10 bg-[#f1ede4] px-1.5 py-0.2 text-[8px] font-mono text-[#52525b] rounded-xs"
                          >
                            #{tg}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Footer Card Action */}
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => onSelectPolitician(politician)}
                      className="text-[11px] font-bold uppercase tracking-wider text-[#18181b] hover:text-[#c44d31] flex items-center gap-1 transition"
                    >
                      <span>Inspect {politician.name.split(' ')[0]}'s Full Dossier</span>
                      <ChevronRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Tabular Audit Mode */
          <div className="border border-[#18181b]/15 bg-white overflow-x-auto rounded-sm shadow-xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#f1ede4] border-b border-[#18181b]/15 text-[10px] font-bold uppercase tracking-wider text-[#18181b]">
                  <th className="p-3">Parliamentarian</th>
                  <th className="p-3">Party & State</th>
                  <th className="p-3">Case ID & Court</th>
                  <th className="p-3">Judicial Status</th>
                  <th className="p-3">Nature of Offence</th>
                  <th className="p-3">Statutory Sections (IPC & BNS)</th>
                  <th className="p-3">Seriousness</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#18181b]/10">
                {filteredCases.map((item, idx) => {
                  const { politician, caseData, inferredTemporal } = item;
                  const isDisposed = 
                    caseData.status.toLowerCase().includes('disposed') ||
                    caseData.status.toLowerCase().includes('acquitted') ||
                    caseData.status.toLowerCase().includes('quashed') ||
                    caseData.status.toLowerCase().includes('discharged');
                  const isStayed = caseData.status.toLowerCase().includes('stayed');

                  return (
                    <tr key={`${politician.id}-${caseData.caseNumber}-${idx}`} className="hover:bg-[#faf9f6] transition">
                      {/* MP */}
                      <td className="p-3 font-medium">
                        <div 
                          onClick={() => onSelectPolitician(politician)}
                          className="flex items-center gap-2 cursor-pointer group"
                        >
                          <div className="h-7 w-7 overflow-hidden border border-[#18181b]/15 bg-[#f1ede4] rounded-xs shrink-0">
                            <PoliticianImage
                              src={politician.photo}
                              alt={politician.name}
                              name={politician.name}
                              partyColor={politician.partyColor}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-serif font-bold text-[#18181b] group-hover:text-[#c44d31] transition">
                              {politician.name}
                            </div>
                            <div className="text-[9px] text-[#71717a]">
                              {politician.house}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Party & State */}
                      <td className="p-3">
                        <div className="flex items-center gap-1">
                          <span 
                            className="font-bold px-1 py-0.2 text-[9px] text-white rounded-2xs"
                            style={{ backgroundColor: politician.partyColor }}
                          >
                            {politician.partyAbbr}
                          </span>
                          <span className="text-[10px] text-[#71717a]">
                            ({politician.alliance})
                          </span>
                        </div>
                        <div className="text-[10px] text-[#71717a]">
                          {politician.constituency}, {politician.state}
                        </div>
                      </td>

                      {/* Case ID & Court */}
                      <td className="p-3 max-w-xs">
                        <div className="font-mono font-bold text-[#18181b] text-[11px]">
                          {caseData.caseNumber}
                        </div>
                        <div className="text-[10px] text-[#71717a] truncate" title={caseData.court}>
                          {caseData.court}
                        </div>
                        {caseData.yearFiled && (
                          <div className="text-[9px] text-[#71717a]">
                            Filed: {caseData.yearFiled} {caseData.yearResolved ? `• Resolved: ${caseData.yearResolved}` : ''}
                          </div>
                        )}
                      </td>

                      {/* Status */}
                      <td className="p-3">
                        <span className={`inline-block px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider border rounded-xs ${
                          isStayed
                            ? 'border-[#d97706]/40 bg-[#d97706]/10 text-[#d97706]'
                            : isDisposed
                            ? 'border-[#1b6b47]/40 bg-[#1b6b47]/10 text-[#1b6b47]'
                            : 'border-[#c44d31]/40 bg-[#c44d31]/10 text-[#c44d31]'
                        }`}>
                          {caseData.status}
                        </span>
                        <div className="text-[9px] text-[#71717a] mt-0.5">
                          {inferredTemporal === 'Current' ? 'Active' : 'Previous'}
                        </div>
                      </td>

                      {/* Nature */}
                      <td className="p-3">
                        <div className="text-[11px] font-medium text-[#18181b]">
                          {caseData.caseType || 'Other'}
                        </div>
                        {caseData.summaryTag && (
                          <div className="text-[10px] text-[#71717a] truncate max-w-[200px]" title={caseData.summaryTag}>
                            {caseData.summaryTag}
                          </div>
                        )}
                      </td>

                      {/* Sections */}
                      <td className="p-3 max-w-xs">
                        <div className="flex flex-wrap gap-1">
                          {caseData.ipcSections.map((s, sIdx) => (
                            <span key={sIdx} className="bg-[#c44d31]/10 text-[#c44d31] px-1 py-0.2 text-[9px] font-mono font-bold rounded-2xs">
                              {s}
                            </span>
                          ))}
                        </div>
                        {caseData.bnsEquivalent && (
                          <div className="text-[9px] font-mono text-[#1b6b47] mt-0.5 truncate" title={caseData.bnsEquivalent}>
                            {caseData.bnsEquivalent}
                          </div>
                        )}
                      </td>

                      {/* Seriousness */}
                      <td className="p-3">
                        {caseData.isSerious ? (
                          <span className="bg-[#c44d31] text-white px-1.5 py-0.5 text-[9px] font-bold uppercase rounded-xs">
                            Serious
                          </span>
                        ) : (
                          <span className="border border-[#18181b]/20 text-[#71717a] px-1.5 py-0.5 text-[9px] font-bold uppercase rounded-xs">
                            Agitation
                          </span>
                        )}
                      </td>

                      {/* Action */}
                      <td className="p-3 text-right">
                        <button
                          onClick={() => onSelectPolitician(politician)}
                          className="border border-[#18181b] bg-[#18181b] text-white px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-xs hover:bg-[#c44d31] hover:border-[#c44d31] transition"
                        >
                          Dossier
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )
      ) : (
        /* Empty State */
        <div className="border border-[#18181b]/15 bg-white p-12 text-center space-y-3 rounded-sm">
          <CheckCircle2 className="h-10 w-10 text-[#1b6b47] mx-auto" />
          <h3 className="font-serif font-bold text-base text-[#18181b]">
            No Legal Records Match Your Selected Filters
          </h3>
          <p className="text-xs text-[#71717a] max-w-md mx-auto">
            Try adjusting your search query, temporal status, or party filter to view other parliamentary judicial proceedings.
          </p>
          <button
            onClick={resetFilters}
            className="mt-2 border border-[#18181b] bg-[#18181b] text-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-xs hover:bg-[#c44d31] hover:border-[#c44d31] transition"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Statutory Legal Framework Notice */}
      <div className="border border-[#18181b]/15 bg-[#f8f6f0] p-4 text-xs text-[#71717a] space-y-1.5 rounded-sm">
        <div className="flex items-center gap-2 text-[#18181b] font-bold uppercase tracking-wider text-[10px]">
          <FileText className="h-3.5 w-3.5 text-[#c44d31]" />
          Statutory Framework: Election Commission of India Form 26 & Section 8 RPA 1951
        </div>
        <p className="text-[11px] leading-relaxed text-[#2c2925]">
          Under landmark Supreme Court directives (<em>Union of India vs. ADR, 2002; Public Interest Foundation vs. UOI, 2018</em>), every candidate contesting parliamentary elections must disclose all pending criminal proceedings in Form 26 where cognizance has been taken or charges framed by a competent court of law, as well as past convictions. Disqualification under Section 8 of the Representation of the People Act 1951 takes effect only upon final conviction with a prison sentence of 2 or more years.
        </p>
      </div>
    </div>
  );
};
