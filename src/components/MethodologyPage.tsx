import React, { useState } from 'react';
import { 
  BookOpen, 
  ShieldCheck, 
  ExternalLink, 
  HelpCircle, 
  FileCheck, 
  Info, 
  AlertTriangle, 
  Landmark, 
  Scale, 
  FileText,
  Clock
} from 'lucide-react';
import { METHODOLOGY_STANDARDS, DATA_FRESHNESS_INFO } from '../data/methodologyData';
import { CorrectionModal } from './CorrectionModal';

export const MethodologyPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isCorrectionOpen, setIsCorrectionOpen] = useState(false);

  const categories = ['All', 'Parliamentary Activity', 'Constituency Development', 'Financial & Assets', 'Legal & Judicial', 'Public Statements'];

  const filteredStandards = METHODOLOGY_STANDARDS.filter(
    s => selectedCategory === 'All' || s.category === selectedCategory
  );

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 pb-16">
      
      {/* Header Banner */}
      <div className="bg-[#f5f1e8] border border-[#18181b]/15 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#18181b]/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center bg-[#18181b] text-white rounded-xl shadow-xs">
              <BookOpen className="h-5 w-5 text-[#b4f82c]" />
            </div>
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-black text-[#18181b] tracking-tight">
                Civic Research Standards & Methodology
              </h1>
              <p className="text-xs text-[#52525b] font-mono">
                Formula Transparency, Source Verification & Editorial Neutrality
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCorrectionOpen(true)}
            className="flex items-center gap-1.5 bg-[#18181b] hover:bg-[#c44d31] text-white px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition shadow-xs cursor-pointer"
          >
            <FileCheck className="h-4 w-4" />
            <span>Request Data Review / Submit Correction</span>
          </button>
        </div>

        {/* Data Freshness & Scope Card */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div className="bg-[#fdfcfa] border border-[#18181b]/10 p-3 rounded-xl">
            <span className="text-[10.5px] font-mono uppercase text-[#71717a] block">Reporting Scope</span>
            <span className="font-serif font-bold text-xs text-[#18181b]">18th Lok Sabha (June 2024–Present)</span>
          </div>
          <div className="bg-[#fdfcfa] border border-[#18181b]/10 p-3 rounded-xl">
            <span className="text-[10.5px] font-mono uppercase text-[#71717a] block">Primary Source Verification</span>
            <span className="font-serif font-bold text-xs text-[#18181b]">Sansad.in, ECI, MoSPI & PIB</span>
          </div>
          <div className="bg-[#fdfcfa] border border-[#18181b]/10 p-3 rounded-xl">
            <span className="text-[10.5px] font-mono uppercase text-[#71717a] block">Audit Integrity Standard</span>
            <span className="font-serif font-bold text-xs text-emerald-700">Zero Opaque Scoring Policy</span>
          </div>
        </div>
      </div>

      {/* Core Principles Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#fdfcfa] border border-[#18181b]/15 rounded-2xl p-5 space-y-2.5 shadow-xs">
          <div className="flex h-8 w-8 items-center justify-center bg-[#18181b]/10 rounded-lg text-[#18181b]">
            <Scale className="h-4 w-4" />
          </div>
          <h3 className="font-serif font-bold text-sm text-[#18181b]">1. Zero Composite Scores</h3>
          <p className="text-xs text-[#52525b] leading-relaxed">
            We reject assigning arbitrary weighted "performance grades" or single composite indices to political representatives. Every metric is presented with raw underlying numbers, official citations, and contextual notes.
          </p>
        </div>

        <div className="bg-[#fdfcfa] border border-[#18181b]/15 rounded-2xl p-5 space-y-2.5 shadow-xs">
          <div className="flex h-8 w-8 items-center justify-center bg-[#18181b]/10 rounded-lg text-[#18181b]">
            <Landmark className="h-4 w-4" />
          </div>
          <h3 className="font-serif font-bold text-sm text-[#18181b]">2. Role-Aware Standards</h3>
          <p className="text-xs text-[#52525b] leading-relaxed">
            Cabinet Ministers, Leaders of Opposition, and Private Members perform constitutionally distinct duties. Per Lok Sabha Rule 37, Ministers answer questions rather than submit them; our matrix accounts for these procedural distinctions.
          </p>
        </div>

        <div className="bg-[#fdfcfa] border border-[#18181b]/15 rounded-2xl p-5 space-y-2.5 shadow-xs">
          <div className="flex h-8 w-8 items-center justify-center bg-[#18181b]/10 rounded-lg text-[#18181b]">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <h3 className="font-serif font-bold text-sm text-[#18181b]">3. Evidence-First Verification</h3>
          <p className="text-xs text-[#52525b] leading-relaxed">
            Every entry on NetaWatch links directly to official government repositories: Lok Sabha Hansard, Election Commission Form 26 sworn affidavits, and Ministry expenditure dashboards.
          </p>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-[#18181b]/15 pb-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#71717a] mr-2">Filter Standards:</span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 text-xs font-bold rounded-full transition cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#18181b] text-white shadow-2xs'
                : 'bg-[#f5f1e8] text-[#52525b] hover:bg-[#18181b] hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Metric Detail Cards */}
      <div className="space-y-4">
        {filteredStandards.map((std) => (
          <div 
            key={std.id}
            className="bg-[#fdfcfa] border border-[#18181b]/15 rounded-2xl p-5 sm:p-6 space-y-3.5 shadow-xs"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#18181b]/10 pb-3">
              <div>
                <h3 className="font-serif font-bold text-base sm:text-lg text-[#18181b]">
                  {std.name}
                </h3>
                <span className="text-[11px] text-[#71717a] font-mono">
                  Category: {std.category} • Coverage: {std.reportingPeriod}
                </span>
              </div>

              <a
                href={std.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#18181b] hover:text-[#c44d31] bg-[#f1ede4] px-3 py-1 rounded-lg transition"
              >
                <span>Primary Source: {std.officialSource.split('/')[0]}</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="bg-[#f8f5ee] p-3.5 rounded-xl space-y-1">
                <strong className="text-[#18181b] text-[11px] uppercase tracking-wider block">
                  Calculation Formula & Aggregation Method:
                </strong>
                <p className="text-[#52525b] leading-relaxed">{std.calculationMethod}</p>
              </div>

              <div className="bg-[#f8f5ee] p-3.5 rounded-xl space-y-1">
                <strong className="text-[#18181b] text-[11px] uppercase tracking-wider block">
                  Known Limitations & Boundary Conditions:
                </strong>
                <p className="text-[#52525b] leading-relaxed">{std.knownLimitations}</p>
              </div>
            </div>

            {std.ministerVsMemberRule && (
              <div className="bg-amber-50 border border-amber-200/80 p-3.5 rounded-xl text-xs space-y-1">
                <div className="flex items-center gap-1.5 text-amber-900 font-bold">
                  <Info className="h-3.5 w-3.5" />
                  <span className="uppercase tracking-wider text-[10.5px]">Minister vs Non-Minister Rule:</span>
                </div>
                <p className="text-amber-800 leading-relaxed">{std.ministerVsMemberRule}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Request Review CTA Strip */}
      <div className="bg-[#f5f1e8] border border-[#18181b]/15 rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1 max-w-xl">
          <h4 className="font-serif font-bold text-base text-[#18181b]">
            Spotted a Discrepancy or Outdated Filing?
          </h4>
          <p className="text-xs text-[#52525b]">
            Our research desk reviews community citations against official Sansad Hansard records and Election Commission Form 26 filings within 48 hours.
          </p>
        </div>
        <button
          onClick={() => setIsCorrectionOpen(true)}
          className="px-5 py-2.5 bg-[#18181b] hover:bg-[#c44d31] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition cursor-pointer shadow-xs"
        >
          Submit Discrepancy Report
        </button>
      </div>

      {/* Correction Modal */}
      <CorrectionModal
        isOpen={isCorrectionOpen}
        onClose={() => setIsCorrectionOpen(false)}
      />
    </div>
  );
};
