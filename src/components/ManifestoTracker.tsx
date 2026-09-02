import React, { useState, useMemo } from 'react';
import { 
  FileCheck, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Search, 
  ExternalLink, 
  Filter, 
  ChevronRight, 
  TrendingUp, 
  ShieldCheck, 
  Layers, 
  BookOpen, 
  Landmark, 
  UserCheck, 
  X,
  Sparkles
} from 'lucide-react';
import { ManifestoPromise, PromiseStatus, Politician } from '../types';
import { MANIFESTO_PROMISES_DATA, PROMISE_SECTORS, PROMISE_STATUSES } from '../data/manifestoPromises';
import { motion, AnimatePresence } from 'motion/react';

interface ManifestoTrackerProps {
  onSelectPoliticianByName?: (name: string) => void;
  onBackToOverview?: () => void;
}

export const ManifestoTracker: React.FC<ManifestoTrackerProps> = ({
  onSelectPoliticianByName,
  onBackToOverview,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAlliance, setSelectedAlliance] = useState<string>('All');
  const [selectedSector, setSelectedSector] = useState<string>('All Sectors');
  const [selectedStatus, setSelectedStatus] = useState<string>('All Statuses');
  const [activePromiseModal, setActivePromiseModal] = useState<ManifestoPromise | null>(null);

  // Statistics calculation
  const totalPromises = MANIFESTO_PROMISES_DATA.length;
  const fulfilledCount = MANIFESTO_PROMISES_DATA.filter((p) => p.status === 'Fulfilled').length;
  const inProgressCount = MANIFESTO_PROMISES_DATA.filter((p) => p.status === 'In Progress').length;
  const underReviewCount = MANIFESTO_PROMISES_DATA.filter((p) => p.status === 'Under Review').length;
  const pendingCount = MANIFESTO_PROMISES_DATA.filter((p) => p.status === 'Pending Action' || p.status === 'Broken / Stalled').length;

  const overallProgressAvg = Math.round(
    MANIFESTO_PROMISES_DATA.reduce((acc, p) => acc + p.progressPercent, 0) / (totalPromises || 1)
  );

  // Filtered dataset
  const filteredPromises = useMemo(() => {
    return MANIFESTO_PROMISES_DATA.filter((p) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.party.toLowerCase().includes(q) ||
          p.manifestoName.toLowerCase().includes(q) ||
          p.sector.toLowerCase().includes(q) ||
          p.actionsTaken.some((a) => a.toLowerCase().includes(q));
        if (!matches) return false;
      }

      // Alliance
      if (selectedAlliance !== 'All' && p.alliance !== selectedAlliance) {
        return false;
      }

      // Sector
      if (selectedSector !== 'All Sectors' && p.sector !== selectedSector) {
        return false;
      }

      // Status
      if (selectedStatus !== 'All Statuses' && p.status !== selectedStatus) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedAlliance, selectedSector, selectedStatus]);

  // Helper for status badge styling
  const getStatusBadge = (status: PromiseStatus) => {
    switch (status) {
      case 'Fulfilled':
        return {
          bg: 'bg-[#2d6a4f]/10 text-[#2d6a4f] border-[#2d6a4f]/30',
          icon: <CheckCircle2 className="h-3 w-3" />,
          label: 'Fulfilled / Notified',
        };
      case 'In Progress':
        return {
          bg: 'bg-[#d97706]/10 text-[#b45309] border-[#d97706]/30',
          icon: <TrendingUp className="h-3 w-3" />,
          label: 'In Progress / Active',
        };
      case 'Under Review':
        return {
          bg: 'bg-[#0284c7]/10 text-[#0369a1] border-[#0284c7]/30',
          icon: <Clock className="h-3 w-3" />,
          label: 'Under Committee Review',
        };
      case 'Broken / Stalled':
        return {
          bg: 'bg-[#dc2626]/10 text-[#b91c1c] border-[#dc2626]/30',
          icon: <AlertCircle className="h-3 w-3" />,
          label: 'Stalled / Shelved',
        };
      default:
        return {
          bg: 'bg-[#66625b]/10 text-[#66625b] border-[#66625b]/30',
          icon: <Clock className="h-3 w-3" />,
          label: 'Pending Action',
        };
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Broadsheet Banner */}
      <div className="border border-[#1a1a1a]/20 bg-white p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1a1a1a]/15 pb-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center bg-[#1a1a1a] text-white border border-[#1a1a1a] flex-shrink-0">
              <FileCheck className="h-5 w-5 sm:h-6 sm:w-6 text-[#f2eee5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-xl sm:text-2xl font-black tracking-tight text-[#1a1a1a]">
                  National Manifesto & Promise Tracker
                </h1>
                <span className="border border-[#c44d31] bg-[#c44d31]/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-[#c44d31]">
                  18th Lok Sabha
                </span>
              </div>
              <p className="text-xs text-[#66625b] mt-0.5 max-w-2xl">
                Systematic legislative audit cross-referencing party election manifestos (Sankalp Patra, Nyay Patra) against official Gazette Notifications, Union Budgets, and Parliamentary Hansard records.
              </p>
            </div>
          </div>

          {onBackToOverview && (
            <button
              onClick={onBackToOverview}
              className="inline-flex items-center gap-1.5 border border-[#1a1a1a] bg-[#f2eee5] px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition"
            >
              ← Back to Leaders
            </button>
          )}
        </div>

        {/* Aggregate KPI Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-4 pt-2">
          
          <div className="border-t-2 border-[#1a1a1a] bg-[#f9f7f2] p-3">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#66625b]">
              Audited Promises
            </div>
            <div className="font-serif text-2xl font-black text-[#1a1a1a]">
              {totalPromises}
            </div>
            <div className="text-[10px] text-[#8a8479]">
              Verified Policy Items
            </div>
          </div>

          <div className="border-t-2 border-[#2d6a4f] bg-[#f9f7f2] p-3">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#2d6a4f] flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" /> Fulfilled
            </div>
            <div className="font-serif text-2xl font-black text-[#2d6a4f]">
              {fulfilledCount} <span className="text-xs font-sans font-semibold text-[#66625b]">({Math.round((fulfilledCount / totalPromises) * 100)}%)</span>
            </div>
            <div className="text-[10px] text-[#2d6a4f]">
              Notified & Operational
            </div>
          </div>

          <div className="border-t-2 border-[#d97706] bg-[#f9f7f2] p-3">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#d97706] flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> In Progress
            </div>
            <div className="font-serif text-2xl font-black text-[#d97706]">
              {inProgressCount} <span className="text-xs font-sans font-semibold text-[#66625b]">({Math.round((inProgressCount / totalPromises) * 100)}%)</span>
            </div>
            <div className="text-[10px] text-[#66625b]">
              Active Scheme Rollout
            </div>
          </div>

          <div className="border-t-2 border-[#0284c7] bg-[#f9f7f2] p-3">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#0284c7] flex items-center gap-1">
              <Clock className="h-3 w-3" /> Under Review
            </div>
            <div className="font-serif text-2xl font-black text-[#0284c7]">
              {underReviewCount}
            </div>
            <div className="text-[10px] text-[#66625b]">
              Committee / Drafting
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1 border-t-2 border-[#c44d31] bg-[#f9f7f2] p-3">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#c44d31]">
              Delivery Pace
            </div>
            <div className="font-serif text-2xl font-black text-[#1a1a1a]">
              {overallProgressAvg}%
            </div>
            <div className="w-full bg-[#1a1a1a]/10 h-1.5 mt-1 overflow-hidden">
              <div
                className="bg-[#2d6a4f] h-full transition-all duration-500"
                style={{ width: `${overallProgressAvg}%` }}
              />
            </div>
          </div>

        </div>
      </div>

      {/* Interactive Filter & Search Controls */}
      <div className="border border-[#1a1a1a]/20 bg-white p-4 space-y-3 shadow-sm">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1 min-w-[260px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#66625b]" />
            <input
              type="text"
              placeholder="Search promise keyword (e.g., Ayushman, Solar, MSP, UCC, Apprenticeship)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-[#1a1a1a]/30 bg-[#f9f7f2] py-2 pl-9 pr-8 text-xs font-medium text-[#1a1a1a] placeholder-[#8a8479] focus:outline-none focus:border-[#1a1a1a] focus:bg-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#66625b] hover:text-[#1a1a1a]"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Alliance Switcher Tabs */}
          <div className="flex items-center border border-[#1a1a1a]/20 bg-[#f2eee5] p-0.5 text-xs">
            {['All', 'NDA', 'INDIA', 'Others'].map((alliance) => (
              <button
                key={alliance}
                onClick={() => setSelectedAlliance(alliance)}
                className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition ${
                  selectedAlliance === alliance
                    ? 'bg-[#1a1a1a] text-white shadow-xs'
                    : 'text-[#66625b] hover:text-[#1a1a1a]'
                }`}
              >
                {alliance === 'All' ? 'All Coalitions' : alliance}
              </button>
            ))}
          </div>

        </div>

        {/* Sector and Status Dropdowns */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#1a1a1a]/10 text-xs">
          
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold uppercase text-[#66625b]">Sector:</span>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="border border-[#1a1a1a]/30 bg-white px-2.5 py-1 text-xs font-medium text-[#1a1a1a] focus:outline-none"
            >
              {PROMISE_SECTORS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold uppercase text-[#66625b]">Delivery Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border border-[#1a1a1a]/30 bg-white px-2.5 py-1 text-xs font-medium text-[#1a1a1a] focus:outline-none"
            >
              {PROMISE_STATUSES.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          <div className="ml-auto text-[11px] text-[#66625b] font-medium">
            Showing <strong className="text-[#1a1a1a] font-serif font-bold">{filteredPromises.length}</strong> of {totalPromises} commitments
          </div>

        </div>
      </div>

      {/* Promises Cards List */}
      <div className="space-y-4">
        {filteredPromises.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPromises.map((promise) => {
              const statusStyle = getStatusBadge(promise.status);

              return (
                <motion.div
                  key={promise.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group flex flex-col justify-between border-2 border-[#1a1a1a]/15 bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl hover:border-[#1a1a1a]/60 hover:shadow-md transition-all duration-200 space-y-4 hover:-translate-y-1"
                >
                  <div className="space-y-3">
                    
                    {/* Header Row: Party & Status */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span
                          className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider border"
                          style={{
                            backgroundColor: `${promise.partyColor}15`,
                            color: promise.partyColor,
                            borderColor: `${promise.partyColor}40`,
                          }}
                        >
                          {promise.partyAbbr} ({promise.alliance})
                        </span>
                        <span className="bg-[#f2eee5] border border-[#1a1a1a]/15 px-2 py-0.5 text-[9px] font-semibold uppercase text-[#66625b]">
                          {promise.sector}
                        </span>
                      </div>

                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold uppercase border ${statusStyle.bg}`}>
                        {statusStyle.icon}
                        {statusStyle.label}
                      </span>
                    </div>

                    {/* Title */}
                    <div>
                      <h3 className="font-serif text-base font-bold text-[#1a1a1a] leading-snug group-hover:text-[#c44d31] transition-colors">
                        {promise.title}
                      </h3>
                      <p className="text-[11px] text-[#8a8479] font-medium mt-0.5">
                        Source: {promise.manifestoName}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-[#4a4742] leading-relaxed line-clamp-3">
                      {promise.description}
                    </p>

                    {/* Progress Bar */}
                    <div className="space-y-1 bg-[#f9f7f2] p-2.5 border border-[#1a1a1a]/10">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-[#66625b] uppercase text-[9px]">Implementation Progress</span>
                        <span className="font-bold font-serif text-[#1a1a1a]">{promise.progressPercent}%</span>
                      </div>
                      <div className="w-full bg-[#1a1a1a]/10 h-1.5 overflow-hidden">
                        <div
                          className="h-full transition-all duration-300"
                          style={{
                            width: `${promise.progressPercent}%`,
                            backgroundColor: promise.progressPercent === 100 ? '#2d6a4f' : promise.partyColor || '#c44d31',
                          }}
                        />
                      </div>
                      <div className="text-[10px] text-[#66625b] pt-0.5 truncate">
                        Timeline: {promise.deliveryTimeline}
                      </div>
                    </div>

                    {/* Latest Action Highlight */}
                    {promise.actionsTaken && promise.actionsTaken.length > 0 && (
                      <div className="text-[11px] text-[#1a1a1a] bg-white border-l-2 border-[#1a1a1a] pl-2.5 py-1">
                        <span className="font-bold text-[#66625b] text-[9px] uppercase block">Latest Milestone</span>
                        {promise.actionsTaken[0]}
                      </div>
                    )}

                  </div>

                  {/* Footer Row */}
                  <div className="flex items-center justify-between border-t border-[#1a1a1a]/10 pt-3 text-xs">
                    <div className="flex items-center gap-1 text-[11px] text-[#66625b] truncate max-w-[200px]">
                      {promise.budgetAllocatedCr ? (
                        <span>Outlay: <strong className="font-bold text-[#2d6a4f]">₹{promise.budgetAllocatedCr.toLocaleString()} Cr</strong></span>
                      ) : (
                        <span>Verified Gazette Record</span>
                      )}
                    </div>

                    <button
                      onClick={() => setActivePromiseModal(promise)}
                      className="inline-flex items-center gap-1 border border-[#1a1a1a] bg-[#1a1a1a] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white hover:bg-[#c44d31] hover:border-[#c44d31] transition"
                    >
                      Audit Details <ChevronRight className="h-3 w-3" />
                    </button>
                  </div>

                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="border border-[#1a1a1a]/20 bg-white p-12 text-center space-y-3">
            <p className="font-serif text-lg font-bold text-[#1a1a1a]">No manifesto promises match your criteria</p>
            <p className="text-xs text-[#66625b]">
              Try adjusting the search keyword, coalition, or sector filter above.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedAlliance('All');
                setSelectedSector('All Sectors');
                setSelectedStatus('All Statuses');
              }}
              className="inline-flex border border-[#1a1a1a] bg-[#1a1a1a] px-3.5 py-1 text-xs font-bold uppercase text-white hover:bg-[#c44d31] transition"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Deep-Dive Promise Audit Modal */}
      <AnimatePresence>
        {activePromiseModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto border-2 border-[#1a1a1a] bg-[#f7f5f0] p-6 shadow-2xl space-y-5"
            >
              <button
                onClick={() => setActivePromiseModal(null)}
                className="absolute right-4 top-4 p-1 text-[#66625b] hover:text-[#1a1a1a] hover:bg-[#f2eee5] border border-transparent hover:border-[#1a1a1a]/30 transition"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Header */}
              <div className="space-y-2 border-b border-[#1a1a1a]/20 pb-4 pr-8">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="px-2 py-0.5 text-[10px] font-bold uppercase border"
                    style={{
                      backgroundColor: `${activePromiseModal.partyColor}15`,
                      color: activePromiseModal.partyColor,
                      borderColor: `${activePromiseModal.partyColor}40`,
                    }}
                  >
                    {activePromiseModal.party} ({activePromiseModal.partyAbbr})
                  </span>
                  <span className="bg-white border border-[#1a1a1a]/20 px-2 py-0.5 text-[10px] font-semibold text-[#66625b]">
                    {activePromiseModal.sector}
                  </span>
                  <span className={`px-2 py-0.5 text-[10px] font-bold uppercase border ${getStatusBadge(activePromiseModal.status).bg}`}>
                    {getStatusBadge(activePromiseModal.status).label}
                  </span>
                </div>

                <h2 className="font-serif text-xl font-bold text-[#1a1a1a] leading-tight">
                  {activePromiseModal.title}
                </h2>
                <p className="text-xs text-[#66625b]">
                  Documented in: <strong className="text-[#1a1a1a]">{activePromiseModal.manifestoName} ({activePromiseModal.year})</strong>
                </p>
              </div>

              {/* Progress & Budget */}
              <div className="grid grid-cols-2 gap-3 bg-white p-4 border border-[#1a1a1a]/20">
                <div>
                  <div className="text-[10px] font-bold uppercase text-[#66625b]">Delivery Completion</div>
                  <div className="font-serif text-2xl font-black text-[#1a1a1a]">
                    {activePromiseModal.progressPercent}%
                  </div>
                  <div className="w-full bg-[#1a1a1a]/10 h-2 mt-1">
                    <div
                      className="bg-[#2d6a4f] h-full"
                      style={{ width: `${activePromiseModal.progressPercent}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-bold uppercase text-[#66625b]">Allocated Outlay</div>
                  <div className="font-serif text-2xl font-black text-[#2d6a4f]">
                    {activePromiseModal.budgetAllocatedCr ? `₹${activePromiseModal.budgetAllocatedCr.toLocaleString()} Cr` : 'Statutory / Policy'}
                  </div>
                  <div className="text-[10px] text-[#8a8479]">
                    Timeline: {activePromiseModal.deliveryTimeline}
                  </div>
                </div>
              </div>

              {/* Detailed Description */}
              <div className="space-y-1.5">
                <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-[#1a1a1a]">
                  Policy Commitment Scope
                </h4>
                <p className="text-xs text-[#333] leading-relaxed bg-white p-3 border border-[#1a1a1a]/15">
                  {activePromiseModal.description}
                </p>
              </div>

              {/* Actions Taken / Chronological Log */}
              <div className="space-y-2">
                <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-[#1a1a1a]">
                  Official Actions & Milestones Log
                </h4>
                <div className="space-y-2">
                  {activePromiseModal.actionsTaken.map((action, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-[#1a1a1a] bg-white p-2.5 border border-[#1a1a1a]/15">
                      <span className="flex h-5 w-5 items-center justify-center bg-[#1a1a1a] text-white text-[10px] font-bold flex-shrink-0">
                        {idx + 1}
                      </span>
                      <span>{action}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Legislative Framework & Citation */}
              <div className="border-t border-[#1a1a1a]/20 pt-3 space-y-2 text-xs">
                {activePromiseModal.legislativeAction && (
                  <div className="flex items-start gap-2">
                    <Landmark className="h-4 w-4 text-[#c44d31] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#1a1a1a]">Legislative Vehicle: </strong>
                      <span className="text-[#66625b]">{activePromiseModal.legislativeAction}</span>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-2">
                  <BookOpen className="h-4 w-4 text-[#2d6a4f] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1a1a1a]">Public Record Citation: </strong>
                    <span className="text-[#66625b]">{activePromiseModal.citationSource}</span>
                  </div>
                </div>
              </div>

              {/* Key Lead Ministers / MPs */}
              {activePromiseModal.relatedMinistersOrMPs && (
                <div className="border-t border-[#1a1a1a]/20 pt-3">
                  <div className="text-[10px] font-bold uppercase text-[#66625b] mb-1.5">
                    Lead Ministers / Sponsoring MPs
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activePromiseModal.relatedMinistersOrMPs.map((neta) => (
                      <button
                        key={neta}
                        onClick={() => {
                          if (onSelectPoliticianByName) {
                            onSelectPoliticianByName(neta);
                            setActivePromiseModal(null);
                          }
                        }}
                        className="inline-flex items-center gap-1 bg-white border border-[#1a1a1a]/30 px-2.5 py-1 text-xs font-bold text-[#1a1a1a] hover:border-[#c44d31] hover:text-[#c44d31] transition"
                      >
                        <UserCheck className="h-3 w-3 text-[#c44d31]" />
                        {neta}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setActivePromiseModal(null)}
                  className="border border-[#1a1a1a] bg-[#1a1a1a] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#c44d31] transition"
                >
                  Close Audit View
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
