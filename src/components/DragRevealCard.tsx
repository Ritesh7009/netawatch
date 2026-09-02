import React, { useState, useRef } from 'react';
import { motion, PanInfo } from 'motion/react';
import { Search, Scale, ArrowRight, ArrowLeftRight } from 'lucide-react';

interface DragRevealCardProps {
  onOpenSearch: () => void;
  onOpenCompare: () => void;
  onOpenAllIndiaDirectory: () => void;
}

export const DragRevealCard: React.FC<DragRevealCardProps> = ({
  onOpenSearch,
  onOpenCompare,
  onOpenAllIndiaDirectory,
}) => {
  // -1 for revealed left, 0 for centered, 1 for revealed right
  const [revealState, setRevealState] = useState<0 | 1 | -1>(0);
  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);

  const handleDragStart = () => {
    setIsDragging(true);
    isDraggingRef.current = true;
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    const offsetX = info.offset.x;
    const velocityX = info.velocity.x;

    // Velocity-based inertia and offset threshold calculations
    // If thrown with high velocity or dragged past 80px
    if (velocityX > 450 || offsetX > 90) {
      setRevealState(1); // Swiped/thrown right
    } else if (velocityX < -450 || offsetX < -90) {
      setRevealState(-1); // Swiped/thrown left
    } else {
      // Return to center if released without enough velocity or displacement
      setRevealState(0);
    }

    setTimeout(() => {
      setIsDragging(false);
      isDraggingRef.current = false;
    }, 60);
  };

  const getTargetX = () => {
    if (revealState === 1) return 210;
    if (revealState === -1) return -210;
    return 0;
  };

  const getTargetRotate = () => {
    if (revealState === 1) return 8;
    if (revealState === -1) return -8;
    return 0;
  };

  const isRevealed = revealState !== 0;

  return (
    <section className="w-full py-8 sm:py-12 border-b border-[#18181b]/15">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto space-y-2 mb-6 sm:mb-8">
          <span className="inline-flex items-center gap-1.5 bg-[#f1ede4] border border-[#18181b]/20 px-3 py-0.5 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-widest text-[#18181b] rounded-full">
            <ArrowLeftRight className="h-3 w-3 text-[#c44d31]" />
            <span>Interactive Tool Vault</span>
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-black tracking-tight text-[#18181b]">
            Direct Scrutiny Workflow
          </h2>
          <p className="text-xs sm:text-sm text-[#52525b]">
            Drag or flick the front card aside to switch between instant individual leader search and side-by-side comparative ledger mode.
          </p>
        </div>

        {/* Overlapping Draggable Card Container */}
        <div className="relative min-h-[310px] sm:min-h-[330px] flex items-center justify-center overflow-visible">
          
          {/* Back Card: "Compare Leaders" */}
          <div 
            onClick={() => {
              if (isRevealed) {
                onOpenCompare();
              } else {
                setRevealState(1);
              }
            }}
            className="absolute w-full max-w-md sm:max-w-lg border-2 border-[#18181b] bg-[#18181b] text-white p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col justify-between cursor-pointer select-none transition-all duration-300 transform scale-95 sm:scale-100 hover:border-amber-400/40"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="px-3 py-0.5 text-[9px] font-mono font-bold uppercase tracking-widest bg-white/15 text-amber-300 rounded-full">
                  DUAL DOSSIER MODE
                </span>
                <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                  <Scale className="h-5 w-5" />
                </div>
              </div>

              <h3 className="font-serif font-black text-2xl sm:text-3xl text-white mt-4">
                Compare Leaders
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 mt-2 leading-relaxed">
                Stack two or more parliamentary dossiers side by side. Benchmark attendance %, declared assets velocity, criminal proceedings, and MPLADS spending across party lines.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/20 flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-amber-300">
                Launch Comparator
              </span>
              <span className="flex items-center gap-1 text-white text-xs font-bold bg-[#c44d31] px-3.5 py-1.5 rounded-full hover:bg-white hover:text-[#18181b] transition-colors">
                <span>Compare Dossiers</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </div>

          {/* Front Card: "Search a Leader" (Draggable with spring physics and inertia) */}
          <motion.div
            drag="x"
            dragConstraints={{ left: -260, right: 260 }}
            dragElastic={0.28}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            whileDrag={{
              scale: 1.025,
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
              cursor: 'grabbing',
            }}
            onClick={() => {
              if (isDraggingRef.current) return;
              if (isRevealed) {
                setRevealState(0);
              } else if (window.innerWidth < 768) {
                setRevealState(1);
              } else {
                onOpenSearch();
              }
            }}
            animate={{
              x: getTargetX(),
              rotate: getTargetRotate(),
            }}
            transition={{
              type: 'spring',
              stiffness: 280,
              damping: 24,
              mass: 0.75,
            }}
            className="relative z-10 w-full max-w-md sm:max-w-lg border-2 border-[#18181b] bg-[#faf9f6] text-[#18181b] p-6 sm:p-8 rounded-2xl shadow-2xl flex flex-col justify-between cursor-grab active:cursor-grabbing select-none"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="px-3 py-0.5 text-[9px] font-mono font-bold uppercase tracking-widest bg-[#18181b] text-white rounded-full">
                  INSTANT SCRUTINY
                </span>
                <div className="h-10 w-10 rounded-full border border-[#18181b]/20 bg-white flex items-center justify-center text-[#18181b]">
                  <Search className="h-5 w-5" />
                </div>
              </div>

              <h3 className="font-serif font-black text-2xl sm:text-3xl text-[#18181b] mt-4">
                Search a Leader
              </h3>
              <p className="text-xs sm:text-sm text-[#52525b] mt-2 leading-relaxed">
                Find any of 543 elected MPs instantly. Search by name, state, constituency, parliamentary role, or party coalition to inspect their sworn affidavits.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#18181b]/15 flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#71717a]">
                All 543 Seats Indexed
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (isDraggingRef.current) return;
                  onOpenAllIndiaDirectory();
                }}
                className="flex items-center gap-1 text-white text-xs font-bold bg-[#18181b] px-3.5 py-1.5 rounded-full hover:bg-[#c44d31] transition-colors cursor-pointer"
              >
                <span>Open Directory</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Circular Drag Affordance Chip */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#18181b] text-white text-[9px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-white/40 shadow-md pointer-events-none flex items-center gap-1">
              <ArrowLeftRight className="h-2.5 w-2.5 text-amber-300" />
              <span>{isRevealed ? 'Tap to Reset' : 'Flick or Drag'}</span>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
