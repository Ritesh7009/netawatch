import React from 'react';
import { Scale, Map, FileCheck, ShieldAlert, ArrowRight, Sparkles, TrendingUp, Landmark } from 'lucide-react';
import { motion } from 'motion/react';

interface InvestigativePortalsSectionProps {
  onOpenLegalRegistry: () => void;
  onOpenInteractiveMap: () => void;
  onOpenManifestoTracker: () => void;
  onOpenNepotismTracker: () => void;
}

export const InvestigativePortalsSection: React.FC<InvestigativePortalsSectionProps> = ({
  onOpenLegalRegistry,
  onOpenInteractiveMap,
  onOpenManifestoTracker,
  onOpenNepotismTracker,
}) => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-4 pt-4 sm:pt-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-[#18181b]/15 pb-2.5">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#c44d31] font-mono">
            Public Audit Portals
          </span>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#18181b] tracking-tight">
            Specialized Civic Investigation Tools
          </h2>
        </div>
        <p className="text-xs text-[#52525b]">
          Cross-examine verified election affidavits, parliamentary GIS boundaries, and delivery audits
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        
        {/* Portal 1: Sworn Cases Ledger */}
        <div 
          onClick={onOpenLegalRegistry}
          className="group cursor-pointer rounded-xs border border-[#18181b]/15 bg-white p-4 sm:p-5 shadow-xs hover:border-[#c44d31] hover:shadow-md transition-all flex flex-col justify-between"
        >
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-red-50 text-[#c44d31] rounded-xs border border-red-200">
                <Scale className="h-5 w-5" />
              </div>
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider bg-[#c44d31] text-white px-2 py-0.5 rounded-xs">
                All 543 MPs
              </span>
            </div>
            <h3 className="font-serif font-bold text-base text-[#18181b] group-hover:text-[#c44d31] transition-colors">
              Sworn Affidavits & Cases Ledger
            </h3>
            <p className="text-xs text-[#52525b] leading-relaxed">
              Explore 1,420+ declared criminal charges under ECI Form 26 with serious IPC classifications, court levels, and bail statuses.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#18181b]/10 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#18181b] group-hover:text-[#c44d31]">
            <span>Open Cases Ledger</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Portal 2: 543 Constituency GIS Map */}
        <div 
          onClick={onOpenInteractiveMap}
          className="group cursor-pointer rounded-xs border border-[#18181b]/15 bg-white p-4 sm:p-5 shadow-xs hover:border-[#18181b] hover:shadow-md transition-all flex flex-col justify-between"
        >
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-emerald-50 text-[#1b6b47] rounded-xs border border-emerald-200">
                <Map className="h-5 w-5" />
              </div>
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider bg-[#1b6b47] text-white px-2 py-0.5 rounded-xs">
                543 Seats
              </span>
            </div>
            <h3 className="font-serif font-bold text-base text-[#18181b] group-hover:text-[#1b6b47] transition-colors">
              Constituency & States GIS Map
            </h3>
            <p className="text-xs text-[#52525b] leading-relaxed">
              Interactive parliamentary boundary explorer mapping attendance benchmarks, party hold ratios, and fund expenditures nationwide.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#18181b]/10 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#18181b] group-hover:text-[#1b6b47]">
            <span>Launch Interactive Map</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Portal 3: 2024 Manifesto Tracker */}
        <div 
          onClick={onOpenManifestoTracker}
          className="group cursor-pointer rounded-xs border border-[#18181b]/15 bg-white p-4 sm:p-5 shadow-xs hover:border-[#18181b] hover:shadow-md transition-all flex flex-col justify-between"
        >
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-blue-50 text-blue-800 rounded-xs border border-blue-200">
                <FileCheck className="h-5 w-5" />
              </div>
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider bg-blue-900 text-white px-2 py-0.5 rounded-xs">
                2024–2029
              </span>
            </div>
            <h3 className="font-serif font-bold text-base text-[#18181b] group-hover:text-blue-900 transition-colors">
              Manifesto & Promise Delivery Audit
            </h3>
            <p className="text-xs text-[#52525b] leading-relaxed">
              Independent tracking of 60+ electoral manifesto commitments across taxation, education, health, and judicial reforms.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#18181b]/10 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#18181b] group-hover:text-blue-900">
            <span>Audit Promises</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Portal 4: Nepotism & Wealth Velocity Radar */}
        <div 
          onClick={onOpenNepotismTracker}
          className="group cursor-pointer rounded-xs border border-[#18181b]/15 bg-white p-4 sm:p-5 shadow-xs hover:border-[#c44d31] hover:shadow-md transition-all flex flex-col justify-between"
        >
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-purple-50 text-purple-900 rounded-xs border border-purple-200">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider bg-purple-900 text-white px-2 py-0.5 rounded-xs">
                Dynasty Radar
              </span>
            </div>
            <h3 className="font-serif font-bold text-base text-[#18181b] group-hover:text-purple-900 transition-colors">
              Nepotism & Asset Velocity Radar
            </h3>
            <p className="text-xs text-[#52525b] leading-relaxed">
              Genealogical lineages, multi-generation political families, and multi-term declared wealth percentage growth velocity.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#18181b]/10 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#18181b] group-hover:text-purple-900">
            <span>Inspect Dynasties</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

      </div>
    </motion.section>
  );
};
