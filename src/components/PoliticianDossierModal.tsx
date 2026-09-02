import React, { useState, useRef } from 'react';
import { 
  X, Landmark, Wallet, ShieldAlert, TrendingUp, CheckCircle2, 
  ExternalLink, Calendar, MapPin, Award, GraduationCap, Briefcase, 
  Heart, Users, Scale, FileText, Share2, Printer, Check, AlertCircle,
  Building, Sparkles, BookOpen, Clock, Newspaper, ArrowUpRight, Activity, User,
  Gavel, Filter, AlertTriangle, ShieldCheck, MessageSquare, Info
} from 'lucide-react';
import { Politician, TabType } from '../types';
import { PoliticianImage } from './PoliticianImage';
import { AttendanceRadar } from './AttendanceRadar';
import { NepotismAssetTrackerTab } from './NepotismAssetTrackerTab';
import { ShareDossierModal } from './ShareDossierModal';
import { VERIFIED_PUBLIC_STATEMENTS } from '../data/statementsData';
import { 
  getPoliticianDeepLink, 
  generateSocialShareSummary, 
  copyToClipboard 
} from '../utils/shareUtils';
import { analytics } from '../utils/analytics';

interface PoliticianDossierModalProps {
  politician: Politician | null;
  onClose: () => void;
  isCompared: boolean;
  onToggleCompare: (p: Politician) => void;
  onOpenCompareWith: (p: Politician) => void;
  onInvestigateWithAgent?: (politicianIds: string[], promptObjective?: string) => void;
}

export const PoliticianDossierModal: React.FC<PoliticianDossierModalProps> = ({
  politician,
  onClose,
  isCompared,
  onToggleCompare,
  onOpenCompareWith,
  onInvestigateWithAgent,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [copiedLink, setCopiedLink] = useState(false);
  const [legalTemporalFilter, setLegalTemporalFilter] = useState<'all' | 'Current' | 'Previous'>('all');
  const [legalTypeFilter, setLegalTypeFilter] = useState<string>('all');
  const [legalSeriousnessFilter, setLegalSeriousnessFilter] = useState<'all' | 'serious' | 'non-serious'>('all');

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  if (!politician) return null;

  const {
    name,
    hindiName,
    photo,
    bannerImage,
    party,
    partyAbbr,
    partyColor,
    alliance,
    currentRole,
    state,
    constituency,
    house,
    age,
    dateOfBirth,
    birthPlace,
    education,
    profession,
    spouse,
    bio,
    keyStances,
    socialLinks,
    parliamentaryRecord,
    mplads,
    assets,
    criminalRecords,
    majorInitiatives,
    politicalTimeline,
    news,
    verifiedAffidavit,
  } = politician;

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareToastMessage, setShareToastMessage] = useState<string | null>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    if (scrollTop > 40 && !isScrolled) {
      setIsScrolled(true);
    } else if (scrollTop <= 40 && isScrolled) {
      setIsScrolled(false);
    }
  };

  const handleShare = async () => {
    const deepLinkUrl = getPoliticianDeepLink(politician.id);
    const summary = generateSocialShareSummary(politician, deepLinkUrl);
    const success = await copyToClipboard(summary);
    
    setCopiedLink(true);
    setShareToastMessage('📋 Formatted dossier summary & deep link copied to clipboard!');
    analytics.shareDossier(name, partyAbbr, 'header_quick_share');
    
    setTimeout(() => setCopiedLink(false), 3000);
    setTimeout(() => setShareToastMessage(null), 4000);
    
    setIsShareModalOpen(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6 overflow-y-auto bg-black/80 backdrop-blur-xs animate-in fade-in duration-150">
      
      {/* Click outside backdrop */}
      <div className="fixed inset-0 hidden sm:block" onClick={onClose} />

      {/* Main Modal Container - Full screen on mobile, elegant modal on tablet/desktop */}
      <div 
        id="politician-dossier-modal"
        className="relative z-10 w-full h-full sm:h-auto sm:max-w-5xl sm:max-h-[92vh] flex flex-col sm:rounded-sm border-0 sm:border border-[#18181b]/30 bg-[#faf9f6] shadow-2xl overflow-hidden text-[#18181b]"
      >
        {/* Top Accent Stripe */}
        <div className="h-1.5 w-full flex-shrink-0" style={{ backgroundColor: partyColor }} />

        {/* Right-Edge Section Anchor Dock (Vertical Dock - Desktop Only) */}
        <div className="hidden lg:flex flex-col items-center gap-1.5 absolute right-3 top-1/2 -translate-y-1/2 z-30 bg-white/95 backdrop-blur-xs p-1 rounded-full border border-[#18181b]/20 shadow-md">
          {[
            { id: 'overview', label: 'Overview', icon: User },
            { id: 'financials', label: 'Assets', icon: Wallet },
            { id: 'parliament', label: 'Hansard', icon: Landmark },
            { id: 'mplads', label: 'MPLADS', icon: TrendingUp },
            { id: 'legal', label: 'Affidavits', icon: ShieldAlert },
            { id: 'initiatives', label: 'Initiatives', icon: Award },
            { id: 'news', label: 'News', icon: Newspaper },
          ].map((dockItem) => {
            const DockIcon = dockItem.icon;
            const isDockActive = activeTab === dockItem.id;
            return (
              <button
                key={dockItem.id}
                onClick={() => {
                  setActiveTab(dockItem.id as TabType);
                  scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`group relative flex h-7 w-7 items-center justify-center rounded-full transition-all cursor-pointer ${
                  isDockActive
                    ? 'bg-[#18181b] text-white shadow-xs'
                    : 'bg-transparent text-[#71717a] hover:bg-[#18181b]/10 hover:text-[#18181b]'
                }`}
                title={dockItem.label}
              >
                <DockIcon className="h-3.5 w-3.5" />
                <span className="pointer-events-none absolute right-full mr-2 hidden group-hover:block whitespace-nowrap rounded-xs bg-[#18181b] px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-white shadow-xl z-50">
                  {dockItem.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Floating Toast Notification for Quick Share Copy */}
        {shareToastMessage && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-40 bg-[#18181b] text-white px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xs shadow-xl border border-white/20 flex items-center gap-2 animate-in slide-in-from-top duration-150">
            <CheckCircle2 className="h-4 w-4 text-[#1b6b47]" />
            <span>{shareToastMessage}</span>
          </div>
        )}

        {/* Slim Sticky Top Action Bar (Mobile & Desktop) */}
        <div className="sticky top-0 flex items-center justify-between border-b-2 border-[#18181b]/20 bg-[#e8e4da] px-3 sm:px-5 py-2.5 flex-shrink-0 z-30 min-h-[48px]">
          <div className="flex items-center gap-2 min-w-0 flex-1 mr-2">
            {isScrolled ? (
              <div className="flex items-center gap-2 min-w-0 animate-in fade-in duration-150">
                <div className="h-8 w-8 rounded-xs border-2 border-[#18181b]/40 overflow-hidden flex-shrink-0 bg-white shadow-xs">
                  <PoliticianImage
                    src={photo}
                    alt={name}
                    partyColor={partyColor}
                    name={name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-serif font-bold text-xs sm:text-sm text-[#18181b] truncate leading-tight">
                      {name}
                    </span>
                    <span
                      className="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider border rounded-xs flex-shrink-0 font-mono"
                      style={{ backgroundColor: `${partyColor}20`, color: partyColor, borderColor: partyColor }}
                    >
                      {partyAbbr}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#52525b] truncate leading-tight hidden xs:block font-medium">
                    {constituency}, {state}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border-2 rounded-xs flex-shrink-0 font-mono"
                  style={{ backgroundColor: `${partyColor}20`, color: partyColor, borderColor: partyColor }}
                >
                  {partyAbbr}
                </span>
                <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#18181b] truncate">
                  {house} • {constituency}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            {/* Agent Audit Button */}
            {onInvestigateWithAgent && (
              <button
                onClick={() => {
                  onInvestigateWithAgent([politician.id], `Full investigative accountability audit of ${politician.name}`);
                }}
                className="flex items-center gap-1.5 border-2 border-[#18181b] bg-[#18181b] text-white hover:bg-[#c44d31] hover:border-[#c44d31] px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider transition touch-manipulation min-h-[36px] rounded-xs shadow-xs cursor-pointer"
                title="Conduct deep AI agent verification and affidavit cross-examination"
                aria-label="Agent Audit"
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                <span className="hidden sm:inline">Agent Audit</span>
              </button>
            )}

            {/* Share Button */}
            <button
              onClick={handleShare}
              className={`flex items-center gap-1.5 border-2 px-3 py-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider transition touch-manipulation min-h-[36px] rounded-xs shadow-xs cursor-pointer ${
                copiedLink
                  ? 'border-[#1b6b47] bg-[#1b6b47] text-white'
                  : 'border-[#18181b] bg-white text-[#18181b] hover:bg-[#18181b] hover:text-white'
              }`}
              title="Share MP Dossier & Copy Formatted Deep Link"
              aria-label="Share"
            >
              {copiedLink ? <Check className="h-4 w-4 stroke-[3]" /> : <Share2 className="h-4 w-4" />}
              <span className="hidden sm:inline">{copiedLink ? 'Copied Link' : 'Share'}</span>
            </button>

            {/* Print Button (Desktop only) */}
            <button
              onClick={handlePrint}
              className="border-2 border-[#18181b] bg-white p-2 text-[#18181b] hover:bg-[#18181b] hover:text-white transition hidden md:flex items-center justify-center min-h-[36px] min-w-[36px] rounded-xs shadow-xs cursor-pointer"
              title="Print Dossier Factsheet"
              aria-label="Print"
            >
              <Printer className="h-4 w-4 text-inherit" />
            </button>

            {/* Compare Button */}
            <button
              onClick={() => onToggleCompare(politician)}
              className={`flex items-center gap-1.5 border-2 px-3 py-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider transition touch-manipulation min-h-[36px] rounded-xs cursor-pointer ${
                isCompared
                  ? 'border-[#c44d31] bg-[#c44d31] text-white shadow-xs'
                  : 'border-[#18181b] bg-white text-[#18181b] hover:bg-[#18181b] hover:text-white shadow-xs'
              }`}
            >
              <Scale className="h-4 w-4" />
              <span className="hidden sm:inline">{isCompared ? 'Compared' : 'Compare'}</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="border-2 border-[#18181b] bg-[#18181b] p-2 text-white hover:bg-[#c44d31] hover:border-[#c44d31] transition touch-manipulation min-h-[36px] min-w-[36px] flex items-center justify-center rounded-xs shadow-xs cursor-pointer"
              title="Close Dossier"
              aria-label="Close"
            >
              <X className="h-4 w-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Container - Takes full remaining space on mobile */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto bg-[#faf9f6] flex flex-col"
        >
          {/* Modal Header / Banner Profile Hero (Scrolls naturally with content) */}
          <div className="relative border-b border-[#18181b]/15 bg-[#f1ede4] p-3.5 sm:p-6 flex-shrink-0">
            
            {/* Profile Identity Overview */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3.5 sm:gap-5">
              <div className="relative flex-shrink-0">
                <div className="relative h-20 w-20 sm:h-28 sm:w-28 overflow-hidden rounded-xs border border-[#18181b]/25 bg-white shadow-xs">
                  <PoliticianImage
                    src={photo}
                    alt={name}
                    partyColor={partyColor}
                    name={name}
                    constituency={constituency}
                    state={state}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div 
                  className="absolute -bottom-1.5 -right-1.5 sm:-bottom-2 sm:-right-2 flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full border border-white bg-[#1b6b47] text-white shadow-xs"
                  title="Verified ADR / Election Commission Affidavit"
                >
                  <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 stroke-[3]" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span
                    className="px-2 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider border rounded-xs"
                    style={{ backgroundColor: `${partyColor}15`, color: partyColor, borderColor: `${partyColor}40` }}
                  >
                    {party} ({partyAbbr})
                  </span>
                  <span className={`px-2 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider border rounded-xs ${
                    alliance === 'NDA'
                      ? 'border-orange-500/40 bg-orange-50 text-orange-800'
                      : alliance === 'INDIA'
                      ? 'border-sky-500/40 bg-sky-50 text-sky-800'
                      : 'border-[#18181b]/20 bg-white text-[#18181b]'
                  }`}>
                    {alliance} Coalition
                  </span>
                  <span className="bg-white px-2 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#71717a] border border-[#18181b]/20 rounded-xs">
                    {house}
                  </span>
                </div>

                <div className="mt-1.5 sm:mt-2 flex flex-wrap items-baseline gap-2">
                  <h2 className="text-xl sm:text-3xl lg:text-4xl font-serif font-black text-[#18181b] tracking-tight leading-tight">
                    {name}
                  </h2>
                  {hindiName && (
                    <span className="text-sm sm:text-base font-serif italic text-[#8a8479]">({hindiName})</span>
                  )}
                </div>

                <p className="mt-1 text-xs sm:text-sm font-semibold text-[#c44d31]">
                  {currentRole}
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-1.5 text-[11px] sm:text-xs text-[#52525b]">
                  <span className="flex items-center gap-1 font-medium">
                    <MapPin className="h-3.5 w-3.5 text-[#18181b] flex-shrink-0" />
                    {constituency}, {state}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-[#18181b] flex-shrink-0" />
                    Age: <strong className="text-[#18181b]">{age}y</strong> ({dateOfBirth})
                  </span>
                  <span className="flex items-center gap-1">
                    <GraduationCap className="h-3.5 w-3.5 text-[#18181b] flex-shrink-0" />
                    {education.split(',')[0]}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Navigation Tabs Bar */}
          <div className="sticky top-0 z-20 bg-[#f5f2ea] border-b border-[#18181b]/15 shadow-2xs">
            <div className="relative">
              <div className="flex overflow-x-auto no-scrollbar touch-pan-scroll px-3 sm:px-5 py-2 sm:py-2.5 gap-1.5 sm:gap-2">
                {[
                  { id: 'overview', label: '1. Verified Facts', icon: User },
                  { id: 'parliament', label: '2. Parliamentary Metrics', icon: Landmark },
                  { id: 'statements', label: '3. Public Statements', icon: MessageSquare },
                  { id: 'financials', label: '4. Assets & Disclosures', icon: Wallet },
                  { id: 'mplads', label: '5. MPLADS Funds', icon: TrendingUp },
                  { id: 'legal', label: '6. Legal & Affidavits', icon: ShieldAlert },
                  { id: 'sources', label: '7. Official Sources & Audit', icon: BookOpen },
                  { id: 'initiatives', label: 'Initiatives', icon: Award },
                  { id: 'news', label: 'News Feed', icon: Newspaper },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as TabType)}
                      className={`flex items-center gap-1.5 whitespace-nowrap px-3 sm:px-3.5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all touch-manipulation flex-shrink-0 rounded-xs cursor-pointer select-none ${
                        isActive
                          ? 'bg-[#18181b] text-white shadow-xs border border-[#18181b]'
                          : 'bg-white text-[#403e39] border border-[#18181b]/20 hover:border-[#18181b] hover:text-[#18181b] hover:bg-[#faf9f6]'
                      }`}
                    >
                      <Icon className={`h-3.5 w-3.5 flex-shrink-0 ${isActive ? 'text-white' : 'text-[#71717a]'}`} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
              {/* Subtle edge fade gradient to indicate horizontal scroll */}
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#f5f2ea] to-transparent sm:hidden" />
            </div>
          </div>

          {/* Modal Tab Content Area */}
          <div className="flex-1 p-3.5 sm:p-6 space-y-5 sm:space-y-6 bg-[#faf9f6]">
          
          {/* TAB 1: OVERVIEW & PROFILE */}
          {activeTab === 'overview' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              
              {/* Bio Card */}
              <div className="border border-[#18181b]/15 bg-white p-4 sm:p-6 shadow-2xs rounded-xs">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#c44d31] flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Executive Biography & Background
                </h4>
                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#2c2925] font-normal">
                  {bio}
                </p>
              </div>

              {/* Personal & Vital Statistics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="border border-[#18181b]/15 bg-white p-4 sm:p-5 space-y-3 shadow-2xs rounded-xs">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#18181b] border-b border-[#18181b]/15 pb-2">
                    Vital Records & Personal Ledger
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-[#18181b]/10">
                      <span className="text-[#71717a]">Date of Birth</span>
                      <span className="font-semibold text-[#18181b]">{dateOfBirth} ({age} years)</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#18181b]/10">
                      <span className="text-[#71717a]">Birthplace</span>
                      <span className="font-semibold text-[#18181b]">{birthPlace}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#18181b]/10">
                      <span className="text-[#71717a]">Educational Qualification</span>
                      <span className="font-semibold text-[#18181b] text-right max-w-[200px]">{education}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#18181b]/10">
                      <span className="text-[#71717a]">Profession</span>
                      <span className="font-semibold text-[#18181b]">{profession}</span>
                    </div>
                    {spouse && (
                      <div className="flex justify-between py-1">
                        <span className="text-[#71717a]">Spouse</span>
                        <span className="font-semibold text-[#18181b]">{spouse}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Core Stances & Ideology */}
                <div className="border border-[#18181b]/15 bg-white p-4 sm:p-5 space-y-3 shadow-2xs rounded-xs">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#c44d31] border-b border-[#18181b]/15 pb-2">
                    Core Ideology & Stances
                  </h4>
                  <ul className="space-y-2.5">
                    {keyStances.map((stance, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-[#2c2925]">
                        <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 bg-[#c44d31]" />
                        <span className="leading-snug">{stance}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Career Milestone Timeline */}
              <div className="border border-[#18181b]/15 bg-white p-4 sm:p-6 shadow-2xs rounded-xs">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#18181b] flex items-center gap-2 mb-5">
                  <Clock className="h-4 w-4 text-[#c44d31]" />
                  Political Timeline & Milestones
                </h4>
                <div className="relative border-l-2 border-[#18181b]/20 ml-2 space-y-5 pl-5">
                  {politicalTimeline.map((item, idx) => (
                    <div key={idx} className="relative group">
                      <div className="absolute -left-[27px] top-1 h-3 w-3 border border-white bg-[#18181b] shadow-2xs" />
                      <div className="flex items-baseline gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#c44d31]">{item.year}</span>
                        <span className="text-xs font-serif font-bold text-[#18181b]">{item.role}</span>
                      </div>
                      <p className="mt-1 text-xs text-[#52525b] leading-relaxed">{item.achievement}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Civic Share & Social Broadcast Card */}
              <div className="border border-[#18181b]/15 bg-white p-4 sm:p-5 space-y-3 rounded-xs shadow-2xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#18181b]/15 pb-2.5">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-[#c44d31] flex items-center gap-1.5 font-mono">
                      <Share2 className="h-3.5 w-3.5" />
                      Public Record Sharing & Social Summary
                    </h4>
                    <p className="text-xs text-[#52525b]">
                      Share this MP's verified assets, attendance, and criminal disclosure stats with a deep-link
                    </p>
                  </div>
                  <button
                    onClick={handleShare}
                    className="inline-flex items-center justify-center gap-1.5 border border-[#18181b] bg-[#18181b] px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#c44d31] hover:border-[#c44d31] transition rounded-xs shadow-2xs touch-manipulation min-h-[36px]"
                  >
                    <Share2 className="h-3.5 w-3.5" />
                    <span>Open Share & Copy Options</span>
                  </button>
                </div>

                <div className="bg-[#faf9f6] border border-[#18181b]/10 p-3 rounded-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="font-mono text-[11px] text-[#52525b] truncate max-w-lg">
                    <span className="font-bold text-[#18181b]">{name}</span> ({partyAbbr}) • Assets: ₹{assets.totalCr} Cr • Attendance: {parliamentaryRecord.attendancePercent}% • Cases: {criminalRecords.totalCases}
                  </div>
                  <button
                    onClick={handleShare}
                    className="flex-shrink-0 flex items-center gap-1 font-bold text-[#c44d31] hover:text-[#18181b] uppercase tracking-wider text-[11px]"
                  >
                    <span>Copy Full Summary</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Social Media & Official Channels */}
              <div className="border border-[#18181b]/15 bg-[#f1ede4] p-3.5 sm:p-4 flex flex-wrap items-center justify-between gap-3 rounded-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-[#52525b]">Official Verified Links:</span>
                <div className="flex flex-wrap items-center gap-2">
                  {socialLinks.twitter && (
                    <a
                      href={socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 border border-[#18181b]/25 bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#18181b] hover:bg-[#18181b] hover:text-white transition rounded-xs shadow-2xs"
                    >
                      <span>X / Twitter</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  )}
                  {socialLinks.facebook && (
                    <a
                      href={socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 border border-[#18181b]/25 bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#18181b] hover:bg-[#18181b] hover:text-white transition rounded-xs shadow-2xs"
                    >
                      <span>Facebook</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  )}
                  {socialLinks.wikipedia && (
                    <a
                      href={socialLinks.wikipedia}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 border border-[#18181b]/25 bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#18181b] hover:bg-[#18181b] hover:text-white transition rounded-xs shadow-2xs"
                    >
                      <span>Wikipedia Record</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: FINANCIALS, ASSETS & NEPOTISM CONTRACTS */}
          {activeTab === 'financials' && (
            <NepotismAssetTrackerTab politician={politician} />
          )}

          {/* TAB 3: PARLIAMENTARY RECORD */}
          {activeTab === 'parliament' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              
              {/* Visual Parliamentary Activity Radar Section */}
              <div className="border border-[#18181b]/15 bg-white p-4 sm:p-5 shadow-2xs rounded-xs">
                <div className="flex items-center justify-between border-b border-[#18181b]/15 pb-3 mb-4">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-[#18181b] flex items-center gap-2">
                      <Activity className="h-4 w-4 text-[#c44d31]" />
                      Parliamentary Activity Radar & National Benchmark
                    </h4>
                    <p className="text-xs text-[#71717a] mt-0.5">
                      Multi-dimensional performance analysis across attendance, debates, questions, and private bills
                    </p>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-[#f1ede4] border border-[#18181b]/15 text-[#18181b] rounded-xs">
                    <span>Official 18th Lok Sabha / RS Data</span>
                  </span>
                </div>

                <AttendanceRadar
                  politician={politician}
                  compact={false}
                  showBenchmark={true}
                />
              </div>

              {/* Attendance & Debates Gauge */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                
                <div className="border border-[#18181b]/15 bg-white p-4 sm:p-5 text-center flex flex-col justify-center items-center shadow-2xs rounded-xs">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#71717a]">House Attendance</span>
                  <div className="mt-2 text-3xl sm:text-4xl font-serif font-black text-[#18181b]">
                    {parliamentaryRecord.attendancePercent}%
                  </div>
                  <div className="mt-1 text-xs text-[#71717a]">
                    National Benchmark: <strong className="text-[#18181b]">79%</strong>
                  </div>
                  <div className="mt-2">
                    <span className="bg-[#f1ede4] border border-[#18181b]/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#1b6b47] rounded-xs">
                      {parliamentaryRecord.attendancePercent >= 79 ? '+ Above Average' : '- Below Average'}
                    </span>
                  </div>
                </div>

                <div className="border border-[#18181b]/15 bg-white p-4 sm:p-5 text-center flex flex-col justify-center items-center shadow-2xs rounded-xs">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#71717a]">Debates Participated</span>
                  <div className="mt-2 text-3xl sm:text-4xl font-serif font-black text-[#18181b]">
                    {parliamentaryRecord.debatesCount}
                  </div>
                  <div className="mt-1 text-xs text-[#71717a]">
                    Legislative debates & speeches
                  </div>
                </div>

                <div className="border border-[#18181b]/15 bg-white p-4 sm:p-5 text-center flex flex-col justify-center items-center shadow-2xs rounded-xs">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#71717a]">Questions & Bills</span>
                  <div className="mt-2 text-3xl sm:text-4xl font-serif font-black text-[#18181b]">
                    {parliamentaryRecord.questionsAsked}
                  </div>
                  <div className="mt-1 text-xs text-[#71717a]">
                    {parliamentaryRecord.questionsAsked === 0 
                      ? 'Cabinet Ministers do not table questions' 
                      : `${parliamentaryRecord.privateMemberBills} Private Member Bills`}
                  </div>
                </div>

              </div>

              {/* Committee Assignments */}
              <div className="border border-[#18181b]/15 bg-white p-4 sm:p-5 space-y-3 shadow-2xs rounded-xs">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#18181b] flex items-center gap-2 border-b border-[#18181b]/15 pb-2">
                  <Building className="h-4 w-4 text-[#c44d31]" />
                  Key Parliamentary & Cabinet Committees
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {parliamentaryRecord.committeeMemberships.map((committee, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 border border-[#18181b]/15 bg-[#faf9f6] p-3 text-xs text-[#18181b] rounded-xs"
                    >
                      <CheckCircle2 className="h-4 w-4 text-[#1b6b47] flex-shrink-0" />
                      <span className="font-semibold">{committee}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: MPLADS / CONSTITUENCY FUNDS */}
          {activeTab === 'mplads' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              
              {/* MPLADS Financial Meter */}
              <div className="border border-[#18181b]/15 bg-white p-4 sm:p-5 space-y-4 shadow-2xs rounded-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#18181b]/10 pb-3">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-[#18181b] flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-[#1b6b47]" />
                      Constituency Development Fund Audit (MPLADS)
                    </h4>
                    <p className="text-xs text-[#71717a]">
                      MP Local Area Development Scheme project execution and spending ledger
                    </p>
                  </div>
                  <span className="font-serif text-xl font-black text-[#1b6b47]">
                    {mplads.utilizationPercent}% Utilized
                  </span>
                </div>

                {/* Progress bar */}
                <div className="h-3 w-full bg-[#f1ede4] border border-[#18181b]/20 p-0.5 rounded-xs">
                  <div
                    className="h-full bg-[#1b6b47]"
                    style={{ width: `${mplads.utilizationPercent}%` }}
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                  <div className="bg-[#faf9f6] p-3 border border-[#18181b]/15 text-center rounded-xs">
                    <span className="text-[9px] uppercase text-[#71717a] font-bold tracking-wider">Total Allocation</span>
                    <p className="text-sm sm:text-base font-serif font-black text-[#18181b]">₹{mplads.allocatedCr} Cr</p>
                  </div>
                  <div className="bg-[#faf9f6] p-3 border border-[#18181b]/15 text-center rounded-xs">
                    <span className="text-[9px] uppercase text-[#71717a] font-bold tracking-wider">Actual Expenditure</span>
                    <p className="text-sm sm:text-base font-serif font-black text-[#1b6b47]">₹{mplads.spentCr} Cr</p>
                  </div>
                  <div className="bg-[#faf9f6] p-3 border border-[#18181b]/15 text-center rounded-xs">
                    <span className="text-[9px] uppercase text-[#71717a] font-bold tracking-wider">Completed Works</span>
                    <p className="text-sm sm:text-base font-serif font-black text-[#18181b]">{mplads.completedProjects}</p>
                  </div>
                  <div className="bg-[#faf9f6] p-3 border border-[#18181b]/15 text-center rounded-xs">
                    <span className="text-[9px] uppercase text-[#71717a] font-bold tracking-wider">In-Progress Works</span>
                    <p className="text-sm sm:text-base font-serif font-black text-[#c44d31]">{mplads.ongoingProjects}</p>
                  </div>
                </div>
              </div>

              {/* Major Sectoral Projects List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#18181b]">
                  High-Impact Constituency Projects Funded
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {mplads.topProjects.map((project, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col justify-between border border-[#18181b]/15 bg-white p-3.5 sm:p-4 shadow-2xs rounded-xs"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="bg-[#f1ede4] border border-[#18181b]/15 px-2 py-0.5 text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-[#18181b] rounded-xs">
                            {project.sector}
                          </span>
                          <span className={`text-[8px] sm:text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 border rounded-xs ${
                            project.status === 'Completed'
                              ? 'bg-emerald-50 text-[#1b6b47] border-emerald-200'
                              : 'bg-amber-50 text-amber-800 border-amber-200'
                          }`}>
                            {project.status}
                          </span>
                        </div>
                        <h5 className="mt-2 text-xs sm:text-sm font-serif font-bold text-[#18181b] line-clamp-2">
                          {project.title}
                        </h5>
                      </div>
                      <div className="mt-3 flex items-center justify-between border-t border-[#18181b]/10 pt-2 text-xs">
                        <span className="text-[#71717a] text-[11px]">{project.location}</span>
                        <span className="font-serif font-black text-[#1b6b47]">₹{project.costCr} Cr</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 5: LEGAL & AFFIDAVITS (CRIMINAL TRANSPARENCY) */}
          {activeTab === 'legal' && (() => {
            const rawCases = criminalRecords.details || [];
            
            // Extract distinct case types for filter chips
            const availableTypes = Array.from(new Set(rawCases.map(c => c.caseType).filter(Boolean)));
            
            const currentCasesCount = rawCases.filter(c => (c.temporalStatus === 'Current' || (!c.temporalStatus && !c.status.toLowerCase().includes('disposed') && !c.status.toLowerCase().includes('acquitted') && !c.status.toLowerCase().includes('quashed')))).length;
            const previousCasesCount = rawCases.filter(c => (c.temporalStatus === 'Previous' || c.status.toLowerCase().includes('disposed') || c.status.toLowerCase().includes('acquitted') || c.status.toLowerCase().includes('quashed'))).length;
            const seriousCount = rawCases.filter(c => c.isSerious).length;

            const filteredCases = rawCases.filter(c => {
              const isCurrent = c.temporalStatus === 'Current' || (!c.temporalStatus && !c.status.toLowerCase().includes('disposed') && !c.status.toLowerCase().includes('acquitted') && !c.status.toLowerCase().includes('quashed'));
              const isPrevious = c.temporalStatus === 'Previous' || c.status.toLowerCase().includes('disposed') || c.status.toLowerCase().includes('acquitted') || c.status.toLowerCase().includes('quashed');

              if (legalTemporalFilter === 'Current' && !isCurrent) return false;
              if (legalTemporalFilter === 'Previous' && !isPrevious) return false;

              if (legalTypeFilter !== 'all' && c.caseType !== legalTypeFilter) return false;

              if (legalSeriousnessFilter === 'serious' && !c.isSerious) return false;
              if (legalSeriousnessFilter === 'non-serious' && c.isSerious) return false;

              return true;
            });

            return (
              <div className="space-y-5 animate-in fade-in duration-150">
                
                {/* Top Legal Status Executive Audit Banner */}
                <div className={`border p-4 sm:p-5 rounded-xs ${
                  criminalRecords.totalCases === 0
                    ? 'border-[#1b6b47]/30 bg-[#1b6b47]/5'
                    : 'border-[#c44d31]/30 bg-[#c44d31]/5'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      {criminalRecords.totalCases === 0 ? (
                        <ShieldCheck className="h-8 w-8 text-[#1b6b47] flex-shrink-0 mt-0.5" />
                      ) : (
                        <ShieldAlert className="h-8 w-8 text-[#c44d31] flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className={`text-base font-serif font-bold ${
                            criminalRecords.totalCases === 0 ? 'text-[#1b6b47]' : 'text-[#c44d31]'
                          }`}>
                            {criminalRecords.totalCases === 0
                              ? 'Clean Judicial Record: 0 Sworn Criminal Charges'
                              : `${criminalRecords.totalCases} Declared Judicial / Agitation Records`}
                          </h4>
                          {criminalRecords.convicted ? (
                            <span className="border border-[#c44d31] bg-[#c44d31] text-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-xs">
                              Conviction Reported
                            </span>
                          ) : (
                            <span className="border border-[#1b6b47]/40 bg-[#1b6b47]/10 text-[#1b6b47] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-xs">
                              Zero Convictions
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-xs text-[#2c2925] leading-relaxed">
                          {criminalRecords.totalCases === 0
                            ? 'The Member has sworn zero pending FIRs, chargesheets, or criminal court trials under Form 26 / ECI guidelines and Section 8 of the Representation of the People Act 1951.'
                            : `ECI Form 26 sworn affidavit disclosures comprise ${currentCasesCount} current active matters (protests, political disputes, or inquiries) and ${previousCasesCount} historically disposed/discharged cases.`}
                        </p>
                      </div>
                    </div>

                    {/* Quick Metric Pills */}
                    <div className="flex sm:flex-col gap-2 shrink-0 self-start sm:self-auto">
                      <div className="border border-[#18181b]/15 bg-white px-3 py-1.5 rounded-xs text-center">
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-[#71717a]">Active Cases</span>
                        <span className="font-serif font-black text-sm text-[#c44d31]">{currentCasesCount}</span>
                      </div>
                      <div className="border border-[#18181b]/15 bg-white px-3 py-1.5 rounded-xs text-center">
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-[#71717a]">Disposed / Acquitted</span>
                        <span className="font-serif font-black text-sm text-[#1b6b47]">{previousCasesCount}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Filter and Categorization Bar */}
                {rawCases.length > 0 && (
                  <div className="border border-[#18181b]/15 bg-[#f1ede4]/60 p-3.5 space-y-3 rounded-xs">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#18181b]/10 pb-2.5">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#18181b] flex items-center gap-1.5">
                        <Filter className="h-3.5 w-3.5 text-[#c44d31]" />
                        Filter Cases by Temporal & Judicial Status
                      </span>
                      <span className="text-[10px] text-[#71717a] font-mono">
                        Showing {filteredCases.length} of {rawCases.length} recorded proceedings
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {/* Temporal Filter */}
                      <div className="flex items-center gap-1 bg-white p-1 border-2 border-[#18181b]/30 rounded-xs shadow-2xs">
                        <button
                          type="button"
                          onClick={() => setLegalTemporalFilter('all')}
                          className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider transition rounded-xs cursor-pointer ${
                            legalTemporalFilter === 'all'
                              ? 'bg-[#18181b] text-white shadow-xs'
                              : 'text-[#18181b] hover:bg-[#18181b]/10'
                          }`}
                        >
                          All ({rawCases.length})
                        </button>
                        <button
                          type="button"
                          onClick={() => setLegalTemporalFilter('Current')}
                          className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider transition rounded-xs cursor-pointer ${
                            legalTemporalFilter === 'Current'
                              ? 'bg-[#c44d31] text-white shadow-xs'
                              : 'text-[#c44d31] hover:bg-[#c44d31]/10 font-bold'
                          }`}
                        >
                          Current Active ({currentCasesCount})
                        </button>
                        <button
                          type="button"
                          onClick={() => setLegalTemporalFilter('Previous')}
                          className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider transition rounded-xs cursor-pointer ${
                            legalTemporalFilter === 'Previous'
                              ? 'bg-[#1b6b47] text-white shadow-xs'
                              : 'text-[#1b6b47] hover:bg-[#1b6b47]/10 font-bold'
                          }`}
                        >
                          Disposed / Previous ({previousCasesCount})
                        </button>
                      </div>

                      {/* Seriousness Filter */}
                      <div className="flex items-center gap-1 bg-white p-1 border-2 border-[#18181b]/30 rounded-xs shadow-2xs">
                        <button
                          type="button"
                          onClick={() => setLegalSeriousnessFilter('all')}
                          className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider transition rounded-xs cursor-pointer ${
                            legalSeriousnessFilter === 'all'
                              ? 'bg-[#18181b] text-white shadow-xs'
                              : 'text-[#18181b] hover:bg-[#18181b]/10'
                          }`}
                        >
                          All Offence Types
                        </button>
                        <button
                          type="button"
                          onClick={() => setLegalSeriousnessFilter('serious')}
                          className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider transition rounded-xs cursor-pointer ${
                            legalSeriousnessFilter === 'serious'
                              ? 'bg-[#c44d31] text-white shadow-xs'
                              : 'text-[#c44d31] hover:bg-[#c44d31]/10 font-bold'
                          }`}
                        >
                          Serious Only ({seriousCount})
                        </button>
                        <button
                          type="button"
                          onClick={() => setLegalSeriousnessFilter('non-serious')}
                          className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider transition rounded-xs cursor-pointer ${
                            legalSeriousnessFilter === 'non-serious'
                              ? 'bg-[#2c2925] text-white shadow-xs'
                              : 'text-[#18181b] hover:bg-[#18181b]/10'
                          }`}
                        >
                          Political / Agitation ({rawCases.length - seriousCount})
                        </button>
                      </div>
                    </div>

                    {/* Case Type Tags */}
                    {availableTypes.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-[#71717a] mr-1">
                          Category:
                        </span>
                        <button
                          type="button"
                          onClick={() => setLegalTypeFilter('all')}
                          className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider border rounded-xs transition ${
                            legalTypeFilter === 'all'
                              ? 'border-[#18181b] bg-[#18181b] text-white'
                              : 'border-[#18181b]/15 bg-white text-[#71717a] hover:border-[#18181b]'
                          }`}
                        >
                          All Categories
                        </button>
                        {availableTypes.map((type, tIdx) => (
                          <button
                            key={tIdx}
                            type="button"
                            onClick={() => setLegalTypeFilter(type === legalTypeFilter ? 'all' : (type || 'all'))}
                            className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider border rounded-xs transition ${
                              legalTypeFilter === type
                                ? 'border-[#c44d31] bg-[#c44d31] text-white'
                                : 'border-[#18181b]/15 bg-white text-[#2c2925] hover:border-[#c44d31]'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Case Details Cards */}
                {filteredCases.length > 0 ? (
                  <div className="space-y-3.5">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-[#18181b] flex items-center gap-2">
                      <Gavel className="h-4 w-4 text-[#c44d31]" />
                      Itemized Legal Proceedings & Statutory Classifications
                    </h4>
                    
                    <div className="space-y-3">
                      {filteredCases.map((c, idx) => {
                        const isCurrent = c.temporalStatus === 'Current' || (!c.temporalStatus && !c.status.toLowerCase().includes('disposed') && !c.status.toLowerCase().includes('acquitted') && !c.status.toLowerCase().includes('quashed'));
                        
                        return (
                          <div
                            key={c.id || idx}
                            className="border border-[#18181b]/15 bg-white p-4 sm:p-5 space-y-3 shadow-2xs hover:border-[#18181b] transition rounded-xs"
                          >
                            {/* Card Top Row: Temporal Badge, Category, Court Level, Status */}
                            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#18181b]/10 pb-2.5">
                              <div className="flex flex-wrap items-center gap-1.5">
                                {/* Temporal Pill */}
                                <span className={`px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider border rounded-xs ${
                                  isCurrent
                                    ? 'border-[#c44d31]/40 bg-[#c44d31]/10 text-[#c44d31]'
                                    : 'border-[#1b6b47]/40 bg-[#1b6b47]/10 text-[#1b6b47]'
                                }`}>
                                  {c.temporalStatus ? `${c.temporalStatus} Case` : (isCurrent ? 'Current Case' : 'Previous Case')}
                                </span>

                                {/* Case Category */}
                                {c.caseType && (
                                  <span className="border border-[#18181b]/15 bg-[#f1ede4] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#18181b] rounded-xs">
                                    {c.caseType}
                                  </span>
                                )}

                                {/* Court Level */}
                                {c.courtLevel && (
                                  <span className="border border-[#18181b]/15 bg-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#71717a] rounded-xs">
                                    {c.courtLevel}
                                  </span>
                                )}

                                {/* Seriousness Tag */}
                                {c.isSerious ? (
                                  <span className="border border-[#c44d31] bg-[#c44d31] text-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-xs">
                                    Serious IPC
                                  </span>
                                ) : (
                                  <span className="border border-[#18181b]/15 bg-white text-[#71717a] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-xs">
                                    Agitation / Non-Serious
                                  </span>
                                )}
                              </div>

                              {/* Judicial Status Badge */}
                              <span className={`px-2.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider border rounded-xs ${
                                c.status.toLowerCase().includes('stayed')
                                  ? 'border-[#d97706]/40 bg-[#d97706]/10 text-[#d97706]'
                                  : c.status.toLowerCase().includes('acquitted') || c.status.toLowerCase().includes('disposed') || c.status.toLowerCase().includes('quashed')
                                  ? 'border-[#1b6b47]/40 bg-[#1b6b47]/10 text-[#1b6b47]'
                                  : 'border-[#c44d31]/40 bg-[#c44d31]/10 text-[#c44d31]'
                              }`}>
                                {c.status}
                              </span>
                            </div>

                            {/* Summary Headline & Case Details */}
                            <div>
                              {c.summaryTag && (
                                <h5 className="font-serif font-bold text-sm text-[#18181b] mb-1">
                                  {c.summaryTag}
                                </h5>
                              )}
                              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#71717a] mb-2 font-mono">
                                <span><strong>Case ID:</strong> {c.caseNumber}</span>
                                {c.yearFiled && <span><strong>Filed:</strong> {c.yearFiled}</span>}
                                {c.yearResolved && <span><strong>Resolved:</strong> {c.yearResolved}</span>}
                              </div>
                              <p className="text-xs text-[#2c2925] leading-relaxed">
                                {c.description}
                              </p>
                            </div>

                            {/* Court Forum */}
                            <div className="text-xs text-[#71717a] bg-[#faf9f6] p-2.5 border border-[#18181b]/10 rounded-xs flex items-start gap-2">
                              <Scale className="h-4 w-4 text-[#71717a] shrink-0 mt-0.5" />
                              <div>
                                <span className="font-bold text-[#18181b]">Jurisdictional Forum:</span> {c.court}
                              </div>
                            </div>

                            {/* Statutory Sections & BNS Modern Mapping */}
                            <div className="space-y-1.5 pt-1">
                              <div className="flex flex-wrap items-center gap-1.5">
                                <span className="text-[9px] font-bold uppercase tracking-wider text-[#71717a]">
                                  IPC / Special Law Sections:
                                </span>
                                {c.ipcSections.map((sec, sIdx) => (
                                  <span
                                    key={sIdx}
                                    className="border border-[#c44d31]/30 bg-[#c44d31]/10 px-2 py-0.5 text-[9px] font-mono font-bold text-[#c44d31] rounded-xs"
                                  >
                                    {sec}
                                  </span>
                                ))}
                              </div>

                              {/* BNS Equivalent Mapping */}
                              {c.bnsEquivalent && (
                                <div className="flex flex-wrap items-center gap-1.5">
                                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#1b6b47]">
                                    Bharatiya Nyaya Sanhita (BNS) Code:
                                  </span>
                                  <span className="border border-[#1b6b47]/30 bg-[#1b6b47]/10 px-2 py-0.5 text-[9px] font-mono font-bold text-[#1b6b47] rounded-xs">
                                    {c.bnsEquivalent}
                                  </span>
                                </div>
                              )}

                              {/* Comprehensive Tag Pills */}
                              {c.tags && c.tags.length > 0 && (
                                <div className="flex flex-wrap items-center gap-1 pt-1.5">
                                  <span className="text-[8px] font-bold uppercase tracking-widest text-[#71717a] mr-1">
                                    Tags:
                                  </span>
                                  {c.tags.map((tg, tgIdx) => (
                                    <span
                                      key={tgIdx}
                                      className="border border-[#18181b]/10 bg-[#f1ede4] px-1.5 py-0.5 text-[8px] font-mono text-[#2c2925] rounded-xs"
                                    >
                                      #{tg}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="border border-[#18181b]/15 bg-white p-8 text-center space-y-2 rounded-xs">
                    <CheckCircle2 className="h-8 w-8 text-[#1b6b47] mx-auto" />
                    <h5 className="font-serif font-bold text-sm text-[#18181b]">
                      No Records Match Selected Filter Criteria
                    </h5>
                    <p className="text-xs text-[#71717a] max-w-md mx-auto">
                      {rawCases.length === 0
                        ? 'No pending FIRs, chargesheets, or court trials reported in official ECI Form 26 filings.'
                        : 'Adjust or reset your temporal or category filters above to view other recorded proceedings.'}
                    </p>
                    {rawCases.length > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          setLegalTemporalFilter('all');
                          setLegalTypeFilter('all');
                          setLegalSeriousnessFilter('all');
                        }}
                        className="mt-2 border border-[#18181b] bg-[#18181b] text-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-xs hover:bg-black transition"
                      >
                        Reset All Filters
                      </button>
                    )}
                  </div>
                )}

                {/* ECI Affidavit Legal Framework Notice */}
                <div className="border border-[#18181b]/15 bg-[#faf9f6] p-4 text-xs text-[#71717a] space-y-1.5 rounded-xs">
                  <div className="flex items-center gap-2 text-[#18181b] font-bold uppercase tracking-wider text-[10px]">
                    <FileText className="h-3.5 w-3.5 text-[#c44d31]" />
                    Statutory Framework: ECI Form 26 & Section 8 of RPA 1951
                  </div>
                  <p className="text-[11px] leading-relaxed text-[#2c2925]">
                    Under Supreme Court directives (Union of India vs. ADR, 2002; Public Interest Foundation vs. UOI, 2018), every parliamentary candidate must disclose all pending cases where cognizance has been taken or charges framed by a competent court, as well as past convictions. Disqualification applies only upon conviction with imprisonment of 2 years or more under Section 8 of the Representation of the People Act 1951.
                  </p>
                </div>

              </div>
            );
          })()}

          {/* TAB 6: MAJOR INITIATIVES & LANDMARK LAWS */}
          {activeTab === 'initiatives' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#18181b] flex items-center gap-2">
                <Award className="h-4 w-4 text-[#c44d31]" />
                Landmark Policy Reforms, Flagship Laws & Schemes
              </h4>
              <div className="grid grid-cols-1 gap-3 sm:gap-4">
                {majorInitiatives.map((initiative, idx) => (
                  <div
                    key={idx}
                    className="border border-[#18181b]/15 bg-white p-4 sm:p-5 space-y-3 shadow-2xs hover:border-[#18181b] transition rounded-xs"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="border border-[#18181b] bg-[#18181b] text-white px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-xs">
                          {initiative.year}
                        </span>
                        <span className="bg-[#f1ede4] border border-[#18181b]/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#18181b] rounded-xs">
                          {initiative.category}
                        </span>
                      </div>
                    </div>

                    <h5 className="text-sm sm:text-base font-serif font-bold text-[#18181b]">
                      {initiative.title}
                    </h5>

                    <p className="text-xs text-[#2c2925] leading-relaxed">
                      {initiative.description}
                    </p>

                    <div className="bg-[#faf9f6] p-2.5 sm:p-3 border border-[#18181b]/15 text-xs text-[#18181b] rounded-xs">
                      <strong className="text-[#c44d31] uppercase tracking-wider text-[9px]">National Impact: </strong> {initiative.impact}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: PUBLIC STATEMENTS */}
          {activeTab === 'statements' && (() => {
            const politicianStatements = VERIFIED_PUBLIC_STATEMENTS.filter(
              s => s.politicianId === politician.id || s.speakerName.toLowerCase() === politician.name.toLowerCase()
            );

            return (
              <div className="space-y-5 animate-in fade-in duration-150">
                <div className="border border-[#18181b]/15 bg-white p-4 sm:p-5 rounded-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-[#18181b] flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-[#c44d31]" />
                      Verified Public & Parliamentary Statements ({politicianStatements.length})
                    </h4>
                    <span className="text-[10px] font-mono text-[#71717a] bg-[#f1ede4] px-2 py-0.5 rounded border border-[#18181b]/10">
                      Primary Record Only
                    </span>
                  </div>
                  <p className="text-xs text-[#52525b] leading-relaxed">
                    Directly sourced quotes, parliamentary speeches, press conferences, and sworn submissions with exact dates, venues, and verifiable links. No subjective sentiment or unverified editorializing.
                  </p>
                </div>

                {politicianStatements.length > 0 ? (
                  <div className="space-y-3.5">
                    {politicianStatements.map((stmt) => (
                      <div
                        key={stmt.id}
                        className="border border-[#18181b]/15 bg-white p-4 sm:p-5 rounded-xs space-y-3 hover:border-[#18181b] transition shadow-2xs"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#18181b]/10 pb-2.5">
                          <div className="flex items-center gap-2">
                            <span className="bg-[#f1ede4] text-[#18181b] px-2.5 py-0.5 rounded text-[9.5px] font-bold uppercase tracking-wider border border-[#18181b]/15">
                              {stmt.topic}
                            </span>
                            <span className="text-xs text-[#71717a] font-mono">
                              {stmt.date}
                            </span>
                          </div>
                          <span className="text-[10px] font-medium text-[#71717a]">
                            Venue: <strong className="text-[#18181b]">{stmt.venue}</strong>
                          </span>
                        </div>

                        <blockquote className="font-serif text-sm sm:text-base text-[#18181b] italic leading-relaxed pl-3 border-l-2 border-[#c44d31]">
                          "{stmt.directQuote}"
                        </blockquote>

                        <div className="bg-[#faf9f6] p-3 rounded-xs border border-[#18181b]/10 text-xs text-[#52525b] space-y-1">
                          <p><strong className="text-[#18181b]">Context & Occasion:</strong> {stmt.contextSummary}</p>
                          <p><strong className="text-[#18181b]">Source Type:</strong> {stmt.quoteType}</p>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                          <span className="text-[10.5px] text-[#71717a]">
                            Source: <strong className="text-[#18181b]">{stmt.sourceLabel}</strong> ({stmt.officialSourceType})
                          </span>
                          <a
                            href={stmt.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-bold text-[#c44d31] hover:underline"
                          >
                            <span>Verify Source Record</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="border border-[#18181b]/15 bg-white p-8 text-center rounded-xs space-y-2">
                    <Info className="h-6 w-6 text-[#71717a] mx-auto" />
                    <h5 className="font-serif font-bold text-sm text-[#18181b]">
                      No Archive Statements Currently Tagged
                    </h5>
                    <p className="text-xs text-[#71717a] max-w-md mx-auto">
                      Statements for this leader are currently undergoing standard multi-source cross-verification before publication.
                    </p>
                  </div>
                )}
              </div>
            );
          })()}

          {/* TAB: SOURCES & METHODOLOGY AUDIT */}
          {activeTab === 'sources' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="border border-[#18181b]/15 bg-white p-4 sm:p-5 rounded-xs space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#18181b] flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-emerald-700" />
                  Primary Official Sources & Calculation Standards
                </h4>
                <p className="text-xs text-[#52525b] leading-relaxed">
                  Every statistic in this dossier is anchored to official government gazettes, sworn election affidavits, or parliamentary hansard recordings.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="border border-[#18181b]/15 bg-white p-4 rounded-xs space-y-2">
                  <h5 className="font-serif font-bold text-xs text-[#18181b] flex items-center justify-between">
                    <span>1. Sansad / Lok Sabha Hansard</span>
                    <ExternalLink className="h-3.5 w-3.5 text-[#71717a]" />
                  </h5>
                  <p className="text-[11px] text-[#52525b]">
                    House attendance registers, official debate verbatim transcripts, starred/unstarred questions, and private member legislative papers.
                  </p>
                  <a
                    href="https://sansad.in/ls"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-[11px] font-mono text-[#c44d31] font-bold hover:underline"
                  >
                    sansad.in/ls →
                  </a>
                </div>

                <div className="border border-[#18181b]/15 bg-white p-4 rounded-xs space-y-2">
                  <h5 className="font-serif font-bold text-xs text-[#18181b] flex items-center justify-between">
                    <span>2. Election Commission of India (ECI)</span>
                    <ExternalLink className="h-3.5 w-3.5 text-[#71717a]" />
                  </h5>
                  <p className="text-[11px] text-[#52525b]">
                    Form 26 sworn affidavits, movable/immovable assets disclosure, liabilities, educational proof, and pending judicial cases.
                  </p>
                  <a
                    href="https://affidavit.eci.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-[11px] font-mono text-[#c44d31] font-bold hover:underline"
                  >
                    affidavit.eci.gov.in →
                  </a>
                </div>

                <div className="border border-[#18181b]/15 bg-white p-4 rounded-xs space-y-2">
                  <h5 className="font-serif font-bold text-xs text-[#18181b] flex items-center justify-between">
                    <span>3. MoSPI MPLADS Portal</span>
                    <ExternalLink className="h-3.5 w-3.5 text-[#71717a]" />
                  </h5>
                  <p className="text-[11px] text-[#52525b]">
                    Ministry of Statistics and Programme Implementation constituency development fund sanctions, expenditures, and work status.
                  </p>
                  <a
                    href="https://mplads.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-[11px] font-mono text-[#c44d31] font-bold hover:underline"
                  >
                    mplads.gov.in →
                  </a>
                </div>

                <div className="border border-[#18181b]/15 bg-white p-4 rounded-xs space-y-2">
                  <h5 className="font-serif font-bold text-xs text-[#18181b] flex items-center justify-between">
                    <span>4. e-Courts National Judicial Data Grid</span>
                    <ExternalLink className="h-3.5 w-3.5 text-[#71717a]" />
                  </h5>
                  <p className="text-[11px] text-[#52525b]">
                    Court case numbers, FIR records, IPC/BNS sections, and judicial status of proceedings declared in candidate affidavits.
                  </p>
                  <a
                    href="https://ecourts.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-[11px] font-mono text-[#c44d31] font-bold hover:underline"
                  >
                    ecourts.gov.in →
                  </a>
                </div>
              </div>

              {/* Data Limitations Note */}
              <div className="border border-[#18181b]/15 bg-[#faf9f6] p-4 rounded-xs text-xs space-y-2 text-[#52525b]">
                <h5 className="font-bold text-[#18181b] uppercase text-[10px] tracking-wider">
                  Important Data Limitations & Role Context
                </h5>
                <ul className="list-disc pl-4 space-y-1 text-[11px]">
                  <li><strong>Union Ministers & Presiding Officers:</strong> Under parliamentary conventions, Cabinet Ministers and Ministers of State do not ask questions or introduce Private Member Bills; their interventions occur via government business and replies.</li>
                  <li><strong>Reporting Coverage:</strong> Parliamentary records cover the 18th Lok Sabha (June 2024 to present) unless marked historical.</li>
                  <li><strong>Asset Valuations:</strong> Financial numbers reflect declared market value at the time of nomination filing under ECI Form 26.</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 7: NEWS & INTELLIGENCE FEED */}
          {activeTab === 'news' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#18181b] flex items-center gap-2">
                <Newspaper className="h-4 w-4 text-[#c44d31]" />
                Curated News & Parliamentary Statements
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {news.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col justify-between border border-[#18181b]/15 bg-white p-4 sm:p-5 shadow-2xs hover:border-[#18181b] transition rounded-xs"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-[#71717a]">
                        <span className="font-bold text-[#18181b] uppercase tracking-wider text-[9px]">{item.source}</span>
                        <span>{item.date}</span>
                      </div>

                      <h5 className="text-xs sm:text-sm font-serif font-bold text-[#18181b] line-clamp-2 leading-snug">
                        {item.title}
                      </h5>

                      <p className="text-xs text-[#52525b] leading-relaxed line-clamp-3">
                        {item.summary}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-[#18181b]/10 pt-3">
                      <span className={`text-[8px] sm:text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 border rounded-xs ${
                        item.sentiment === 'positive'
                          ? 'bg-emerald-50 text-[#1b6b47] border-emerald-200'
                          : item.sentiment === 'critical'
                          ? 'bg-rose-50 text-[#c44d31] border-rose-200'
                          : 'bg-[#f1ede4] text-[#18181b] border-[#18181b]/15'
                      }`}>
                        {item.sentiment}
                      </span>

                      <span className="text-xs text-[#c44d31] font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer hover:underline">
                        Read Story <ArrowUpRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          </div>

          {/* Modal Footer Bar (Inside scroll container - appears when scrolled to bottom) */}
          <div className="border-t-2 border-[#18181b]/20 bg-[#e8e4da] px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 mt-auto flex-shrink-0">
            <div className="flex items-center gap-2 text-xs text-[#18181b] font-medium">
              <span className="h-2.5 w-2.5 rounded-full bg-[#1b6b47]" />
              <span>Form 26 Affidavits & Lok Sabha Gazette Validated</span>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={() => onOpenCompareWith(politician)}
                className="flex-1 sm:flex-initial border-2 border-[#18181b] bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#18181b] hover:bg-[#18181b] hover:text-white transition shadow-xs rounded-xs min-h-[40px] cursor-pointer"
              >
                Compare with Another Leader
              </button>
              <button
                onClick={onClose}
                className="border-2 border-[#18181b] bg-[#18181b] px-5 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#c44d31] hover:border-[#c44d31] transition shadow-xs rounded-xs min-h-[40px] cursor-pointer"
              >
                Close Dossier
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Full Share & Social Media Broadcast Dialog */}
      <ShareDossierModal
        politician={politician}
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        initialCopied={copiedLink}
      />
    </div>
  );
};

// Helper SVG icon
function UserCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="10" r="3" />
      <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
    </svg>
  );
}
