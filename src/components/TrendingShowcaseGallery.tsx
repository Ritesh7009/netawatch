import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ShieldAlert, TrendingUp, CheckCircle2, Wallet, Scale, ExternalLink } from 'lucide-react';
import { Politician } from '../types';
import { PoliticianImage } from './PoliticianImage';

interface TrendingShowcaseGalleryProps {
  politicians: Politician[];
  onSelectPolitician: (p: Politician) => void;
  onOpenAllIndiaDirectory: () => void;
  onOpenTable: () => void;
}

export const TrendingShowcaseGallery: React.FC<TrendingShowcaseGalleryProps> = ({
  politicians,
  onSelectPolitician,
  onOpenAllIndiaDirectory,
  onOpenTable,
}) => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  // Select 8 prominent spotlight politicians with notable flags
  const spotlightIds = [
    'narendra-modi',
    'rahul-gandhi',
    'amit-shah',
    'dk-suresh',
    'mahua-moitra',
    'supriya-sule',
    'shashi-tharoor',
    'nakul-nath',
  ];

  const spotlightMPs = spotlightIds
    .map((id) => politicians.find((p) => p.id === id))
    .filter((p): p is Politician => Boolean(p));

  // Tilted angles for gallery scatter effect (-6deg to +6deg)
  const tilts = [-5, 4, -4, 6, -6, 5, -3, 4];

  return (
    <section className="w-full py-12 sm:py-16 border-b border-[#18181b]/15 bg-[#f8f6f0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#c44d31] text-white px-3 py-0.5 text-[10px] font-mono font-bold uppercase tracking-widest rounded-full mb-2 shadow-xs">
              <Sparkles className="h-3 w-3 text-amber-300" />
              <span>Scrutiny Showcase</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-black tracking-tight text-[#18181b]">
              Spotlight Dossiers Under Public Scrutiny
            </h2>
            <p className="text-xs sm:text-sm text-[#52525b] mt-1 max-w-xl">
              Curated high-profile parliamentarians with sworn asset surges, pending affidavits, or national legislative benchmarks.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenTable}
              className="inline-flex items-center gap-1.5 border-2 border-[#18181b] bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#18181b] hover:bg-[#18181b] hover:text-white transition rounded-full shadow-xs cursor-pointer"
            >
              <span>543 MP Matrix</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Scattered / Tilted Gallery Cards with Staggered Scroll-In & Hover Lift-Straighten */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 pt-2 pb-6">
          {spotlightMPs.map((p, idx) => {
            const tilt = tilts[idx % tilts.length];
            const isHovered = hoveredId === p.id;
            
            // Calculate asset growth if historical data exists
            const assetGrowth = p.assets.history && p.assets.history.length >= 2
              ? Math.round(
                  ((p.assets.history[p.assets.history.length - 1].totalCr - p.assets.history[0].totalCr) /
                    Math.max(0.1, p.assets.history[0].totalCr)) *
                    100
                )
              : 0;

            // Highlighted flag metric & shadow color
            let flagBadge = {
              text: `${p.parliamentaryRecord.attendancePercent}% Attendance`,
              bg: 'bg-emerald-50 text-[#1b6b47] border-emerald-200',
              shadow: 'rgba(27, 107, 71, 0.4)',
              icon: CheckCircle2,
            };

            if (p.criminalRecords.totalCases > 0) {
              flagBadge = {
                text: `${p.criminalRecords.totalCases} Sworn Cases`,
                bg: 'bg-rose-50 text-[#c44d31] border-rose-200',
                shadow: 'rgba(196, 77, 49, 0.4)',
                icon: ShieldAlert,
              };
            } else if (assetGrowth > 100) {
              flagBadge = {
                text: `+${assetGrowth}% Asset Surge`,
                bg: 'bg-amber-50 text-amber-900 border-amber-200',
                shadow: 'rgba(217, 119, 6, 0.4)',
                icon: TrendingUp,
              };
            } else if (p.assets.totalCr > 50) {
              flagBadge = {
                text: `₹${p.assets.totalCr.toFixed(0)} Cr Net Worth`,
                bg: 'bg-zinc-100 text-[#18181b] border-zinc-300',
                shadow: 'rgba(24, 24, 27, 0.4)',
                icon: Wallet,
              };
            }

            const Icon = flagBadge.icon;

            const transformStyle = isDesktop
              ? isHovered
                ? 'translateY(-10px) scale(1.04) rotate(0deg)'
                : `rotate(${tilt}deg)`
              : isHovered
              ? 'translateY(-4px) scale(1.01)'
              : 'none';

            const boxStyle = isHovered
              ? `0 24px 40px -10px ${flagBadge.shadow}, 0 8px 16px -6px rgba(24, 24, 27, 0.1)`
              : '0 4px 12px -2px rgba(24, 24, 27, 0.06)';

            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{
                  duration: 0.45,
                  delay: (idx % 4) * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div
                  onMouseEnter={() => setHoveredId(p.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => onSelectPolitician(p)}
                  style={{
                    transform: transformStyle,
                    WebkitTransform: transformStyle,
                    transformOrigin: 'center center',
                    boxShadow: boxStyle,
                    zIndex: isHovered ? 50 : 10,
                    transition: 'transform 280ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1), z-index 0ms linear',
                  }}
                  className="relative border-2 border-[#18181b] bg-white p-4 rounded-2xl cursor-pointer flex flex-col justify-between group select-none min-h-[310px] touch-manipulation"
                >
                  {/* Photo & Basic Details */}
                  <div>
                    <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-[#18181b]/15 bg-[#f1ede4] mb-3">
                      <PoliticianImage
                        src={p.photo}
                        alt={p.name}
                        name={p.name}
                        partyColor={p.partyColor}
                        constituency={p.constituency}
                        state={p.state}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 left-2">
                        <span
                          className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-md border font-mono shadow-xs"
                          style={{ backgroundColor: `${p.partyColor}20`, color: p.partyColor, borderColor: p.partyColor }}
                        >
                          {p.partyAbbr}
                        </span>
                      </div>
                      <a
                        href={p.socialLinks?.twitter || 'https://sansad.in/ls/members'}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        title={`Open official records for ${p.name}`}
                        className="absolute top-2 right-2 bg-white/90 hover:bg-white text-[#18181b] p-1 rounded-md shadow-xs transition"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>

                    <h3 className="font-serif font-black text-lg text-[#18181b] group-hover:text-[#c44d31] transition-colors truncate">
                      {p.name}
                    </h3>
                    <p className="text-xs text-[#52525b] truncate font-medium">
                      {p.constituency}, {p.state}
                    </p>
                  </div>

                  {/* Flagged Highlight Stat Pill */}
                  <div className="mt-3 pt-3 border-t border-[#18181b]/10 flex items-center justify-between">
                    <div className={`inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider rounded-full border ${flagBadge.bg}`}>
                      <Icon className="h-3 w-3 flex-shrink-0" />
                      <span>{flagBadge.text}</span>
                    </div>

                    <span className="text-[11px] font-bold text-[#c44d31] group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                      Dossier →
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All CTA Link */}
        <div className="text-center pt-4">
          <button
            onClick={onOpenAllIndiaDirectory}
            className="inline-flex items-center gap-2 bg-[#18181b] text-white px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-full hover:bg-[#c44d31] transition-all shadow-md cursor-pointer"
          >
            <span>View all 543 Parliamentarians in Directory →</span>
          </button>
        </div>

      </div>
    </section>
  );
};
