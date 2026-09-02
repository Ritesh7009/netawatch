import React, { useState, useMemo } from 'react';
import { 
  Scale, 
  Search, 
  X, 
  Plus, 
  ExternalLink, 
  Info, 
  ShieldCheck, 
  Building, 
  FileText, 
  MessageSquare, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Clock,
  Layers,
  ArrowRight,
  BookOpen,
  Landmark,
  FileCheck
} from 'lucide-react';
import { Politician, PublicStatement, StatementTopic } from '../types';
import { PoliticianImage } from './PoliticianImage';
import { VERIFIED_PUBLIC_STATEMENTS, STATEMENT_TOPICS } from '../data/statementsData';
import { DATA_FRESHNESS_INFO } from '../data/methodologyData';
import { CorrectionModal } from './CorrectionModal';

interface CompareLeadersPageProps {
  allPoliticians: Politician[];
  selectedPoliticians: Politician[];
  onAddPolitician: (p: Politician) => void;
  onRemovePolitician: (id: string) => void;
  onSetPoliticians: (list: Politician[]) => void;
  onOpenDossier: (p: Politician) => void;
  onOpenMethodology?: () => void;
}

export const CompareLeadersPage: React.FC<CompareLeadersPageProps> = ({
  allPoliticians,
  selectedPoliticians,
  onAddPolitician,
  onRemovePolitician,
  onSetPoliticians,
  onOpenDossier,
  onOpenMethodology
}) => {
  const [activeTab, setActiveTab] = useState<'matrix' | 'facts' | 'parliament' | 'statements' | 'constituency' | 'role-analysis' | 'sources'>('matrix');
  const [selectedStatementTopic, setSelectedStatementTopic] = useState<StatementTopic | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [infoModalMetric, setInfoModalMetric] = useState<{ title: string; formula: string; source: string; limitations: string; ministerRule?: string } | null>(null);
  const [isCorrectionOpen, setIsCorrectionOpen] = useState(false);

  // Search dropdown matching across all politicians
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    const tokens = q.split(/\s+/).filter(Boolean);
    const selectedIds = new Set(selectedPoliticians.map(p => p.id));

    return allPoliticians
      .filter(p => !selectedIds.has(p.id))
      .filter(p => {
        const combined = `${p.name} ${p.hindiName || ''} ${p.party} ${p.partyAbbr} ${p.constituency} ${p.state} ${p.currentRole || ''}`.toLowerCase();
        return tokens.every(token => combined.includes(token));
      })
      .slice(0, 6);
  }, [allPoliticians, selectedPoliticians, searchQuery]);

  // Pre-set comparison shortcuts
  const preSets = [
    {
      label: 'Amit Shah, Rahul Gandhi & Shivraj',
      description: 'Home Minister, Leader of Opposition & Agriculture Minister',
      ids: ['amit-shah', 'rahul-gandhi', 'shivraj-singh-chouhan']
    },
    {
      label: 'Cabinet Ministers vs Opposition Lead',
      description: 'Senior Executive vs Parliamentary Scrutiny',
      ids: ['narendra-modi', 'rahul-gandhi', 'amit-shah', 'akhilesh-yadav']
    },
    {
      label: 'Key Regional & Alliance Leaders',
      description: 'SP, TMC & NCP Parliamentary Leaders',
      ids: ['akhilesh-yadav', 'mahua-moitra', 'supriya-sule', 'shashi-tharoor']
    }
  ];

  const handleApplyPreset = (ids: string[]) => {
    const list = ids
      .map(id => allPoliticians.find(p => p.id === id))
      .filter((p): p is Politician => Boolean(p));
    if (list.length > 0) {
      onSetPoliticians(list);
    }
  };

  // Filter statements for selected politicians
  const relevantStatements = useMemo(() => {
    const ids = new Set(selectedPoliticians.map(p => p.id));
    return VERIFIED_PUBLIC_STATEMENTS.filter(s => ids.has(s.politicianId))
      .filter(s => selectedStatementTopic === 'All' || s.topic === selectedStatementTopic);
  }, [selectedPoliticians, selectedStatementTopic]);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 pb-16">
      
      {/* Header Banner: Evidence Standard & Reporting Period */}
      <div className="bg-[#f5f1e8] border border-[#18181b]/15 rounded-2xl p-4 sm:p-6 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#18181b]/10 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center bg-[#18181b] text-white rounded-lg shadow-xs">
              <Scale className="h-5 w-5 text-[#b4f82c]" />
            </div>
            <div>
              <h1 className="font-serif text-xl sm:text-2xl font-black text-[#18181b] tracking-tight">
                Leader Comparison & Accountability Matrix
              </h1>
              <p className="text-xs text-[#52525b] font-mono">
                Independent, Evidence-First Comparative Civic Research
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-[#18181b] text-white px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider rounded-full shadow-2xs">
              <Clock className="h-3 w-3 text-amber-300" />
              <span>{DATA_FRESHNESS_INFO.reportingPeriod}</span>
            </span>
            <button
              onClick={() => setIsCorrectionOpen(true)}
              className="inline-flex items-center gap-1 bg-white hover:bg-[#18181b] text-[#52525b] hover:text-white border border-[#18181b]/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full transition cursor-pointer"
            >
              <FileCheck className="h-3 w-3" />
              <span>Request Review / Report Discrepancy</span>
            </button>
          </div>
        </div>

        {/* Selected Leader Chips & Add Search Bar */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#71717a] mr-1">
              Active Leaders ({selectedPoliticians.length}/4):
            </span>
            {selectedPoliticians.map((politician) => (
              <div 
                key={politician.id}
                className="flex items-center gap-2 bg-white border border-[#18181b]/20 px-2.5 py-1 rounded-full shadow-2xs"
              >
                <div className="h-5 w-5 rounded-full overflow-hidden shrink-0 border border-black/10">
                  <PoliticianImage name={politician.name} photoUrl={politician.photo} className="h-full w-full object-cover" />
                </div>
                <span className="text-xs font-serif font-bold text-[#18181b]">
                  {politician.name}
                </span>
                <span 
                  className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded"
                  style={{ backgroundColor: `${politician.partyColor}20`, color: politician.partyColor }}
                >
                  {politician.partyAbbr}
                </span>
                {selectedPoliticians.length > 2 && (
                  <button
                    onClick={() => onRemovePolitician(politician.id)}
                    className="h-4 w-4 rounded-full flex items-center justify-center text-[#71717a] hover:bg-black/10 hover:text-[#18181b] transition cursor-pointer"
                    title={`Remove ${politician.name}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>
            ))}

            {selectedPoliticians.length < 4 && (
              <div className="relative">
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="flex items-center gap-1.5 bg-[#18181b] text-white hover:bg-[#c44d31] px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full transition cursor-pointer shadow-2xs"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Leader to Compare</span>
                </button>

                {isSearchOpen && (
                  <div className="absolute left-0 top-full mt-2 w-72 sm:w-80 bg-white border border-[#18181b]/25 rounded-xl shadow-2xl p-2.5 z-40 animate-in fade-in zoom-in-95 duration-150">
                    <div className="flex items-center gap-2 border-b border-[#18181b]/15 pb-2 mb-2">
                      <Search className="h-3.5 w-3.5 text-[#71717a]" />
                      <input
                        type="text"
                        autoFocus
                        placeholder="Search MP by name, party, state..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full text-xs bg-transparent focus:outline-none"
                      />
                      <button 
                        onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                        className="text-[#71717a] hover:text-[#18181b]"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="max-h-48 overflow-y-auto space-y-1">
                      {searchResults.length > 0 ? (
                        searchResults.map(p => (
                          <button
                            key={p.id}
                            onClick={() => {
                              onAddPolitician(p);
                              setIsSearchOpen(false);
                              setSearchQuery('');
                            }}
                            className="w-full flex items-center justify-between p-1.5 text-left hover:bg-[#f1ede4] rounded-lg transition cursor-pointer"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <div className="h-6 w-6 rounded-full overflow-hidden shrink-0">
                                <PoliticianImage name={p.name} photoUrl={p.photo} className="h-full w-full object-cover" />
                              </div>
                              <div className="truncate">
                                <div className="text-xs font-serif font-bold truncate text-[#18181b]">{p.name}</div>
                                <div className="text-[10px] text-[#71717a] truncate">{p.partyAbbr} • {p.constituency} ({p.state})</div>
                              </div>
                            </div>
                            <Plus className="h-3.5 w-3.5 text-[#71717a] shrink-0" />
                          </button>
                        ))
                      ) : (
                        <div className="p-3 text-center text-xs text-[#71717a]">
                          {searchQuery ? 'No matching MP found' : 'Type to search 543 Lok Sabha MPs'}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] font-mono text-[#71717a] mr-1">Quick Presets:</span>
            {preSets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handleApplyPreset(preset.ids)}
                className="text-[10.5px] font-bold bg-[#eae5d8] hover:bg-[#18181b] text-[#18181b] hover:text-white px-2.5 py-0.5 rounded-full transition cursor-pointer"
                title={preset.description}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-1 border-b border-[#18181b]/15 overflow-x-auto pb-px">
        {[
          { id: 'matrix', label: 'Side-by-Side Matrix' },
          { id: 'facts', label: '1. Verified Facts' },
          { id: 'parliament', label: '2. Parliamentary Metrics' },
          { id: 'statements', label: '3. Public Statements by Topic' },
          { id: 'constituency', label: '4. Constituency vs Sansad' },
          { id: 'role-analysis', label: '5. Role Analysis & Limitations' },
          { id: 'sources', label: '6. Evidence & Official Sources' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-t-lg transition whitespace-nowrap cursor-pointer ${
              activeTab === tab.id
                ? 'bg-[#18181b] text-white shadow-xs'
                : 'text-[#52525b] hover:text-[#18181b] hover:bg-[#f1ede4]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: SIDE-BY-SIDE MATRIX */}
      {activeTab === 'matrix' && (
        <div className="bg-[#fdfcfa] border border-[#18181b]/15 rounded-2xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              {/* Leader Profiles Column Headers */}
              <thead>
                <tr className="bg-[#f5f1e8] border-b border-[#18181b]/15">
                  <th className="p-4 w-1/4 font-mono text-xs font-bold uppercase tracking-wider text-[#71717a]">
                    Metric / Category
                  </th>
                  {selectedPoliticians.map((p) => (
                    <th key={p.id} className="p-4 w-1/4 border-l border-[#18181b]/10 align-top">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2.5">
                          <div className="h-12 w-12 rounded-xl overflow-hidden shrink-0 border border-[#18181b]/20 shadow-xs">
                            <PoliticianImage name={p.name} photoUrl={p.photo} className="h-full w-full object-cover" />
                          </div>
                          <div>
                            <button
                              onClick={() => onOpenDossier(p)}
                              className="font-serif font-black text-sm text-[#18181b] hover:text-[#c44d31] transition text-left flex items-center gap-1"
                            >
                              <span>{p.name}</span>
                              <ArrowRight className="h-3 w-3" />
                            </button>
                            <div className="text-[11px] text-[#71717a] font-mono">
                              {p.constituency}, {p.state}
                            </div>
                            <span 
                              className="inline-block text-[9.5px] font-bold px-1.5 py-0.5 rounded mt-0.5"
                              style={{ backgroundColor: `${p.partyColor}20`, color: p.partyColor }}
                            >
                              {p.partyAbbr} ({p.alliance})
                            </span>
                          </div>
                        </div>
                        {p.currentRole && (
                          <div className="text-[10.5px] bg-[#ece8de] text-[#18181b] px-2 py-1 rounded font-semibold leading-tight">
                            {p.currentRole}
                          </div>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-[#18181b]/10 text-xs">
                
                {/* SECTION 1: VERIFIED ELECTORAL FACTS */}
                <tr className="bg-[#f5f1e8]/60 font-mono font-bold text-[11px] uppercase tracking-wider text-[#18181b]">
                  <td colSpan={selectedPoliticians.length + 1} className="py-2.5 px-4">
                    1. Verified Electoral & Demographic Facts (ECI Form 26)
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#52525b]">Age & Education</td>
                  {selectedPoliticians.map(p => (
                    <td key={p.id} className="p-3.5 border-l border-[#18181b]/10">
                      <div className="font-bold text-[#18181b]">{p.age} Years</div>
                      <div className="text-[#52525b] text-[11px] line-clamp-2">{p.education}</div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#52525b]">Profession / Background</td>
                  {selectedPoliticians.map(p => (
                    <td key={p.id} className="p-3.5 border-l border-[#18181b]/10 text-[#52525b]">
                      {p.profession}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#52525b]">
                    <div className="flex items-center gap-1">
                      <span>Total Declared Assets</span>
                      <button 
                        onClick={() => setInfoModalMetric({
                          title: 'Total Declared Assets',
                          formula: 'Movable Assets + Immovable Assets as filed in ECI Form 26 Sworn Affidavit (2024)',
                          source: 'Election Commission of India (affidavit.eci.gov.in)',
                          limitations: 'Self-declared valuation at time of nomination in General Elections 2024.'
                        })}
                        className="text-[#71717a] hover:text-[#18181b]"
                      >
                        <Info className="h-3 w-3" />
                      </button>
                    </div>
                  </td>
                  {selectedPoliticians.map(p => (
                    <td key={p.id} className="p-3.5 border-l border-[#18181b]/10">
                      <div className="font-bold text-[#18181b]">₹{p.assets.totalCr.toFixed(2)} Cr</div>
                      <div className="text-[10.5px] text-[#71717a]">
                        Movable: ₹{p.assets.movableCr.toFixed(2)} Cr | Immovable: ₹{p.assets.immovableCr.toFixed(2)} Cr
                      </div>
                      <div className="text-[10px] text-[#71717a]">Liabilities: ₹{p.assets.liabilitiesCr.toFixed(2)} Cr</div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#52525b]">
                    <div className="flex items-center gap-1">
                      <span>Disclosed Criminal Cases</span>
                      <button 
                        onClick={() => setInfoModalMetric({
                          title: 'Disclosed Criminal Cases',
                          formula: 'Disclosed under Section 33A of Representation of the People Act, 1951 in ECI Form 26',
                          source: 'ECI Form 26 Sworn Affidavit / High Courts e-Court Records',
                          limitations: 'Cases include political agitations, defamation, and IPC sections. Does not imply judicial conviction unless confirmed.'
                        })}
                        className="text-[#71717a] hover:text-[#18181b]"
                      >
                        <Info className="h-3 w-3" />
                      </button>
                    </div>
                  </td>
                  {selectedPoliticians.map(p => (
                    <td key={p.id} className="p-3.5 border-l border-[#18181b]/10">
                      <div className={`font-bold ${p.criminalRecords.totalCases > 0 ? 'text-[#c44d31]' : 'text-emerald-700'}`}>
                        {p.criminalRecords.totalCases} {p.criminalRecords.totalCases === 1 ? 'Case' : 'Cases'}
                      </div>
                      <div className="text-[10.5px] text-[#71717a]">
                        Serious: {p.criminalRecords.seriousCases} | Charges Framed: {p.criminalRecords.chargesFramed}
                      </div>
                      <div className="text-[10px] font-mono text-[#52525b]">
                        {p.criminalRecords.convicted ? 'Conviction Recorded' : 'Zero Convictions'}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* SECTION 2: PARLIAMENTARY RECORD */}
                <tr className="bg-[#f5f1e8]/60 font-mono font-bold text-[11px] uppercase tracking-wider text-[#18181b]">
                  <td colSpan={selectedPoliticians.length + 1} className="py-2.5 px-4">
                    2. Parliamentary Activity Ledger (18th Lok Sabha — June 2024 to Present)
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#52525b]">
                    <div className="flex items-center gap-1">
                      <span>Attendance Rate</span>
                      <button 
                        onClick={() => setInfoModalMetric({
                          title: 'Attendance Rate (%)',
                          formula: '(Days Signed in Register / Total Lok Sabha Sittings) × 100',
                          source: 'Lok Sabha Attendance Register / Sansad.in',
                          limitations: 'National 18th Lok Sabha Average is ~79%. Ministers do not sign the roster during official executive duties.',
                          ministerRule: 'Ministers are exempt from the daily signature roster when answering in Rajya Sabha or conducting Cabinet proceedings.'
                        })}
                        className="text-[#71717a] hover:text-[#18181b]"
                      >
                        <Info className="h-3 w-3" />
                      </button>
                    </div>
                  </td>
                  {selectedPoliticians.map(p => (
                    <td key={p.id} className="p-3.5 border-l border-[#18181b]/10">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#18181b]">
                          {p.parliamentaryRecord.attendancePercent}%
                        </span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          p.parliamentaryRecord.attendancePercent >= p.parliamentaryRecord.nationalAvgAttendance 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {p.parliamentaryRecord.attendancePercent >= p.parliamentaryRecord.nationalAvgAttendance ? '+ Above Avg' : '- Below Avg'}
                        </span>
                      </div>
                      <div className="text-[10px] text-[#71717a]">National Avg: {p.parliamentaryRecord.nationalAvgAttendance}%</div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#52525b]">
                    <div className="flex items-center gap-1">
                      <span>Debates / Speaking Interventions</span>
                      <button 
                        onClick={() => setInfoModalMetric({
                          title: 'Debate Interventions',
                          formula: 'Count of official spoken interventions recorded in Lok Sabha Hansard',
                          source: 'Sansad Lok Sabha Hansard Verbatim Transcripts',
                          limitations: 'Includes Motion of Thanks, Budget discussions, Special Mentions, and Bill presentations.'
                        })}
                        className="text-[#71717a] hover:text-[#18181b]"
                      >
                        <Info className="h-3 w-3" />
                      </button>
                    </div>
                  </td>
                  {selectedPoliticians.map(p => (
                    <td key={p.id} className="p-3.5 border-l border-[#18181b]/10">
                      <div className="font-bold text-sm text-[#18181b]">
                        {p.parliamentaryRecord.debatesCount} Interventions
                      </div>
                      <div className="text-[10.5px] text-[#71717a]">
                        {p.currentRole?.includes('Minister') 
                          ? 'Includes ministerial replies & legislative motions' 
                          : 'Includes scrutiny debates & zero hour submissions'}
                      </div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#52525b]">
                    <div className="flex items-center gap-1">
                      <span>Questions Submitted</span>
                      <button 
                        onClick={() => setInfoModalMetric({
                          title: 'Questions Submitted',
                          formula: 'Count of Starred and Unstarred Questions admitted by the Speaker',
                          source: 'Lok Sabha Questions Division',
                          limitations: 'Ministers DO NOT submit questions per Rule 37 of Parliamentary Conduct; they answer questions submitted by MPs.',
                          ministerRule: 'Rule 37: Ministers of the Union Cabinet and Ministers of State answer questions on behalf of the Executive and do not submit questions.'
                        })}
                        className="text-[#71717a] hover:text-[#18181b]"
                      >
                        <Info className="h-3 w-3" />
                      </button>
                    </div>
                  </td>
                  {selectedPoliticians.map(p => (
                    <td key={p.id} className="p-3.5 border-l border-[#18181b]/10">
                      {p.currentRole?.includes('Minister') ? (
                        <div>
                          <span className="inline-block bg-[#f1ede4] border border-[#18181b]/15 text-[#52525b] text-[11px] font-bold px-2 py-0.5 rounded">
                            N/A (Union Minister)
                          </span>
                          <p className="text-[10px] text-[#71717a] mt-0.5 leading-tight">
                            Ministers answer questions; they do not submit questions under Lok Sabha Rule 37.
                          </p>
                        </div>
                      ) : (
                        <div>
                          <span className="font-bold text-sm text-[#18181b]">
                            {p.parliamentaryRecord.questionsAsked} Questions
                          </span>
                          <div className="text-[10.5px] text-[#71717a]">Starred & Unstarred filings</div>
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#52525b]">Private Member Bills</td>
                  {selectedPoliticians.map(p => (
                    <td key={p.id} className="p-3.5 border-l border-[#18181b]/10">
                      {p.currentRole?.includes('Minister') ? (
                        <div className="text-[#71717a] text-[11px]">
                          N/A (Ministers sponsor Government Bills)
                        </div>
                      ) : (
                        <div className="font-bold text-[#18181b]">
                          {p.parliamentaryRecord.privateMemberBills} Introduced
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#52525b]">Committee Roles</td>
                  {selectedPoliticians.map(p => (
                    <td key={p.id} className="p-3.5 border-l border-[#18181b]/10 text-[11px] text-[#52525b]">
                      <ul className="list-disc list-inside space-y-0.5">
                        {p.parliamentaryRecord.committeeMemberships.map((c, i) => (
                          <li key={i} className="truncate">{c}</li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* SECTION 3: CONSTITUENCY ACTIVITY (MPLADS) */}
                <tr className="bg-[#f5f1e8]/60 font-mono font-bold text-[11px] uppercase tracking-wider text-[#18181b]">
                  <td colSpan={selectedPoliticians.length + 1} className="py-2.5 px-4">
                    3. Constituency Development Ledger (MoSPI MPLADS 2024–2025)
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#52525b]">
                    <div className="flex items-center gap-1">
                      <span>MPLADS Fund Utilization</span>
                      <button 
                        onClick={() => setInfoModalMetric({
                          title: 'MPLADS Utilization',
                          formula: '(Expenditure Incurred / Funds Released by District Authority) × 100',
                          source: 'Ministry of Statistics and Programme Implementation (mplads.gov.in)',
                          limitations: 'Annual entitlement is ₹5 Cr. Disbursed upon submission of utilization certificates from District Collectors.'
                        })}
                        className="text-[#71717a] hover:text-[#18181b]"
                      >
                        <Info className="h-3 w-3" />
                      </button>
                    </div>
                  </td>
                  {selectedPoliticians.map(p => (
                    <td key={p.id} className="p-3.5 border-l border-[#18181b]/10">
                      <div className="font-bold text-sm text-[#18181b]">
                        {p.mplads.utilizationPercent}%
                      </div>
                      <div className="text-[10.5px] text-[#71717a]">
                        Spent: ₹{p.mplads.spentCr} Cr of ₹{p.mplads.allocatedCr} Cr
                      </div>
                      <div className="text-[10px] text-[#52525b]">
                        Completed: {p.mplads.completedProjects} | Ongoing: {p.mplads.ongoingProjects}
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: VERIFIED FACTS */}
      {activeTab === 'facts' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedPoliticians.map(p => (
            <div key={p.id} className="bg-[#fdfcfa] border border-[#18181b]/15 rounded-2xl p-5 space-y-4 shadow-xs">
              <div className="flex items-center gap-3 border-b border-[#18181b]/10 pb-3">
                <div className="h-14 w-14 rounded-xl overflow-hidden shrink-0 border border-[#18181b]/20">
                  <PoliticianImage name={p.name} photoUrl={p.photo} className="h-full w-full object-cover" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-[#18181b]">{p.name}</h3>
                  <p className="text-xs text-[#71717a] font-mono">{p.constituency}, {p.state}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: `${p.partyColor}20`, color: p.partyColor }}>
                      {p.partyAbbr}
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                      <ShieldCheck className="h-3 w-3" /> Form 26 Verified
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-[#18181b]/5">
                  <span className="text-[#71717a]">Date of Birth / Age:</span>
                  <span className="font-semibold text-[#18181b]">{p.dateOfBirth} ({p.age} yrs)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#18181b]/5">
                  <span className="text-[#71717a]">Birth Place:</span>
                  <span className="font-semibold text-[#18181b]">{p.birthPlace}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#18181b]/5">
                  <span className="text-[#71717a]">Education:</span>
                  <span className="font-semibold text-[#18181b] text-right max-w-[60%]">{p.education}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#18181b]/5">
                  <span className="text-[#71717a]">Profession:</span>
                  <span className="font-semibold text-[#18181b] text-right max-w-[60%]">{p.profession}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#18181b]/5">
                  <span className="text-[#71717a]">Current Office:</span>
                  <span className="font-semibold text-[#18181b] text-right max-w-[60%]">{p.currentRole || 'Member of Parliament'}</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://affidavit.eci.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 w-full py-2 bg-[#f1ede4] hover:bg-[#18181b] hover:text-white text-[#18181b] text-xs font-bold uppercase tracking-wider rounded-lg transition"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>Inspect ECI Form 26 Affidavit</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: PARLIAMENTARY METRICS */}
      {activeTab === 'parliament' && (
        <div className="space-y-4">
          <div className="bg-[#f5f1e8] border border-[#18181b]/15 rounded-xl p-4 flex items-start gap-3">
            <Info className="h-5 w-5 text-[#18181b] shrink-0 mt-0.5" />
            <div className="text-xs text-[#52525b] space-y-1">
              <p className="font-bold text-[#18181b]">
                Parliamentary Benchmarking Standards (18th Lok Sabha)
              </p>
              <p>
                All data extracted directly from Sansad.in official records and PRS Legislative Research. National 18th Lok Sabha attendance average is <strong>79%</strong>. Please note role differences: Ministers do not submit questions under Lok Sabha Rule 37; their participation is recorded via Ministerial Statements, Legislative Replies, and Government Bills.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedPoliticians.map(p => (
              <div key={p.id} className="bg-[#fdfcfa] border border-[#18181b]/15 rounded-2xl p-5 space-y-4 shadow-xs">
                <div className="flex items-center justify-between border-b border-[#18181b]/10 pb-3">
                  <div>
                    <h3 className="font-serif font-bold text-base text-[#18181b]">{p.name}</h3>
                    <p className="text-xs text-[#71717a] font-mono">{p.partyAbbr} • {p.constituency}</p>
                  </div>
                  <span className="text-xs font-mono font-bold bg-[#18181b] text-white px-2 py-0.5 rounded">
                    {p.parliamentaryRecord.attendancePercent}% Attendance
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="bg-[#f8f5ee] p-2.5 rounded-lg">
                    <div className="flex justify-between font-semibold">
                      <span className="text-[#52525b]">Debate Interventions:</span>
                      <span className="font-bold text-[#18181b]">{p.parliamentaryRecord.debatesCount}</span>
                    </div>
                    <p className="text-[10px] text-[#71717a] mt-0.5">
                      Hansard verbatim spoken records (Motion of Thanks, Budget, Zero Hour)
                    </p>
                  </div>

                  <div className="bg-[#f8f5ee] p-2.5 rounded-lg">
                    <div className="flex justify-between font-semibold">
                      <span className="text-[#52525b]">Questions Submitted:</span>
                      <span className="font-bold text-[#18181b]">
                        {p.currentRole?.includes('Minister') ? 'N/A (Union Minister)' : p.parliamentaryRecord.questionsAsked}
                      </span>
                    </div>
                    <p className="text-[10px] text-[#71717a] mt-0.5">
                      {p.currentRole?.includes('Minister') 
                        ? 'Ministers reply to questions rather than submit them under Rule 37' 
                        : 'Starred and Unstarred parliamentary questions admitted'}
                    </p>
                  </div>

                  <div className="bg-[#f8f5ee] p-2.5 rounded-lg">
                    <div className="flex justify-between font-semibold">
                      <span className="text-[#52525b]">Private Member Bills:</span>
                      <span className="font-bold text-[#18181b]">
                        {p.currentRole?.includes('Minister') ? 'N/A (Sponsors Govt Bills)' : p.parliamentaryRecord.privateMemberBills}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="font-bold text-[11px] uppercase tracking-wider text-[#18181b] block mb-1">
                      Standing Committees:
                    </span>
                    <ul className="list-disc list-inside text-[11px] text-[#52525b] space-y-0.5">
                      {p.parliamentaryRecord.committeeMemberships.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="https://sansad.in/ls"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-1.5 w-full py-2 bg-[#18181b] text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#c44d31] transition"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>View Lok Sabha Hansard Record</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: PUBLIC STATEMENTS BY TOPIC */}
      {activeTab === 'statements' && (
        <div className="space-y-5">
          {/* Topic filter buttons */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#f5f1e8] p-2.5 rounded-xl border border-[#18181b]/15">
            <span className="text-xs font-bold uppercase tracking-wider text-[#71717a] mr-2">
              Filter by Topic:
            </span>
            <button
              onClick={() => setSelectedStatementTopic('All')}
              className={`px-3 py-1 text-xs font-bold rounded-full transition cursor-pointer ${
                selectedStatementTopic === 'All'
                  ? 'bg-[#18181b] text-white'
                  : 'bg-white text-[#52525b] hover:bg-[#18181b] hover:text-white'
              }`}
            >
              All Topics ({relevantStatements.length})
            </button>
            {STATEMENT_TOPICS.map((topic) => {
              const count = relevantStatements.filter(s => s.topic === topic).length;
              return (
                <button
                  key={topic}
                  onClick={() => setSelectedStatementTopic(topic)}
                  className={`px-3 py-1 text-xs font-bold rounded-full transition cursor-pointer ${
                    selectedStatementTopic === topic
                      ? 'bg-[#18181b] text-white'
                      : 'bg-white text-[#52525b] hover:bg-[#18181b] hover:text-white'
                  }`}
                >
                  {topic}
                </button>
              );
            })}
          </div>

          {/* Statements list */}
          <div className="space-y-4">
            {relevantStatements.length > 0 ? (
              relevantStatements.map((stmt) => {
                const speaker = selectedPoliticians.find(p => p.id === stmt.politicianId);
                return (
                  <div 
                    key={stmt.id} 
                    className="bg-[#fdfcfa] border border-[#18181b]/15 rounded-2xl p-5 space-y-3 shadow-xs"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#18181b]/10 pb-2.5">
                      <div className="flex items-center gap-2.5">
                        {speaker && (
                          <div className="h-8 w-8 rounded-full overflow-hidden shrink-0 border border-black/10">
                            <PoliticianImage name={speaker.name} photoUrl={speaker.photo} className="h-full w-full object-cover" />
                          </div>
                        )}
                        <div>
                          <span className="font-serif font-bold text-sm text-[#18181b]">
                            {stmt.speakerName}
                          </span>
                          <span className="text-xs text-[#71717a] font-mono ml-2">
                            {stmt.partyAbbr} • {stmt.date}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10.5px] font-bold bg-[#f1ede4] border border-[#18181b]/15 text-[#18181b] px-2.5 py-0.5 rounded-full">
                          {stmt.topic}
                        </span>
                        <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" /> {stmt.quoteType}
                        </span>
                      </div>
                    </div>

                    {/* Verbatim Quote Box */}
                    <div className="bg-[#f8f5ee] border-l-4 border-[#c44d31] p-3.5 rounded-r-xl">
                      <p className="font-serif text-sm text-[#18181b] italic leading-relaxed">
                        “{stmt.directQuote}”
                      </p>
                    </div>

                    {/* Neutral Context Summary */}
                    <div className="text-xs text-[#52525b] space-y-1">
                      <p>
                        <strong className="text-[#18181b]">Factual Context:</strong> {stmt.contextSummary}
                      </p>
                      <p className="text-[11px] text-[#71717a]">
                        <strong>Venue:</strong> {stmt.venue}
                      </p>
                    </div>

                    {/* Official Source Link */}
                    <div className="flex items-center justify-between pt-2 border-t border-[#18181b]/10 text-xs">
                      <span className="text-[11px] text-[#71717a] font-mono truncate max-w-[70%]">
                        Source: {stmt.sourceLabel}
                      </span>
                      <a
                        href={stmt.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 font-bold text-[#18181b] hover:text-[#c44d31] transition"
                      >
                        <span>Inspect Official Record</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center bg-[#fdfcfa] border border-[#18181b]/15 rounded-2xl text-xs text-[#71717a]">
                No public statements found for the selected topic among these leaders.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 5: CONSTITUENCY VS SANSAD */}
      {activeTab === 'constituency' && (
        <div className="space-y-4">
          <div className="bg-[#f5f1e8] border border-[#18181b]/15 rounded-xl p-4 flex items-start gap-3">
            <Landmark className="h-5 w-5 text-[#18181b] shrink-0 mt-0.5" />
            <div className="text-xs text-[#52525b] space-y-1">
              <p className="font-bold text-[#18181b]">
                Separating Constituency Development from Parliamentary Legislation
              </p>
              <p>
                An MP's work is divided into two distinct constitutional spheres: <strong>National Parliamentary Legislation</strong> (in the Lok Sabha Chamber) and <strong>Constituency Local Development</strong> (via MPLADS funds, district review meetings, and civic sanctioning). NetaWatch separates these records to provide fair assessment across both dimensions.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedPoliticians.map(p => (
              <div key={p.id} className="bg-[#fdfcfa] border border-[#18181b]/15 rounded-2xl p-5 space-y-4 shadow-xs">
                <div className="border-b border-[#18181b]/10 pb-3">
                  <h3 className="font-serif font-bold text-base text-[#18181b]">{p.name}</h3>
                  <p className="text-xs text-[#71717a] font-mono">{p.constituency} Constituency, {p.state}</p>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="bg-[#f8f5ee] p-3 rounded-xl space-y-1">
                    <div className="flex justify-between font-bold text-[#18181b]">
                      <span>MPLADS Utilization:</span>
                      <span>{p.mplads.utilizationPercent}%</span>
                    </div>
                    <div className="w-full bg-[#18181b]/10 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#c44d31] h-full rounded-full" 
                        style={{ width: `${Math.min(p.mplads.utilizationPercent, 100)}%` }} 
                      />
                    </div>
                    <div className="flex justify-between text-[10.5px] text-[#71717a]">
                      <span>Spent: ₹{p.mplads.spentCr} Cr</span>
                      <span>Allocated: ₹{p.mplads.allocatedCr} Cr</span>
                    </div>
                  </div>

                  <div>
                    <span className="font-bold text-[11px] uppercase tracking-wider text-[#18181b] block mb-1">
                      Key Constituency Projects:
                    </span>
                    <div className="space-y-1.5">
                      {p.mplads.topProjects.slice(0, 3).map((proj, i) => (
                        <div key={i} className="p-2 bg-[#f8f5ee] rounded-lg text-[11px]">
                          <div className="font-semibold text-[#18181b]">{proj.title}</div>
                          <div className="text-[10px] text-[#71717a] flex justify-between mt-0.5">
                            <span>₹{proj.costCr} Cr • {proj.sector}</span>
                            <span className="font-bold text-[#c44d31]">{proj.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: ROLE ANALYSIS & LIMITATIONS */}
      {activeTab === 'role-analysis' && (
        <div className="space-y-5">
          <div className="bg-[#fdfcfa] border border-[#18181b]/15 rounded-2xl p-6 space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#18181b]">
              Constitutional Roles & Activity Patterns (Minister vs Opposition vs Backbench MP)
            </h3>
            <p className="text-xs text-[#52525b] leading-relaxed">
              In a parliamentary democracy, a Member of Parliament's constitutional duties depend on whether they hold an <strong>Executive Cabinet Office</strong>, lead the <strong>Parliamentary Opposition</strong>, or serve as a <strong>Private Member</strong>. Direct numerical comparisons without role context can produce misleading conclusions.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="bg-[#f5f1e8] p-4 rounded-xl space-y-2 border border-[#18181b]/10">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#18181b]">
                  Union Cabinet Ministers
                </h4>
                <p className="text-[11px] text-[#52525b] leading-relaxed">
                  • Do NOT submit parliamentary questions (Lok Sabha Rule 37).<br/>
                  • Introduce and steer Government Legislation.<br/>
                  • Reply to calling-attention motions and debates.<br/>
                  • Exempt from daily roster signatures when on executive or Rajya Sabha duties.
                </p>
              </div>

              <div className="bg-[#f5f1e8] p-4 rounded-xl space-y-2 border border-[#18181b]/10">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#18181b]">
                  Leader of Opposition (LoP)
                </h4>
                <p className="text-[11px] text-[#52525b] leading-relaxed">
                  • Leads parliamentary scrutiny of executive policy.<br/>
                  • Opens debates on Motion of Thanks and Union Budget.<br/>
                  • Submits questions and participates in statutory appointment panels (e.g. CBI, CVC, ECI).
                </p>
              </div>

              <div className="bg-[#f5f1e8] p-4 rounded-xl space-y-2 border border-[#18181b]/10">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#18181b]">
                  Private Member MPs
                </h4>
                <p className="text-[11px] text-[#52525b] leading-relaxed">
                  • Submit Starred & Unstarred Questions during Question Hour.<br/>
                  • Introduce Private Member Bills on designated Friday afternoons.<br/>
                  • Raise constituency issues during Zero Hour & Rule 377.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#fdfcfa] border border-[#18181b]/15 rounded-2xl p-6 space-y-3">
            <h3 className="font-serif text-lg font-bold text-[#18181b]">
              Calculation Formulas & Methodological Boundaries
            </h3>
            <div className="space-y-3 text-xs text-[#52525b]">
              <div className="p-3 bg-[#f8f5ee] rounded-xl">
                <strong className="text-[#18181b]">Zero Composite Scoring Policy:</strong> NetaWatch deliberately rejects calculating a single opaque "political score" or "performance grade". Civic research requires granular, verifiable metrics with explicit underlying numbers and official source records.
              </div>
              <div className="p-3 bg-[#f8f5ee] rounded-xl">
                <strong className="text-[#18181b]">Unavailable Data Transparency:</strong> If a specific data point is unrecorded in official registers, it is marked as "Not available" rather than falsely implying zero or hiding the field.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: EVIDENCE & OFFICIAL SOURCES */}
      {activeTab === 'sources' && (
        <div className="bg-[#fdfcfa] border border-[#18181b]/15 rounded-2xl p-6 space-y-5">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#18181b]">
              Primary Repositories & Direct Official Records
            </h3>
            <p className="text-xs text-[#52525b] mt-1">
              Every data point in NetaWatch is cross-referenced with public official repositories. You can inspect the primary sources directly below:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-[#f8f5ee] border border-[#18181b]/10 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#18181b]">
                  Sansad Lok Sabha Hansard & Questions
                </h4>
                <ExternalLink className="h-4 w-4 text-[#71717a]" />
              </div>
              <p className="text-[11px] text-[#52525b]">
                Official verbatim transcripts, debate records, daily attendance registers, and questions division filings for the 18th Lok Sabha.
              </p>
              <a 
                href="https://sansad.in/ls" 
                target="_blank" 
                rel="noreferrer" 
                className="text-xs font-mono font-bold text-[#c44d31] hover:underline block"
              >
                https://sansad.in/ls
              </a>
            </div>

            <div className="p-4 bg-[#f8f5ee] border border-[#18181b]/10 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#18181b]">
                  Election Commission of India (ECI Form 26)
                </h4>
                <ExternalLink className="h-4 w-4 text-[#71717a]" />
              </div>
              <p className="text-[11px] text-[#52525b]">
                Sworn affidavits containing declared financial assets, liabilities, educational qualifications, and disclosed criminal proceedings.
              </p>
              <a 
                href="https://affidavit.eci.gov.in" 
                target="_blank" 
                rel="noreferrer" 
                className="text-xs font-mono font-bold text-[#c44d31] hover:underline block"
              >
                https://affidavit.eci.gov.in
              </a>
            </div>

            <div className="p-4 bg-[#f8f5ee] border border-[#18181b]/10 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#18181b]">
                  MoSPI MPLADS Portal
                </h4>
                <ExternalLink className="h-4 w-4 text-[#71717a]" />
              </div>
              <p className="text-[11px] text-[#52525b]">
                District-level fund allocation, sanctioning, and expenditure tracking for Member of Parliament Local Area Development Scheme.
              </p>
              <a 
                href="https://mplads.gov.in" 
                target="_blank" 
                rel="noreferrer" 
                className="text-xs font-mono font-bold text-[#c44d31] hover:underline block"
              >
                https://mplads.gov.in
              </a>
            </div>

            <div className="p-4 bg-[#f8f5ee] border border-[#18181b]/10 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#18181b]">
                  Press Information Bureau (PIB)
                </h4>
                <ExternalLink className="h-4 w-4 text-[#71717a]" />
              </div>
              <p className="text-[11px] text-[#52525b]">
                Official communiques, Cabinet decisions, and ministerial speech transcripts verified through government releases.
              </p>
              <a 
                href="https://pib.gov.in" 
                target="_blank" 
                rel="noreferrer" 
                className="text-xs font-mono font-bold text-[#c44d31] hover:underline block"
              >
                https://pib.gov.in
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Info Popover Modal for Metric Explanations */}
      {infoModalMetric && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={() => setInfoModalMetric(null)}
        >
          <div 
            className="w-full max-w-md bg-[#fdfcfa] border border-[#18181b]/25 rounded-2xl p-5 space-y-3 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#18181b]/15 pb-2.5">
              <h4 className="font-serif font-bold text-base text-[#18181b]">
                {infoModalMetric.title}
              </h4>
              <button 
                onClick={() => setInfoModalMetric(null)}
                className="text-[#71717a] hover:text-[#18181b]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-[#52525b]">
              <div>
                <strong className="text-[#18181b] block text-[11px] uppercase tracking-wider">Formula / Calculation:</strong>
                <p className="bg-[#f8f5ee] p-2 rounded-lg mt-0.5">{infoModalMetric.formula}</p>
              </div>
              <div>
                <strong className="text-[#18181b] block text-[11px] uppercase tracking-wider">Primary Source:</strong>
                <p className="text-[#71717a] mt-0.5">{infoModalMetric.source}</p>
              </div>
              {infoModalMetric.ministerRule && (
                <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-lg text-amber-900">
                  <strong className="block text-[10.5px] uppercase tracking-wider">Minister vs Non-Minister Rule:</strong>
                  <p className="mt-0.5">{infoModalMetric.ministerRule}</p>
                </div>
              )}
              <div>
                <strong className="text-[#18181b] block text-[11px] uppercase tracking-wider">Methodological Limitations:</strong>
                <p className="text-[#71717a] mt-0.5">{infoModalMetric.limitations}</p>
              </div>
            </div>

            <button
              onClick={() => setInfoModalMetric(null)}
              className="w-full py-2 bg-[#18181b] text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#c44d31] transition"
            >
              Close Explanation
            </button>
          </div>
        </div>
      )}

      {/* Correction / Data Review Modal */}
      <CorrectionModal
        isOpen={isCorrectionOpen}
        onClose={() => setIsCorrectionOpen(false)}
      />
    </div>
  );
};
