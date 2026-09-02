import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'motion/react';
import { 
  Landmark, 
  Scale, 
  GitFork, 
  Users, 
  ChevronLeft, 
  ChevronRight,
  TrendingUp,
  FileText,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Share2,
  ExternalLink,
  Layers
} from 'lucide-react';
import { Politician, ViewMode } from '../types';
import { PoliticianImage } from './PoliticianImage';
import { PillTabNav } from './PillTabNav';

interface ArcCardItem {
  id: string;
  tabLabel: string;
  badge: string;
  title: string;
  subtitle: string;
  bgColor: string;
  textColor: string;
  subtextColor: string;
  buttonBg: string;
  buttonText: string;
  borderColor: string;
  politician?: Politician;
  viewTarget?: ViewMode;
  externalUrl?: string;
  externalLabel?: string;
  graphicType: 'vault' | 'lime-chart' | 'buttons' | 'easings' | 'icons' | 'community';
}

interface NetaWatchArcDeckProps {
  politicians: Politician[];
  onSelectPolitician: (p: Politician) => void;
  onNavigateToView: (view: ViewMode) => void;
  onOpenAllIndiaDirectory: () => void;
}

export const NetaWatchArcDeck: React.FC<NetaWatchArcDeckProps> = ({
  politicians,
  onSelectPolitician,
  onNavigateToView,
  onOpenAllIndiaDirectory,
}) => {
  const modi = politicians.find((p) => p.id === 'narendra-modi') || politicians[0];
  const rahul = politicians.find((p) => p.id === 'rahul-gandhi') || politicians[1];
  const dkSuresh = politicians.find((p) => p.id === 'dk-suresh') || politicians[2];
  const supriya = politicians.find((p) => p.id === 'supriya-sule') || politicians[4];

  // 6 Spotlight Cards modeled exactly after the video layout and civic intelligence domain
  const deckItems: ArcCardItem[] = [
    {
      id: 'the-vault',
      tabLabel: 'The Vault',
      badge: 'PART OF CIVIC AUDIT',
      title: 'The Vault',
      subtitle: 'Our central intelligence dashboard tracking 543 Lok Sabha MPs, sworn affidavits, and judicial records.',
      bgColor: '#141415',
      textColor: '#FFFFFF',
      subtextColor: '#A1A1AA',
      buttonBg: '#FFFFFF',
      buttonText: '#141415',
      borderColor: 'border-white/15',
      viewTarget: 'grid',
      externalUrl: 'https://sansad.in/ls/members',
      externalLabel: 'Sansad.in Official Directory',
      graphicType: 'vault',
    },
    {
      id: 'asset-velocity',
      tabLabel: 'Asset Velocity',
      badge: 'PART OF CIVIC AUDIT',
      title: 'Asset Velocity',
      subtitle: 'Real-time analysis tracking multi-term net-worth surges, real-estate portfolios, and affidavit disclosures.',
      bgColor: '#B9FF2F',
      textColor: '#111111',
      subtextColor: '#2E3A08',
      buttonBg: '#111111',
      buttonText: '#FFFFFF',
      borderColor: 'border-[#A3EC1C]',
      politician: dkSuresh,
      viewTarget: 'nepotism-tracker',
      externalUrl: 'https://affidavit.eci.gov.in/',
      externalLabel: 'ECI Form 26 Sworn Affidavits',
      graphicType: 'lime-chart',
    },
    {
      id: 'parliament-pulse',
      tabLabel: 'Parliament Pulse',
      badge: 'PART OF CIVIC AUDIT',
      title: 'Parliament Pulse',
      subtitle: 'Official Lok Sabha Hansard registry tracking voting participation, private member bills, and debates.',
      bgColor: '#18181B',
      textColor: '#FFFFFF',
      subtextColor: '#A1A1AA',
      buttonBg: '#FFFFFF',
      buttonText: '#18181B',
      borderColor: 'border-white/15',
      politician: modi,
      viewTarget: 'analytics',
      externalUrl: 'https://prsindia.org/mptrack',
      externalLabel: 'PRS Legislative Research Hansard',
      graphicType: 'buttons',
    },
    {
      id: 'cases-ledger',
      tabLabel: 'Cases Ledger',
      badge: 'PART OF CIVIC AUDIT',
      title: 'Cases Ledger',
      subtitle: 'Sworn election disclosures covering 251 MPs with active IPC / BNS criminal charges and judicial proceedings.',
      bgColor: '#EDEDED',
      textColor: '#18181B',
      subtextColor: '#52525B',
      buttonBg: '#18181B',
      buttonText: '#FFFFFF',
      borderColor: 'border-[#D4D4D0]',
      politician: rahul,
      viewTarget: 'legal-registry',
      externalUrl: 'https://services.ecourts.gov.in/',
      externalLabel: 'National eCourts Services Registry',
      graphicType: 'easings',
    },
    {
      id: 'dynasty-radar',
      tabLabel: 'Dynasty Radar',
      badge: 'PART OF CIVIC AUDIT',
      title: 'Dynasty Radar',
      subtitle: 'Multi-generational political mapping tracking succession, ministerial berths, and asset velocity correlation.',
      bgColor: '#101012',
      textColor: '#FFFFFF',
      subtextColor: '#A1A1AA',
      buttonBg: '#FFFFFF',
      buttonText: '#101012',
      borderColor: 'border-white/15',
      politician: supriya,
      viewTarget: 'nepotism-tracker',
      externalUrl: 'https://myneta.info/',
      externalLabel: 'ADR MyNeta National Audit',
      graphicType: 'icons',
    },
    {
      id: 'community',
      tabLabel: 'Community',
      badge: 'PART OF CIVIC AUDIT',
      title: 'Community',
      subtitle: 'Connect with researchers, civic analysts, and citizens building transparent public accountability.',
      bgColor: '#5848F4',
      textColor: '#FFFFFF',
      subtextColor: '#E0DEFF',
      buttonBg: '#FFFFFF',
      buttonText: '#5848F4',
      borderColor: 'border-indigo-400/40',
      viewTarget: 'manifesto',
      externalUrl: 'https://sansad.in/ls',
      externalLabel: 'Parliament of India Portal',
      graphicType: 'community',
    },
  ];

  const totalCards = deckItems.length;

  // Continuous wheel position (float, loops infinitely)
  const [progress, setProgress] = useState(3); // Start on Cases Ledger
  const [targetProgress, setTargetProgress] = useState(3);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100, visible: false });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartXRef = useRef(0);
  const dragStartProgressRef = useRef(3);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const velocityRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const hasMovedRef = useRef(false);

  // Viewport & Scroll triggers for initial entrance
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'center center'],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    mass: 0.5,
  });

  const isInView = useInView(containerRef, {
    once: false,
    margin: '-40px 0px -40px 0px',
  });

  // Background radial dial rotation & scale linked to scroll
  const dialRotation = useTransform(smoothScroll, [0, 1], [-25, 0]);
  const dialScale = useTransform(smoothScroll, [0, 1], [0.85, 1]);
  const dialOpacity = useTransform(smoothScroll, [0, 0.6, 1], [0.1, 0.25, 0.35]);

  // Spring animation loop to smoothly glide progress toward targetProgress
  useEffect(() => {
    let current = progress;
    const animateSpring = () => {
      if (!isDragging) {
        const diff = targetProgress - current;
        if (Math.abs(diff) > 0.0003) {
          // Smooth critically damped spring approach
          current += diff * 0.11;
          setProgress(current);
          animationFrameRef.current = requestAnimationFrame(animateSpring);
        } else {
          current = targetProgress;
          setProgress(current);
        }
      }
    };

    if (!isDragging) {
      animationFrameRef.current = requestAnimationFrame(animateSpring);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [targetProgress, isDragging]);

  // Active normalized index for top tabs
  const activeNormalizedIndex = ((Math.round(targetProgress) % totalCards) + totalCards) % totalCards;

  const spotlightTabs = useMemo(() => [
    { id: 'the-vault', label: 'The Vault' },
    { id: 'asset-velocity', label: 'Asset Velocity' },
    { id: 'parliament-pulse', label: 'Parliament Pulse' },
    { id: 'cases-ledger', label: 'Cases Ledger' },
    { id: 'dynasty-radar', label: 'Dynasty Radar' },
    { id: 'community', label: 'Community' },
  ], []);

  // Jump to specific card index seamlessly with shortest rotational path
  const jumpToIndex = useCallback((targetIdx: number) => {
    const currentNorm = ((Math.round(targetProgress) % totalCards) + totalCards) % totalCards;
    let diff = targetIdx - currentNorm;
    if (diff > totalCards / 2) diff -= totalCards;
    if (diff < -totalCards / 2) diff += totalCards;
    setTargetProgress((prev) => Math.round(prev) + diff);
  }, [targetProgress, totalCards]);

  // Pointer Drag Handlers for seamless infinite rotation
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return; // Left click or touch only
    setIsDragging(true);
    hasMovedRef.current = false;
    dragStartXRef.current = e.clientX;
    dragStartProgressRef.current = progress;
    lastXRef.current = e.clientX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    // Update magnetic floating "Drag" badge
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setCursorPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        visible: true,
      });
    }

    if (!isDragging) return;

    const deltaX = e.clientX - dragStartXRef.current;
    if (Math.abs(deltaX) > 12) {
      hasMovedRef.current = true;
    }

    // Velocity calculation for momentum throw
    const now = performance.now();
    const dt = Math.max(1, now - lastTimeRef.current);
    const dx = e.clientX - lastXRef.current;
    velocityRef.current = dx / dt;
    lastXRef.current = e.clientX;
    lastTimeRef.current = now;

    // 340px drag on desktop, 220px on mobile translates to 1 full card step
    const progressDelta = -deltaX / (isMobile ? 220 : 340);
    const newProg = dragStartProgressRef.current + progressDelta;
    setProgress(newProg);
    setTargetProgress(newProg);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);

    // Apply inertia / momentum based on flick velocity
    const v = velocityRef.current;
    let momentumStep = 0;
    if (Math.abs(v) > 0.4 && hasMovedRef.current) {
      momentumStep = -Math.sign(v) * Math.min(2, Math.round(Math.abs(v) * 1.5));
    }

    const currentProg = progress;
    const nearest = Math.round(currentProg) + momentumStep;
    setTargetProgress(nearest);
  };

  const handleCardAction = (item: ArcCardItem) => {
    if (item.politician) {
      onSelectPolitician(item.politician);
    } else if (item.viewTarget) {
      onNavigateToView(item.viewTarget);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onOpenAllIndiaDirectory();
    }
  };

  const handleMouseLeave = () => {
    setCursorPos((prev) => ({ ...prev, visible: false }));
    if (isDragging) {
      setIsDragging(false);
      setTargetProgress(Math.round(progress));
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setTargetProgress((prev) => Math.round(prev) + 1);
      } else if (e.key === 'ArrowLeft') {
        setTargetProgress((prev) => Math.round(prev) - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Geometry parameters with refined smaller gaps (adaptive for mobile):
  const arcRadius = isMobile ? 800 : 1380;
  const angleStepDeg = isMobile ? 18.0 : 17.0;

  return (
    <section 
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-full pt-10 pb-16 sm:pt-20 sm:pb-36 bg-[#FAF8F5] text-[#18181B] border-b border-[#18181B]/10 overflow-hidden select-none"
    >
      {/* Ghost Background Giant Watermark (similar to video's background letters) */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-5 select-none">
        <span className="font-serif font-black text-[18vw] sm:text-[22vw] tracking-tighter text-[#18181B]">
          NETAWATCH
        </span>
      </div>

      {/* Background Radial Wheel / Dial Graphic */}
      <motion.div 
        style={{
          rotate: dialRotation,
          scale: dialScale,
          opacity: dialOpacity,
        }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
      >
        <div className="relative h-[680px] w-[680px] sm:h-[960px] sm:w-[960px] rounded-full border border-dashed border-[#18181B]/25 flex items-center justify-center">
          <div className="h-[520px] w-[520px] sm:h-[760px] sm:w-[760px] rounded-full border border-[#18181B]/20 flex items-center justify-center">
            <div className="h-[380px] w-[380px] sm:h-[540px] sm:w-[540px] rounded-full border border-dashed border-[#18181B]/15" />
          </div>
          {/* Subtle Dial Tick marks */}
          <div className="absolute top-0 h-3 sm:h-4 w-0.5 bg-[#18181B]/35" />
          <div className="absolute bottom-0 h-3 sm:h-4 w-0.5 bg-[#18181B]/35" />
          <div className="absolute left-0 w-3 sm:w-4 h-0.5 bg-[#18181B]/35" />
          <div className="absolute right-0 w-3 sm:w-4 h-0.5 bg-[#18181B]/35" />
        </div>
      </motion.div>

      {/* Floating Magnetic "Drag" Circular Cursor Badge (as seen in video) */}
      {cursorPos.visible && (
        <motion.div
          animate={{
            x: cursorPos.x - 28,
            y: cursorPos.y - 28,
            scale: isDragging ? 0.88 : 1,
          }}
          transition={{ type: 'spring', damping: 32, stiffness: 480, mass: 0.04 }}
          className="pointer-events-none absolute z-50 hidden md:flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[#18181B] text-white font-sans font-semibold text-[11px] shadow-2xl tracking-wide"
        >
          {isDragging ? 'Hold' : 'Drag'}
        </motion.div>
      )}

      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 relative z-10 w-full overflow-hidden">
        
        {/* Top Eyebrow & Main Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10">
          <p className="text-xs sm:text-[13px] font-medium text-[#52525B] tracking-tight mb-1.5 sm:mb-2">
            Access everything with a single civic membership:
          </p>
          <h2 className="font-serif font-black text-2xl xs:text-3xl sm:text-5xl text-[#18181B] tracking-tight">
            Spotlight Intelligence Deck
          </h2>
        </div>

        {/* Upgraded Horizontal Scrollable Pill-Tab Navigation Bar (Matching Automatic Rotating Decks) */}
        <div className="w-full max-w-4xl mx-auto mb-8 sm:mb-12 px-2">
          <PillTabNav
            tabs={spotlightTabs}
            activeId={deckItems[activeNormalizedIndex]?.id || deckItems[0].id}
            onTabChange={(tabId, index) => jumpToIndex(index)}
            ariaLabel="Spotlight Intelligence Deck Tabs"
            containerClassName="w-full"
          />
        </div>

        {/* Curved Radial Arc Deck Arena (Infinite Circular Rotating Wheel) */}
        <div 
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="relative h-[450px] xs:h-[490px] sm:h-[580px] md:h-[640px] w-full flex items-center justify-center overflow-visible cursor-grab active:cursor-grabbing touch-pan-y"
        >
          {deckItems.map((item, index) => {
            // Calculate wrapped continuous distance in range [-totalCards/2, totalCards/2]
            const rawDiff = index - progress;
            let wrappedDiff = (rawDiff % totalCards);
            if (wrappedDiff > totalCards / 2) wrappedDiff -= totalCards;
            if (wrappedDiff < -totalCards / 2) wrappedDiff += totalCards;

            const distance = wrappedDiff;
            const absDist = Math.abs(distance);

            // Hide cards rotated out behind the horizon
            if (isMobile ? absDist > 1.35 : absDist > 2.5) return null;

            // Polar trigonometry matching the video's circular wheel geometry:
            const angleRad = (distance * angleStepDeg * Math.PI) / 180;
            const translateX = arcRadius * Math.sin(angleRad);
            // Downward displacement along the circular rim: R * (1 - cos(theta))
            const translateY = arcRadius * (1 - Math.cos(angleRad));
            const rotationDeg = distance * (isMobile ? 9.0 : 11.2);
            const scale = Math.max(0.80, 1 - absDist * 0.065);
            const opacity = absDist > 2.0 ? Math.max(0, (2.6 - absDist) / 0.6) : 1;
            const zIndex = Math.round(30 - absDist * 8);
            const isCenter = absDist < 0.45;

            return (
              <div
                key={item.id}
                onClick={(e) => {
                  if (hasMovedRef.current) return;
                  handleCardAction(item);
                }}
                style={{
                  transform: `translate3d(${translateX.toFixed(2)}px, ${translateY.toFixed(2)}px, 0px) rotate(${rotationDeg.toFixed(2)}deg) scale(${scale.toFixed(3)})`,
                  transformOrigin: 'center bottom',
                  zIndex: zIndex,
                  opacity: opacity,
                  backgroundColor: item.bgColor,
                  willChange: 'transform, opacity',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  boxShadow: isCenter
                    ? '0 24px 48px -12px rgba(24, 24, 27, 0.3), 0 10px 24px -8px rgba(24, 24, 27, 0.15)'
                    : '0 12px 28px -10px rgba(24, 24, 27, 0.14)',
                }}
                className={`absolute w-[265px] xs:w-[305px] sm:w-[365px] md:w-[410px] h-[415px] xs:h-[455px] sm:h-[530px] md:h-[570px] rounded-[26px] xs:rounded-[34px] sm:rounded-[44px] border ${item.borderColor} p-3.5 xs:p-5 sm:p-8 flex flex-col justify-between overflow-hidden select-none transition-shadow cursor-pointer hover:border-white/40 ${
                  isCenter ? 'ring-2 ring-[#b4f82c]/40 ring-offset-2 ring-offset-zinc-950' : 'hover:opacity-95'
                }`}
              >
                {/* Top Section: "PART OF CIVIC AUDIT" pill badge + Star Asterisk + Massive Title */}
                <div className="text-center flex flex-col items-center">
                  
                  {/* Micro Pill Badge */}
                  <div 
                    className="inline-block text-[8px] xs:text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-current/20 opacity-80 mb-1.5 sm:mb-3"
                    style={{ color: item.textColor }}
                  >
                    {item.badge}
                  </div>

                  {/* Clean 8-Point Asterisk Icon (seen in video) */}
                  <div 
                    className="text-lg xs:text-xl sm:text-3xl mb-0.5 sm:mb-1 font-serif select-none leading-none opacity-90"
                    style={{ color: item.textColor }}
                  >
                    ✱
                  </div>

                  {/* Massive Card Title */}
                  <h3 
                    className="font-serif font-black text-xl xs:text-2xl sm:text-4xl tracking-tight leading-tight mb-1 sm:mb-2.5"
                    style={{ color: item.textColor }}
                  >
                    {item.title}
                  </h3>

                  {/* Subtitle description */}
                  <p 
                    className="text-[10px] xs:text-[11px] sm:text-[13px] leading-relaxed max-w-[280px] mx-auto text-center font-normal line-clamp-2 sm:line-clamp-none"
                    style={{ color: item.subtextColor }}
                  >
                    {item.subtitle}
                  </p>
                </div>

                {/* Center / Lower Graphic Section (Matching the specific UI mockups from video) */}
                <div className="flex-1 flex items-center justify-center my-2 pointer-events-none">
                  
                  {/* Graphic 1: The Vault (Dark Dashboard Preview) */}
                  {item.graphicType === 'vault' && (
                    <div className="w-full space-y-1.5 sm:space-y-2 bg-black/40 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border border-white/10 shadow-inner">
                      <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-zinc-400 border-b border-white/10 pb-1">
                        <span>543 CONSTITUENCIES</span>
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          LIVE AUDIT
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] sm:text-xs text-white pt-0.5">
                        <Landmark className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                        <span className="font-semibold truncate">Lok Sabha Gazette Affidavits</span>
                      </div>
                    </div>
                  )}

                  {/* Graphic 2: Asset Velocity (Lime High-Contrast Metric Surge) */}
                  {item.graphicType === 'lime-chart' && (
                    <div className="w-full bg-black/10 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border border-black/10 text-[#111111]">
                      <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono font-black uppercase">
                        <span>AFFIDAVIT SURGE</span>
                        <span className="bg-[#111111] text-[#B9FF2F] px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold">+340%</span>
                      </div>
                      <div className="text-base sm:text-lg font-serif font-black mt-1">₹85 Cr → ₹338 Cr</div>
                      <div className="text-[9px] sm:text-[10px] text-[#2E3A08] truncate">D.K. Suresh • Bengaluru Rural</div>
                    </div>
                  )}

                  {/* Graphic 3: Parliament Pulse (Tilted Buttons Grid) */}
                  {item.graphicType === 'buttons' && (
                    <div className="grid grid-cols-2 gap-1.5 sm:gap-2 w-full">
                      <div className="bg-white/10 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-center text-[10px] sm:text-xs font-semibold text-white border border-white/10 truncate">
                        100% Attendance
                      </div>
                      <div className="bg-white/10 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-center text-[10px] sm:text-xs font-semibold text-white border border-white/10 truncate">
                        0 Charges
                      </div>
                      <div className="bg-white/10 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-center text-[10px] sm:text-xs font-semibold text-white border border-white/10 col-span-2 truncate">
                        Hansard Verified Benchmark
                      </div>
                    </div>
                  )}

                  {/* Graphic 4: Cases Ledger (Off-White Scrutiny Ledger) */}
                  {item.graphicType === 'easings' && (
                    <div className="w-full bg-white/70 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border border-[#D4D4D0] space-y-1 sm:space-y-2 text-[#18181B] shadow-xs">
                      <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono font-bold text-rose-600">
                        <span>FORM 26 SCRUTINY</span>
                        <span>251 / 543 MPs</span>
                      </div>
                      <div className="text-[10px] sm:text-xs font-medium text-[#52525B] line-clamp-2">
                        170 MPs face serious IPC / BNS chargesheets
                      </div>
                    </div>
                  )}

                  {/* Graphic 5: Dynasty Radar (4 Icon Tiles Grid) */}
                  {item.graphicType === 'icons' && (
                    <div className="grid grid-cols-2 gap-1.5 sm:gap-2 w-full text-center">
                      <div className="bg-white/10 p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl border border-white/10 flex items-center gap-1.5 justify-center">
                        <GitFork className="h-3.5 w-3.5 text-purple-300 shrink-0" />
                        <span className="text-[10px] sm:text-[11px] text-zinc-200 font-bold">2nd Gen</span>
                      </div>
                      <div className="bg-white/10 p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl border border-white/10 flex items-center gap-1.5 justify-center">
                        <Scale className="h-3.5 w-3.5 text-purple-300 shrink-0" />
                        <span className="text-[10px] sm:text-[11px] text-zinc-200 font-bold">₹140+ Cr</span>
                      </div>
                      <div className="bg-white/10 p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl border border-white/10 flex items-center gap-1.5 justify-center col-span-2">
                        <Users className="h-3.5 w-3.5 text-purple-300 shrink-0" />
                        <span className="text-[10px] sm:text-[11px] text-zinc-200 font-bold">Lineage Succession Index</span>
                      </div>
                    </div>
                  )}

                  {/* Graphic 6: Community (Stacked Avatar Rings) */}
                  {item.graphicType === 'community' && (
                    <div className="flex items-center justify-center -space-x-2">
                      {politicians.slice(0, 5).map((p, pIdx) => (
                        <div key={p.id || pIdx} className="h-9 w-9 sm:h-11 sm:w-11 rounded-full border-2 border-white overflow-hidden bg-zinc-900 shadow-md">
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
                      ))}
                    </div>
                  )}

                </div>

                {/* Bottom Centered "Discover" Actions with Direct External Link Redirection */}
                <div className="flex items-center justify-center gap-1.5 sm:gap-2 pt-1.5 sm:pt-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (hasMovedRef.current) return;
                      if (item.politician) {
                        onSelectPolitician(item.politician);
                      } else if (item.viewTarget) {
                        onNavigateToView(item.viewTarget);
                      } else {
                        onOpenAllIndiaDirectory();
                      }
                    }}
                    style={{
                      backgroundColor: item.buttonBg,
                      color: item.buttonText,
                    }}
                    className="px-4 xs:px-6 sm:px-8 py-2 xs:py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold tracking-tight shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer select-none flex items-center gap-1.5 whitespace-nowrap"
                  >
                    <span>Discover Details</span>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                  </button>

                  {item.externalUrl && (
                    <a
                      href={item.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      title={`Open official records: ${item.externalLabel || 'External Source'}`}
                      style={{
                        backgroundColor: `${item.buttonBg}20`,
                        color: item.textColor,
                        borderColor: `${item.textColor}30`,
                      }}
                      className="flex items-center gap-1 px-2.5 sm:px-3 py-2 xs:py-2.5 sm:py-3 rounded-full border text-[10px] sm:text-[11px] font-bold uppercase tracking-wider hover:opacity-100 opacity-80 transition cursor-pointer backdrop-blur-xs shadow-xs select-none whitespace-nowrap shrink-0"
                    >
                      <ExternalLink className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      <span className="hidden xs:inline">Source</span>
                    </a>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Chevron Controls and Dot Indicators */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={() => setTargetProgress((prev) => Math.round(prev) - 1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#18181B]/20 bg-white text-[#18181B] transition hover:bg-[#18181B] hover:text-white cursor-pointer shadow-xs"
            title="Previous card"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          
          <div className="flex items-center gap-1.5">
            {deckItems.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => jumpToIndex(dotIdx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  activeNormalizedIndex === dotIdx ? 'w-6 bg-[#18181B]' : 'w-2 bg-[#18181B]/20 hover:bg-[#18181B]/40'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setTargetProgress((prev) => Math.round(prev) + 1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#18181B]/20 bg-white text-[#18181B] transition hover:bg-[#18181B] hover:text-white cursor-pointer shadow-xs"
            title="Next card"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
