import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  User, 
  Landmark, 
  TrendingUp, 
  ShieldCheck, 
  AlertTriangle, 
  GraduationCap, 
  FileText, 
  ArrowRight,
  ExternalLink,
  HelpCircle,
  Clock,
  Sparkles,
  ChevronRight,
  Loader2
} from 'lucide-react';
import { Politician } from '../types';
import { LokSabhaConstituency, findConstituencyById } from '../data/all543Constituencies';
import { synthesizeMPPolitician } from '../utils/synthesizePolitician';
import { PoliticianImage } from './PoliticianImage';

interface ConstituencyPanelProps {
  constituencyId: string | null;
  onClose: () => void;
  onSelectPolitician?: (p: Politician) => void;
  preloadedPoliticians: Politician[];
}

export const ConstituencyPanel: React.FC<ConstituencyPanelProps> = ({
  constituencyId,
  onClose,
  onSelectPolitician,
  preloadedPoliticians
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [constituencyData, setConstituencyData] = useState<LokSabhaConstituency | null>(null);

  useEffect(() => {
    if (!constituencyId) {
      setConstituencyData(null);
      return;
    }

    setLoading(true);
    // Fetch from backend API: GET /api/constituencies/{id}/politicians
    fetch(`/api/constituencies/${encodeURIComponent(constituencyId)}/politicians`)
      .then(res => {
        if (!res.ok) throw new Error('API fetch failed');
        return res.json();
      })
      .then(data => {
        if (data && data.constituency) {
          setConstituencyData(data);
        } else {
          // Fallback to local 543 directory
          const local = findConstituencyById(constituencyId);
          setConstituencyData(local || null);
        }
      })
      .catch(() => {
        // Fallback to local 543 directory
        const local = findConstituencyById(constituencyId);
        setConstituencyData(local || null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [constituencyId]);

  return (
    <AnimatePresence>
      {constituencyId && (
        <>
          {/* Backdrop overlay for smooth visual focus */}
          <motion.div
            key="constituency-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs"
          />

          {/* Sliding Dossier Drawer */}
          <motion.div
            key="constituency-drawer"
            initial={{ x: '100%', opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 350 }}
            className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 md:w-[440px] bg-[#fbf9f5] border-l-2 border-[#1a1a1a] shadow-2xl flex flex-col justify-between overflow-y-auto"
          >
            {/* Panel Header */}
            <div className="p-4 border-b border-[#1a1a1a]/15 bg-white sticky top-0 z-10 flex items-center justify-between shadow-xs">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#c44d31] uppercase">
                  PARLIAMENTARY DOSSIER
                </span>
                <h2 className="font-serif font-black text-lg text-[#1a1a1a] leading-tight">
                  {constituencyData?.constituency || 'Constituency Record'}
                </h2>
                <div className="text-xs text-[#66625b]">
                  {constituencyData?.state} • 18th Lok Sabha
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-[#1a1a1a]/10 text-[#66625b] hover:text-[#1a1a1a] transition"
                aria-label="Close panel"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body Content */}
            <div className="p-4 space-y-4 flex-1">
              {loading ? (
                <div className="py-20 flex flex-col items-center justify-center text-[#66625b] space-y-3">
                  <Loader2 className="h-8 w-8 animate-spin text-[#c44d31]" />
                  <span className="text-xs font-mono">Fetching parliamentary record...</span>
                </div>
              ) : !constituencyData ? (
                <div className="py-16 text-center text-[#66625b] space-y-2">
                  <AlertTriangle className="h-8 w-8 mx-auto text-amber-500" />
                  <p className="text-sm font-serif font-bold text-[#1a1a1a]">Constituency Record Unavailable</p>
                  <p className="text-xs">No elected representative record found for this identifier.</p>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.25 }}
                  className="space-y-4"
                >
                  {/* MP Profile Card */}
                  <div className="bg-white border-2 border-[#1a1a1a]/15 p-4 rounded-sm shadow-xs space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#1a1a1a]/20 shrink-0 bg-stone-100 flex items-center justify-center">
                        <PoliticianImage 
                          src={preloadedPoliticians.find(p => p.name.toLowerCase() === constituencyData.mpName.toLowerCase() || (constituencyData.preloadedId && p.id === constituencyData.preloadedId))?.photo}
                          alt={constituencyData.mpName}
                          name={constituencyData.mpName}
                          partyColor={constituencyData.partyColor}
                          constituency={constituencyData.constituency}
                          state={constituencyData.state}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className={`text-[9px] font-mono font-black px-1.5 py-0.5 uppercase ${
                            constituencyData.alliance === 'NDA' ? 'bg-[#f97316] text-white' :
                            constituencyData.alliance === 'INDIA' ? 'bg-[#0284c7] text-white' :
                            'bg-zinc-700 text-white'
                          }`}>
                            {constituencyData.alliance}
                          </span>
                          <span className="text-[10px] font-mono font-bold text-[#66625b]">
                            {constituencyData.partyAbbr}
                          </span>
                        </div>
                        <h3 className="font-serif font-black text-base text-[#1a1a1a] mt-0.5 truncate">
                          {constituencyData.mpName}
                        </h3>
                        <div className="text-xs text-[#66625b]">
                          {constituencyData.party}
                        </div>
                      </div>
                    </div>

                    {/* Education & Cases */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1a1a1a]/10 text-xs">
                      <div>
                        <div className="text-[10px] text-[#66625b] uppercase font-mono">Education</div>
                        <div className="font-serif font-bold text-[#1a1a1a] truncate">
                          {constituencyData.education || 'Graduate'}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-[#66625b] uppercase font-mono">Criminal Record</div>
                        <div className={`font-serif font-bold flex items-center gap-1 ${
                          (constituencyData.criminalCases || 0) > 0 ? 'text-amber-700' : 'text-emerald-700'
                        }`}>
                          {(constituencyData.criminalCases || 0) > 0 ? (
                            <>
                              <AlertTriangle className="h-3 w-3" />
                              <span>{constituencyData.criminalCases} Disclosed Cases</span>
                            </>
                          ) : (
                            <>
                              <ShieldCheck className="h-3 w-3" />
                              <span>Clean Record</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Performance Telemetry Grid */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white border border-[#1a1a1a]/15 p-3 rounded-sm">
                      <div className="text-[10px] font-mono uppercase text-[#66625b]">Attendance</div>
                      <div className="font-serif font-black text-lg text-[#1a1a1a] mt-0.5">
                        {constituencyData.attendancePercent}%
                      </div>
                      <div className="text-[10px] text-[#66625b]">Lok Sabha Avg: 79%</div>
                    </div>

                    <div className="bg-white border border-[#1a1a1a]/15 p-3 rounded-sm">
                      <div className="text-[10px] font-mono uppercase text-[#66625b]">Declared Assets</div>
                      <div className="font-serif font-black text-lg text-[#1a1a1a] mt-0.5">
                        ₹{constituencyData.estimatedNetWorthCr} Cr
                      </div>
                      <div className="text-[10px] text-[#66625b]">ECI Form 26 Affidavit</div>
                    </div>
                  </div>

                  {/* Statutory Disclaimer */}
                  <div className="bg-[#f0ece1] border border-[#1a1a1a]/10 p-3 text-[11px] text-[#66625b] space-y-1">
                    <div className="font-mono font-bold text-[#1a1a1a] text-[10px] uppercase flex items-center gap-1">
                      <ShieldCheck className="h-3.5 w-3.5 text-[#c44d31]" />
                      ADR & ECI Data Compliance
                    </div>
                    <p>
                      Metrics sourced from Association for Democratic Reforms (ADR) and Lok Sabha Secretariat disclosures.
                    </p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Panel Footer */}
            {constituencyData && onSelectPolitician && (
              <div className="p-4 border-t border-[#1a1a1a]/15 bg-white">
                <button
                  onClick={() => {
                    const pol = synthesizeMPPolitician(
                      {
                        constituency: constituencyData.constituency,
                        state: constituencyData.state,
                        mpName: constituencyData.mpName,
                        party: constituencyData.party,
                        partyAbbr: constituencyData.partyAbbr,
                        partyColor: constituencyData.partyColor,
                        alliance: constituencyData.alliance,
                        house: constituencyData.house,
                        estimatedNetWorthCr: constituencyData.estimatedNetWorthCr,
                        attendancePercent: constituencyData.attendancePercent,
                        preloadedId: constituencyData.preloadedId
                      },
                      preloadedPoliticians
                    );
                    onSelectPolitician(pol);
                    onClose();
                  }}
                  className="w-full py-2.5 px-4 bg-[#1a1a1a] text-white hover:bg-[#c44d31] transition text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Open Full Politician Dossier</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
