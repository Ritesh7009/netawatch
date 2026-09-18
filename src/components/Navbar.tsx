import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Scale, 
  BarChart3, 
  Table2, 
  Sparkles, 
  Map, 
  FileCheck, 
  HelpCircle, 
  CheckCircle2, 
  GitFork,
  LayoutGrid,
  Compass,
  Menu,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Politician, ViewMode } from '../types';

interface NavbarProps {
  politicians: Politician[];
  selectedPolitician: Politician | null;
  onSelectPolitician: (p: Politician) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  compareList: Politician[];
  onOpenCompare: () => void;
  onOpenTransparencyGuide: () => void;
  onOpenAllIndiaDirectory: () => void;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
  onOpenAgentWorkspace?: () => void;
  agentCallCount?: number;
  isWebMCPReady?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  politicians,
  selectedPolitician,
  onSelectPolitician,
  viewMode,
  onViewModeChange,
  compareList,
  onOpenCompare,
  onOpenTransparencyGuide,
  onOpenAllIndiaDirectory,
  onOpenAgentWorkspace,
  agentCallCount = 0,
  isWebMCPReady = true,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navScrollRef = useRef<HTMLDivElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const [hoveredTabId, setHoveredTabId] = useState<string | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Drag-to-scroll refs matching PillTabNav
  const dragStartRef = useRef<{ x: number; scrollLeft: number; hasMoved: boolean }>({
    x: 0,
    scrollLeft: 0,
    hasMoved: false
  });

  // Soft mechanical haptic click synthesizer via Web Audio API matching specialized decks
  const playDeckTick = useCallback(() => {
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
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(280, ctx.currentTime + 0.03);
      
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.03);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.035);
    } catch {
      // Ignore if autoplay policy restricts sound
    }
  }, []);

  // Update scroll boundaries & compute dynamic edge fade mask matching PillTabNav
  const updateScrollAndMask = useCallback(() => {
    const el = navScrollRef.current;
    if (!el) return;

    const scrollLeft = el.scrollLeft;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    const tolerance = 3;

    const hasLeft = scrollLeft > tolerance;
    const hasRight = scrollLeft < maxScrollLeft - tolerance;

    setCanScrollLeft(hasLeft);
    setCanScrollRight(hasRight);

    // Apply CSS mask-image (linear-gradient) fading 28px at active scroll edges
    const fadeWidth = '28px';
    let maskValue = 'none';

    if (hasLeft && hasRight) {
      maskValue = `linear-gradient(to right, transparent 0, black ${fadeWidth}, black calc(100% - ${fadeWidth}), transparent 100%)`;
    } else if (hasLeft && !hasRight) {
      maskValue = `linear-gradient(to right, transparent 0, black ${fadeWidth}, black 100%)`;
    } else if (!hasLeft && hasRight) {
      maskValue = `linear-gradient(to right, black 0, black calc(100% - ${fadeWidth}), transparent 100%)`;
    } else {
      maskValue = 'none';
    }

    el.style.maskImage = maskValue;
    (el.style as any).webkitMaskImage = maskValue;
  }, []);

  useEffect(() => {
    updateScrollAndMask();
    window.addEventListener('resize', updateScrollAndMask);
    return () => window.removeEventListener('resize', updateScrollAndMask);
  }, [updateScrollAndMask]);

  // Pointer drag to scroll handling matching PillTabNav
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const container = navScrollRef.current;
    if (!container) return;

    dragStartRef.current = {
      x: e.clientX,
      scrollLeft: container.scrollLeft,
      hasMoved: false
    };
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const container = navScrollRef.current;
    if (!container) return;

    const dx = e.clientX - dragStartRef.current.x;
    if (Math.abs(dx) > 4) {
      dragStartRef.current.hasMoved = true;
    }

    container.scrollLeft = dragStartRef.current.scrollLeft - dx;
    updateScrollAndMask();
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Shrink nav on scroll past 40px
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 7 Specialized Civic Intelligence Decks + Direct Compare Dock
  const deckTabs: { 
    id: ViewMode; 
    index: string;
    label: string; 
    shortLabel: string; 
    icon: React.ElementType; 
    description: string;
    badge?: string;
  }[] = [
    { 
      id: 'grid', 
      index: '01',
      label: 'Overview', 
      shortLabel: 'Overview', 
      icon: LayoutGrid, 
      description: '543 MPs intelligence & interactive spotlight deck' 
    },
    { 
      id: 'representatives', 
      index: '02',
      label: 'My Reps', 
      shortLabel: 'My Reps', 
      icon: Compass, 
      description: 'Discover National MP, State MLA, Mayor & Ward',
      badge: 'Local'
    },
    { 
      id: 'legal-registry', 
      index: '03',
      label: 'Cases Ledger', 
      shortLabel: 'Cases', 
      icon: Scale, 
      description: 'Criminal charges & disclosed IPC/BNS affidavits',
      badge: '251 MPs'
    },
    { 
      id: 'map', 
      index: '04',
      label: '543 Map', 
      shortLabel: 'Map', 
      icon: Map, 
      description: '543 Parliamentary constituencies & states geospatial deck' 
    },
    { 
      id: 'manifesto', 
      index: '05',
      label: 'Promises', 
      shortLabel: 'Promises', 
      icon: FileCheck, 
      description: 'NDA & INDIA alliance 2024 manifesto audit' 
    },
    { 
      id: 'nepotism-tracker', 
      index: '06',
      label: 'Dynasties', 
      shortLabel: 'Dynasties', 
      icon: GitFork, 
      description: 'Dynastic lineages & multi-generational wealth tracker' 
    },
    { 
      id: 'table', 
      index: '07',
      label: 'Matrix', 
      shortLabel: 'Matrix', 
      icon: Table2, 
      description: 'Side-by-side MP performance data matrix' 
    },
    { 
      id: 'analytics', 
      index: '08',
      label: 'Charts', 
      shortLabel: 'Charts', 
      icon: BarChart3, 
      description: 'Wealth velocity & parliamentary asset curves' 
    },
  ];

  const handleTabClick = (tabId: ViewMode) => {
    playDeckTick();
    onViewModeChange(tabId);
    if (tabId === 'grid') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleArrowNav = (direction: 'prev' | 'next') => {
    if (!navScrollRef.current) return;
    const offset = direction === 'prev' ? -180 : 180;
    navScrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  const scrollNav = (direction: 'left' | 'right') => {
    if (!navScrollRef.current) return;
    const offset = direction === 'left' ? -180 : 180;
    navScrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <header 
      className={`sticky top-0 z-40 w-full max-w-full overflow-x-clip border-b border-[#18181b]/15 bg-[#f8f6f0]/95 backdrop-blur-md transition-all duration-200 shadow-[0_1px_3px_rgba(0,0,0,0.03)] box-border ${
        isScrolled ? 'py-1.5' : 'py-2'
      }`}
    >
      <div className="w-full max-w-full flex items-center justify-between px-2 sm:px-4 md:px-6 lg:px-8 gap-1.5 sm:gap-3 relative min-w-0 box-border">
        
        {/* Left: Terracotta NW Logo & NETAWATCH Brand Identity */}
        <div 
          onClick={() => {
            playDeckTick();
            onViewModeChange('grid');
            setIsMenuOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-1.5 sm:gap-2 cursor-pointer select-none group shrink-0"
          title="NETAWATCH - 18th Lok Sabha Political Intelligence"
        >
          {/* Terracotta Rust-Red NW Badge with Rounded Corners */}
          <div className="flex h-7.5 w-7.5 sm:h-9 sm:w-9 items-center justify-center bg-[#c44d31] text-white font-serif font-black text-xs sm:text-base tracking-tight rounded-[6px] shadow-xs transition-transform duration-150 group-hover:scale-[1.03]">
            NW
          </div>

          {/* Brand Name & 18TH LS Subtitle */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-1 sm:gap-1.5 leading-none">
              <span className="font-serif text-[15px] sm:text-[18px] font-black tracking-tight text-[#18181b]">
                NETAWATCH
              </span>
              <span className="bg-[#18181b] text-white px-1 sm:px-1.5 py-0.5 text-[7.5px] sm:text-[8.5px] font-mono font-bold uppercase tracking-wider rounded-[3px] shadow-2xs">
                18TH LS
              </span>
            </div>
            <p className="text-[7px] sm:text-[8px] tracking-[0.12em] uppercase text-[#71717a] font-semibold mt-0.5 leading-tight">
              POLITICAL INTELLIGENCE
            </p>
          </div>
        </div>

        {/* Center (Desktop lg+): Exact Seven Decks PillTabNav Bar */}
        <div className="hidden lg:flex items-center justify-center gap-1.5 min-w-0 flex-1 px-1 relative">
          
          {/* Left Navigation Arrow Button (PillTabNav style) */}
          <button
            type="button"
            onClick={() => handleArrowNav('prev')}
            disabled={!canScrollLeft}
            aria-label="Previous tab"
            className={`shrink-0 h-6.5 w-6.5 rounded-full border border-[#18181b]/15 bg-white/90 backdrop-blur-md text-[#18181b] flex items-center justify-center transition-all shadow-2xs ${
              canScrollLeft
                ? 'opacity-100 hover:bg-[#18181b] hover:text-white cursor-pointer active:scale-95'
                : 'opacity-25 cursor-not-allowed pointer-events-none'
            }`}
          >
            <ChevronLeft className="h-3 w-3" />
          </button>

          {/* Main Tab Bar Housing (Light cream pill container with dynamic edge fade mask) */}
          <div className="relative flex-1 min-w-0 max-w-fit bg-[#f1ede4]/90 p-0.5 sm:p-1 rounded-full border border-[#18181b]/15 backdrop-blur-md shadow-inner overflow-hidden">
            
            {/* Scrollable Row with Dynamic CSS Mask Image and Drag-to-Scroll */}
            <nav 
              ref={navScrollRef}
              onScroll={updateScrollAndMask}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              onMouseLeave={() => setHoveredTabId(null)}
              role="tablist"
              aria-label="Civic intelligence decks navigation" 
              className={`relative flex items-center gap-0.5 sm:gap-1 overflow-x-auto no-scrollbar py-0.5 px-1 scroll-smooth select-none ${
                isDragging ? 'cursor-grabbing' : 'cursor-grab'
              }`}
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {deckTabs.map((tab) => {
                const isActive = viewMode === tab.id;
                const isHovered = hoveredTabId === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      if (dragStartRef.current.hasMoved) return;
                      handleTabClick(tab.id);
                    }}
                    onMouseEnter={() => setHoveredTabId(tab.id)}
                    role="tab"
                    aria-selected={isActive}
                    className={`relative z-10 px-2.5 sm:px-3 py-1 text-[10px] sm:text-[11px] font-sans font-bold rounded-full transition-colors duration-200 whitespace-nowrap outline-none cursor-pointer select-none ${
                      isActive
                        ? 'text-white'
                        : 'text-[#52525b] hover:text-[#18181b]'
                    }`}
                    title={`${tab.label} — ${tab.description}`}
                  >
                    {/* 1. SHARED ACTIVE INDICATOR PILL (Slides with spring physics) */}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-deck-pill-active"
                        className="absolute inset-0 rounded-full bg-[#18181b] shadow-xs pointer-events-none"
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      />
                    )}

                    {/* 2. SHARED HOVER GHOST INDICATOR PILL (Outlined pill) */}
                    {!isActive && isHovered && (
                      <motion.div
                        layoutId="navbar-deck-pill-hover"
                        className="absolute inset-0 rounded-full border border-[#18181b]/30 bg-black/5 pointer-events-none"
                        transition={{ type: 'spring', stiffness: 600, damping: 40 }}
                      />
                    )}

                    {/* Tab Label Content with Badge */}
                    <span className="relative z-10 flex items-center gap-1 sm:gap-1.5">
                      <Icon className={`h-2.5 w-2.5 sm:h-3 sm:w-3 shrink-0 ${isActive ? 'text-white' : 'text-[#71717a]'}`} />
                      <span>{tab.shortLabel}</span>
                      {tab.badge && (
                        <span 
                          className={`text-[7.5px] sm:text-[8px] font-mono px-1 py-0.2 rounded transition-colors ${
                            isActive ? 'bg-white/20 text-[#b4f82c]' : 'bg-black/10 text-zinc-600'
                          }`}
                        >
                          {tab.badge}
                        </span>
                      )}
                    </span>
                  </button>
                );
              })}

              {/* Direct Compare Deck Button matching PillTabNav tabs */}
              <button
                onClick={() => {
                  if (dragStartRef.current.hasMoved) return;
                  playDeckTick();
                  onOpenCompare();
                }}
                onMouseEnter={() => setHoveredTabId('compare')}
                id="compare-drawer-button"
                className={`relative z-10 px-2.5 sm:px-3 py-1 text-[10px] sm:text-[11px] font-sans font-bold rounded-full transition-colors duration-200 whitespace-nowrap outline-none cursor-pointer select-none ${
                  compareList.length > 0
                    ? 'text-white'
                    : 'text-[#52525b] hover:text-[#18181b]'
                }`}
                title="Compare Selected MPs Side-by-Side"
              >
                {compareList.length > 0 && (
                  <motion.div
                    layoutId="navbar-deck-pill-compare-active"
                    className="absolute inset-0 rounded-full bg-[#c44d31] shadow-xs pointer-events-none"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}

                {compareList.length === 0 && hoveredTabId === 'compare' && (
                  <motion.div
                    layoutId="navbar-deck-pill-hover"
                    className="absolute inset-0 rounded-full border border-[#18181b]/30 bg-black/5 pointer-events-none"
                    transition={{ type: 'spring', stiffness: 600, damping: 40 }}
                  />
                )}

                <span className="relative z-10 flex items-center gap-1 sm:gap-1.5">
                  <Scale className="h-2.5 w-2.5 sm:h-3 sm:w-3 shrink-0" />
                  <span>Compare</span>
                  {compareList.length > 0 && (
                    <span className="flex h-3.5 w-3.5 items-center justify-center bg-white text-[#c44d31] text-[8px] font-black rounded-full ml-0.5">
                      {compareList.length}
                    </span>
                  )}
                </span>
              </button>
            </nav>
          </div>

          {/* Right Navigation Arrow Button (PillTabNav style) */}
          <button
            type="button"
            onClick={() => handleArrowNav('next')}
            disabled={!canScrollRight}
            aria-label="Next tab"
            className={`shrink-0 h-6.5 w-6.5 rounded-full border border-[#18181b]/15 bg-white/90 backdrop-blur-md text-[#18181b] flex items-center justify-center transition-all shadow-2xs ${
              canScrollRight
                ? 'opacity-100 hover:bg-[#18181b] hover:text-white cursor-pointer active:scale-95'
                : 'opacity-25 cursor-not-allowed pointer-events-none'
            }`}
          >
            <ChevronRight className="h-3 w-3" />
          </button>

        </div>

        {/* Right Section: Desktop 543 MPs Directory, WebMCP Inspector, Guide & Mobile Menu */}
        <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 shrink-0 min-w-0">
          
          {/* 543 MPs Directory Button */}
          <button
            onClick={() => {
              playDeckTick();
              onOpenAllIndiaDirectory();
            }}
            id="all-india-mp-directory-button"
            className="flex items-center gap-1 bg-[#18181b] text-white px-2 sm:px-2.5 py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider hover:bg-[#c44d31] transition-all rounded-full shadow-xs cursor-pointer select-none shrink-0"
            title="All-India 543 MPs Directory"
          >
            <Sparkles className="h-3 w-3 text-amber-300 shrink-0" />
            <span className="hidden xs:inline">543 MPs</span>
            <span className="xs:hidden">543</span>
          </button>

          {/* Compact Compare Pill on mobile if politicians are selected */}
          {compareList.length > 0 && (
            <button
              onClick={() => {
                playDeckTick();
                onOpenCompare();
              }}
              className="flex lg:hidden items-center gap-1 bg-[#c44d31] text-white px-2 py-1 text-[9.5px] font-bold uppercase tracking-wider rounded-full transition cursor-pointer shrink-0 shadow-2xs"
              title="Compare Selected MPs"
            >
              <Scale className="h-2.5 w-2.5" />
              <span className="flex h-3 w-3 items-center justify-center bg-white text-[#c44d31] text-[7.5px] font-black rounded-full">
                {compareList.length}
              </span>
            </button>
          )}

          {/* Desktop WebMCP Agent Inspector Button */}
          {onOpenAgentWorkspace && (
            <button
              onClick={() => {
                playDeckTick();
                onOpenAgentWorkspace();
              }}
              id="webmcp-agent-workspace-button"
              className="hidden lg:flex items-center gap-1.5 bg-[#18181b] hover:bg-[#c44d31] text-white px-2 xl:px-2.5 py-1 text-[9.5px] xl:text-[10px] font-mono font-bold uppercase tracking-wider rounded-full shadow-xs cursor-pointer select-none shrink-0 transition"
              title="Open WebMCP Agent Inspector, Tools Schema & Live Telemetry"
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="hidden xl:inline">WebMCP</span>
              <span className="xl:hidden">MCP</span>
              {agentCallCount > 0 && (
                <span className="flex h-3 px-1 items-center justify-center bg-emerald-600 text-[7.5px] font-mono font-bold text-white rounded-full">
                  {agentCallCount}
                </span>
              )}
            </button>
          )}

          {/* Desktop Transparency Guide Button */}
          <button
            onClick={() => {
              playDeckTick();
              onOpenTransparencyGuide();
            }}
            title="Citizen Audit & Methodology Guide"
            className="hidden lg:flex items-center justify-center h-7 w-7 rounded-full border border-[#18181b]/20 bg-white text-[#52525b] hover:text-[#18181b] hover:border-[#18181b] transition cursor-pointer shrink-0"
          >
            <HelpCircle className="h-3.5 w-3.5" />
          </button>

          {/* Top-Right: Mobile Dropdown Menu Button */}
          <div ref={menuRef} aria-label="Mobile Navigation" className="relative lg:hidden shrink-0">
            <button
              type="button"
              id="mobile-3d-menu-button"
              onClick={() => {
                playDeckTick();
                setIsMenuOpen((prev) => !prev);
              }}
              aria-expanded={isMenuOpen}
              aria-haspopup="true"
              className={`flex items-center justify-center h-7.5 w-7.5 rounded-full border transition-all duration-200 cursor-pointer select-none shadow-2xs ${
                isMenuOpen
                  ? 'border-[#18181b] bg-[#18181b] text-white shadow-md'
                  : 'border-[#18181b]/25 bg-[#f1ede4] text-[#18181b] hover:bg-white hover:border-[#18181b]/50'
              }`}
              title="Civic Decks & Navigation"
            >
              {isMenuOpen ? (
                <X className="h-3.5 w-3.5" />
              ) : (
                <Menu className="h-3.5 w-3.5" />
              )}
            </button>

            {/* Mobile Dropdown Menu Popover */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div 
                  role="menu"
                  aria-orientation="vertical"
                  initial={{ opacity: 0, scale: 0.95, y: -6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-[88vw] max-w-[290px] bg-[#18181b] text-white border border-white/20 rounded-2xl shadow-2xl p-2.5 z-50 box-border"
                >
                  <div className="px-2 py-1.5 border-b border-white/10 mb-1.5 flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400">
                      7 Specialized Decks
                    </span>
                    <span className="text-[9px] font-mono text-[#c44d31] font-bold bg-[#c44d31]/20 px-1.5 py-0.5 rounded-full">
                      18th LS Audit
                    </span>
                  </div>

                  <div className="space-y-1 max-h-[380px] overflow-y-auto pr-0.5 no-scrollbar">
                    {deckTabs.map((tab) => {
                      const isActive = viewMode === tab.id;
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          role="menuitem"
                          onClick={() => {
                            handleTabClick(tab.id);
                            setIsMenuOpen(false);
                          }}
                          className={`w-full flex items-center justify-between gap-2.5 px-2.5 py-2 text-left rounded-xl transition-all cursor-pointer ${
                            isActive
                              ? 'bg-[#c44d31] text-white shadow-xs font-semibold'
                              : 'text-zinc-300 hover:bg-white/10'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="text-[9px] font-mono text-zinc-400 font-bold w-4 shrink-0">
                              {tab.index}
                            </span>
                            <div className={`flex h-7 w-7 items-center justify-center rounded-lg shrink-0 ${
                              isActive 
                                ? 'bg-white/20 text-white' 
                                : 'bg-white/5 text-zinc-300'
                            }`}>
                              <Icon className="h-3.5 w-3.5" />
                            </div>
                            <div className="truncate">
                              <div className="text-xs font-serif font-bold tracking-tight">
                                {tab.label}
                              </div>
                              <div className={`text-[9px] truncate ${
                                isActive ? 'text-white/80' : 'text-zinc-400'
                              }`}>
                                {tab.description}
                              </div>
                            </div>
                          </div>

                          {isActive && (
                            <CheckCircle2 className="h-4 w-4 text-amber-300 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Additional Quick Utility Links at bottom of mobile dropdown */}
                  <div className="pt-2 mt-2 border-t border-white/10 flex flex-col gap-1.5 px-0.5">
                    {onOpenAgentWorkspace && (
                      <button
                        onClick={() => {
                          playDeckTick();
                          setIsMenuOpen(false);
                          onOpenAgentWorkspace();
                        }}
                        className="w-full flex items-center justify-between px-2.5 py-2 text-[10px] font-mono font-bold bg-white/10 hover:bg-[#c44d31] text-white rounded-lg transition cursor-pointer"
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                          </span>
                          <span>WebMCP Agent Inspector</span>
                        </div>
                        <span className="text-[9px] bg-white/20 px-1.5 py-0.5 rounded text-white">
                          {agentCallCount}
                        </span>
                      </button>
                    )}
                    <div className="flex items-center justify-between gap-1.5">
                      <button
                        onClick={() => {
                          playDeckTick();
                          setIsMenuOpen(false);
                          onOpenTransparencyGuide();
                        }}
                        className="flex-1 flex items-center justify-center gap-1 py-1.5 text-[10px] font-bold text-zinc-300 hover:text-white bg-white/5 hover:bg-white/15 rounded-lg transition cursor-pointer"
                      >
                        <HelpCircle className="h-3 w-3" />
                        <span>Audit Guide</span>
                      </button>
                      <button
                        onClick={() => {
                          playDeckTick();
                          setIsMenuOpen(false);
                          onOpenCompare();
                        }}
                        className="flex-1 flex items-center justify-center gap-1 py-1.5 text-[10px] font-bold text-zinc-300 hover:text-white bg-white/5 hover:bg-white/15 rounded-lg transition cursor-pointer"
                      >
                        <Scale className="h-3 w-3" />
                        <span>Compare ({compareList.length})</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </header>
  );
};

