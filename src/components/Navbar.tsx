import React, { useState, useEffect, useRef } from 'react';
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
  Menu,
  X
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

  const navTabs: { id: ViewMode; label: string; shortLabel: string; icon: React.ElementType; description?: string }[] = [
    { id: 'grid', label: 'Overview', shortLabel: 'Overview', icon: LayoutGrid, description: 'Hero intelligence & interactive deck' },
    { id: 'legal-registry', label: 'Cases Ledger', shortLabel: 'Cases', icon: Scale, description: 'Criminal charges & judicial dossiers' },
    { id: 'map', label: 'Interactive Map', shortLabel: 'Map', icon: Map, description: '543 Parliamentary constituencies & states' },
    { id: 'manifesto', label: 'Promises Tracker', shortLabel: 'Promises', icon: FileCheck, description: 'NDA & INDIA alliance manifesto audit' },
    { id: 'nepotism-tracker', label: 'Nepotism Index', shortLabel: 'Dynasties', icon: GitFork, description: 'Dynasties & multi-generational wealth' },
    { id: 'table', label: 'Comparison Matrix', shortLabel: 'Matrix', icon: Table2, description: 'Side-by-side MP performance analytics' },
    { id: 'analytics', label: 'Parliamentary Charts', shortLabel: 'Charts', icon: BarChart3, description: 'Distribution & asset wealth curves' },
  ];

  return (
    <header 
      className={`sticky top-0 z-40 w-full max-w-full overflow-x-clip border-b border-[#18181b]/15 bg-[#f8f6f0]/95 backdrop-blur-md transition-all duration-200 shadow-[0_1px_3px_rgba(0,0,0,0.03)] ${
        isScrolled ? 'py-1.5' : 'py-2'
      }`}
    >
      <div className="w-full flex items-center justify-between px-3 sm:px-4 md:px-6 lg:px-8 gap-2 sm:gap-3 relative">
        
        {/* Left: Terracotta NW Logo & NETAWATCH Brand Identity */}
        <div 
          onClick={() => {
            onViewModeChange('grid');
            setIsMenuOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 cursor-pointer select-none group shrink-0"
          title="NETAWATCH - 18th Lok Sabha Political Intelligence"
        >
          {/* Terracotta Rust-Red NW Badge with Rounded Corners */}
          <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center bg-[#c44d31] text-white font-serif font-black text-sm sm:text-base tracking-tight rounded-[6px] shadow-xs transition-transform duration-150 group-hover:scale-[1.03]">
            NW
          </div>

          {/* Brand Name & 18TH LS Subtitle */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-serif text-[16px] sm:text-[18px] font-black tracking-tight text-[#18181b]">
                NETAWATCH
              </span>
              <span className="bg-[#18181b] text-white px-1.5 py-0.5 text-[8px] sm:text-[8.5px] font-mono font-bold uppercase tracking-wider rounded-[3px] shadow-2xs">
                18TH LS
              </span>
            </div>
            <p className="text-[7.5px] sm:text-[8px] tracking-[0.12em] uppercase text-[#71717a] font-semibold mt-0.5 leading-tight">
              POLITICAL INTELLIGENCE
            </p>
          </div>
        </div>

        {/* Center (Desktop lg+): Grouped Navigation Pills (including Compare Button) */}
        <div className="hidden lg:flex items-center justify-center shrink-0 min-w-0">
          <nav aria-label="Desktop Navigation" className="flex items-center gap-0.5 border border-[#18181b]/20 bg-[#ece8de]/80 backdrop-blur-xs p-1 rounded-full shadow-2xs">
            {navTabs.map((tab) => {
              const isActive = viewMode === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    onViewModeChange(tab.id);
                    if (tab.id === 'grid') {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className={`flex items-center gap-1.5 px-2 xl:px-2.5 2xl:px-3 py-1 text-[10px] xl:text-[10.5px] 2xl:text-[11px] font-bold uppercase tracking-wider rounded-full transition-all duration-150 whitespace-nowrap cursor-pointer select-none ${
                    isActive
                      ? 'bg-[#18181b] text-white shadow-xs'
                      : 'text-[#4b4b52] hover:text-[#18181b] hover:bg-black/5'
                  }`}
                >
                  <Icon className={`h-3 w-3 shrink-0 ${isActive ? 'text-[#b4f82c]' : 'text-current'}`} />
                  <span className="hidden 2xl:inline">{tab.label}</span>
                  <span className="2xl:hidden">{tab.shortLabel}</span>
                </button>
              );
            })}

            {/* Compare Button placed right along with all the nav buttons */}
            <button
              onClick={onOpenCompare}
              id="compare-drawer-button"
              className={`flex items-center gap-1 px-2 xl:px-2.5 2xl:px-3 py-1 text-[10px] xl:text-[10.5px] 2xl:text-[11px] font-bold uppercase tracking-wider rounded-full transition-all duration-150 whitespace-nowrap cursor-pointer select-none ${
                compareList.length > 0
                  ? 'bg-[#c44d31] text-white shadow-xs'
                  : 'text-[#4b4b52] hover:text-[#18181b] hover:bg-black/5'
              }`}
              title="Compare Selected MPs"
            >
              <Scale className={`h-3 w-3 shrink-0 ${compareList.length > 0 ? 'text-white' : 'text-current'}`} />
              <span>Compare</span>
              {compareList.length > 0 && (
                <span className="flex h-3.5 w-3.5 items-center justify-center bg-white text-[#c44d31] text-[8px] font-black rounded-full ml-0.5">
                  {compareList.length}
                </span>
              )}
            </button>
          </nav>
        </div>

        {/* Right Section: Desktop 543 MPs, WebMCP Inspector, Transparency & Mobile Menu */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          
          {/* 543 MPs Directory Button */}
          <button
            onClick={onOpenAllIndiaDirectory}
            id="all-india-mp-directory-button"
            className="flex items-center gap-1 bg-[#18181b] text-white px-2.5 py-1 text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-wider hover:bg-[#c44d31] transition-all rounded-full shadow-xs cursor-pointer select-none shrink-0"
            title="All-India 543 MPs Directory"
          >
            <Sparkles className="h-3 w-3 text-amber-300 shrink-0" />
            <span>543 MPs</span>
          </button>

          {/* Compact Compare Pill on mobile if politicians are selected */}
          {compareList.length > 0 && (
            <button
              onClick={onOpenCompare}
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
              onClick={onOpenAgentWorkspace}
              id="webmcp-agent-workspace-button"
              className="hidden lg:flex items-center gap-1.5 bg-[#18181b] hover:bg-[#c44d31] text-white px-2.5 py-1 text-[10px] xl:text-[10.5px] font-mono font-bold uppercase tracking-wider rounded-full shadow-xs cursor-pointer select-none shrink-0 transition"
              title="Open WebMCP Agent Inspector, Tools Schema & Live Telemetry"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>WebMCP Inspector</span>
              {agentCallCount > 0 && (
                <span className="flex h-3.5 px-1.5 items-center justify-center bg-emerald-600 text-[8px] font-mono font-bold text-white rounded-full">
                  {agentCallCount}
                </span>
              )}
            </button>
          )}

          {/* Desktop Transparency Guide Button */}
          <button
            onClick={onOpenTransparencyGuide}
            title="Citizen Audit & Methodology Guide"
            className="hidden lg:flex items-center justify-center h-7.5 w-7.5 rounded-full border border-[#18181b]/20 bg-white text-[#52525b] hover:text-[#18181b] hover:border-[#18181b] transition cursor-pointer shrink-0"
          >
            <HelpCircle className="h-3.5 w-3.5" />
          </button>

          {/* Top-Right: Mobile Dropdown Menu */}
          <div ref={menuRef} aria-label="Mobile Navigation" className="relative lg:hidden">
            <button
              type="button"
              id="mobile-3d-menu-button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-expanded={isMenuOpen}
              aria-haspopup="true"
              className={`flex items-center justify-center h-7.5 w-7.5 rounded-full border transition-all duration-200 cursor-pointer select-none shadow-2xs ${
                isMenuOpen
                  ? 'border-[#18181b] bg-[#18181b] text-white shadow-md'
                  : 'border-[#18181b]/25 bg-[#f1ede4] text-[#18181b] hover:bg-white hover:border-[#18181b]/50'
              }`}
              title="Civic Modules & WebMCP Agent"
            >
              {isMenuOpen ? (
                <X className="h-3.5 w-3.5" />
              ) : (
                <Menu className="h-3.5 w-3.5" />
              )}
            </button>

            {/* Mobile Dropdown Menu Popover */}
            {isMenuOpen && (
              <div 
                role="menu"
                aria-orientation="vertical"
                className="absolute right-0 top-full mt-2 w-[85vw] max-w-[280px] bg-[#fdfcfa] border border-[#18181b]/25 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150"
              >
                <div className="px-3 py-1.5 border-b border-[#18181b]/10 mb-1.5 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#71717a]">
                    Civic Engines
                  </span>
                  <span className="text-[9px] font-mono text-[#c44d31] font-bold bg-[#c44d31]/10 px-1.5 py-0.5 rounded-full">
                    8 Modules
                  </span>
                </div>

                <div className="space-y-1 max-h-[380px] overflow-y-auto pr-0.5">
                  {navTabs.map((tab) => {
                    const isActive = viewMode === tab.id;
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        role="menuitem"
                        onClick={() => {
                          onViewModeChange(tab.id);
                          setIsMenuOpen(false);
                          if (tab.id === 'grid') {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }
                        }}
                        className={`w-full flex items-center justify-between gap-2.5 px-2.5 py-2 text-left rounded-xl transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[#18181b] text-white shadow-2xs font-semibold'
                            : 'text-[#18181b] hover:bg-[#f1ede4]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className={`flex h-7 w-7 items-center justify-center rounded-lg shrink-0 ${
                            isActive 
                              ? 'bg-white/15 text-amber-300' 
                              : 'bg-[#f1ede4] text-[#18181b]'
                          }`}>
                            <Icon className="h-3.5 w-3.5" />
                          </div>
                          <div className="truncate">
                            <div className="text-xs font-serif font-bold tracking-tight">
                              {tab.label}
                            </div>
                            {tab.description && (
                              <div className={`text-[9.5px] truncate ${
                                isActive ? 'text-white/70' : 'text-[#71717a]'
                              }`}>
                                {tab.description}
                              </div>
                            )}
                          </div>
                        </div>

                        {isActive && (
                          <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Additional Quick Utility Links at bottom of dropdown */}
                <div className="pt-2 mt-2 border-t border-[#18181b]/10 flex flex-col gap-1.5 px-1">
                  {onOpenAgentWorkspace && (
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        onOpenAgentWorkspace();
                      }}
                      className="w-full flex items-center justify-between px-2.5 py-1.5 text-[10.5px] font-mono font-bold bg-[#18181b] text-white hover:bg-[#c44d31] rounded-lg transition cursor-pointer"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span>WebMCP Inspector</span>
                      </div>
                      <span className="text-[9px] bg-white/20 px-1.5 py-0.5 rounded text-white">
                        {agentCallCount} calls
                      </span>
                    </button>
                  )}
                  <div className="flex items-center justify-between gap-1">
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        onOpenTransparencyGuide();
                      }}
                      className="flex-1 flex items-center justify-center gap-1 py-1.5 text-[10px] font-bold text-[#52525b] hover:text-[#18181b] bg-[#f1ede4] hover:bg-[#18181b] hover:text-white rounded-lg transition cursor-pointer"
                    >
                      <HelpCircle className="h-3 w-3" />
                      <span>Audit Guide</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        onOpenCompare();
                      }}
                      className="flex-1 flex items-center justify-center gap-1 py-1.5 text-[10px] font-bold text-[#52525b] hover:text-[#18181b] bg-[#f1ede4] hover:bg-[#18181b] hover:text-white rounded-lg transition cursor-pointer"
                    >
                      <Scale className="h-3 w-3" />
                      <span>Compare ({compareList.length})</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
