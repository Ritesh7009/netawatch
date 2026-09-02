import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, useInView } from 'motion/react';
import { 
  ArrowUpRight, 
  Layers,
  ExternalLink
} from 'lucide-react';
import { ViewMode } from '../types';
import { PillTabNav } from './PillTabNav';

interface TornadoModuleShowcaseProps {
  onNavigateToView: (view: ViewMode) => void;
  onOpenAllIndiaDirectory: () => void;
}

export const TornadoModuleShowcase: React.FC<TornadoModuleShowcaseProps> = ({
  onNavigateToView,
  onOpenAllIndiaDirectory,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: '-20px' });

  // Odometer live counting state matching the video's flipping numbers
  const [odometerValue, setOdometerValue] = useState<string>('248.750');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Soft mechanical haptic click synthesizer via Web Audio API
  const playTickSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(820, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(240, ctx.currentTime + 0.035);
      
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.035);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // Ignore audio context errors if blocked by browser autoplay policy
    }
  }, [soundEnabled]);

  // Faster responsive odometer interval matched to 2x rotation speed
  useEffect(() => {
    const samples = ['248.750', '01.11', '0', '317.650', '130.649', '412.980', '248.750'];
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % samples.length;
      setOdometerValue(samples[idx]);
    }, 1100);
    return () => clearInterval(interval);
  }, []);

  // 7 Specialized Civic Intelligence Decks styled faithfully after the radial layout
  const engines = useMemo(() => [
    {
      id: 'odometer',
      view: 'analytics' as ViewMode,
      cardBadge: 'Number Odometer',
      footerTitle: 'Wealth & Assets Engine',
      externalUrl: 'https://affidavit.eci.gov.in/',
      externalTitle: 'ECI Affidavits Portal',
      renderScreen: () => (
        <div className="h-full w-full bg-[#050507] flex flex-col items-center justify-center p-6 text-center select-none relative overflow-hidden group/screen">
          {/* Subtle star / grid pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:20px_20px] opacity-25" />
          
          <div className="relative z-10 flex flex-col items-center justify-center space-y-2">
            <span className="text-[9px] font-mono tracking-[0.25em] text-zinc-500 uppercase font-semibold">
              TOTAL ASSET POOL
            </span>
            <div className="flex items-center justify-center gap-1.5 text-white font-mono font-bold text-2xl xs:text-3xl sm:text-4xl tracking-tight">
              <span className="text-zinc-300 font-sans text-xl xs:text-2xl font-light">₹</span>
              <motion.span
                key={odometerValue}
                initial={{ opacity: 0.2, y: 6, filter: 'blur(3px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="tabular-nums"
              >
                {odometerValue}
              </motion.span>
              <span className="text-xs font-mono text-zinc-400 font-normal ml-0.5">Cr</span>
            </div>
            <p className="text-[9.5px] xs:text-[10px] text-zinc-500 font-mono tracking-wide">
              across 543 LS affidavits
            </p>
          </div>

          <div className="absolute bottom-2.5 inset-x-0 flex justify-center opacity-0 group-hover/screen:opacity-100 transition-opacity">
            <span className="bg-white/10 text-white backdrop-blur-md px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider flex items-center gap-1">
              <span>Inspect Assets</span>
              <ArrowUpRight className="h-2.5 w-2.5 text-[#b4f82c]" />
            </span>
          </div>
        </div>
      ),
    },
    {
      id: 'hotspot',
      view: 'grid' as ViewMode,
      customAction: onOpenAllIndiaDirectory,
      cardBadge: 'Product Hotspot Modal',
      footerTitle: '543 MPs Dossier Directory',
      externalUrl: 'https://sansad.in/ls/members',
      externalTitle: 'Sansad.in Official Directory',
      renderScreen: () => (
        <div className="h-full w-full bg-[#52634e] flex items-center justify-between p-3 xs:p-4 sm:p-5 text-white select-none relative overflow-hidden group/screen">
          {/* Background Illustration / Silhouette representation */}
          <div className="w-[42%] xs:w-[45%] flex flex-col items-center justify-center relative">
            <div className="h-20 w-20 xs:h-24 xs:w-24 sm:h-28 sm:w-28 rounded-xl sm:rounded-2xl bg-black/20 flex flex-col items-center justify-center border border-white/25 relative shadow-inner">
              <span className="font-serif text-2xl xs:text-3xl sm:text-4xl font-black text-white/90">543</span>
              <span className="text-[7.5px] xs:text-[8px] font-mono uppercase tracking-widest text-white/70 font-bold">SEATS</span>
              {/* Pulsing Interactive Hotspot Pin (from video) */}
              <div className="absolute -top-1.5 -right-1.5 flex items-center justify-center">
                <span className="absolute h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-amber-300/40 animate-ping" />
                <span className="h-3.5 w-3.5 sm:h-4 sm:w-4 rounded-full bg-amber-400 border-2 border-white shadow-md flex items-center justify-center">
                  <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-black" />
                </span>
              </div>
            </div>
          </div>

          {/* Floating Glass Hotspot Modal Card (from video) */}
          <div className="w-[55%] xs:w-[53%] bg-white/95 text-[#18181b] p-2 xs:p-3 sm:p-3.5 rounded-xl shadow-2xl border border-white/60 space-y-0.5 sm:space-y-1 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <span className="text-[7.5px] xs:text-[8px] font-mono font-bold text-zinc-500 uppercase tracking-wider">MP DOSSIER</span>
              <span className="h-1.5 w-1.5 xs:h-2 xs:w-2 rounded-full bg-emerald-500" />
            </div>
            <h4 className="text-[10px] xs:text-[11px] sm:text-[12px] font-bold leading-snug tracking-tight text-zinc-900 line-clamp-1">
              Direct scrutiny for citizens
            </h4>
            <p className="text-[8px] xs:text-[9px] text-zinc-600 leading-tight line-clamp-2">
              Hansard voting logs, sworn disclosures & criminal IPC audit.
            </p>
            <div className="pt-0.5 flex items-center gap-1 text-[7.5px] xs:text-[8.5px] font-bold text-[#c44d31] font-mono uppercase">
              <span>Open 543 Registry →</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'radial-cards',
      view: 'table' as ViewMode,
      cardBadge: 'Radial Cards Slider (GSAP)',
      footerTitle: '543 MP Performance Matrix',
      externalUrl: 'https://prsindia.org/mptrack',
      externalTitle: 'PRS MP Track',
      renderScreen: () => (
        <div className="h-full w-full bg-[#1b261d] flex flex-col items-center justify-center p-3 select-none relative overflow-hidden group/screen">
          {/* Fanned out mini polaroid / photo cards (from video) */}
          <div className="relative w-full h-28 xs:h-32 flex items-center justify-center">
            {/* Left mini card */}
            <div className="absolute left-2 xs:left-5 sm:left-10 h-18 w-13 xs:h-22 xs:w-16 sm:h-26 sm:w-19 rounded-xl bg-gradient-to-br from-amber-800 to-amber-950 p-1.5 shadow-lg transform -rotate-12 border border-white/20 flex flex-col justify-between">
              <div className="h-10 xs:h-12 sm:h-15 w-full rounded-lg bg-amber-500/20 overflow-hidden flex items-center justify-center">
                <span className="text-[8px] xs:text-[9px] font-mono text-white/90 font-bold">MODI</span>
              </div>
              <span className="text-[7px] xs:text-[7.5px] font-mono text-white/70 text-center">Varanasi</span>
            </div>

            {/* Center mini card */}
            <div className="absolute z-10 h-20 w-15 xs:h-24 xs:w-18 sm:h-28 sm:w-21 rounded-xl bg-gradient-to-br from-emerald-800 to-emerald-950 p-1.5 shadow-2xl border-2 border-white/40 flex flex-col justify-between transform scale-105">
              <div className="h-12 xs:h-14 sm:h-16 w-full rounded-lg bg-emerald-500/20 overflow-hidden flex items-center justify-center">
                <span className="text-[8px] xs:text-[9px] font-mono text-white font-black">RAHUL</span>
              </div>
              <span className="text-[7px] xs:text-[7.5px] font-mono text-white text-center font-bold">Rae Bareli</span>
            </div>

            {/* Right mini card */}
            <div className="absolute right-2 xs:right-5 sm:right-10 h-18 w-13 xs:h-22 xs:w-16 sm:h-26 sm:w-19 rounded-xl bg-gradient-to-br from-purple-800 to-purple-950 p-1.5 shadow-lg transform rotate-12 border border-white/20 flex flex-col justify-between">
              <div className="h-10 xs:h-12 sm:h-15 w-full rounded-lg bg-purple-500/20 overflow-hidden flex items-center justify-center">
                <span className="text-[8px] xs:text-[9px] font-mono text-white/90 font-bold">SULE</span>
              </div>
              <span className="text-[7px] xs:text-[7.5px] font-mono text-white/70 text-center">Baramati</span>
            </div>
          </div>

          <div className="flex items-center gap-1 mt-1">
            <span className="text-[8.5px] xs:text-[9px] font-mono font-bold text-emerald-300 uppercase tracking-wide">
              Performance Matrix →
            </span>
          </div>
        </div>
      ),
    },
    {
      id: 'step-timeline',
      view: 'legal-registry' as ViewMode,
      cardBadge: 'Step-by-step Timeline',
      footerTitle: 'Criminal Charges Ledger',
      externalUrl: 'https://services.ecourts.gov.in/',
      externalTitle: 'National eCourts Registry',
      renderScreen: () => (
        <div className="h-full w-full bg-[#eae7de] p-3.5 xs:p-4 sm:p-6 text-[#18181b] flex flex-col justify-between select-none relative group/screen">
          <div>
            <span className="text-[7.5px] xs:text-[8.5px] font-mono uppercase tracking-[0.2em] text-zinc-500 font-bold">
              HOW IT WORKS
            </span>
            <h3 className="font-serif font-black text-base xs:text-lg sm:text-2xl text-zinc-900 tracking-tight mt-0.5">
              Legislative Case Audit
            </h3>
          </div>

          {/* Vertical Step Timeline with green bullets (from video) */}
          <div className="space-y-1.5 xs:space-y-2 sm:space-y-2.5 my-auto border-l-2 border-emerald-600/30 pl-2.5 xs:pl-3 ml-1.5">
            <div className="relative">
              <span className="absolute -left-[17px] xs:-left-[19px] top-1 h-2.5 w-2.5 xs:h-3 xs:w-3 rounded-full bg-emerald-600 border-2 border-[#eae7de]" />
              <div className="text-[9.5px] xs:text-[10.5px] font-bold text-zinc-900">1. Form 26 ECI Disclosures</div>
              <div className="text-[7.5px] xs:text-[8.5px] text-zinc-600">Form 26 ECI sworn disclosures parsed.</div>
            </div>

            <div className="relative">
              <span className="absolute -left-[17px] xs:-left-[19px] top-1 h-2.5 w-2.5 xs:h-3 xs:w-3 rounded-full bg-emerald-600 border-2 border-[#eae7de]" />
              <div className="text-[9.5px] xs:text-[10.5px] font-bold text-zinc-900">2. Chargesheet Verification</div>
              <div className="text-[7.5px] xs:text-[8.5px] text-zinc-600">High Court FIR & criminal IPC audit.</div>
            </div>

            <div className="relative">
              <span className="absolute -left-[17px] xs:-left-[19px] top-1 h-2.5 w-2.5 xs:h-3 xs:w-3 rounded-full bg-zinc-400 border-2 border-[#eae7de]" />
              <div className="text-[9.5px] xs:text-[10.5px] font-bold text-zinc-700">3. Legal Registry Ledger</div>
              <div className="text-[7.5px] xs:text-[8.5px] text-zinc-500">Click to inspect 251 MP cases.</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'the-grid',
      view: 'map' as ViewMode,
      cardBadge: 'The Grid (Animated Columns)',
      footerTitle: 'Interactive India GIS Map',
      externalUrl: 'https://sansad.in/ls',
      externalTitle: 'Sansad Lok Sabha GIS Portal',
      renderScreen: () => (
        <div className="h-full w-full bg-gradient-to-br from-[#15345e] to-[#0c1f38] p-3.5 xs:p-4 sm:p-6 text-white flex flex-col justify-between select-none relative overflow-hidden group/screen">
          {/* Translucent Column Grid Overlay Lines (from video) */}
          <div className="absolute inset-0 grid grid-cols-6 pointer-events-none opacity-20 divide-x divide-white">
            <div /><div /><div /><div /><div /><div />
          </div>

          <div className="relative z-10">
            <span className="text-[7.5px] xs:text-[8.5px] font-mono tracking-widest text-sky-300 uppercase font-semibold">
              GIS ARCHITECTURE
            </span>
            <h2 className="font-serif font-black text-lg xs:text-xl sm:text-3xl tracking-tight text-white mt-0.5">
              Interactive Map
            </h2>
          </div>

          <div className="relative z-10 max-w-[240px]">
            <p className="text-[9.5px] xs:text-[10.5px] sm:text-xs text-sky-100/85 leading-snug sm:leading-relaxed">
              Explore 543 constituencies, MPLADS spending & party strongholds.
            </p>
            <div className="mt-1 inline-flex items-center gap-1 text-[8.5px] xs:text-[9.5px] font-mono font-bold text-amber-300">
              <span>Open India GIS Map →</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'shutter-scroll',
      view: 'manifesto' as ViewMode,
      cardBadge: 'Shutter Scroll Transition',
      footerTitle: 'Manifesto Promises Tracker',
      externalUrl: 'https://sansad.in/ls/business',
      externalTitle: 'Lok Sabha Legislative Business',
      renderScreen: () => (
        <div className="h-full w-full bg-gradient-to-br from-[#401217] to-[#170507] p-3.5 xs:p-4 sm:p-6 text-white flex flex-col justify-between select-none relative overflow-hidden group/screen">
          <div className="relative z-10">
            <span className="text-[7.5px] xs:text-[8.5px] font-mono tracking-widest text-rose-300 uppercase font-semibold">
              POLICY AUDIT
            </span>
            <h3 className="font-serif font-black text-base xs:text-lg sm:text-2xl tracking-tight text-white mt-0.5 leading-tight">
              Manifesto Tracker
            </h3>
          </div>

          {/* Shutter panel visual preview (from video) */}
          <div className="relative z-10 bg-white/10 p-2 xs:p-2.5 sm:p-3 rounded-xl border border-white/15 backdrop-blur-md">
            <div className="flex items-center justify-between text-[8.5px] xs:text-[9px] sm:text-[10px] font-mono font-bold text-rose-200">
              <span>NDA vs INDIA PLEDGES</span>
              <span className="text-emerald-300 font-bold">28% DELIVERED</span>
            </div>
            <div className="w-full bg-black/30 h-1.5 xs:h-2 rounded-full mt-1 xs:mt-1.5 overflow-hidden">
              <div className="bg-gradient-to-r from-amber-400 to-rose-400 h-full w-[28%]" />
            </div>
            <p className="text-[7.5px] xs:text-[8.5px] text-rose-200/80 mt-1 font-mono">Audit all 48 pledge statuses →</p>
          </div>
        </div>
      ),
    },
    {
      id: 'collage-focus',
      view: 'nepotism-tracker' as ViewMode,
      cardBadge: 'Collage Focus Card on Hover',
      footerTitle: 'Nepotism & Dynasty Radar',
      externalUrl: 'https://myneta.info/',
      externalTitle: 'ADR MyNeta Family & Asset Tracker',
      renderScreen: () => (
        <div className="h-full w-full bg-[#121214] p-3 xs:p-4 flex flex-col items-center justify-center select-none relative overflow-hidden group/screen">
          {/* Overlapping Collage Grid of Focus Tiles (from video) */}
          <div className="relative w-full h-28 xs:h-32 flex items-center justify-center">
            <div className="absolute left-2 xs:left-5 sm:left-6 h-15 w-15 xs:h-18 xs:w-18 sm:h-20 sm:w-20 rounded-xl bg-zinc-800 border border-white/15 p-1.5 xs:p-2 transform -rotate-6 shadow-lg flex flex-col justify-between">
              <span className="text-[7.5px] xs:text-[8px] font-mono text-zinc-400">Gen 2</span>
              <span className="text-[9.5px] xs:text-[11px] font-bold text-white">Lineage</span>
            </div>

            <div className="absolute z-10 h-18 w-18 xs:h-22 xs:w-22 sm:h-24 sm:w-24 rounded-xl bg-gradient-to-br from-purple-900 to-zinc-900 border-2 border-purple-400/60 p-1.5 xs:p-2 transform rotate-2 shadow-2xl flex flex-col justify-between">
              <span className="text-[7.5px] xs:text-[8px] font-mono text-purple-300 font-bold">Velocity</span>
              <span className="text-[11px] xs:text-xs sm:text-sm font-black text-white">+340%</span>
            </div>

            <div className="absolute right-2 xs:right-5 sm:right-6 h-15 w-15 xs:h-18 xs:w-18 sm:h-20 sm:w-20 rounded-xl bg-zinc-800 border border-white/15 p-1.5 xs:p-2 transform rotate-8 shadow-lg flex flex-col justify-between">
              <span className="text-[7.5px] xs:text-[8px] font-mono text-zinc-400">Assets</span>
              <span className="text-[9.5px] xs:text-[11px] font-bold text-white">₹140 Cr</span>
            </div>
          </div>

          <span className="text-[8px] xs:text-[9px] font-mono uppercase tracking-widest text-purple-300 mt-1 font-bold">
            Dynasty & Asset Radar →
          </span>
        </div>
      ),
    },
  ], [odometerValue, onOpenAllIndiaDirectory]);

  const totalEngines = engines.length;

  // Orbit rotation state (infinite continuous floating progress)
  const [progress, setProgress] = useState(3);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  // Responsive window width tracking for optimal arc geometry on every screen size
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 640;

  // Target progress for smooth spring snapping when user clicks or nudges
  const [targetProgress, setTargetProgress] = useState<number | null>(null);

  // Drag interaction refs
  const dragStartXRef = useRef(0);
  const dragStartProgressRef = useRef(3);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const velocityRef = useRef(0);
  const isDraggingRef = useRef(false);
  const hasMovedRef = useRef(false);
  const lastActiveIndexRef = useRef(3);

  // Speed multiplier locked to 2x fast rate (~4.1s/card)
  const speedStepFactor = 0.0040;

  // Butter-smooth continuous sub-pixel animation loop via requestAnimationFrame
  useEffect(() => {
    let animationFrameId: number;
    let lastTimestamp = performance.now();

    const loop = (now: number) => {
      const delta = Math.min(32, Math.max(1, now - lastTimestamp));
      lastTimestamp = now;

      if (!isDraggingRef.current) {
        if (targetProgress !== null) {
          // Snappy exponential approach to target
          setProgress((prev) => {
            const diff = targetProgress - prev;
            if (Math.abs(diff) > 0.0003) {
              const factor = Math.min(0.25, 0.12 * (delta / 16.66) + 0.03);
              return prev + diff * factor;
            } else {
              setTargetProgress(null);
              return targetProgress;
            }
          });
        } else if (isAutoPlay && !isHovered && isInView) {
          // Fast, fluid orbital rotation loop
          const stepSpeed = speedStepFactor * (delta / 16.66);
          setProgress((prev) => prev + direction * stepSpeed);
        }
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isAutoPlay, isHovered, isInView, direction, targetProgress, speedStepFactor]);

  // Normalized active index for pill buttons and indicators
  const activeNormalizedIndex = ((Math.round(progress) % totalEngines) + totalEngines) % totalEngines;

  // Trigger tick sound on card index transition
  useEffect(() => {
    if (activeNormalizedIndex !== lastActiveIndexRef.current) {
      lastActiveIndexRef.current = activeNormalizedIndex;
      playTickSound();
    }
  }, [activeNormalizedIndex, playTickSound]);

  // Jump to specific card smoothly via shortest circular arc
  const jumpToEngine = useCallback((index: number) => {
    const currentNorm = ((Math.round(progress) % totalEngines) + totalEngines) % totalEngines;
    let diff = index - currentNorm;
    if (diff > totalEngines / 2) diff -= totalEngines;
    if (diff < -totalEngines / 2) diff += totalEngines;
    setTargetProgress(Math.round(progress) + diff);
  }, [progress, totalEngines]);

  // Pointer drag events for full tactile control
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    isDraggingRef.current = true;
    hasMovedRef.current = false;
    dragStartXRef.current = e.clientX;
    dragStartProgressRef.current = progress;
    lastXRef.current = e.clientX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
    setTargetProgress(null);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - dragStartXRef.current;
    if (Math.abs(deltaX) > 10) {
      hasMovedRef.current = true;
    }

    const now = performance.now();
    const dt = Math.max(1, now - lastTimeRef.current);
    const dx = e.clientX - lastXRef.current;
    velocityRef.current = dx / dt;
    lastXRef.current = e.clientX;
    lastTimeRef.current = now;

    // Responsive drag ratio: 220px on mobile, 360px on desktop = 1 card step
    const stepDelta = -deltaX / (isMobile ? 220 : 360);
    setProgress(dragStartProgressRef.current + stepDelta);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    setIsDragging(false);
    isDraggingRef.current = false;

    // Apply smooth momentum inertia if dragged fast
    const v = velocityRef.current;
    let momentumStep = 0;
    if (Math.abs(v) > 0.28 && hasMovedRef.current) {
      momentumStep = -Math.sign(v) * Math.min(2, Math.round(Math.abs(v) * 1.3));
    }

    const nearest = Math.round(progress) + momentumStep;
    setTargetProgress(nearest);
  };

  const handleOpenEngine = (engine: typeof engines[0]) => {
    if ((engine as any).customAction) {
      (engine as any).customAction();
    } else if (engine.view) {
      onNavigateToView(engine.view);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const showcaseTabs = useMemo(() => engines.map((e) => ({
    id: e.id,
    label: e.cardBadge,
  })), [engines]);

  // Geometric parameters dynamically calibrated to ensure non-overlapping card gaps across all screen sizes
  const { arcRadius, angleStepDeg, cardScaleDrop, rotationFactor } = useMemo(() => {
    if (windowWidth < 400) {
      // Extra compact mobile: wide angle step and smaller radius to maintain generous horizontal gap
      return { arcRadius: 760, angleStepDeg: 23.5, cardScaleDrop: 0.10, rotationFactor: 8.8 };
    } else if (windowWidth < 640) {
      // Standard mobile: distinct gap preventing any overlap
      return { arcRadius: 840, angleStepDeg: 21.0, cardScaleDrop: 0.08, rotationFactor: 9.2 };
    } else if (windowWidth < 1024) {
      // Tablet: smooth spacious arc
      return { arcRadius: 1180, angleStepDeg: 17.5, cardScaleDrop: 0.06, rotationFactor: 9.8 };
    } else {
      // Desktop: broad grand panorama arc
      return { arcRadius: 1480, angleStepDeg: 15.0, cardScaleDrop: 0.05, rotationFactor: 10.2 };
    }
  }, [windowWidth]);

  return (
    <section 
      ref={containerRef}
      className="w-full max-w-full py-8 sm:py-20 border-b border-[#18181b]/15 bg-[#fbf9f5] overflow-hidden select-none relative"
    >
      
      {/* Background Orbital Dashed Guide Arc */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-35">
        <svg className="w-[1400px] h-[550px] overflow-visible text-[#18181b]/30" viewBox="0 0 1400 550" fill="none">
          <path
            d="M -100 480 Q 700 80 1500 480"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />
          <circle cx="200" cy="370" r="3" fill="currentColor" />
          <circle cx="450" cy="220" r="3" fill="currentColor" />
          <circle cx="700" cy="140" r="4" fill="currentColor" />
          <circle cx="950" cy="220" r="3" fill="currentColor" />
          <circle cx="1200" cy="370" r="3" fill="currentColor" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 relative z-10 w-full overflow-hidden">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-3 mb-4 sm:mb-7">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#f1ede4] border border-[#18181b]/20 px-3 py-0.5 sm:py-1 text-[9px] xs:text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-widest text-[#18181b] rounded-full shadow-2xs">
            <span className="flex h-1.5 w-1.5 rounded-full bg-[#c44d31] animate-ping" />
            <Layers className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#c44d31]" />
            <span>Radial Suite ✱ 7 Decks</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#18181b]">
            Seven Specialized Civic Intelligence Decks
          </h2>

          <p className="text-xs sm:text-sm text-[#52525b] max-w-xl mx-auto leading-relaxed">
            Continuously cycling through our interactive investigative modules. Drag to spin freely, hover to pause, or click any card to enter.
          </p>
        </div>

        {/* Upgraded Horizontal Scrollable Pill-Tab Navigation Bar (Expanded Full Width) */}
        <div className="w-full max-w-4xl mx-auto mb-8 px-2">
          <PillTabNav
            tabs={showcaseTabs}
            activeId={engines[activeNormalizedIndex]?.id || engines[0].id}
            onTabChange={(tabId, index) => {
              jumpToEngine(index);
              playTickSound();
            }}
            ariaLabel="Civic Intelligence Showcase Modules"
            containerClassName="w-full"
          />
        </div>

        {/* Curved Radial Arc Deck Arena (Infinite Circular Rotating Wheel) */}
        <div 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            if (isDraggingRef.current) {
              setIsDragging(false);
              isDraggingRef.current = false;
              setTargetProgress(Math.round(progress));
            }
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="relative h-[310px] xs:h-[345px] sm:h-[395px] md:h-[435px] w-full flex items-center justify-center overflow-visible cursor-grab active:cursor-grabbing touch-pan-y"
        >
          {engines.map((engine, index) => {
            // Continuous wrapped difference in range [-totalEngines/2, totalEngines/2]
            const rawDiff = index - progress;
            let wrappedDiff = (rawDiff % totalEngines);
            if (wrappedDiff > totalEngines / 2) wrappedDiff -= totalEngines;
            if (wrappedDiff < -totalEngines / 2) wrappedDiff += totalEngines;

            const distance = wrappedDiff;
            const absDist = Math.abs(distance);

            // Hide cards rotated out around the horizon (cull appropriately on mobile to keep horizon clean)
            if (isMobile ? absDist > 2.0 : absDist > 2.8) return null;

            // Polar trigonometry matching the circular wheel geometry
            const angleRad = (distance * angleStepDeg * Math.PI) / 180;
            const translateX = arcRadius * Math.sin(angleRad);
            const translateY = arcRadius * (1 - Math.cos(angleRad));
            const rotationDeg = distance * rotationFactor;
            const scale = Math.max(0.76, 1 - absDist * cardScaleDrop);
            const opacity = isMobile
              ? (absDist > 1.3 ? Math.max(0, (2.0 - absDist) / 0.7) : 1)
              : (absDist > 2.2 ? Math.max(0, (2.8 - absDist) / 0.6) : 1);
            const zIndex = Math.round(40 - absDist * 10);
            const isCenter = absDist < 0.45;

            return (
              <div
                key={engine.id}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={(e) => {
                  if (hasMovedRef.current) return;
                  handleOpenEngine(engine);
                }}
                style={{
                  transform: `translate3d(${translateX.toFixed(2)}px, ${translateY.toFixed(2)}px, 0px) rotate(${rotationDeg.toFixed(2)}deg) scale(${scale.toFixed(3)})`,
                  transformOrigin: '50% 120%',
                  zIndex: zIndex,
                  opacity: opacity,
                  willChange: 'transform, opacity',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  boxShadow: isCenter
                    ? '0 24px 48px -12px rgba(24, 24, 27, 0.4), 0 10px 20px -8px rgba(24, 24, 27, 0.2)'
                    : '0 12px 26px -10px rgba(24, 24, 27, 0.2)',
                }}
                className={`absolute w-[250px] xs:w-[275px] sm:w-[340px] md:w-[380px] h-[230px] xs:h-[255px] sm:h-[295px] md:h-[325px] rounded-2xl sm:rounded-3xl border border-[#18181b]/35 bg-[#141416] flex flex-col justify-between overflow-hidden select-none transition-shadow cursor-pointer hover:border-zinc-400 ${
                  isCenter ? 'ring-2 ring-[#b4f82c]/60 ring-offset-2 ring-offset-zinc-950' : 'hover:opacity-95'
                }`}
              >
                
                {/* Main Screen Viewport (Top portion of card) */}
                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!hasMovedRef.current) {
                      handleOpenEngine(engine);
                    }
                  }}
                  className="flex-1 w-full relative overflow-hidden rounded-t-2xl sm:rounded-t-3xl cursor-pointer"
                >
                  {engine.renderScreen()}
                </div>

                {/* Bottom Dark Frame / Bezel Strip */}
                <div 
                  className="bg-[#141416] border-t border-[#27272a] text-white px-3 xs:px-3.5 sm:px-4 py-1.5 sm:py-2.5 flex items-center justify-between transition-colors select-none"
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (hasMovedRef.current) return;
                      handleOpenEngine(engine);
                    }}
                    className="flex items-center gap-1 text-left cursor-pointer hover:text-[#b4f82c] transition-colors"
                  >
                    <span className="text-[10.5px] xs:text-[11px] sm:text-[12.5px] font-sans font-medium text-zinc-100 tracking-tight hover:text-[#b4f82c]">
                      {engine.cardBadge}
                    </span>
                    <ArrowUpRight className="h-3 w-3 text-[#b4f82c] stroke-[2.5]" />
                  </button>

                  {engine.externalUrl && (
                    <a
                      href={engine.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      title={`Visit ${engine.externalTitle || 'official portal'}`}
                      className="flex items-center gap-1 text-[8px] xs:text-[8.5px] sm:text-[9.5px] font-mono text-zinc-400 hover:text-white px-1.5 py-0.5 rounded bg-zinc-800/80 border border-zinc-700/60 transition cursor-pointer"
                    >
                      <ExternalLink className="h-2.5 w-2.5 text-[#b4f82c]" />
                      <span className="hidden xs:inline">Portal</span>
                    </a>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Pagination Dots */}
        <div className="flex items-center justify-center gap-1.5 mt-2">
          {engines.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => {
                jumpToEngine(dotIdx);
                playTickSound();
              }}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                activeNormalizedIndex === dotIdx ? 'w-6 bg-[#18181b]' : 'w-2 bg-[#18181b]/20 hover:bg-[#18181b]/40'
              }`}
              title={`Switch to engine ${dotIdx + 1}`}
            />
          ))}
        </div>

      </div>

    </section>
  );
};

