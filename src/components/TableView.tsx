import React, { useState, useMemo, useRef } from 'react';
import { 
  Table2, 
  Search, 
  Filter, 
  ArrowUpDown, 
  ArrowUp, 
  ArrowDown, 
  ChevronRight, 
  ChevronLeft, 
  ChevronsLeft, 
  ChevronsRight, 
  Scale, 
  Check, 
  Sparkles, 
  ArrowLeft, 
  TrendingUp, 
  Landmark, 
  ShieldAlert, 
  Wallet, 
  RotateCcw,
  CheckCircle2,
  ArrowUpRight,
  Download
} from 'lucide-react';
import { Politician } from '../types';
import { PoliticianImage } from './PoliticianImage';

interface TableViewProps {
  politicians: Politician[];
  onSelect: (p: Politician) => void;
  compareList: Politician[];
  onToggleCompare: (p: Politician) => void;
  onBackToOverview?: () => void;
}

type SortField = 'name' | 'party' | 'state' | 'assets' | 'attendance' | 'debates' | 'questions' | 'mplads' | 'cases';
type SortDirection = 'asc' | 'desc';

export const TableView: React.FC<TableViewProps> = ({
  politicians,
  onSelect,
  compareList,
  onToggleCompare,
  onBackToOverview,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAlliance, setSelectedAlliance] = useState<string>('All');
  const [selectedParty, setSelectedParty] = useState<string>('All');
  const [selectedState, setSelectedState] = useState<string>('All');
  const [selectedHouse, setSelectedHouse] = useState<string>('All');

  // Sorting
  const [sortField, setSortField] = useState<SortField>('attendance');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(25);

  const topRef = useRef<HTMLDivElement>(null);

  // Statistics calculation across full dataset
  const stats = useMemo(() => {
    const total = politicians.length || 1;
    const avgAttendance = Math.round(
      politicians.reduce((acc, p) => acc + p.parliamentaryRecord.attendancePercent, 0) / total
    );
    const totalDebates = politicians.reduce((acc, p) => acc + p.parliamentaryRecord.debatesCount, 0);
    const totalQuestions = politicians.reduce((acc, p) => acc + p.parliamentaryRecord.questionsAsked, 0);
    const avgMplads = Math.round(
      politicians.reduce((acc, p) => acc + p.mplads.utilizationPercent, 0) / total
    );
    const cleanMPs = politicians.filter((p) => p.criminalRecords.totalCases === 0).length;

    return {
      total: politicians.length,
      avgAttendance,
      totalDebates,
      totalQuestions,
      avgMplads,
      cleanMPs,
      cleanPercent: Math.round((cleanMPs / total) * 100),
    };
  }, [politicians]);

  // Unique filter dropdown options
  const uniqueParties = useMemo(() => {
    return Array.from(new Set(politicians.map((p) => p.partyAbbr))).sort();
  }, [politicians]);

  const uniqueStates = useMemo(() => {
    return Array.from(new Set(politicians.map((p) => p.state))).sort();
  }, [politicians]);

  // Filtered & Sorted Records
  const filteredAndSorted = useMemo(() => {
    const filtered = politicians.filter((p) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const tokens = q.split(/\s+/).filter(Boolean);
        const combined = `${p.name} ${p.hindiName || ''} ${p.party} ${p.partyAbbr} ${p.constituency} ${p.state} ${p.currentRole}`.toLowerCase();
        if (!tokens.every((t) => combined.includes(t))) return false;
      }
      if (selectedAlliance !== 'All' && p.alliance !== selectedAlliance) return false;
      if (selectedParty !== 'All' && p.partyAbbr !== selectedParty) return false;
      if (selectedState !== 'All' && p.state !== selectedState) return false;
      if (selectedHouse !== 'All' && p.house !== selectedHouse) return false;
      return true;
    });

    return filtered.sort((a, b) => {
      let valA: number | string = 0;
      let valB: number | string = 0;

      switch (sortField) {
        case 'name':
          valA = a.name.toLowerCase();
          valB = b.name.toLowerCase();
          break;
        case 'party':
          valA = a.partyAbbr.toLowerCase();
          valB = b.partyAbbr.toLowerCase();
          break;
        case 'state':
          valA = `${a.state} ${a.constituency}`.toLowerCase();
          valB = `${b.state} ${b.constituency}`.toLowerCase();
          break;
        case 'assets':
          valA = a.assets.totalCr;
          valB = b.assets.totalCr;
          break;
        case 'attendance':
          valA = a.parliamentaryRecord.attendancePercent;
          valB = b.parliamentaryRecord.attendancePercent;
          break;
        case 'debates':
          valA = a.parliamentaryRecord.debatesCount;
          valB = b.parliamentaryRecord.debatesCount;
          break;
        case 'questions':
          valA = a.parliamentaryRecord.questionsAsked;
          valB = b.parliamentaryRecord.questionsAsked;
          break;
        case 'mplads':
          valA = a.mplads.utilizationPercent;
          valB = b.mplads.utilizationPercent;
          break;
        case 'cases':
          valA = a.criminalRecords.totalCases;
          valB = b.criminalRecords.totalCases;
          break;
      }

      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [
    politicians,
    searchQuery,
    selectedAlliance,
    selectedParty,
    selectedState,
    selectedHouse,
    sortField,
    sortDirection,
  ]);

  // Pagination slice
  const totalPages = Math.ceil(filteredAndSorted.length / pageSize) || 1;
  const currentSafePage = Math.min(currentPage, totalPages);
  const startIndex = (currentSafePage - 1) * pageSize;
  const paginatedList = filteredAndSorted.slice(startIndex, startIndex + pageSize);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(Math.max(1, Math.min(newPage, totalPages)));
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedAlliance('All');
    setSelectedParty('All');
    setSelectedState('All');
    setSelectedHouse('All');
    setCurrentPage(1);
  };

  const isFiltering =
    searchQuery.trim() !== '' ||
    selectedAlliance !== 'All' ||
    selectedParty !== 'All' ||
    selectedState !== 'All' ||
    selectedHouse !== 'All';

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['Name', 'Party', 'Alliance', 'State', 'Constituency', 'House', 'Assets (Cr)', 'Attendance (%)', 'Debates', 'Questions', 'MPLADS (%)', 'Criminal Cases', 'Serious Cases'];
    const rows = filteredAndSorted.map((p) => [
      `"${p.name}"`,
      `"${p.partyAbbr}"`,
      `"${p.alliance}"`,
      `"${p.state}"`,
      `"${p.constituency}"`,
      `"${p.house}"`,
      p.assets.totalCr,
      p.parliamentaryRecord.attendancePercent,
      p.parliamentaryRecord.debatesCount,
      p.parliamentaryRecord.questionsAsked,
      p.mplads.utilizationPercent,
      p.criminalRecords.totalCases,
      p.criminalRecords.seriousCases,
    ]);

    const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `NetaWatch_MP_Performance_Matrix_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div ref={topRef} className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      
      {/* Header with Navigation & Subtitle */}
      <div className="border border-[#18181b]/15 bg-white p-5 sm:p-7 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            {onBackToOverview && (
              <button
                onClick={onBackToOverview}
                className="mb-2.5 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#71717a] hover:text-[#18181b] transition"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back to Overview</span>
              </button>
            )}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-[#18181b] text-white px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-widest">
                Hansard & ECI Audit
              </span>
              <span className="bg-emerald-50 text-[#1b6b47] border border-emerald-200 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider">
                18th Lok Sabha Master
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-black tracking-tight text-[#18181b] mt-1">
              MP Performance & Parliamentary Matrix
            </h1>
            <p className="text-xs sm:text-sm text-[#52525b] mt-1 max-w-3xl leading-relaxed">
              Audited cross-party comparative ledger indexing house attendance, parliamentary debates, questions tabled, declared assets, and MPLADS local development expenditure.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 border border-[#18181b]/20 bg-[#f1ede4] hover:bg-[#18181b] hover:text-white px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-[#18181b] transition rounded-xs shadow-2xs cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export Matrix (.CSV)</span>
            </button>
          </div>
        </div>

        {/* 4 Stat Tiles */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-6 border-t border-[#18181b]/10">
          
          <div className="bg-[#faf9f6] border border-[#18181b]/10 p-3.5 rounded-xs">
            <div className="flex items-center justify-between text-[#71717a]">
              <span className="text-[10px] font-bold uppercase tracking-widest font-mono">MPs Audited</span>
              <Landmark className="h-3.5 w-3.5 text-[#18181b]" />
            </div>
            <div className="font-serif font-black text-xl sm:text-2xl text-[#18181b] mt-1">
              {stats.total}
            </div>
            <p className="text-[10px] text-[#52525b] mt-0.5">543 Lok Sabha + Key Union Leaders</p>
          </div>

          <div className="bg-[#faf9f6] border border-[#18181b]/10 p-3.5 rounded-xs">
            <div className="flex items-center justify-between text-[#71717a]">
              <span className="text-[10px] font-bold uppercase tracking-widest font-mono">Avg Attendance</span>
              <CheckCircle2 className="h-3.5 w-3.5 text-[#1b6b47]" />
            </div>
            <div className="font-serif font-black text-xl sm:text-2xl text-[#1b6b47] mt-1">
              {stats.avgAttendance}%
            </div>
            <p className="text-[10px] text-[#52525b] mt-0.5">National Benchmark: 79%</p>
          </div>

          <div className="bg-[#faf9f6] border border-[#18181b]/10 p-3.5 rounded-xs">
            <div className="flex items-center justify-between text-[#71717a]">
              <span className="text-[10px] font-bold uppercase tracking-widest font-mono">Debates & Questions</span>
              <TrendingUp className="h-3.5 w-3.5 text-[#c44d31]" />
            </div>
            <div className="font-serif font-black text-xl sm:text-2xl text-[#18181b] mt-1">
              {(stats.totalDebates + stats.totalQuestions).toLocaleString('en-IN')}
            </div>
            <p className="text-[10px] text-[#52525b] mt-0.5">
              {stats.totalDebates.toLocaleString('en-IN')} Debates · {stats.totalQuestions.toLocaleString('en-IN')} Questions
            </p>
          </div>

          <div className="bg-[#faf9f6] border border-[#18181b]/10 p-3.5 rounded-xs">
            <div className="flex items-center justify-between text-[#71717a]">
              <span className="text-[10px] font-bold uppercase tracking-widest font-mono">Avg MPLADS Delivery</span>
              <Wallet className="h-3.5 w-3.5 text-[#1b6b47]" />
            </div>
            <div className="font-serif font-black text-xl sm:text-2xl text-[#1b6b47] mt-1">
              {stats.avgMplads}%
            </div>
            <p className="text-[10px] text-[#52525b] mt-0.5">₹5 Cr Annual Sanction / Seat</p>
          </div>

        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="border border-[#18181b]/15 bg-white p-4 sm:p-5 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          
          {/* Search Box */}
          <div className="relative lg:col-span-2">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#71717a]" />
            <input
              type="text"
              placeholder="Search MP name, constituency, state..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-xs border border-[#18181b]/20 bg-[#faf9f6] py-2 pl-9 pr-3 text-xs font-medium text-[#18181b] placeholder-[#8a8479] focus:bg-white focus:border-[#18181b] focus:outline-none"
            />
          </div>

          {/* Alliance Filter */}
          <div>
            <select
              value={selectedAlliance}
              onChange={(e) => {
                setSelectedAlliance(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-xs border border-[#18181b]/20 bg-[#faf9f6] py-2 px-3 text-xs font-medium text-[#18181b] focus:bg-white focus:border-[#18181b] focus:outline-none cursor-pointer"
            >
              <option value="All">All Alliances</option>
              <option value="NDA">NDA Coalition</option>
              <option value="INDIA">INDIA Coalition</option>
              <option value="Others">Others / Regional</option>
              <option value="Independent">Independent</option>
            </select>
          </div>

          {/* Party Filter */}
          <div>
            <select
              value={selectedParty}
              onChange={(e) => {
                setSelectedParty(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-xs border border-[#18181b]/20 bg-[#faf9f6] py-2 px-3 text-xs font-medium text-[#18181b] focus:bg-white focus:border-[#18181b] focus:outline-none cursor-pointer"
            >
              <option value="All">All Parties ({uniqueParties.length})</option>
              {uniqueParties.map((party) => (
                <option key={party} value={party}>
                  {party}
                </option>
              ))}
            </select>
          </div>

          {/* State Filter */}
          <div>
            <select
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-xs border border-[#18181b]/20 bg-[#faf9f6] py-2 px-3 text-xs font-medium text-[#18181b] focus:bg-white focus:border-[#18181b] focus:outline-none cursor-pointer"
            >
              <option value="All">All States ({uniqueStates.length})</option>
              {uniqueStates.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Status bar: Matches count, Active filters, and Page Size */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2 border-t border-[#18181b]/10 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-serif font-bold text-[#18181b]">
              {filteredAndSorted.length} Parliamentarians Matched
            </span>
            {isFiltering && (
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#c44d31] hover:underline cursor-pointer"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-[11px] text-[#71717a]">Rows per page:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border border-[#18181b]/20 bg-[#faf9f6] text-xs font-bold py-1 px-2 rounded-xs focus:outline-none cursor-pointer"
            >
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Sortable Table / Cards Container */}
      <div className="overflow-hidden rounded-xs border border-[#18181b]/15 bg-white shadow-xs">
        
        {/* Mobile View */}
        <div className="block lg:hidden divide-y divide-[#18181b]/10 bg-[#faf9f6]">
          {paginatedList.map((p, idx) => {
            const isCompared = compareList.some((c) => c.id === p.id);
            const globalIndex = startIndex + idx + 1;

            return (
              <div 
                key={p.id} 
                className="p-4 space-y-3 bg-white hover:bg-[#f1ede4]/40 transition"
                onClick={() => onSelect(p)}
              >
                <div className="flex items-start gap-3">
                  <span className="text-xs font-mono font-bold text-[#8a8479] pt-1 w-5">
                    #{globalIndex}
                  </span>
                  <div className="h-12 w-12 overflow-hidden border border-[#18181b]/20 bg-[#f1ede4] flex-shrink-0 rounded-xs">
                    <PoliticianImage
                      src={p.photo}
                      alt={p.name}
                      name={p.name}
                      partyColor={p.partyColor}
                      constituency={p.constituency}
                      state={p.state}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span
                        className="px-1.5 py-0.5 text-[9px] font-bold uppercase border rounded-xs"
                        style={{ backgroundColor: `${p.partyColor}15`, color: p.partyColor, borderColor: `${p.partyColor}40` }}
                      >
                        {p.partyAbbr}
                      </span>
                      <span className="text-[8px] font-bold text-[#71717a] uppercase border px-1 py-0.5 rounded-xs">
                        {p.alliance}
                      </span>
                    </div>

                    <h4 className="font-serif font-bold text-base text-[#18181b] mt-0.5 truncate leading-tight flex items-center justify-between">
                      <span className="truncate">{p.name}</span>
                      <a
                        href={p.socialLinks?.twitter || 'https://sansad.in/ls/members'}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        title={`Open official records for ${p.name}`}
                        className="text-[#71717a] hover:text-[#c44d31] p-1"
                      >
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </h4>
                    <p className="text-[11px] text-[#52525b] truncate">{p.constituency}, {p.state}</p>
                  </div>
                </div>

                {/* Stacked Metric Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-left bg-[#faf9f6] p-2.5 border border-[#18181b]/10 rounded-xs">
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#71717a] block">
                      Attendance
                    </span>
                    <span className={`font-serif font-black text-sm ${p.parliamentaryRecord.attendancePercent >= 80 ? 'text-[#1b6b47]' : 'text-[#18181b]'}`}>
                      {p.parliamentaryRecord.attendancePercent}%
                    </span>
                    <span className="text-[9px] text-[#8a8479] block">
                      {p.parliamentaryRecord.debatesCount} debates
                    </span>
                  </div>

                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#71717a] block">
                      Questions Asked
                    </span>
                    <span className="font-serif font-black text-sm text-[#18181b]">
                      {p.parliamentaryRecord.questionsAsked}
                    </span>
                    <span className="text-[9px] text-[#8a8479] block">
                      Hansard Record
                    </span>
                  </div>

                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#71717a] block">
                      MPLADS Utilized
                    </span>
                    <span className="font-serif font-black text-sm text-[#1b6b47]">
                      {p.mplads.utilizationPercent}%
                    </span>
                    <span className="text-[9px] text-[#8a8479] block">
                      ₹{p.mplads.spentCr} Cr spent
                    </span>
                  </div>

                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#71717a] block">
                      Declared Assets
                    </span>
                    <span className="font-serif font-black text-sm text-[#18181b]">
                      ₹{p.assets.totalCr >= 100 ? p.assets.totalCr.toFixed(0) : p.assets.totalCr.toFixed(1)} Cr
                    </span>
                    <span className="text-[9px] text-[#8a8479] block">
                      {p.criminalRecords.totalCases === 0 ? 'Clean Record' : `${p.criminalRecords.totalCases} cases`}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-1" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => onToggleCompare(p)}
                    className={`flex-1 flex items-center justify-center gap-1.5 border px-3 py-2 text-xs font-bold uppercase tracking-wider transition touch-manipulation min-h-[38px] rounded-xs cursor-pointer ${
                      isCompared
                        ? 'border-[#c44d31] bg-[#c44d31] text-white shadow-2xs'
                        : 'border-[#18181b]/30 bg-white text-[#18181b] hover:bg-[#18181b] hover:text-white'
                    }`}
                  >
                    {isCompared ? <Check className="h-3.5 w-3.5 stroke-[3]" /> : <Scale className="h-3.5 w-3.5" />}
                    <span>{isCompared ? 'In Compare' : 'Add to Compare'}</span>
                  </button>

                  <button
                    onClick={() => onSelect(p)}
                    className="flex-1 flex items-center justify-center gap-1.5 border border-[#18181b] bg-[#18181b] px-3 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#c44d31] hover:border-[#c44d31] transition shadow-2xs touch-manipulation min-h-[38px] rounded-xs cursor-pointer"
                  >
                    <span>Inspect Dossier</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop Full Column Sortable Table */}
        <div className="hidden lg:block overflow-x-auto touch-pan-scroll">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#18181b]/15 bg-[#faf9f6] text-[#71717a] uppercase tracking-wider text-[9px] font-bold">
                <th className="py-3 pl-4 pr-2 w-10 text-center">#</th>
                
                <th 
                  onClick={() => handleSort('name')}
                  className="py-3 px-3 cursor-pointer hover:bg-[#f1ede4] hover:text-[#18181b] transition select-none"
                >
                  <div className="flex items-center gap-1">
                    <span>Parliamentarian</span>
                    {sortField === 'name' ? (
                      sortDirection === 'asc' ? <ArrowUp className="h-3 w-3 text-[#c44d31]" /> : <ArrowDown className="h-3 w-3 text-[#c44d31]" />
                    ) : (
                      <ArrowUpDown className="h-3 w-3 opacity-40" />
                    )}
                  </div>
                </th>

                <th 
                  onClick={() => handleSort('party')}
                  className="py-3 px-3 cursor-pointer hover:bg-[#f1ede4] hover:text-[#18181b] transition select-none"
                >
                  <div className="flex items-center gap-1">
                    <span>Party & Coalition</span>
                    {sortField === 'party' ? (
                      sortDirection === 'asc' ? <ArrowUp className="h-3 w-3 text-[#c44d31]" /> : <ArrowDown className="h-3 w-3 text-[#c44d31]" />
                    ) : (
                      <ArrowUpDown className="h-3 w-3 opacity-40" />
                    )}
                  </div>
                </th>

                <th 
                  onClick={() => handleSort('state')}
                  className="py-3 px-3 cursor-pointer hover:bg-[#f1ede4] hover:text-[#18181b] transition select-none"
                >
                  <div className="flex items-center gap-1">
                    <span>Constituency & State</span>
                    {sortField === 'state' ? (
                      sortDirection === 'asc' ? <ArrowUp className="h-3 w-3 text-[#c44d31]" /> : <ArrowDown className="h-3 w-3 text-[#c44d31]" />
                    ) : (
                      <ArrowUpDown className="h-3 w-3 opacity-40" />
                    )}
                  </div>
                </th>

                <th 
                  onClick={() => handleSort('attendance')}
                  className="py-3 px-3 cursor-pointer hover:bg-[#f1ede4] hover:text-[#18181b] transition select-none"
                >
                  <div className="flex items-center gap-1">
                    <span>Attendance %</span>
                    {sortField === 'attendance' ? (
                      sortDirection === 'asc' ? <ArrowUp className="h-3 w-3 text-[#c44d31]" /> : <ArrowDown className="h-3 w-3 text-[#c44d31]" />
                    ) : (
                      <ArrowUpDown className="h-3 w-3 opacity-40" />
                    )}
                  </div>
                </th>

                <th 
                  onClick={() => handleSort('debates')}
                  className="py-3 px-3 cursor-pointer hover:bg-[#f1ede4] hover:text-[#18181b] transition select-none"
                >
                  <div className="flex items-center gap-1">
                    <span>Debates</span>
                    {sortField === 'debates' ? (
                      sortDirection === 'asc' ? <ArrowUp className="h-3 w-3 text-[#c44d31]" /> : <ArrowDown className="h-3 w-3 text-[#c44d31]" />
                    ) : (
                      <ArrowUpDown className="h-3 w-3 opacity-40" />
                    )}
                  </div>
                </th>

                <th 
                  onClick={() => handleSort('questions')}
                  className="py-3 px-3 cursor-pointer hover:bg-[#f1ede4] hover:text-[#18181b] transition select-none"
                >
                  <div className="flex items-center gap-1">
                    <span>Questions</span>
                    {sortField === 'questions' ? (
                      sortDirection === 'asc' ? <ArrowUp className="h-3 w-3 text-[#c44d31]" /> : <ArrowDown className="h-3 w-3 text-[#c44d31]" />
                    ) : (
                      <ArrowUpDown className="h-3 w-3 opacity-40" />
                    )}
                  </div>
                </th>

                <th 
                  onClick={() => handleSort('mplads')}
                  className="py-3 px-3 cursor-pointer hover:bg-[#f1ede4] hover:text-[#18181b] transition select-none"
                >
                  <div className="flex items-center gap-1">
                    <span>MPLADS Delivery</span>
                    {sortField === 'mplads' ? (
                      sortDirection === 'asc' ? <ArrowUp className="h-3 w-3 text-[#c44d31]" /> : <ArrowDown className="h-3 w-3 text-[#c44d31]" />
                    ) : (
                      <ArrowUpDown className="h-3 w-3 opacity-40" />
                    )}
                  </div>
                </th>

                <th 
                  onClick={() => handleSort('assets')}
                  className="py-3 px-3 cursor-pointer hover:bg-[#f1ede4] hover:text-[#18181b] transition select-none"
                >
                  <div className="flex items-center gap-1">
                    <span>Declared Assets</span>
                    {sortField === 'assets' ? (
                      sortDirection === 'asc' ? <ArrowUp className="h-3 w-3 text-[#c44d31]" /> : <ArrowDown className="h-3 w-3 text-[#c44d31]" />
                    ) : (
                      <ArrowUpDown className="h-3 w-3 opacity-40" />
                    )}
                  </div>
                </th>

                <th 
                  onClick={() => handleSort('cases')}
                  className="py-3 px-3 cursor-pointer hover:bg-[#f1ede4] hover:text-[#18181b] transition select-none"
                >
                  <div className="flex items-center gap-1">
                    <span>Legal Cases</span>
                    {sortField === 'cases' ? (
                      sortDirection === 'asc' ? <ArrowUp className="h-3 w-3 text-[#c44d31]" /> : <ArrowDown className="h-3 w-3 text-[#c44d31]" />
                    ) : (
                      <ArrowUpDown className="h-3 w-3 opacity-40" />
                    )}
                  </div>
                </th>

                <th className="py-3 pl-2 pr-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#18181b]/10">
              {paginatedList.map((p, idx) => {
                const isCompared = compareList.some((c) => c.id === p.id);
                const globalIndex = startIndex + idx + 1;

                return (
                  <tr
                    key={p.id}
                    className="hover:bg-[#f1ede4]/50 transition-colors group cursor-pointer"
                    onClick={() => onSelect(p)}
                  >
                    <td className="py-2.5 pl-4 pr-2 text-center font-mono text-[10px] text-[#8a8479]">
                      {globalIndex}
                    </td>

                    {/* Politician Name + Photo */}
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-2.5">
                        <div className="h-9 w-9 overflow-hidden border border-[#18181b]/15 bg-[#f1ede4] flex-shrink-0 rounded-xs">
                          <PoliticianImage
                            src={p.photo}
                            alt={p.name}
                            name={p.name}
                            partyColor={p.partyColor}
                            constituency={p.constituency}
                            state={p.state}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="font-serif font-bold text-sm text-[#18181b] group-hover:text-[#c44d31] transition-colors truncate">
                            {p.name}
                          </div>
                          <div className="text-[10px] text-[#71717a] truncate max-w-[180px]">{p.currentRole}</div>
                        </div>
                      </div>
                    </td>

                    {/* Party */}
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="px-1.5 py-0.5 text-[9px] font-bold uppercase border rounded-xs"
                          style={{ backgroundColor: `${p.partyColor}15`, color: p.partyColor, borderColor: `${p.partyColor}40` }}
                        >
                          {p.partyAbbr}
                        </span>
                        <span className="text-[9px] font-bold text-[#71717a] uppercase">({p.alliance})</span>
                      </div>
                    </td>

                    {/* Constituency & State */}
                    <td className="py-2.5 px-3">
                      <div className="font-medium text-[#18181b] text-xs">{p.constituency}</div>
                      <div className="text-[10px] text-[#8a8479]">{p.state} · {p.house}</div>
                    </td>

                    {/* Attendance */}
                    <td className="py-2.5 px-3">
                      <span className={`font-serif font-bold text-sm ${p.parliamentaryRecord.attendancePercent >= 80 ? 'text-[#1b6b47]' : p.parliamentaryRecord.attendancePercent < 60 ? 'text-[#c44d31]' : 'text-[#18181b]'}`}>
                        {p.parliamentaryRecord.attendancePercent}%
                      </span>
                    </td>

                    {/* Debates */}
                    <td className="py-2.5 px-3">
                      <span className="font-serif font-medium text-xs text-[#18181b]">
                        {p.parliamentaryRecord.debatesCount}
                      </span>
                    </td>

                    {/* Questions */}
                    <td className="py-2.5 px-3">
                      <span className="font-serif font-medium text-xs text-[#18181b]">
                        {p.parliamentaryRecord.questionsAsked}
                      </span>
                    </td>

                    {/* MPLADS */}
                    <td className="py-2.5 px-3">
                      <div className="font-serif font-bold text-xs text-[#1b6b47]">{p.mplads.utilizationPercent}%</div>
                      <div className="text-[9px] text-[#8a8479]">₹{p.mplads.spentCr} Cr</div>
                    </td>

                    {/* Assets */}
                    <td className="py-2.5 px-3">
                      <div className="font-serif font-black text-xs text-[#18181b]">
                        ₹{p.assets.totalCr >= 100 ? p.assets.totalCr.toFixed(0) : p.assets.totalCr.toFixed(1)} Cr
                      </div>
                    </td>

                    {/* Criminal Cases */}
                    <td className="py-2.5 px-3">
                      {p.criminalRecords.totalCases === 0 ? (
                        <span className="text-[10px] font-bold text-[#1b6b47] bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-xs">
                          Clean (0)
                        </span>
                      ) : (
                        <div className="flex flex-col gap-0.5">
                          <span className="font-serif font-bold text-xs text-[#c44d31]">
                            {p.criminalRecords.totalCases} Cases
                          </span>
                          {p.criminalRecords.seriousCases > 0 && (
                            <span className="text-[8px] font-mono font-bold text-[#c44d31]">
                              {p.criminalRecords.seriousCases} Serious
                            </span>
                          )}
                        </div>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-2.5 pl-2 pr-4 text-right">
                      <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => onToggleCompare(p)}
                          className={`border px-2 py-1 text-[9px] font-bold uppercase tracking-wider transition rounded-xs cursor-pointer ${
                            isCompared
                              ? 'border-[#c44d31] bg-[#c44d31] text-white shadow-2xs'
                              : 'border-[#18181b]/20 bg-white text-[#18181b] hover:bg-[#18181b] hover:text-white'
                          }`}
                        >
                          {isCompared ? 'Added' : 'Compare'}
                        </button>
                        <button
                          onClick={() => onSelect(p)}
                          className="border border-[#18181b] bg-[#18181b] p-1 text-white hover:bg-[#c44d31] hover:border-[#c44d31] transition shadow-2xs rounded-xs cursor-pointer flex items-center justify-center"
                          title="View Full Dossier"
                        >
                          <ChevronRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredAndSorted.length === 0 && (
          <div className="p-12 text-center space-y-3">
            <p className="font-serif text-lg font-bold text-[#18181b]">No parliamentarians match your query</p>
            <p className="text-xs text-[#52525b]">
              Try changing the search keywords, state, or party filters above.
            </p>
            <button
              onClick={resetFilters}
              className="mt-2 inline-flex items-center gap-1.5 border border-[#18181b] bg-[#18181b] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#c44d31] transition rounded-xs cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}

        {/* Comprehensive Pagination Controls */}
        {filteredAndSorted.length > 0 && (
          <div className="border-t border-[#18181b]/15 bg-[#faf9f6] px-4 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="text-[#71717a] text-xs">
              Showing <strong className="text-[#18181b]">{startIndex + 1}</strong> to{' '}
              <strong className="text-[#18181b]">
                {Math.min(startIndex + pageSize, filteredAndSorted.length)}
              </strong>{' '}
              of <strong className="text-[#18181b]">{filteredAndSorted.length}</strong> MPs
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handlePageChange(1)}
                disabled={currentSafePage === 1}
                className="border border-[#18181b]/20 bg-white p-1.5 text-[#18181b] hover:bg-[#18181b] hover:text-white disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-[#18181b] transition rounded-xs cursor-pointer"
                title="First Page"
              >
                <ChevronsLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => handlePageChange(currentSafePage - 1)}
                disabled={currentSafePage === 1}
                className="border border-[#18181b]/20 bg-white px-2.5 py-1 text-xs font-bold text-[#18181b] hover:bg-[#18181b] hover:text-white disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-[#18181b] transition rounded-xs cursor-pointer flex items-center gap-1"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                <span>Prev</span>
              </button>

              {/* Numbered Page Buttons */}
              <div className="flex items-center gap-1 px-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => {
                    if (totalPages <= 7) return true;
                    if (p === 1 || p === totalPages) return true;
                    if (Math.abs(p - currentSafePage) <= 1) return true;
                    return false;
                  })
                  .map((p, idx, arr) => {
                    const prevP = arr[idx - 1];
                    const showEllipsis = prevP && p - prevP > 1;

                    return (
                      <React.Fragment key={p}>
                        {showEllipsis && <span className="px-1 text-[#8a8479]">…</span>}
                        <button
                          onClick={() => handlePageChange(p)}
                          className={`min-w-[28px] h-7 text-xs font-mono font-bold transition rounded-xs cursor-pointer ${
                            currentSafePage === p
                              ? 'bg-[#18181b] text-white shadow-2xs'
                              : 'bg-white border border-[#18181b]/20 text-[#18181b] hover:bg-[#f1ede4]'
                          }`}
                        >
                          {p}
                        </button>
                      </React.Fragment>
                    );
                  })}
              </div>

              <button
                onClick={() => handlePageChange(currentSafePage + 1)}
                disabled={currentSafePage === totalPages}
                className="border border-[#18181b]/20 bg-white px-2.5 py-1 text-xs font-bold text-[#18181b] hover:bg-[#18181b] hover:text-white disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-[#18181b] transition rounded-xs cursor-pointer flex items-center gap-1"
              >
                <span>Next</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={currentSafePage === totalPages}
                className="border border-[#18181b]/20 bg-white p-1.5 text-[#18181b] hover:bg-[#18181b] hover:text-white disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-[#18181b] transition rounded-xs cursor-pointer"
                title="Last Page"
              >
                <ChevronsRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
