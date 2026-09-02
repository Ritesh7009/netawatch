import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowUp, 
  ArrowDown, 
  ArrowUpRight, 
  Sparkles, 
  ShieldCheck, 
  Scale, 
  ExternalLink,
  Flame,
  CheckCircle2,
  TrendingUp,
  UserCheck,
  AlertCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Politician, ViewMode } from '../types';
import { PoliticianImage } from './PoliticianImage';

interface MPNewsDialDeckProps {
  politicians: Politician[];
  onSelectPolitician: (politician: Politician) => void;
  onNavigateToView: (view: ViewMode) => void;
}

interface MPNewsItem {
  id: string;
  mpId: string;
  timeAgo: string;
  tag: string;
  title: string;
  category: string;
  summary: string;
  statLabel: string;
  statValue: string;
  secondaryStat: string;
  keyVerdict: string;
  accentColor: string;
  externalUrl?: string;
}

export const MPNewsDialDeck: React.FC<MPNewsDialDeckProps> = ({
  politicians,
  onSelectPolitician,
  onNavigateToView,
}) => {
  // Find matching politician records from the database
  const newsItems: MPNewsItem[] = useMemo(() => [
    {
      id: 'news-modi',
      mpId: 'narendra-modi',
      timeAgo: '1 DAY AGO',
      tag: 'CABINET 3.0 PLEDGES',
      title: 'Narendra Modi 100-Day Infrastructure Tracker & 100% Attendance',
      category: 'EXECUTIVE MILESTONES & MANIFESTO PLEDGES',
      summary: 'Reviewing 100-day economic corridors, semiconductor fabrication units, and 100% Varanasi parliamentary session presence.',
      statLabel: 'Total Disclosed Assets',
      statValue: '₹3.02 Cr',
      secondaryStat: '100% Attendance',
      keyVerdict: '0 Criminal Charges',
      accentColor: '#f97316',
      externalUrl: 'https://sansad.in/ls/members',
    },
    {
      id: 'news-rahul',
      mpId: 'rahul-gandhi',
      timeAgo: '2 DAYS AGO',
      tag: 'LEADER OF OPPOSITION',
      title: 'Rahul Gandhi Leader of Opposition Hansard Debates & Caste Census Audit',
      category: 'PARLIAMENTARY SCRUTINY & DEFAMATION STAY AUDIT',
      summary: 'Active leadership in 18th Lok Sabha debates on NEET irregularity inquiries and national socio-economic survey demands.',
      statLabel: 'Total Disclosed Assets',
      statValue: '₹20.4 Cr',
      secondaryStat: '38 Speeches in 18th LS',
      keyVerdict: '18 Defamation Cases (Stayed)',
      accentColor: '#0ea5e9',
      externalUrl: 'https://prsindia.org/mptrack',
    },
    {
      id: 'news-amit-shah',
      mpId: 'amit-shah',
      timeAgo: '3 DAYS AGO',
      tag: 'BNS JUDICIAL REFORM',
      title: 'Amit Shah Bharatiya Nyaya Sanhita & 60,000 PACS Cloud Rollout',
      category: 'UNION HOME AFFAIRS & LEGISLATIVE AUDIT',
      summary: 'Implementation oversight of new forensic-mandated criminal codes and full cloud enterprise software integration for rural societies.',
      statLabel: 'Total Disclosed Assets',
      statValue: '₹36.7 Cr',
      secondaryStat: '92% Attendance',
      keyVerdict: 'Special CBI Court Discharged',
      accentColor: '#f97316',
      externalUrl: 'https://sansad.in/ls/members',
    },
    {
      id: 'news-supriya-sule',
      mpId: 'supriya-sule',
      timeAgo: '4 DAYS AGO',
      tag: 'SANSAD RATNA RECORD',
      title: 'Supriya Sule Best Parliamentarian & Kinship Matrix Disclosure',
      category: 'PARLIAMENTARY EXCELLENCE & ASSET AUDIT',
      summary: 'Top-tier parliamentary participation with 96% session attendance and 168 debates logged in the 17th-18th Lok Sabha.',
      statLabel: 'Family Total Assets',
      statValue: '₹166.5 Cr',
      secondaryStat: '96% Attendance',
      keyVerdict: '8-Time Sansad Ratna Winner',
      accentColor: '#10b981',
      externalUrl: 'https://prsindia.org/mptrack',
    },
    {
      id: 'news-mahua-moitra',
      mpId: 'mahua-moitra',
      timeAgo: '5 DAYS AGO',
      tag: 'LEGAL SCRUTINY',
      title: 'Mahua Moitra Krishnanagar Re-Election & Ethics Committee Ledger',
      category: 'AFFIDAVIT DISCLOSURE & CASE LEDGER',
      summary: 'Sworn Form 26 electoral affidavit verification and Delhi High Court legal status tracking post-electoral victory.',
      statLabel: 'Total Disclosed Assets',
      statValue: '₹3.5 Cr',
      secondaryStat: '86% Attendance',
      keyVerdict: '0 Active Convictions',
      accentColor: '#14b8a6',
      externalUrl: 'https://services.ecourts.gov.in/',
    },
    {
      id: 'news-asaduddin-owaisi',
      mpId: 'asaduddin-owaisi',
      timeAgo: '6 DAYS AGO',
      tag: 'CONSTITUTIONAL AUDIT',
      title: 'Asaduddin Owaisi 5th Term Waqf Bill Hansard Record & Dissent',
      category: 'CONSTITUTIONAL SCRUTINY & MINORITY ADVOCACY',
      summary: 'Detailed scrutiny of parliamentary interventions, private member bills, and constitutional committee dissents.',
      statLabel: 'Total Disclosed Assets',
      statValue: '₹19.8 Cr',
      secondaryStat: '89% Attendance',
      keyVerdict: '5 Serious IPC Protest Charges (Bailed)',
      accentColor: '#059669',
      externalUrl: 'https://sansad.in/ls/members',
    },
    {
      id: 'news-shashi-tharoor',
      mpId: 'shashi-tharoor',
      timeAgo: '1 WEEK AGO',
      tag: 'COMMITTEE CHAIR',
      title: 'Shashi Tharoor Standing Committee on External Affairs 4th Term Record',
      category: 'FOREIGN AFFAIRS & POLICY INITIATIVES',
      summary: 'Directing parliamentary scrutiny on diplomatic pacts, cross-border commerce treaties, and authoring 8 private member bills.',
      statLabel: 'Total Disclosed Assets',
      statValue: '₹55.3 Cr',
      secondaryStat: '92% Attendance',
      keyVerdict: 'All Criminal Allegations Quashed',
      accentColor: '#3b82f6',
      externalUrl: 'https://sansad.in/ls/members',
    },
  ], []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1); // 1 = up/next, -1 = down/prev
  const [isHovered, setIsHovered] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Mobile Touch Swipe Handling
  const touchStartY = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const totalItems = newsItems.length;

  // Next and Prev handlers
  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  }, [totalItems]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  }, [totalItems]);

  const handleJumpToIndex = (idx: number) => {
    if (idx === currentIndex) return;
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null || touchStartX.current === null) return;
    const diffY = e.changedTouches[0].clientY - touchStartY.current;
    const diffX = e.changedTouches[0].clientX - touchStartX.current;

    // Detect vertical or horizontal swipe
    if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 40) {
      if (diffY < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    } else if (Math.abs(diffX) > 50) {
      if (diffX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartY.current = null;
    touchStartX.current = null;
  };

  // Auto-slide interval when not hovered
  useEffect(() => {
    if (!isAutoPlay || isHovered) return;
    const timer = setInterval(() => {
      handleNext();
    }, 4500);
    return () => clearInterval(timer);
  }, [isAutoPlay, isHovered, handleNext]);

  const currentNews = newsItems[currentIndex];

  // Resolve matching politician object from database
  const matchingPolitician = useMemo(() => {
    return (
      politicians.find((p) => p.id === currentNews.mpId) ||
      politicians.find((p) => p.name.toLowerCase().includes(currentNews.mpId.replace('-', ' '))) ||
      politicians[0]
    );
  }, [politicians, currentNews.mpId]);

  // Framer motion variants for vertical dial flip matching the video
  const slideVariants = {
    enter: (dir: number) => ({
      y: dir > 0 ? 60 : -60,
      opacity: 0,
      scale: 0.96,
      filter: 'blur(3px)',
    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        y: { type: 'spring', stiffness: 340, damping: 28 },
        opacity: { duration: 0.25 },
        scale: { duration: 0.25 },
        filter: { duration: 0.25 },
      },
    },
    exit: (dir: number) => ({
      y: dir > 0 ? -60 : 60,
      opacity: 0,
      scale: 0.96,
      filter: 'blur(3px)',
      transition: {
        y: { type: 'spring', stiffness: 340, damping: 28 },
        opacity: { duration: 0.22 },
        scale: { duration: 0.22 },
        filter: { duration: 0.22 },
      },
    }),
  };

  const handleCardClick = () => {
    if (matchingPolitician) {
      onSelectPolitician(matchingPolitician);
    } else {
      onNavigateToView('table');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full py-10 sm:py-20 bg-[#faf8f5] border-b border-[#18181b]/15 flex items-center justify-center overflow-hidden relative select-none px-3 sm:px-6">
      
      {/* Background Ambient Guideline */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-20">
        <div className="w-[1400px] h-[1400px] rounded-full border border-dashed border-[#18181b]/30" />
      </div>

      {/* Giant Circular / Rounded Responsive Arena Matching the Video */}
      <div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-full max-w-[940px] rounded-[24px] xs:rounded-[32px] sm:rounded-[48px] md:rounded-full bg-[#18181b] relative flex flex-col items-center justify-between p-3 xs:p-4 sm:p-8 md:p-10 shadow-2xl overflow-hidden text-white border border-[#27272a] z-10 min-h-[460px] xs:min-h-[500px] sm:min-h-[640px] md:min-h-[700px]"
      >
        
        {/* Subtle Radial Glow in Center */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(180,248,44,0.08)_0%,transparent_70%)]" />

        {/* 1. TOP HEADER: Latest Updates from NetaWatch Newsroom */}
        <div className="text-center space-y-2 z-20 pt-1 sm:pt-4 w-full">
          <div>
            <span className="text-[11px] sm:text-sm font-medium text-zinc-300 tracking-tight block uppercase">
              Latest updates
            </span>
            <span className="text-base sm:text-xl font-black text-[#b4f82c] tracking-tight flex items-center justify-center gap-1.5 font-serif">
              <span>from 18th Lok Sabha Newsroom</span>
            </span>
          </div>

          {/* Interactive Arrow Dial Button & Controls */}
          <div className="flex items-center justify-center gap-3 pt-1">
            <button
              onClick={handlePrev}
              className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-zinc-800 text-zinc-300 hover:bg-[#b4f82c] hover:text-[#18181b] transition-all duration-200 flex items-center justify-center shadow-md cursor-pointer group active:scale-95 border border-zinc-700 sm:hidden"
              title="Previous MP news"
            >
              <ChevronLeft className="h-4 w-4 stroke-[2.5]" />
            </button>

            <button
              onClick={handleNext}
              className="h-9 w-9 sm:h-11 sm:w-11 rounded-full bg-white text-[#18181b] hover:bg-[#b4f82c] transition-all duration-300 flex items-center justify-center shadow-lg cursor-pointer group active:scale-95"
              title="Click to view next MP news audit"
            >
              <ArrowUp className="h-4 w-4 sm:h-5 sm:w-5 stroke-[2.5] group-hover:-translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={handleNext}
              className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-zinc-800 text-zinc-300 hover:bg-[#b4f82c] hover:text-[#18181b] transition-all duration-200 flex items-center justify-center shadow-md cursor-pointer group active:scale-95 border border-zinc-700 sm:hidden"
              title="Next MP news"
            >
              <ChevronRight className="h-4 w-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* 2. CENTER STAGE: VIBRANT LIME CARD DECK (Mobile-refined layout + Touch support) */}
        <div 
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative w-full max-w-[760px] my-auto py-2 z-20 flex items-center justify-center"
        >
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentNews.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              onClick={handleCardClick}
              className="w-full bg-[#b4f82c] text-[#18181b] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl flex flex-col justify-between relative overflow-hidden border-2 border-[#9ae600] cursor-pointer group transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              
              {/* Top Row: Pill Badges + External Link Prompt */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                  <span className="bg-black/10 border border-black/20 text-[#18181b] font-mono text-[8px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap">
                    {currentNews.timeAgo}
                  </span>
                  <span className="bg-[#18181b] text-white font-mono text-[8px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-2xs whitespace-nowrap">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#b4f82c] animate-pulse" />
                    {currentNews.tag}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {currentNews.externalUrl && (
                    <a
                      href={currentNews.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      title="Open verified source records"
                      className="flex items-center gap-1 text-[9px] sm:text-[10px] font-mono font-bold text-[#18181b] bg-black/10 hover:bg-black/20 px-2 py-0.5 rounded-full border border-black/15 transition cursor-pointer"
                    >
                      <ExternalLink className="h-3 w-3" />
                      <span className="hidden xs:inline">Source</span>
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick();
                    }}
                    className="flex items-center gap-1 text-[10px] sm:text-[11px] font-mono font-bold text-[#18181b] bg-black/10 hover:bg-black/20 px-2.5 py-1 rounded-full border border-black/15 group-hover:translate-x-0.5 transition-all cursor-pointer shadow-xs"
                  >
                    <span>Open Dossier</span>
                    <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[2.5]" />
                  </button>
                </div>
              </div>

              {/* Main Content Body: Responsive Grid on tablet/desktop, stacked on mobile */}
              <div className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-12 sm:gap-4 items-center my-auto">
                
                {/* Text Content Column */}
                <div className="sm:col-span-7 space-y-1.5 sm:space-y-2">
                  <h3 className="font-serif font-black text-lg sm:text-xl md:text-[24px] leading-tight text-[#18181b] tracking-tight line-clamp-2">
                    {currentNews.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs md:text-sm text-[#18181b]/85 line-clamp-2 leading-relaxed font-medium">
                    {currentNews.summary}
                  </p>
                </div>

                {/* Embedded MP Quick Scrutiny Preview Card */}
                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick();
                  }}
                  className="sm:col-span-5 bg-[#18181b] text-white p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border border-black/20 shadow-xl flex items-center gap-2.5 sm:gap-3 cursor-pointer hover:border-[#b4f82c]/40 transition-colors"
                >
                  {/* MP Photo Thumbnail */}
                  <div className="relative shrink-0">
                    <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-xl overflow-hidden border border-white/20 bg-zinc-800">
                      <PoliticianImage
                        src={matchingPolitician?.photo || ''}
                        alt={matchingPolitician?.name || ''}
                        name={matchingPolitician?.name || ''}
                        partyColor={matchingPolitician?.partyColor}
                        constituency={matchingPolitician?.constituency}
                        state={matchingPolitician?.state}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span 
                      style={{ backgroundColor: matchingPolitician?.partyColor || '#f97316' }}
                      className="absolute -bottom-1 -right-1 text-[7px] sm:text-[8px] font-mono font-black text-white px-1 py-0.2 rounded shadow-xs uppercase"
                    >
                      {matchingPolitician?.partyAbbr || 'MP'}
                    </span>
                  </div>

                  {/* Micro Info Stats */}
                  <div className="min-w-0 flex-1 space-y-0.5 sm:space-y-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] sm:text-[11px] font-bold text-white truncate">
                        {matchingPolitician?.name}
                      </span>
                      <span className="text-[8px] sm:text-[9px] font-mono text-[#b4f82c] font-bold shrink-0">
                        {currentNews.secondaryStat}
                      </span>
                    </div>

                    <div className="text-[9px] sm:text-[10px] font-mono text-zinc-400 truncate">
                      {currentNews.statLabel}: <span className="font-bold text-white">{currentNews.statValue}</span>
                    </div>

                    <div className="text-[8px] sm:text-[9px] font-mono text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/30 truncate flex items-center gap-1">
                      <CheckCircle2 className="h-2.5 w-2.5 shrink-0" />
                      <span className="truncate">{currentNews.keyVerdict}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom Card Footer: Category Label */}
              <div className="flex items-center justify-between border-t border-black/15 pt-2 mt-3">
                <span className="font-mono text-[9px] sm:text-[11px] font-bold uppercase tracking-wider text-[#18181b]/75 truncate max-w-[240px] sm:max-w-none">
                  {currentNews.category}
                </span>

                <div className="flex items-center gap-1 text-[9px] sm:text-[10px] font-mono font-bold text-[#18181b]/60 shrink-0">
                  <span>{currentIndex + 1} / {totalItems}</span>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* 3. VERTICAL DASH INDICATORS (Desktop: Right side, Mobile: Bottom row) */}
        <div className="hidden sm:flex absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 flex-col gap-2 z-20">
          {newsItems.map((_, idx) => {
            const isActive = currentIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => handleJumpToIndex(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  isActive
                    ? 'w-6 h-1.5 bg-[#b4f82c] shadow-[0_0_8px_rgba(180,248,44,0.8)]'
                    : 'w-3 h-1 bg-zinc-600 hover:bg-zinc-400'
                }`}
                title={`Jump to news ${idx + 1}`}
              />
            );
          })}
        </div>

        {/* Mobile Horizontal Navigation Pills */}
        <div className="flex sm:hidden items-center justify-center gap-1.5 z-20 py-2">
          {newsItems.map((_, idx) => {
            const isActive = currentIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => handleJumpToIndex(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  isActive
                    ? 'w-5 h-1.5 bg-[#b4f82c] shadow-[0_0_8px_rgba(180,248,44,0.8)]'
                    : 'w-2 h-1 bg-zinc-600'
                }`}
                title={`Jump to news ${idx + 1}`}
              />
            );
          })}
        </div>

        {/* 4. BOTTOM SCRIPT / CURSIVE FOOTER (Matching the video text) */}
        <div className="text-center z-20 pb-1 sm:pb-3 px-2">
          <p className="font-serif italic text-xs sm:text-base text-[#b4f82c] tracking-wide font-medium opacity-95">
            New investigative updates & Hansard audits added every week!
          </p>
        </div>

      </div>

    </section>
  );
};

