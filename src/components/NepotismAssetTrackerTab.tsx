import React, { useState, useMemo } from 'react';
import { Politician, AssetCategory, AssetOwnerType } from '../types';
import {
  findFlaggedContracts,
  calculatePoliticianAssetGrowth,
  getPoliticianRelativesAndContractors
} from '../utils/nepotismTrackerLogic';
import { ASSETS_DATA } from '../data/nepotismTrackerData';
import {
  AlertTriangle,
  TrendingUp,
  FileText,
  ExternalLink,
  ShieldAlert,
  Building,
  Users,
  Briefcase,
  Layers,
  ChevronRight,
  Info,
  Calendar,
  DollarSign,
  Landmark,
  BadgeAlert,
  CheckCircle2,
  Sliders,
  Sparkles
} from 'lucide-react';

interface NepotismAssetTrackerTabProps {
  politician: Politician;
}

export const NepotismAssetTrackerTab: React.FC<NepotismAssetTrackerTabProps> = ({
  politician
}) => {
  // Configurable threshold state (default 50%)
  const [growthThreshold, setGrowthThreshold] = useState<number>(50);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [ownerFilter, setOwnerFilter] = useState<string>('all');

  // Compute flagged contracts specifically for this politician
  const flaggedContracts = useMemo(() => {
    return findFlaggedContracts([politician], politician.id);
  }, [politician]);

  // Compute asset growth analysis
  const assetGrowth = useMemo(() => {
    return calculatePoliticianAssetGrowth(politician, growthThreshold);
  }, [politician, growthThreshold]);

  // Relatives and contractors network
  const network = useMemo(() => {
    return getPoliticianRelativesAndContractors(politician.id);
  }, [politician]);

  // Filtered asset items
  const politicianAssets = useMemo(() => {
    return ASSETS_DATA.filter((a) => {
      if (a.politicianId !== politician.id) return false;
      if (categoryFilter !== 'all' && a.category !== categoryFilter) return false;
      if (ownerFilter !== 'all' && a.ownerType !== ownerFilter) return false;
      return true;
    }).sort((a, b) => b.yearDeclared - a.yearDeclared || b.declaredValue - a.declaredValue);
  }, [politician, categoryFilter, ownerFilter]);

  const totalFlaggedValueCr = flaggedContracts.reduce(
    (sum, f) => sum + f.contract.contractValue,
    0
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* 1. TOP HEADER & KEY METRIC SUMMARY TILES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Declared Net Worth */}
        <div className="border-t-2 border-[#1a1a1a] border-x border-b border-[#1a1a1a]/20 bg-white p-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#66625b]">
              Latest Declared Assets
            </span>
            <span className="text-[9px] bg-[#f2eee5] border border-[#1a1a1a]/15 px-1.5 py-0.5 font-bold uppercase text-[#1a1a1a]">
              {assetGrowth.latestYear} ECI
            </span>
          </div>
          <div className="mt-1 font-serif text-2xl font-black text-[#1a1a1a]">
            ₹{assetGrowth.latestValue.toFixed(2)} Cr
          </div>
          <p className="text-[10px] text-[#66625b] mt-0.5">
            Movable: ₹{politician.assets.movableCr.toFixed(1)} Cr | Immovable: ₹{politician.assets.immovableCr.toFixed(1)} Cr
          </p>
        </div>

        {/* Wealth Growth Trajectory */}
        <div className={`border-t-2 ${assetGrowth.isFlagged ? 'border-[#c44d31]' : 'border-[#1a1a1a]'} border-x border-b border-[#1a1a1a]/20 bg-white p-4`}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#66625b]">
              Cumulative Asset Surge
            </span>
            <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 border ${
              assetGrowth.isFlagged
                ? 'bg-red-50 text-[#c44d31] border-[#c44d31]/30'
                : 'bg-emerald-50 text-emerald-800 border-emerald-300'
            }`}>
              {assetGrowth.isFlagged ? `Flagged >${growthThreshold}%` : 'Normal'}
            </span>
          </div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className={`font-serif text-2xl font-black ${assetGrowth.isFlagged ? 'text-[#c44d31]' : 'text-[#1a1a1a]'}`}>
              {assetGrowth.percentageGrowth >= 0 ? `+${assetGrowth.percentageGrowth}%` : `${assetGrowth.percentageGrowth}%`}
            </span>
            <span className="text-xs font-bold text-[#66625b]">
              (+₹{assetGrowth.absoluteGrowth.toFixed(1)} Cr)
            </span>
          </div>
          <p className="text-[10px] text-[#66625b] mt-0.5">
            Since {assetGrowth.baselineYear} baseline (CAGR: {assetGrowth.cagrPercent}%)
          </p>
        </div>

        {/* Flagged Nepotism / Conflict Contracts */}
        <div className={`border-t-2 ${flaggedContracts.length > 0 ? 'border-[#c44d31]' : 'border-emerald-600'} border-x border-b border-[#1a1a1a]/20 bg-white p-4`}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#66625b]">
              Flagged Govt Contracts
            </span>
            {flaggedContracts.length > 0 ? (
              <span className="text-[9px] bg-red-100 text-[#c44d31] border border-[#c44d31]/40 px-1.5 py-0.5 font-bold uppercase">
                {flaggedContracts.length} Cases
              </span>
            ) : (
              <span className="text-[9px] bg-emerald-100 text-emerald-800 border border-emerald-300 px-1.5 py-0.5 font-bold uppercase">
                0 Clean
              </span>
            )}
          </div>
          <div className="mt-1 font-serif text-2xl font-black text-[#1a1a1a]">
            ₹{totalFlaggedValueCr.toFixed(1)} Cr
          </div>
          <p className="text-[10px] text-[#66625b] mt-0.5">
            Relative-contractor awards under portfolio jurisdiction
          </p>
        </div>

        {/* Documented Relatives & Entities */}
        <div className="border-t-2 border-[#1a1a1a] border-x border-b border-[#1a1a1a]/20 bg-white p-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#66625b]">
              Audited Family Entities
            </span>
            <span className="text-[9px] bg-[#f2eee5] border border-[#1a1a1a]/15 px-1.5 py-0.5 font-bold uppercase text-[#1a1a1a]">
              MCA & ECI
            </span>
          </div>
          <div className="mt-1 font-serif text-2xl font-black text-[#1a1a1a]">
            {network.relatives.length} Relatives
          </div>
          <p className="text-[10px] text-[#66625b] mt-0.5">
            Linked to {network.contractors.length} registered commercial firms
          </p>
        </div>
      </div>

      {/* 2. INTERACTIVE GROWTH AUDIT & THRESHOLD CONTROLS */}
      <div className="border border-[#1a1a1a]/20 bg-white p-5 sm:p-6 space-y-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1a1a1a]/10 pb-4">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a] flex items-center gap-2">
              <Sliders className="h-4 w-4 text-[#c44d31]" />
              Asset Growth Acceleration & Audit Threshold
            </h4>
            <p className="text-xs text-[#66625b] mt-0.5">
              Compare declared wealth trajectory against baseline election affidavits with custom alert thresholds
            </p>
          </div>

          {/* Threshold Selector Pills */}
          <div className="flex items-center gap-1.5 bg-[#f2eee5] p-1 border border-[#1a1a1a]/20">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#66625b] px-2">
              Alert Trigger:
            </span>
            {[25, 50, 100, 200].map((t) => (
              <button
                key={t}
                onClick={() => setGrowthThreshold(t)}
                className={`px-2.5 py-1 text-xs font-bold transition ${
                  growthThreshold === t
                    ? 'bg-[#1a1a1a] text-white shadow-sm'
                    : 'text-[#1a1a1a] hover:bg-white/60'
                }`}
              >
                &gt;{t}%
              </button>
            ))}
          </div>
        </div>

        {/* Growth Flag Banner */}
        {assetGrowth.isFlagged ? (
          <div className="border-l-4 border-[#c44d31] bg-red-50/70 border border-red-200 p-4 space-y-2">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-[#c44d31] flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wide text-[#c44d31]">
                    Asset Surge Exceeds Threshold ({assetGrowth.percentageGrowth}% vs {growthThreshold}% limit)
                  </span>
                </div>
                <p className="text-xs text-[#1a1a1a] leading-relaxed">
                  Declared net assets increased by <strong className="font-bold">₹{assetGrowth.absoluteGrowth.toFixed(2)} Crore ({assetGrowth.percentageGrowth}%)</strong> from the {assetGrowth.baselineYear} baseline affidavit (₹{assetGrowth.baselineValue.toFixed(2)} Cr) to the {assetGrowth.latestYear} declaration (₹{assetGrowth.latestValue.toFixed(2)} Cr). The annualized compound growth rate (CAGR) stands at <strong className="font-bold">{assetGrowth.cagrPercent}%</strong> per year.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="border-l-4 border-emerald-600 bg-emerald-50/70 border border-emerald-200 p-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-700 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold uppercase tracking-wide text-emerald-900">
                  Asset Progression Within Configured Threshold ({assetGrowth.percentageGrowth}% &lt; {growthThreshold}%)
                </span>
                <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                  Total asset increase from {assetGrowth.baselineYear} (₹{assetGrowth.baselineValue.toFixed(2)} Cr) to {assetGrowth.latestYear} (₹{assetGrowth.latestValue.toFixed(2)} Cr) is within standard macroeconomic growth parameters.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Breakdown by Owner Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* Self */}
          <div className="border border-[#1a1a1a]/15 bg-[#faf8f5] p-3.5 space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-bold uppercase tracking-wider text-[#66625b]">Candidate (Self)</span>
              <span className={`font-bold text-xs ${assetGrowth.breakdownByOwner.self.isFlagged ? 'text-[#c44d31]' : 'text-[#1a1a1a]'}`}>
                {assetGrowth.breakdownByOwner.self.growthPercent >= 0 ? `+${assetGrowth.breakdownByOwner.self.growthPercent}%` : `${assetGrowth.breakdownByOwner.self.growthPercent}%`}
              </span>
            </div>
            <div className="font-serif text-lg font-bold text-[#1a1a1a]">
              ₹{assetGrowth.breakdownByOwner.self.latest.toFixed(2)} Cr
            </div>
            <div className="text-[10px] text-[#66625b]">
              Baseline: ₹{assetGrowth.breakdownByOwner.self.baseline.toFixed(2)} Cr ({assetGrowth.baselineYear})
            </div>
          </div>

          {/* Spouse */}
          <div className="border border-[#1a1a1a]/15 bg-[#faf8f5] p-3.5 space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-bold uppercase tracking-wider text-[#66625b]">Spouse Assets</span>
              <span className={`font-bold text-xs ${assetGrowth.breakdownByOwner.spouse.isFlagged ? 'text-[#c44d31]' : 'text-[#1a1a1a]'}`}>
                {assetGrowth.breakdownByOwner.spouse.growthPercent >= 0 ? `+${assetGrowth.breakdownByOwner.spouse.growthPercent}%` : `${assetGrowth.breakdownByOwner.spouse.growthPercent}%`}
              </span>
            </div>
            <div className="font-serif text-lg font-bold text-[#1a1a1a]">
              ₹{assetGrowth.breakdownByOwner.spouse.latest.toFixed(2)} Cr
            </div>
            <div className="text-[10px] text-[#66625b]">
              Baseline: ₹{assetGrowth.breakdownByOwner.spouse.baseline.toFixed(2)} Cr ({assetGrowth.baselineYear})
            </div>
          </div>

          {/* Dependents */}
          <div className="border border-[#1a1a1a]/15 bg-[#faf8f5] p-3.5 space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-bold uppercase tracking-wider text-[#66625b]">Dependents</span>
              <span className="font-bold text-xs text-[#1a1a1a]">
                {assetGrowth.breakdownByOwner.dependent.growthPercent >= 0 ? `+${assetGrowth.breakdownByOwner.dependent.growthPercent}%` : `${assetGrowth.breakdownByOwner.dependent.growthPercent}%`}
              </span>
            </div>
            <div className="font-serif text-lg font-bold text-[#1a1a1a]">
              ₹{assetGrowth.breakdownByOwner.dependent.latest.toFixed(2)} Cr
            </div>
            <div className="text-[10px] text-[#66625b]">
              Baseline: ₹{assetGrowth.breakdownByOwner.dependent.baseline.toFixed(2)} Cr ({assetGrowth.baselineYear})
            </div>
          </div>
        </div>
      </div>

      {/* 3. FLAGGED RELATIVE-CONTRACTOR-CONTRACT CASES (NEPOTISM AUDIT) */}
      <div className="border border-[#1a1a1a]/20 bg-white p-5 sm:p-6 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1a1a1a]/10 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a] flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-[#c44d31]" />
                Flagged Conflict of Interest & Nepotism Audit
              </h4>
              <span className="bg-[#1a1a1a] text-white px-2 py-0.5 text-[10px] font-bold">
                {flaggedContracts.length} Cases
              </span>
            </div>
            <p className="text-xs text-[#66625b] mt-0.5">
              Contracts awarded to firms linked to declared relatives by government departments during the leader's ministerial or oversight tenure
            </p>
          </div>
          <div className="text-[10px] bg-[#f2eee5] border border-[#1a1a1a]/20 px-3 py-1 font-bold uppercase text-[#1a1a1a]">
            Audited Against CPPP / CAG / ECI
          </div>
        </div>

        {flaggedContracts.length > 0 ? (
          <div className="space-y-5">
            {flaggedContracts.map((flag, idx) => (
              <div
                key={flag.id}
                className="border-2 border-[#1a1a1a] bg-[#faf8f5] p-5 space-y-4 shadow-sm"
              >
                {/* Header with Severity Badge & Contract Value */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1a1a1a]/15 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#c44d31] text-white px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider">
                      CASE #{idx + 1} · {flag.flagSeverity} PRIORITY
                    </span>
                    <span className="border border-[#1a1a1a]/20 bg-white px-2 py-0.5 text-[10px] font-bold uppercase text-[#1a1a1a]">
                      Tender: {flag.contract.tenderType.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-[11px] uppercase tracking-wider text-[#66625b] font-bold">
                      Contract Value:
                    </span>
                    <span className="font-serif text-xl font-black text-[#c44d31]">
                      ₹{flag.contract.contractValue.toFixed(2)} Crore
                    </span>
                  </div>
                </div>

                {/* Conflict Linkage Path Flow */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 bg-white border border-[#1a1a1a]/20 p-3 text-xs">
                  {/* Step 1: Politician & Portfolio */}
                  <div className="space-y-1 p-2 bg-[#f2eee5]/50 border-r border-[#1a1a1a]/10 last:border-r-0">
                    <span className="text-[9px] font-bold uppercase text-[#66625b] block">1. Public Office & Authority</span>
                    <strong className="text-[#1a1a1a] block font-bold">{flag.politicianRoleDuringContract}</strong>
                    <span className="text-[10px] text-[#66625b] block">{flag.tenurePeriod}</span>
                  </div>

                  {/* Step 2: Relative */}
                  <div className="space-y-1 p-2 bg-[#f2eee5]/50 border-r border-[#1a1a1a]/10 last:border-r-0">
                    <span className="text-[9px] font-bold uppercase text-[#66625b] block">2. Declared Relative</span>
                    <strong className="text-[#c44d31] block font-bold">{flag.relative.name}</strong>
                    <span className="text-[10px] text-[#66625b] block capitalize">Relation: {flag.relative.relationType}</span>
                  </div>

                  {/* Step 3: Contractor */}
                  <div className="space-y-1 p-2 bg-[#f2eee5]/50 border-r border-[#1a1a1a]/10 last:border-r-0">
                    <span className="text-[9px] font-bold uppercase text-[#66625b] block">3. Awardee Corporate Entity</span>
                    <strong className="text-[#1a1a1a] block font-bold">{flag.contractor.name}</strong>
                    <span className="text-[10px] font-mono text-[#66625b] block">{flag.contractor.registrationNo}</span>
                  </div>

                  {/* Step 4: Awarding Dept & Date */}
                  <div className="space-y-1 p-2 bg-[#f2eee5]/50">
                    <span className="text-[9px] font-bold uppercase text-[#66625b] block">4. Awarding Department</span>
                    <strong className="text-[#1a1a1a] block font-bold line-clamp-1">{flag.contract.awardingDepartment}</strong>
                    <span className="text-[10px] text-[#66625b] block">Award Date: {flag.contract.awardedDate}</span>
                  </div>
                </div>

                {/* Project Description */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#66625b]">Project Scope & Description:</span>
                  <p className="text-xs text-[#1a1a1a] leading-relaxed bg-white p-3 border border-[#1a1a1a]/15">
                    {flag.contract.projectDescription}
                  </p>
                </div>

                {/* Audit Findings & Flag Reasons */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#c44d31] flex items-center gap-1.5">
                    <BadgeAlert className="h-3.5 w-3.5" />
                    Specific Audit Findings & Disclosed Facts:
                  </span>
                  <ul className="space-y-1.5">
                    {flag.flagReasons.map((reason, rIdx) => (
                      <li key={rIdx} className="text-xs text-[#1a1a1a] flex items-start gap-2 bg-white/70 p-2 border border-[#1a1a1a]/10">
                        <span className="text-[#c44d31] font-bold mt-0.5">•</span>
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Underlying Verifiable Source Evidence Link */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-[#1a1a1a]/15 text-xs">
                  <div className="flex items-center gap-2 text-[#66625b] text-[11px]">
                    <FileText className="h-4 w-4 text-[#1a1a1a]" />
                    <span>Evidence Record: <strong className="text-[#1a1a1a] font-medium">{flag.evidenceSource}</strong></span>
                  </div>
                  <a
                    href={flag.sourceDocumentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 border border-[#1a1a1a] bg-[#1a1a1a] px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#c44d31] hover:border-[#c44d31] transition"
                  >
                    <span>Inspect Public Tender / Audit Filing</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-[#1a1a1a]/15 bg-[#faf8f5] p-8 text-center space-y-2">
            <CheckCircle2 className="h-8 w-8 text-emerald-700 mx-auto" />
            <h5 className="font-serif text-base font-bold text-[#1a1a1a]">
              No Flagged Government Contracts Detected
            </h5>
            <p className="text-xs text-[#66625b] max-w-lg mx-auto">
              Cross-referencing verified MCA company registers, CPPP procurement records, and the leader's ministerial tenures yielded no overlapping government contracts awarded to declared family-linked entities.
            </p>
          </div>
        )}
      </div>

      {/* 4. ASSET PROGRESSION TIMELINE & VERIFIED INVENTORY */}
      <div className="border border-[#1a1a1a]/20 bg-white p-5 sm:p-6 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1a1a1a]/10 pb-4">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a] flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-[#c44d31]" />
              Historical Wealth Declaration Progression (ECI Affidavits)
            </h4>
            <p className="text-xs text-[#66625b] mt-0.5">
              Verified year-by-year sworn wealth disclosures filed with the Election Commission of India
            </p>
          </div>
          <span className="bg-[#f2eee5] border border-[#1a1a1a]/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#1a1a1a]">
            100% Sourced from ECI Form 26
          </span>
        </div>

        {/* Visual Timeline Comparison Bars */}
        <div className="space-y-4 pt-1">
          {assetGrowth.timelinePoints.map((point) => {
            const maxVal = Math.max(...assetGrowth.timelinePoints.map((p) => p.total), 1);
            const widthPercent = Math.max((point.total / maxVal) * 100, 10);

            return (
              <div key={point.year} className="space-y-1.5">
                <div className="flex flex-wrap items-center justify-between text-xs gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#1a1a1a] font-serif text-sm">
                      {point.year} General / Assembly Election
                    </span>
                    <span className="text-[10px] text-[#66625b]">
                      (Self: ₹{point.self.toFixed(1)} Cr | Spouse: ₹{point.spouse.toFixed(1)} Cr)
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-serif font-black text-sm text-[#1a1a1a]">
                      ₹{point.total.toFixed(2)} Cr
                    </span>
                    <a
                      href={point.sourceDoc.startsWith('http') ? point.sourceDoc : `https://affidavit.eci.gov.in/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-[#c44d31] font-bold uppercase hover:underline inline-flex items-center gap-0.5"
                    >
                      <span>Affidavit</span>
                      <ExternalLink className="h-2.5 w-2.5" />
                    </a>
                  </div>
                </div>

                {/* Progression Bar */}
                <div className="h-6 w-full bg-[#f2eee5] border border-[#1a1a1a]/20 p-0.5">
                  <div
                    className="h-full bg-[#1a1a1a] transition-all duration-700 flex items-center justify-between px-2 text-[9px] font-bold text-white uppercase tracking-wider"
                    style={{ width: `${widthPercent}%` }}
                  >
                    <span>ECI Form 26</span>
                    <span>₹{point.total.toFixed(1)} Cr</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Itemized Asset Inventory Table */}
        <div className="space-y-4 pt-4 border-t border-[#1a1a1a]/15">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h5 className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a] flex items-center gap-2">
                <Layers className="h-3.5 w-3.5 text-[#66625b]" />
                Itemized Asset Inventory & Location Registry
              </h5>
              <p className="text-[11px] text-[#66625b]">
                Showing {politicianAssets.length} verified declared assets
              </p>
            </div>

            {/* Category & Owner Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                aria-label="Filter assets by category"
                className="border border-[#1a1a1a]/30 bg-white px-2.5 py-1 text-xs font-medium text-[#1a1a1a]"
              >
                <option value="all">All Categories</option>
                <option value="financial">Financial (Stocks/FDs/Funds)</option>
                <option value="building">Buildings / Real Estate</option>
                <option value="land">Agricultural Land</option>
                <option value="jewelry">Jewelry & Bullion</option>
                <option value="vehicle">Vehicles</option>
                <option value="other">Other Assets</option>
              </select>

              <select
                value={ownerFilter}
                onChange={(e) => setOwnerFilter(e.target.value)}
                aria-label="Filter assets by owner type"
                className="border border-[#1a1a1a]/30 bg-white px-2.5 py-1 text-xs font-medium text-[#1a1a1a]"
              >
                <option value="all">All Owners</option>
                <option value="self">Self (Candidate)</option>
                <option value="spouse">Spouse</option>
                <option value="dependent">Dependents</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto border border-[#1a1a1a]/20">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#1a1a1a] text-white font-serif uppercase tracking-wider text-[10px]">
                  <th className="p-2.5 border-r border-white/20">Year</th>
                  <th className="p-2.5 border-r border-white/20">Owner</th>
                  <th className="p-2.5 border-r border-white/20">Category</th>
                  <th className="p-2.5 border-r border-white/20">Asset Description & Location</th>
                  <th className="p-2.5 border-r border-white/20 text-right">Declared Value</th>
                  <th className="p-2.5 text-center">Affidavit Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a1a1a]/15 bg-white">
                {politicianAssets.length > 0 ? (
                  politicianAssets.map((asset) => (
                    <tr key={asset.id} className="hover:bg-[#f2eee5]/50 transition-colors">
                      <td className="p-2.5 font-bold font-serif text-[#1a1a1a] border-r border-[#1a1a1a]/10 whitespace-nowrap">
                        {asset.yearDeclared}
                      </td>
                      <td className="p-2.5 border-r border-[#1a1a1a]/10 whitespace-nowrap">
                        <span className="capitalize font-semibold text-[#1a1a1a]">{asset.ownerType}</span>
                        {asset.ownerName && <span className="block text-[10px] text-[#66625b]">{asset.ownerName}</span>}
                      </td>
                      <td className="p-2.5 border-r border-[#1a1a1a]/10 whitespace-nowrap">
                        <span className="bg-[#f2eee5] border border-[#1a1a1a]/20 px-2 py-0.5 text-[10px] font-bold uppercase text-[#1a1a1a]">
                          {asset.category}
                        </span>
                      </td>
                      <td className="p-2.5 border-r border-[#1a1a1a]/10 max-w-xs">
                        <span className="font-medium text-[#1a1a1a] block">{asset.description}</span>
                        {asset.location && (
                          <span className="text-[10px] text-[#66625b] block mt-0.5 font-mono">
                            📍 {asset.location}
                          </span>
                        )}
                      </td>
                      <td className="p-2.5 font-serif font-bold text-right text-[#1a1a1a] border-r border-[#1a1a1a]/10 whitespace-nowrap">
                        ₹{asset.declaredValue.toFixed(2)} Cr
                      </td>
                      <td className="p-2.5 text-center whitespace-nowrap">
                        <a
                          href={asset.sourceDocumentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[10px] font-bold uppercase text-[#c44d31] hover:underline"
                        >
                          <span>ECI Doc</span>
                          <ExternalLink className="h-2.5 w-2.5" />
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-6 text-center text-xs text-[#66625b]">
                      No assets matching the selected filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 5. FAMILY NETWORK & REGISTERED COMMERCIAL ENTITIES */}
      <div className="border border-[#1a1a1a]/20 bg-white p-5 sm:p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#1a1a1a]/10 pb-3">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a] flex items-center gap-2">
              <Users className="h-4 w-4 text-[#66625b]" />
              Declared Family Members & Documented Business Affiliations
            </h4>
            <p className="text-xs text-[#66625b] mt-0.5">
              Family members documented in public filings, election affidavits, and MCA registry records
            </p>
          </div>
          <span className="bg-[#f2eee5] border border-[#1a1a1a]/20 px-3 py-1 text-[10px] font-bold uppercase text-[#1a1a1a]">
            {network.relatives.length} Relatives Disclosed
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {network.relatives.map((rel) => (
            <div key={rel.id} className="border border-[#1a1a1a]/20 bg-[#faf8f5] p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h5 className="font-serif text-base font-bold text-[#1a1a1a]">{rel.name}</h5>
                  <span className="text-[10px] font-bold uppercase tracking-wide text-[#c44d31] bg-white border border-[#c44d31]/30 px-2 py-0.5 inline-block mt-1">
                    Relationship: {rel.relationType}
                  </span>
                </div>
              </div>

              {rel.designationOrOccupation && (
                <div className="text-xs text-[#1a1a1a]">
                  <strong className="font-bold text-[#66625b] text-[10px] uppercase block">Designation / Role:</strong>
                  <span>{rel.designationOrOccupation}</span>
                </div>
              )}

              {rel.businessInterests && rel.businessInterests.length > 0 && (
                <div className="space-y-1">
                  <strong className="font-bold text-[#66625b] text-[10px] uppercase block">Associated Corporate / Commercial Entities:</strong>
                  <div className="flex flex-wrap gap-1.5">
                    {rel.businessInterests.map((interest, i) => (
                      <span key={i} className="bg-white border border-[#1a1a1a]/20 px-2 py-0.5 text-[10px] font-medium text-[#1a1a1a]">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {rel.notes && (
                <p className="text-[11px] text-[#66625b] italic border-t border-[#1a1a1a]/10 pt-2">
                  {rel.notes}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
