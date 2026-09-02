import React, { useState, useMemo } from 'react';
import { Politician } from '../types';
import {
  findFlaggedContracts,
  getAllPoliticiansAssetGrowth,
  getPoliticianRelativesAndContractors
} from '../utils/nepotismTrackerLogic';
import {
  ShieldAlert,
  TrendingUp,
  AlertTriangle,
  FileText,
  ExternalLink,
  Search,
  Filter,
  Sliders,
  Building,
  Users,
  ChevronRight,
  ArrowUpRight,
  Landmark,
  BadgeAlert,
  CheckCircle2,
  HelpCircle,
  Eye,
  ArrowLeft
} from 'lucide-react';
import { PoliticianImage } from './PoliticianImage';

interface NepotismAssetTrackerViewProps {
  politicians: Politician[];
  onSelectPolitician: (p: Politician) => void;
  onBackToOverview?: () => void;
}

export const NepotismAssetTrackerView: React.FC<NepotismAssetTrackerViewProps> = ({
  politicians,
  onSelectPolitician,
  onBackToOverview
}) => {
  // State
  const [subView, setSubView] = useState<'contracts' | 'growth'>('contracts');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAlliance, setSelectedAlliance] = useState('All');
  const [selectedParty, setSelectedParty] = useState('All');
  const [filterFlagStatus, setFilterFlagStatus] = useState<'all' | 'flagged-contracts' | 'flagged-growth' | 'nominated'>('all');
  const [growthThreshold, setGrowthThreshold] = useState<number>(50);
  const [sortBy, setSortBy] = useState<'growth-desc' | 'growth-abs' | 'flagged-val' | 'net-worth'>('growth-desc');

  // Compute all flagged contracts nationally
  const allFlaggedContracts = useMemo(() => {
    return findFlaggedContracts(politicians);
  }, [politicians]);

  // Compute all asset growth reports nationally
  const allGrowthReports = useMemo(() => {
    return getAllPoliticiansAssetGrowth(politicians, growthThreshold);
  }, [politicians, growthThreshold]);

  // Summary Metrics
  const totalFlaggedContractsValueCr = useMemo(() => {
    return allFlaggedContracts.reduce((sum, f) => sum + f.contract.contractValue, 0);
  }, [allFlaggedContracts]);

  const nominatedContractsCount = useMemo(() => {
    return allFlaggedContracts.filter((f) => f.contract.tenderType === 'nominated').length;
  }, [allFlaggedContracts]);

  const flaggedGrowthCount = useMemo(() => {
    return allGrowthReports.filter((g) => g.isFlagged).length;
  }, [allGrowthReports]);

  // Filtered Flagged Contracts
  const filteredFlaggedContracts = useMemo(() => {
    return allFlaggedContracts.filter((flag) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          flag.politician.name.toLowerCase().includes(q) ||
          flag.relative.name.toLowerCase().includes(q) ||
          flag.contractor.name.toLowerCase().includes(q) ||
          flag.contract.awardingDepartment.toLowerCase().includes(q) ||
          flag.politician.partyAbbr.toLowerCase().includes(q) ||
          flag.politician.state.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Alliance
      if (selectedAlliance !== 'All' && flag.politician.alliance !== selectedAlliance) {
        return false;
      }

      // Party
      if (selectedParty !== 'All' && flag.politician.partyAbbr !== selectedParty) {
        return false;
      }

      // Tender type filter
      if (filterFlagStatus === 'nominated' && flag.contract.tenderType !== 'nominated') {
        return false;
      }

      return true;
    }).sort((a, b) => b.contract.contractValue - a.contract.contractValue);
  }, [allFlaggedContracts, searchQuery, selectedAlliance, selectedParty, filterFlagStatus]);

  // Filtered Asset Growth Reports
  const filteredGrowthReports = useMemo(() => {
    return allGrowthReports
      .filter((report) => {
        // Search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const politician = politicians.find((p) => p.id === report.politicianId);
          const matches =
            report.politicianName.toLowerCase().includes(q) ||
            report.partyAbbr.toLowerCase().includes(q) ||
            (politician && politician.state.toLowerCase().includes(q)) ||
            (politician && politician.constituency.toLowerCase().includes(q));
          if (!matches) return false;
        }

        // Alliance
        if (selectedAlliance !== 'All' && report.alliance !== selectedAlliance) {
          return false;
        }

        // Party
        if (selectedParty !== 'All' && report.partyAbbr !== selectedParty) {
          return false;
        }

        // Flag Status
        if (filterFlagStatus === 'flagged-growth' && !report.isFlagged) {
          return false;
        }
        if (filterFlagStatus === 'flagged-contracts') {
          const hasFlag = allFlaggedContracts.some((f) => f.politician.id === report.politicianId);
          if (!hasFlag) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'growth-desc') return b.percentageGrowth - a.percentageGrowth;
        if (sortBy === 'growth-abs') return b.absoluteGrowth - a.absoluteGrowth;
        if (sortBy === 'net-worth') return b.latestValue - a.latestValue;
        if (sortBy === 'flagged-val') {
          const aVal = allFlaggedContracts.filter(f => f.politician.id === a.politicianId).reduce((s, x) => s + x.contract.contractValue, 0);
          const bVal = allFlaggedContracts.filter(f => f.politician.id === b.politicianId).reduce((s, x) => s + x.contract.contractValue, 0);
          return bVal - aVal;
        }
        return 0;
      });
  }, [
    allGrowthReports,
    allFlaggedContracts,
    politicians,
    searchQuery,
    selectedAlliance,
    selectedParty,
    filterFlagStatus,
    sortBy
  ]);

  // Unique Parties
  const uniqueParties = useMemo(() => {
    const set = new Set<string>();
    politicians.forEach((p) => set.add(p.partyAbbr));
    return Array.from(set).sort();
  }, [politicians]);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* 1. BROADSHEET MASTHEAD & INTEL BANNER */}
      <div className="border-2 border-[#1a1a1a] bg-white p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b-2 border-[#1a1a1a] pb-6">
          <div className="space-y-2 max-w-3xl">
            {onBackToOverview && (
              <button
                onClick={onBackToOverview}
                className="mb-1 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#66625b] hover:text-[#1a1a1a] transition cursor-pointer"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back to Overview</span>
              </button>
            )}
            <div className="flex items-center gap-2">
              <span className="bg-[#c44d31] text-white px-2 py-0.5 text-[10px] font-black uppercase tracking-widest">
                NATIONAL INTEGRITY INVESTIGATION
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#66625b]">
                18th Lok Sabha & Rajya Sabha Special Registry
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-black text-[#1a1a1a] tracking-tight">
              Nepotism & Asset Growth Tracker
            </h2>
            <p className="text-xs sm:text-sm text-[#66625b] leading-relaxed">
              Synthesizing sworn Election Commission of India (ECI) wealth disclosures, Ministry of Corporate Affairs (MCA) company filings, and Central Public Procurement Portal (CPPP) tender records to surface potential conflicts of interest, relative-linked government contract awards, and exponential asset growth across elected leadership.
            </p>
          </div>

          {/* Source Verification Badge */}
          <div className="bg-[#f2eee5] border border-[#1a1a1a]/20 p-4 space-y-2 max-w-xs flex-shrink-0">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1a1a1a]">
              <FileText className="h-4 w-4 text-[#c44d31]" />
              <span>Verifiable Sourcing Rule</span>
            </div>
            <p className="text-[11px] text-[#66625b] leading-normal">
              Every flagged contract and asset progression is anchored to sworn Form 26 affidavits, CVC registries, and official e-procurement award IDs.
            </p>
          </div>
        </div>

        {/* Aggregate Metric Tiles */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          <div className="border border-[#1a1a1a]/20 bg-[#faf8f5] p-3.5 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#66625b]">
              Flagged Contract Value
            </span>
            <div className="font-serif text-2xl font-black text-[#c44d31]">
              ₹{totalFlaggedContractsValueCr.toFixed(1)} Cr
            </div>
            <span className="text-[10px] text-[#66625b]">
              Across {allFlaggedContracts.length} audited cases
            </span>
          </div>

          <div className="border border-[#1a1a1a]/20 bg-[#faf8f5] p-3.5 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#66625b]">
              Nominated / Single Bid
            </span>
            <div className="font-serif text-2xl font-black text-[#1a1a1a]">
              {nominatedContractsCount} Cases
            </div>
            <span className="text-[10px] text-[#66625b]">
              Awarded without open competitive bidding
            </span>
          </div>

          <div className="border border-[#1a1a1a]/20 bg-[#faf8f5] p-3.5 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#66625b]">
              High Asset Escalation
            </span>
            <div className="font-serif text-2xl font-black text-[#c44d31]">
              {flaggedGrowthCount} Leaders
            </div>
            <span className="text-[10px] text-[#66625b]">
              Wealth surge &gt;{growthThreshold}% from baseline
            </span>
          </div>

          <div className="border border-[#1a1a1a]/20 bg-[#faf8f5] p-3.5 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#66625b]">
              Monitored MP Profiles
            </span>
            <div className="font-serif text-2xl font-black text-[#1a1a1a]">
              {politicians.length} MPs
            </div>
            <span className="text-[10px] text-[#66625b]">
              Cross-checked against MCA & ECI
            </span>
          </div>
        </div>
      </div>

      {/* 2. SUB-VIEW NAVIGATION & FILTER BAR */}
      <div className="space-y-4">
        
        {/* Navigation Tabs: Contracts vs Growth */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-[#1a1a1a] pb-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSubView('contracts')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
                subView === 'contracts'
                  ? 'bg-[#1a1a1a] text-white shadow-sm'
                  : 'bg-white border border-[#1a1a1a]/20 text-[#1a1a1a] hover:bg-[#f2eee5]'
              }`}
            >
              <ShieldAlert className="h-4 w-4 text-[#c44d31]" />
              <span>Flagged Contracts ({filteredFlaggedContracts.length})</span>
            </button>

            <button
              onClick={() => setSubView('growth')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
                subView === 'growth'
                  ? 'bg-[#1a1a1a] text-white shadow-sm'
                  : 'bg-white border border-[#1a1a1a]/20 text-[#1a1a1a] hover:bg-[#f2eee5]'
              }`}
            >
              <TrendingUp className="h-4 w-4 text-[#c44d31]" />
              <span>Asset Growth Matrix ({filteredGrowthReports.length})</span>
            </button>
          </div>

          {/* Growth Threshold Trigger */}
          <div className="flex items-center gap-1.5 bg-[#f2eee5] p-1 border border-[#1a1a1a]/20 self-start sm:self-auto">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#66625b] px-2">
              Alert Trigger:
            </span>
            {[25, 50, 100, 200].map((t) => (
              <button
                key={t}
                onClick={() => setGrowthThreshold(t)}
                className={`px-2 py-0.5 text-xs font-bold transition ${
                  growthThreshold === t
                    ? 'bg-[#1a1a1a] text-white'
                    : 'text-[#1a1a1a] hover:bg-white/60'
                }`}
              >
                &gt;{t}%
              </button>
            ))}
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-white p-4 border border-[#1a1a1a]/20">
          
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-[#66625b]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search MP, relative, firm, department..."
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-[#1a1a1a]/30 bg-white placeholder-[#8a8479] focus:border-[#1a1a1a] focus:outline-none"
            />
          </div>

          {/* Alliance Filter */}
          <div>
            <select
              value={selectedAlliance}
              onChange={(e) => setSelectedAlliance(e.target.value)}
              aria-label="Filter by coalition"
              className="w-full px-3 py-1.5 text-xs border border-[#1a1a1a]/30 bg-white text-[#1a1a1a] focus:border-[#1a1a1a] focus:outline-none font-medium"
            >
              <option value="All">All Coalitions</option>
              <option value="NDA">NDA Coalition</option>
              <option value="INDIA">INDIA Bloc</option>
              <option value="Others">Non-Aligned / Others</option>
            </select>
          </div>

          {/* Party Filter */}
          <div>
            <select
              value={selectedParty}
              onChange={(e) => setSelectedParty(e.target.value)}
              aria-label="Filter by political party"
              className="w-full px-3 py-1.5 text-xs border border-[#1a1a1a]/30 bg-white text-[#1a1a1a] focus:border-[#1a1a1a] focus:outline-none font-medium"
            >
              <option value="All">All Parties</option>
              {uniqueParties.map((pty) => (
                <option key={pty} value={pty}>
                  {pty} Party
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              aria-label="Sort audit records"
              className="w-full px-3 py-1.5 text-xs border border-[#1a1a1a]/30 bg-white text-[#1a1a1a] focus:border-[#1a1a1a] focus:outline-none font-medium"
            >
              <option value="growth-desc">Sort: Highest Growth (%)</option>
              <option value="growth-abs">Sort: Largest Absolute Surge (₹ Cr)</option>
              <option value="flagged-val">Sort: Highest Flagged Contract Value</option>
              <option value="net-worth">Sort: Total Declared Net Worth</option>
            </select>
          </div>

        </div>
      </div>

      {/* 3. SUB-VIEW 1: FLAGGED CONTRACTS REGISTRY */}
      {subView === 'contracts' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#66625b] border-b border-[#1a1a1a]/15 pb-2">
            <span>
              Audited Cases ({filteredFlaggedContracts.length} Matching Criteria)
            </span>
            <span className="hidden sm:inline text-[11px] text-[#8a8479]">
              Click 'Inspect Public Tender' for full e-procurement filing
            </span>
          </div>

          {filteredFlaggedContracts.length > 0 ? (
            <div className="space-y-6">
              {filteredFlaggedContracts.map((flag, idx) => (
                <div
                  key={flag.id}
                  className="border-2 border-[#1a1a1a]/15 bg-white p-6 sm:p-7 rounded-2xl sm:rounded-3xl space-y-5 shadow-xs hover:border-[#1a1a1a]/60 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                >
                  {/* Top Bar: Politician Info & Contract Value */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#1a1a1a]/15 pb-4">
                    <div className="flex items-center gap-3.5">
                      <div className="h-14 w-14 flex-shrink-0 overflow-hidden border border-[#1a1a1a]/20 bg-[#f2eee5] rounded-2xl shadow-xs">
                        <PoliticianImage
                          src={flag.politician.photo}
                          alt={flag.politician.name}
                          name={flag.politician.name}
                          partyColor={flag.politician.partyColor}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-serif text-lg font-bold text-[#1a1a1a]">
                            {flag.politician.name}
                          </h3>
                          <span
                            className="px-2 py-0.5 text-[10px] font-black uppercase text-white"
                            style={{ backgroundColor: flag.politician.partyColor }}
                          >
                            {flag.politician.partyAbbr}
                          </span>
                          <span className="text-xs text-[#66625b]">
                            ({flag.politician.constituency}, {flag.politician.state})
                          </span>
                        </div>
                        <p className="text-xs text-[#66625b] mt-0.5">
                          {flag.politician.currentRole}
                        </p>
                      </div>
                    </div>

                    {/* Contract Value & Priority Tag */}
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="text-right">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#66625b] block">
                          Contract Value
                        </span>
                        <span className="font-serif text-xl sm:text-2xl font-black text-[#c44d31]">
                          ₹{flag.contract.contractValue.toFixed(2)} Cr
                        </span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="bg-[#c44d31] text-white px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-center">
                          {flag.flagSeverity} PRIORITY
                        </span>
                        <span className="bg-[#f2eee5] border border-[#1a1a1a]/20 text-[#1a1a1a] px-2 py-0.5 text-[10px] font-bold uppercase text-center">
                          {flag.contract.tenderType} TENDER
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 4-Step Visual Conflict Flow Matrix */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 bg-[#faf8f5] border border-[#1a1a1a]/20 p-3.5 text-xs">
                    {/* Node 1 */}
                    <div className="space-y-1 p-2 bg-white border border-[#1a1a1a]/10">
                      <span className="text-[9px] font-bold uppercase text-[#66625b] block">1. Held Ministerial Portfolio</span>
                      <strong className="text-[#1a1a1a] block font-bold">{flag.politicianRoleDuringContract}</strong>
                      <span className="text-[10px] text-[#66625b] block">{flag.tenurePeriod}</span>
                    </div>

                    {/* Node 2 */}
                    <div className="space-y-1 p-2 bg-white border border-[#1a1a1a]/10">
                      <span className="text-[9px] font-bold uppercase text-[#66625b] block">2. Family Relative</span>
                      <strong className="text-[#c44d31] block font-bold">{flag.relative.name}</strong>
                      <span className="text-[10px] text-[#66625b] block capitalize">Relationship: {flag.relative.relationType}</span>
                    </div>

                    {/* Node 3 */}
                    <div className="space-y-1 p-2 bg-white border border-[#1a1a1a]/10">
                      <span className="text-[9px] font-bold uppercase text-[#66625b] block">3. Corporate Entity</span>
                      <strong className="text-[#1a1a1a] block font-bold">{flag.contractor.name}</strong>
                      <span className="text-[10px] font-mono text-[#66625b] block">{flag.contractor.registrationNo}</span>
                    </div>

                    {/* Node 4 */}
                    <div className="space-y-1 p-2 bg-white border border-[#1a1a1a]/10">
                      <span className="text-[9px] font-bold uppercase text-[#66625b] block">4. Awarding Department</span>
                      <strong className="text-[#1a1a1a] block font-bold line-clamp-1">{flag.contract.awardingDepartment}</strong>
                      <span className="text-[10px] text-[#66625b] block">Award Date: {flag.contract.awardedDate}</span>
                    </div>
                  </div>

                  {/* Project Description */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#66625b]">
                      Project Work Scope & Award Details:
                    </span>
                    <p className="text-xs text-[#1a1a1a] leading-relaxed bg-[#f2eee5]/40 p-3 border border-[#1a1a1a]/15">
                      {flag.contract.projectDescription}
                    </p>
                  </div>

                  {/* Audit Findings */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#c44d31] flex items-center gap-1.5">
                      <BadgeAlert className="h-3.5 w-3.5" />
                      Specific Documented Audit Disclosures:
                    </span>
                    <ul className="space-y-1">
                      {flag.flagReasons.map((reason, rIdx) => (
                        <li key={rIdx} className="text-xs text-[#1a1a1a] flex items-start gap-2 bg-white p-2 border border-[#1a1a1a]/10">
                          <span className="text-[#c44d31] font-bold mt-0.5">•</span>
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons: Inspect Evidence + Open Full Dossier */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[#1a1a1a]/15">
                    <div className="text-[11px] text-[#66625b]">
                      Verified Source: <strong className="text-[#1a1a1a] font-medium">{flag.evidenceSource}</strong>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={flag.sourceDocumentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 border border-[#1a1a1a]/30 bg-[#f2eee5] px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#1a1a1a] hover:bg-white transition"
                      >
                        <span>Inspect Public Tender</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>

                      <button
                        onClick={() => onSelectPolitician(flag.politician)}
                        className="inline-flex items-center gap-1.5 border border-[#1a1a1a] bg-[#1a1a1a] px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#c44d31] hover:border-[#c44d31] transition"
                      >
                        <span>Open Full MP Dossier</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-[#1a1a1a]/20 bg-white p-12 text-center space-y-3">
              <CheckCircle2 className="h-10 w-10 text-emerald-700 mx-auto" />
              <h4 className="font-serif text-lg font-bold text-[#1a1a1a]">
                No Flagged Contracts Match Current Filters
              </h4>
              <p className="text-xs text-[#66625b]">
                Try adjusting your search query, coalition, or tender type dropdowns above.
              </p>
            </div>
          )}
        </div>
      )}

      {/* 4. SUB-VIEW 2: ASSET GROWTH MATRIX & TRAJECTORY */}
      {subView === 'growth' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#66625b] border-b border-[#1a1a1a]/15 pb-2">
            <span>
              Sworn Affidavit Wealth Progression ({filteredGrowthReports.length} Leaders)
            </span>
            <span className="hidden sm:inline text-[11px] text-[#8a8479]">
              Comparing earliest baseline affidavit to 2024 general election filing
            </span>
          </div>

          <div className="overflow-x-auto border-2 border-[#1a1a1a] bg-white">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#1a1a1a] text-white font-serif uppercase tracking-wider text-[10px]">
                  <th className="p-3 border-r border-white/20">Candidate & Party</th>
                  <th className="p-3 border-r border-white/20 text-right">Baseline Wealth</th>
                  <th className="p-3 border-r border-white/20 text-right">2024 Net Worth</th>
                  <th className="p-3 border-r border-white/20 text-right">Absolute Growth</th>
                  <th className="p-3 border-r border-white/20 text-right">Surge %</th>
                  <th className="p-3 border-r border-white/20 text-right">CAGR</th>
                  <th className="p-3 border-r border-white/20 text-center">Audit Status</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a1a1a]/15 bg-white">
                {filteredGrowthReports.map((report) => {
                  const politician = politicians.find((p) => p.id === report.politicianId);
                  const hasFlaggedContract = allFlaggedContracts.some(
                    (f) => f.politician.id === report.politicianId
                  );

                  return (
                    <tr
                      key={report.politicianId}
                      className="hover:bg-[#f2eee5]/60 transition-colors"
                    >
                      {/* Name & Party */}
                      <td className="p-3 border-r border-[#1a1a1a]/10">
                        <div className="flex items-center gap-2.5">
                          {politician && (
                            <div className="h-8 w-8 flex-shrink-0 overflow-hidden border border-[#1a1a1a] bg-[#f2eee5]">
                              <PoliticianImage
                                src={politician.photo}
                                alt={politician.name}
                                name={politician.name}
                                partyColor={politician.partyColor}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          )}
                          <div>
                            <span className="font-bold text-[#1a1a1a] block hover:text-[#c44d31]">
                              {report.politicianName}
                            </span>
                            <div className="flex items-center gap-1.5 text-[10px] text-[#66625b]">
                              <span
                                className="px-1.5 py-0.2 font-black text-white"
                                style={{ backgroundColor: report.partyColor }}
                              >
                                {report.partyAbbr}
                              </span>
                              {politician && (
                                <span>
                                  {politician.constituency}, {politician.state}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Baseline */}
                      <td className="p-3 font-serif font-bold text-right text-[#66625b] border-r border-[#1a1a1a]/10 whitespace-nowrap">
                        <div>₹{report.baselineValue.toFixed(2)} Cr</div>
                        <span className="text-[9px] text-[#8a8479]">({report.baselineYear})</span>
                      </td>

                      {/* Latest */}
                      <td className="p-3 font-serif font-bold text-right text-[#1a1a1a] border-r border-[#1a1a1a]/10 whitespace-nowrap">
                        <div className="font-black text-sm">₹{report.latestValue.toFixed(2)} Cr</div>
                        <span className="text-[9px] text-[#8a8479]">({report.latestYear} ECI)</span>
                      </td>

                      {/* Absolute Growth */}
                      <td className="p-3 font-serif font-bold text-right text-[#1a1a1a] border-r border-[#1a1a1a]/10 whitespace-nowrap">
                        +₹{report.absoluteGrowth.toFixed(2)} Cr
                      </td>

                      {/* Percentage Surge */}
                      <td className="p-3 font-serif font-black text-right border-r border-[#1a1a1a]/10 whitespace-nowrap">
                        <span
                          className={`text-sm ${
                            report.isFlagged ? 'text-[#c44d31]' : 'text-emerald-800'
                          }`}
                        >
                          {report.percentageGrowth >= 0 ? `+${report.percentageGrowth}%` : `${report.percentageGrowth}%`}
                        </span>
                      </td>

                      {/* CAGR */}
                      <td className="p-3 font-serif font-bold text-right text-[#66625b] border-r border-[#1a1a1a]/10 whitespace-nowrap">
                        {report.cagrPercent}% / yr
                      </td>

                      {/* Audit Status */}
                      <td className="p-3 text-center border-r border-[#1a1a1a]/10 whitespace-nowrap">
                        <div className="flex flex-col items-center gap-1">
                          {report.isFlagged && (
                            <span className="bg-red-100 text-[#c44d31] border border-[#c44d31]/40 px-2 py-0.5 text-[9px] font-black uppercase">
                              Growth &gt;{growthThreshold}%
                            </span>
                          )}
                          {hasFlaggedContract && (
                            <span className="bg-[#1a1a1a] text-white px-2 py-0.5 text-[9px] font-bold uppercase">
                              Contract Linked
                            </span>
                          )}
                          {!report.isFlagged && !hasFlaggedContract && (
                            <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 text-[9px] font-bold uppercase">
                              Normal
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="p-3 text-center whitespace-nowrap">
                        {politician && (
                          <button
                            onClick={() => onSelectPolitician(politician)}
                            className="inline-flex items-center gap-1 border border-[#1a1a1a] bg-white px-2.5 py-1 text-[11px] font-bold uppercase text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition"
                          >
                            <span>Inspect</span>
                            <Eye className="h-3 w-3" />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
