import React, { useState, useMemo } from 'react';
import { 
  MessageSquare, 
  Search, 
  Filter, 
  ExternalLink, 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  FileText, 
  Scale, 
  Info,
  Clock,
  Sparkles
} from 'lucide-react';
import { Politician, PublicStatement, StatementTopic } from '../types';
import { VERIFIED_PUBLIC_STATEMENTS, STATEMENT_TOPICS } from '../data/statementsData';
import { PoliticianImage } from './PoliticianImage';
import { DATA_FRESHNESS_INFO } from '../data/methodologyData';

interface StatementsExplorerProps {
  allPoliticians: Politician[];
  onSelectPolitician: (p: Politician) => void;
  onCompareWithOthers?: (p: Politician) => void;
}

export const StatementsExplorer: React.FC<StatementsExplorerProps> = ({
  allPoliticians,
  onSelectPolitician,
  onCompareWithOthers
}) => {
  const [selectedTopic, setSelectedTopic] = useState<StatementTopic | 'All'>('All');
  const [selectedSpeakerId, setSelectedSpeakerId] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [quoteTypeFilter, setQuoteTypeFilter] = useState<'All' | 'Direct Quotation' | 'Parliamentary Record Excerpt' | 'Press Release Statement'>('All');

  // Filtered list of statements
  const filteredStatements = useMemo(() => {
    return VERIFIED_PUBLIC_STATEMENTS.filter((stmt) => {
      // Topic match
      if (selectedTopic !== 'All' && stmt.topic !== selectedTopic) return false;
      // Speaker match
      if (selectedSpeakerId !== 'All' && stmt.politicianId !== selectedSpeakerId) return false;
      // Quote type match
      if (quoteTypeFilter !== 'All' && stmt.quoteType !== quoteTypeFilter) return false;
      // Text query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const combined = `${stmt.speakerName} ${stmt.partyAbbr} ${stmt.venue} ${stmt.topic} ${stmt.directQuote} ${stmt.contextSummary}`.toLowerCase();
        if (!combined.includes(q)) return false;
      }
      return true;
    });
  }, [selectedTopic, selectedSpeakerId, quoteTypeFilter, searchQuery]);

  // Unique list of speakers in statement database
  const availableSpeakers = useMemo(() => {
    const speakerIds = Array.from(new Set(VERIFIED_PUBLIC_STATEMENTS.map(s => s.politicianId)));
    return speakerIds.map(id => {
      const p = allPoliticians.find(pol => pol.id === id);
      const stmtCount = VERIFIED_PUBLIC_STATEMENTS.filter(s => s.politicianId === id).length;
      return {
        id,
        name: p?.name || id,
        partyAbbr: p?.partyAbbr || '',
        photo: p?.photo || '',
        count: stmtCount
      };
    });
  }, [allPoliticians]);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 pb-16">
      
      {/* Header Banner */}
      <div className="bg-[#f5f1e8] border border-[#18181b]/15 rounded-2xl p-4 sm:p-6 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#18181b]/10 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center bg-[#18181b] text-white rounded-lg shadow-xs">
              <MessageSquare className="h-5 w-5 text-[#b4f82c]" />
            </div>
            <div>
              <h1 className="font-serif text-xl sm:text-2xl font-black text-[#18181b] tracking-tight">
                Verified Public Statements & Policy Positions
              </h1>
              <p className="text-xs text-[#52525b] font-mono">
                Direct Parliamentary Hansard Excerpts & Official Communiques
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-[#18181b] text-white px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider rounded-full">
              <Clock className="h-3 w-3 text-amber-300" />
              <span>18th Lok Sabha (2024–Present)</span>
            </span>
          </div>
        </div>

        {/* Search & Topic Filters */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[240px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#71717a]" />
              <input
                type="text"
                placeholder="Search statements by keyword, leader, topic, or venue..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#18181b]/20 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#18181b]"
              />
            </div>

            {/* Speaker Filter Dropdown */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#71717a]">Speaker:</span>
              <select
                value={selectedSpeakerId}
                onChange={(e) => setSelectedSpeakerId(e.target.value)}
                className="px-3 py-2 text-xs bg-white border border-[#18181b]/20 rounded-xl focus:outline-none font-medium cursor-pointer"
              >
                <option value="All">All Leaders ({availableSpeakers.length})</option>
                {availableSpeakers.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.partyAbbr}) - {s.count} Statements
                  </option>
                ))}
              </select>
            </div>

            {/* Quote Type Dropdown */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#71717a]">Format:</span>
              <select
                value={quoteTypeFilter}
                onChange={(e) => setQuoteTypeFilter(e.target.value as any)}
                className="px-3 py-2 text-xs bg-white border border-[#18181b]/20 rounded-xl focus:outline-none font-medium cursor-pointer"
              >
                <option value="All">All Formats</option>
                <option value="Direct Quotation">Direct Quotation</option>
                <option value="Parliamentary Record Excerpt">Parliamentary Hansard</option>
                <option value="Press Release Statement">PIB / Official Release</option>
              </select>
            </div>
          </div>

          {/* Topic Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <button
              onClick={() => setSelectedTopic('All')}
              className={`px-3 py-1 text-xs font-bold rounded-full transition cursor-pointer ${
                selectedTopic === 'All'
                  ? 'bg-[#18181b] text-white shadow-2xs'
                  : 'bg-white text-[#52525b] hover:bg-[#18181b] hover:text-white border border-[#18181b]/15'
              }`}
            >
              All Topics ({VERIFIED_PUBLIC_STATEMENTS.length})
            </button>
            {STATEMENT_TOPICS.map((topic) => {
              const count = VERIFIED_PUBLIC_STATEMENTS.filter(s => s.topic === topic).length;
              return (
                <button
                  key={topic}
                  onClick={() => setSelectedTopic(topic)}
                  className={`px-3 py-1 text-xs font-bold rounded-full transition cursor-pointer ${
                    selectedTopic === topic
                      ? 'bg-[#18181b] text-white shadow-2xs'
                      : 'bg-white text-[#52525b] hover:bg-[#18181b] hover:text-white border border-[#18181b]/15'
                  }`}
                >
                  {topic} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Statements Feed */}
      <div className="space-y-4">
        {filteredStatements.length > 0 ? (
          filteredStatements.map((stmt) => {
            const politician = allPoliticians.find(p => p.id === stmt.politicianId);
            return (
              <div
                key={stmt.id}
                className="bg-[#fdfcfa] border border-[#18181b]/15 rounded-2xl p-5 sm:p-6 space-y-3.5 shadow-xs transition hover:border-[#18181b]/30"
              >
                {/* Speaker & Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#18181b]/10 pb-3">
                  <div className="flex items-center gap-3">
                    {politician && (
                      <div className="h-10 w-10 rounded-xl overflow-hidden shrink-0 border border-[#18181b]/20 shadow-2xs">
                        <PoliticianImage name={politician.name} photoUrl={politician.photo} className="h-full w-full object-cover" />
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => politician && onSelectPolitician(politician)}
                          className="font-serif font-bold text-base text-[#18181b] hover:text-[#c44d31] transition text-left"
                        >
                          {stmt.speakerName}
                        </button>
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#18181b]/10 text-[#18181b]">
                          {stmt.partyAbbr}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#71717a] font-mono mt-0.5">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> {stmt.date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 truncate max-w-[280px]">
                          <MapPin className="h-3 w-3 shrink-0" /> {stmt.venue}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold bg-[#f1ede4] border border-[#18181b]/15 text-[#18181b] px-3 py-0.5 rounded-full">
                      {stmt.topic}
                    </span>
                    <span className="text-[10.5px] font-mono bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" /> {stmt.quoteType}
                    </span>
                  </div>
                </div>

                {/* Direct Verbatim Quote */}
                <div className="bg-[#f8f5ee] border-l-4 border-[#c44d31] p-4 rounded-r-xl space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#c44d31] block">
                    Verbatim Excerpt:
                  </span>
                  <blockquote className="font-serif text-sm sm:text-[15px] text-[#18181b] italic leading-relaxed">
                    “{stmt.directQuote}”
                  </blockquote>
                </div>

                {/* Neutral Factual Summary Context */}
                <div className="text-xs text-[#52525b] bg-[#fdfcfa] p-3 rounded-lg border border-[#18181b]/10">
                  <strong className="text-[#18181b] block text-[11px] uppercase tracking-wider mb-1">
                    Factual Context & Legislative Backdrop:
                  </strong>
                  <p className="leading-relaxed">{stmt.contextSummary}</p>
                </div>

                {/* Source Link & Verification Badge */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#18181b]/10 text-xs">
                  <div className="text-[11px] text-[#71717a] font-mono flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5 text-[#18181b]" />
                    <span>Official Record: <strong>{stmt.sourceLabel}</strong></span>
                  </div>

                  <div className="flex items-center gap-3">
                    {politician && onCompareWithOthers && (
                      <button
                        onClick={() => onCompareWithOthers(politician)}
                        className="text-xs font-bold text-[#52525b] hover:text-[#18181b] transition"
                      >
                        Compare Leader
                      </button>
                    )}
                    <a
                      href={stmt.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 font-bold text-[#18181b] hover:text-[#c44d31] transition bg-[#f1ede4] hover:bg-[#18181b] hover:text-white px-3 py-1 rounded-lg"
                    >
                      <span>Inspect Official Record</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 bg-[#fdfcfa] border border-[#18181b]/15 rounded-2xl space-y-2">
            <MessageSquare className="h-8 w-8 text-[#71717a] mx-auto" />
            <h3 className="font-serif font-bold text-base text-[#18181b]">No Statements Match Your Filters</h3>
            <p className="text-xs text-[#71717a]">Try clearing your search query or selecting "All Topics".</p>
          </div>
        )}
      </div>
    </div>
  );
};
