import React, { useEffect, useState } from 'react';
import { Sparkles, ArrowUpRight, Scale, ShieldCheck, Heart, Github, Twitter, Mail } from 'lucide-react';
import { ViewMode } from '../types';

interface FooterProps {
  onNavigateToView?: (view: ViewMode) => void;
  onOpenTransparencyGuide?: () => void;
  onOpenAllIndiaDirectory?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateToView,
  onOpenTransparencyGuide,
  onOpenAllIndiaDirectory,
}) => {
  const [scrollY, setScrollY] = useState(0);

  // Subtle parallax effect on desktop
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth >= 768) {
        setScrollY(window.scrollY);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className="w-full bg-[#18181b] text-white pt-12 sm:pt-16 pb-6 overflow-hidden border-t border-[#18181b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Sitemap Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 sm:pb-16 border-b border-white/10">
          
          {/* Col 1: Modules */}
          <div className="space-y-3">
            <h4 className="font-mono text-[11px] font-bold uppercase tracking-widest text-zinc-400">
              Core Modules
            </h4>
            <ul className="space-y-2 text-xs text-zinc-300">
              <li>
                <button
                  onClick={() => onNavigateToView && onNavigateToView('grid')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Overview & Top Dossiers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToView && onNavigateToView('legal-registry')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Form 26 Cases Ledger
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToView && onNavigateToView('map')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  543 Constituency Map
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToView && onNavigateToView('manifesto')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  2024 Manifesto Tracker
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToView && onNavigateToView('nepotism-tracker')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Nepotism & Dynasty Radar
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToView && onNavigateToView('table')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Performance Matrix Grid
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToView && onNavigateToView('analytics')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  National Analytics & Charts
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Verification Sources */}
          <div className="space-y-3">
            <h4 className="font-mono text-[11px] font-bold uppercase tracking-widest text-zinc-400">
              Open Data Sources
            </h4>
            <ul className="space-y-2 text-xs text-zinc-300">
              <li>
                <a
                  href="https://eci.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-300 transition-colors flex items-center gap-1"
                >
                  <span>Election Commission of India</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://loksabha.nic.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-300 transition-colors flex items-center gap-1"
                >
                  <span>Lok Sabha Official Hansard</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://adrindia.org"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-300 transition-colors flex items-center gap-1"
                >
                  <span>Association for Democratic Reforms (ADR)</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://mplads.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-300 transition-colors flex items-center gap-1"
                >
                  <span>MPLADS Portal (MoSPI)</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://cag.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-300 transition-colors flex items-center gap-1"
                >
                  <span>CAG Audit Reports</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Civic Tools */}
          <div className="space-y-3">
            <h4 className="font-mono text-[11px] font-bold uppercase tracking-widest text-zinc-400">
              Citizen Tools
            </h4>
            <ul className="space-y-2 text-xs text-zinc-300">
              <li>
                <button
                  onClick={onOpenAllIndiaDirectory}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  All 543 MP Directory
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTransparencyGuide}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Citizen Audit Methodology
                </button>
              </li>
              <li>
                <a
                  href="https://sansad.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-300 transition-colors flex items-center gap-1"
                >
                  <span>Sansad TV Live Broadcasts</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
              <li>
                <span className="text-zinc-500">Form 26 Parser API (Open Beta)</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Public Mission & Legal */}
          <div className="space-y-3">
            <h4 className="font-mono text-[11px] font-bold uppercase tracking-widest text-zinc-400">
              Civic Mission
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              NetaWatch (also searched as Neta Watch, NetWatch, and Net Watch) is an independent, non-partisan public interest platform dedicated to democratic transparency, legislative accountability, and open-source civic analytics in India.
            </p>
            <div className="pt-2 flex items-center gap-3 text-zinc-400">
              <span className="text-[10px] font-mono">18th Lok Sabha Edition</span>
              <span className="text-emerald-400 font-mono text-[10px]">● Verified</span>
            </div>
          </div>

        </div>

        {/* Search Engine Optimization Keyword Footprint */}
        <div className="py-3 border-b border-white/5 flex flex-wrap items-center justify-center gap-2 text-[10px] font-mono text-zinc-500">
          <span className="text-zinc-400 font-bold">Search Index:</span>
          <span>netawatch</span>
          <span>•</span>
          <span>neta watch</span>
          <span>•</span>
          <span>netwatch</span>
          <span>•</span>
          <span>net watch</span>
          <span>•</span>
          <span>543 Lok Sabha MPs</span>
          <span>•</span>
          <span>Form 26 Affidavits</span>
          <span>•</span>
          <span>Sansad Attendance</span>
        </div>

        {/* Massive Outlined/Filled "NETAWATCH" Wordmark (Edge-to-Edge) */}
        <div className="relative pt-8 sm:pt-12 pb-4 overflow-hidden select-none">
          <div 
            style={{
              transform: `translateX(${(scrollY % 50) * -0.2}px)`,
              transition: 'transform 100ms ease-out',
            }}
            className="w-full flex items-center justify-center"
          >
            <h1 className="font-serif font-black text-6xl xs:text-7xl sm:text-9xl md:text-[11rem] lg:text-[14rem] tracking-tighter text-stroke-outline opacity-30 hover:opacity-70 transition-opacity uppercase leading-none whitespace-nowrap text-center">
              NETAWATCH
            </h1>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-zinc-500 font-mono">
          <div>
            © 2026 NetaWatch. All data extracted from official public gazettes.
          </div>
          <div className="flex items-center gap-4">
            <span>Non-Partisan Civic Initiative</span>
            <span>•</span>
            <span>Article 19(1)(a) Right to Information</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
