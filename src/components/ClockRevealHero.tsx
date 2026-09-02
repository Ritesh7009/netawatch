import React, { useRef, useState, useMemo, useEffect } from 'react';
import { 
  RotateCcw, 
  Play, 
  Pause, 
  Sparkles, 
  Clock, 
  Code, 
  Check, 
  Copy, 
  Layers, 
  Maximize2, 
  Sliders, 
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { useClockReveal, ClockRevealOptions } from '../hooks/useClockReveal';

export interface ClockRevealHeroProps {
  imageSrc?: string;
  imageAlt?: string;
  badgeText?: string;
  title?: string;
  subtitle?: string;
  aspectRatio?: '3/4' | '4/5' | '1/1' | '16/9';
  tickCount?: number;
  showControls?: boolean;
  className?: string;
  onAnimationComplete?: () => void;
}

const SAMPLE_HERO_SUBJECTS = [
  {
    id: 'parliament-facade',
    name: 'Sansad Bhavan (Constitution Hall)',
    category: 'Civic Architecture',
    url: 'https://images.unsplash.com/photo-1598971861713-54ad16a7e72e?auto=format&fit=crop&w=1200&q=80',
    caption: '18th Lok Sabha & Central Vista Parliamentary Apex'
  },
  {
    id: 'editorial-portrait-1',
    name: 'Official State Dossier (Editorial)',
    category: 'Leader Portrait',
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=80',
    caption: 'High-precision photographic audit verification'
  },
  {
    id: 'editorial-portrait-2',
    name: 'Constitutional Archive & Ledger',
    category: 'Legal Heritage',
    url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
    caption: 'Form 26 sworn affidavits and parliamentary ledger records'
  },
  {
    id: 'leader-portrait',
    name: 'Parliamentary Representative',
    category: 'Verified Member',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80',
    caption: 'Direct MP Hansard and constituency attendance scrutiny'
  }
];

export const ClockRevealHero: React.FC<ClockRevealHeroProps> = ({
  imageSrc = SAMPLE_HERO_SUBJECTS[0].url,
  imageAlt = 'Hero Portrait Reveal',
  badgeText = 'Evidence-First Parliamentary Dossier',
  title = '18th Lok Sabha Intelligence & Verification Hub',
  subtitle = 'Precision time-series audit across 543 parliamentary constituencies with sworn Form 26 affidavits and Hansard records.',
  aspectRatio = '3/4',
  tickCount = 60,
  showControls = true,
  className = '',
  onAnimationComplete
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const ticksSvgRef = useRef<SVGSVGElement>(null);

  const [activeSubject, setActiveSubject] = useState(SAMPLE_HERO_SUBJECTS[0]);
  const [durationPhase1, setDurationPhase1] = useState(1.35);
  const [durationPhase2, setDurationPhase2] = useState(0.75);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Reusable GSAP Animation Hook
  const {
    isAnimating,
    phase,
    progress,
    angle,
    morphProgress,
    play,
    pause,
    restart,
    seek
  } = useClockReveal(
    containerRef,
    imageWrapperRef,
    imageRef,
    ticksSvgRef,
    {
      durationPhase1,
      durationPhase2,
      autoPlay: true,
      targetBorderRadius: '24px',
      onComplete: onAnimationComplete
    }
  );

  // Generate 60 radial clock tick marks in SVG space (viewBox 0 0 400 400, center 200, 200)
  const ticks = useMemo(() => {
    const list = [];
    const cx = 200;
    const cy = 200;
    const baseRadius = 158; // Circle perimeter
    const totalTicks = Math.max(24, Math.min(72, tickCount));

    for (let i = 0; i < totalTicks; i++) {
      const deg = (i * 360) / totalTicks - 90; // Start at 12 o'clock (-90deg)
      const rad = (deg * Math.PI) / 180;
      const isHourMark = i % (totalTicks / 12) === 0;
      const tickLength = isHourMark ? 14 : 7;
      const r1 = baseRadius + 4;
      const r2 = r1 + tickLength;

      const x1 = cx + r1 * Math.cos(rad);
      const y1 = cy + r1 * Math.sin(rad);
      const x2 = cx + r2 * Math.cos(rad);
      const y2 = cy + r2 * Math.sin(rad);

      list.push({
        id: i,
        x1,
        y1,
        x2,
        y2,
        isHourMark,
        deg
      });
    }
    return list;
  }, [tickCount]);

  // Current clock-hand pointer coordinate at the sweep frontier
  const handSweepCoords = useMemo(() => {
    const cx = 200;
    const cy = 200;
    const r = 160;
    const curDeg = angle - 90; // Start at 12 o'clock
    const rad = (curDeg * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
      deg: angle
    };
  }, [angle]);

  // Handle Copy Snippet
  const handleCopyCode = () => {
    const code = `// Clock Reveal Animation with GSAP
import gsap from 'gsap';

const tl = gsap.timeline();
const proxy = { angle: 0, morph: 0 };

// Phase 1: Radial Clock Sweep (1.35s)
tl.to(proxy, {
  angle: 360,
  duration: 1.35,
  ease: 'power2.inOut',
  onUpdate: () => {
    const mask = \`conic-gradient(from -90deg at 50% 50%, #000 0deg, #000 \${proxy.angle}deg, transparent \${proxy.angle}deg 360deg)\`;
    imageWrapper.style.maskImage = mask;
    imageWrapper.style.webkitMaskImage = mask;
  }
});

// Phase 2: Shape Morph Circle -> Rect (0.75s)
tl.to(proxy, {
  morph: 1,
  duration: 0.75,
  ease: 'power3.out',
  onUpdate: () => {
    const radius = (1 - proxy.morph) * 50;
    imageWrapper.style.clipPath = 'none';
    imageWrapper.style.borderRadius = \`\${radius}%\`;
    image.style.transform = \`scale(\${1.10 - proxy.morph * 0.10})\`;
  }
}, "-=0.08");`;

    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const getAspectClass = () => {
    switch (aspectRatio) {
      case '4/5': return 'aspect-[4/5]';
      case '1/1': return 'aspect-square';
      case '16/9': return 'aspect-video';
      default: return 'aspect-[3/4]';
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full overflow-hidden bg-[#141416] text-white rounded-3xl border border-zinc-800 shadow-2xl p-4 sm:p-6 md:p-8 select-none ${className}`}
    >
      {/* Background Decorative Ambient Radial Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(196,77,49,0.12),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none opacity-40" />

      {/* Top Header Bar */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-800/80 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-[#c44d31] to-amber-600 flex items-center justify-center shadow-md">
            <Clock className="h-4 w-4 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold tracking-widest text-[#b4f82c] uppercase">
                HERO INTRO ENGINE
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300">
                GSAP Timeline
              </span>
            </div>
            <h3 className="font-serif font-black text-sm sm:text-base text-zinc-100 tracking-tight">
              Clock Reveal & Morph Animation
            </h3>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={restart}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#c44d31] hover:bg-[#b03d22] text-white text-xs font-mono font-bold transition shadow-md cursor-pointer hover:scale-105 active:scale-95"
            title="Replay Reveal Animation"
          >
            <RotateCcw className={`h-3.5 w-3.5 ${isAnimating ? 'animate-spin' : ''}`} />
            <span>Replay Reveal</span>
          </button>

          <button
            type="button"
            onClick={() => setShowCodeModal(true)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-zinc-800/90 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700/80 text-xs font-mono transition cursor-pointer"
            title="View Implementation Code"
          >
            <Code className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Code</span>
          </button>
        </div>
      </div>

      {/* Main Dual-Column Hero Visual Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Contextual Editorial Hero Headline & Telemetry */}
        <div className="lg:col-span-6 space-y-4 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 text-[11px] font-mono text-zinc-300">
            <span className="h-2 w-2 rounded-full bg-[#b4f82c] animate-pulse" />
            <span>{badgeText}</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-[1.15]">
            {title}
          </h2>

          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-xl">
            {subtitle}
          </p>

          {/* Live Animation Telemetry Card */}
          <div className="bg-zinc-900/80 rounded-2xl border border-zinc-800/90 p-3.5 space-y-2.5 backdrop-blur-md">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-400 font-medium">Animation Status:</span>
              <span className="font-bold flex items-center gap-1.5">
                {phase === 'phase1' && (
                  <span className="text-amber-400 flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
                    Phase 1: Radial Clock Sweep ({Math.round(angle)}°)
                  </span>
                )}
                {phase === 'phase2' && (
                  <span className="text-sky-400 flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
                    Phase 2: Shape Morph ({Math.round(morphProgress * 100)}%)
                  </span>
                )}
                {phase === 'completed' && (
                  <span className="text-[#b4f82c] flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Fully Revealed & Settled
                  </span>
                )}
                {phase === 'idle' && (
                  <span className="text-zinc-500">Ready</span>
                )}
              </span>
            </div>

            {/* Custom Interactive Progress Bar / Scrubber */}
            <div className="space-y-1">
              <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden relative cursor-pointer group"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickProg = (e.clientX - rect.left) / rect.width;
                  seek(clickProg);
                }}
              >
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 via-[#c44d31] to-[#b4f82c] transition-all duration-75"
                  style={{ width: `${Math.round(progress * 100)}%` }}
                />
                {/* 60% Marker (Phase 1 to Phase 2 transition point) */}
                <div className="absolute top-0 bottom-0 left-[62%] w-0.5 bg-white/40 pointer-events-none" title="Phase 2 Morph Start" />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                <span>0.0s (Sweep Start)</span>
                <span className="text-zinc-400">1.35s (Morph)</span>
                <span>2.1s (Done)</span>
              </div>
            </div>

            {/* Subject Selector Pills */}
            <div className="pt-2 border-t border-zinc-800/80">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-1.5">
                Switch Hero Subject:
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {SAMPLE_HERO_SUBJECTS.map((sub) => (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => {
                      setActiveSubject(sub);
                      restart();
                    }}
                    className={`text-left p-1.5 rounded-xl border text-[11px] font-mono transition cursor-pointer truncate ${
                      activeSubject.id === sub.id
                        ? 'bg-zinc-800 border-[#b4f82c]/60 text-white font-bold'
                        : 'bg-zinc-950/60 border-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                    }`}
                  >
                    <span className="block truncate">{sub.name}</span>
                    <span className="text-[9px] text-zinc-500 block truncate">{sub.category}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: The Clock Reveal Portrait Visual Canvas */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
          
          {/* Outer Centering Canvas Wrapper */}
          <div className="relative w-full max-w-[340px] sm:max-w-[380px] flex items-center justify-center">
            
            {/* 1. SVG RADIAL CLOCK TICKS (40-60 evenly spaced marks pointing outward) */}
            <svg
              ref={ticksSvgRef}
              viewBox="0 0 400 400"
              className="absolute inset-0 w-full h-full pointer-events-none z-0 transition-opacity duration-300"
              style={{ filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.15))' }}
            >
              <defs>
                {/* Subtle outer glow gradient */}
                <radialGradient id="clockDialGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="65%" stopColor="#ffffff" stopOpacity="0" />
                  <stop offset="90%" stopColor="#b4f82c" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.25" />
                </radialGradient>
              </defs>

              {/* Faint Outer Ring track */}
              <circle
                cx="200"
                cy="200"
                r="168"
                fill="none"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1"
                strokeDasharray="2 4"
              />

              {/* 60 Minute / Radial Tick Marks */}
              {ticks.map((tick) => (
                <line
                  key={tick.id}
                  x1={tick.x1}
                  y1={tick.y1}
                  x2={tick.x2}
                  y2={tick.y2}
                  className="radial-tick-mark transition-opacity"
                  stroke={tick.isHourMark ? '#b4f82c' : 'rgba(255,255,255,0.55)'}
                  strokeWidth={tick.isHourMark ? 2.2 : 1.2}
                  strokeLinecap="round"
                />
              ))}

              {/* Leading Radar Sweep Clock-Hand Vector (Active during Phase 1) */}
              {phase === 'phase1' && (
                <g className="transition-opacity">
                  {/* Center Pivot Hub */}
                  <circle cx="200" cy="200" r="4" fill="#b4f82c" />
                  {/* Rotating Sweeping Arm */}
                  <line
                    x1="200"
                    y1="200"
                    x2={handSweepCoords.x}
                    y2={handSweepCoords.y}
                    stroke="#b4f82c"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="4 2"
                  />
                  {/* Glowing Leading Node */}
                  <circle
                    cx={handSweepCoords.x}
                    cy={handSweepCoords.y}
                    r="4"
                    fill="#ffffff"
                    stroke="#b4f82c"
                    strokeWidth="2"
                  />
                </g>
              )}
            </svg>

            {/* 2. THE HERO IMAGE CONTAINER (Portrait 3:4 or 4:5 fixed aspect ratio) */}
            <div className={`relative w-[280px] sm:w-[320px] ${getAspectClass()} z-10 p-1 flex items-center justify-center`}>
              
              {/* Image Mask / Frame Wrapper (Interpolated by GSAP) */}
              <div
                ref={imageWrapperRef}
                className="relative w-full h-full overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/20 bg-zinc-950 will-change-[clip-path,border-radius,mask-image]"
                style={{
                  clipPath: 'circle(50% at 50% 50%)',
                  borderRadius: '50%'
                }}
              >
                {/* The Hero Image (Smooth settling scale 1.10 -> 1.00) */}
                <img
                  ref={imageRef}
                  src={activeSubject.url || imageSrc}
                  alt={imageAlt}
                  className="w-full h-full object-cover object-center select-none will-change-transform"
                  style={{ transform: 'scale(1.10)' }}
                  loading="eager"
                  crossOrigin="anonymous"
                />

                {/* Dark Vignette / Gradient Edge Overlay for Depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/30 pointer-events-none" />

                {/* Caption / Subject Info Pill inside image (Visible on reveal) */}
                <div 
                  className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/15 text-white transition-opacity duration-300"
                  style={{ opacity: morphProgress > 0.4 ? 1 : 0 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-[#b4f82c] font-bold">
                      {activeSubject.category}
                    </span>
                    <span className="text-[9px] font-mono text-zinc-400">
                      ID: #{activeSubject.id.slice(0, 8)}
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-xs sm:text-sm text-white truncate">
                    {activeSubject.name}
                  </h4>
                  <p className="text-[10px] text-zinc-300 truncate mt-0.5">
                    {activeSubject.caption}
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Quick Playback Bar under the Visual */}
          <div className="mt-4 flex items-center gap-3 bg-zinc-900/90 border border-zinc-800 px-4 py-2 rounded-full backdrop-blur-md text-xs font-mono">
            <button
              type="button"
              onClick={isAnimating ? pause : play}
              className="flex items-center gap-1.5 text-zinc-200 hover:text-white transition cursor-pointer"
            >
              {isAnimating ? <Pause className="h-3.5 w-3.5 text-amber-400" /> : <Play className="h-3.5 w-3.5 text-[#b4f82c]" />}
              <span>{isAnimating ? 'Pause' : 'Play'}</span>
            </button>

            <span className="text-zinc-600">|</span>

            <span className="text-zinc-400 text-[11px]">
              Angle: <strong className="text-white">{Math.round(angle)}°</strong>
            </span>

            <span className="text-zinc-600">|</span>

            <span className="text-zinc-400 text-[11px]">
              Morph: <strong className="text-white">{Math.round(morphProgress * 100)}%</strong>
            </span>
          </div>

        </div>

      </div>

      {/* CODE & IMPLEMENTATION SNIPPET MODAL */}
      {showCodeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#18181b] border border-zinc-700 rounded-2xl shadow-2xl p-6 space-y-4 text-left">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <Code className="h-4 w-4 text-[#b4f82c]" />
                <h3 className="font-mono text-sm font-bold text-white">
                  GSAP Clock Reveal Implementation
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowCodeModal(false)}
                className="text-zinc-400 hover:text-white text-xs font-mono px-2 py-1 rounded bg-zinc-800 cursor-pointer"
              >
                Close (ESC)
              </button>
            </div>

            <p className="text-xs text-zinc-400">
              The clock reveal is orchestrated with a two-phase GSAP timeline using a dynamic conic-gradient CSS mask and SVG radial tick marks:
            </p>

            <div className="relative bg-zinc-950 rounded-xl p-3.5 border border-zinc-800 overflow-x-auto text-[11px] font-mono text-zinc-300 leading-relaxed">
              <pre>{`// Phase 1: Radial Clock Sweep (1.35s, power2.inOut)
tl.to(proxy, {
  angle: 360,
  duration: 1.35,
  ease: 'power2.inOut',
  onUpdate: () => {
    const mask = \`conic-gradient(from -90deg at 50% 50%, #000 0deg, #000 \${proxy.angle}deg, transparent \${proxy.angle}deg 360deg)\`;
    imageWrapper.style.maskImage = mask;
    imageWrapper.style.webkitMaskImage = mask;
  }
});

// Phase 2: Shape Morph Circle -> Rect (0.75s, power3.out)
tl.to(proxy, {
  morph: 1,
  duration: 0.75,
  ease: 'power3.out',
  onUpdate: () => {
    const radius = (1 - proxy.morph) * 50;
    imageWrapper.style.clipPath = 'none';
    imageWrapper.style.borderRadius = \`\${radius}%\`;
    image.style.transform = \`scale(\${1.10 - proxy.morph * 0.10})\`;
  }
}, "-=0.08");`}</pre>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#c44d31] hover:bg-[#b03d22] text-white text-xs font-mono font-bold transition cursor-pointer"
              >
                {copiedCode ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedCode ? 'Copied to Clipboard!' : 'Copy Code Snippet'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
