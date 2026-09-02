import React, { useRef, useState, useEffect, useCallback, useId } from 'react';
import gsap from 'gsap';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface TabItem {
  id: string;
  label: string;
  badge?: string;
}

export interface PillTabNavProps {
  tabs: TabItem[];
  activeId: string;
  onTabChange: (tabId: string, index: number) => void;
  className?: string;
  containerClassName?: string;
  ariaLabel?: string;
}

export const PillTabNav: React.FC<PillTabNavProps> = ({
  tabs,
  activeId,
  onTabChange,
  className = '',
  containerClassName = '',
  ariaLabel = 'Demo sections showcase tabs'
}) => {
  const tablistId = useId();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const hoverIndicatorRef = useRef<HTMLDivElement>(null);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Drag-to-scroll refs
  const dragStartRef = useRef<{ x: number; scrollLeft: number; hasMoved: boolean }>({
    x: 0,
    scrollLeft: 0,
    hasMoved: false
  });

  const activeIndex = Math.max(0, tabs.findIndex((t) => t.id === activeId));

  // 1. UPDATE SCROLL BOUNDARIES & COMPUTE DYNAMIC EDGE FADE MASK
  const updateScrollAndMask = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const scrollLeft = el.scrollLeft;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    const tolerance = 3;

    const hasLeft = scrollLeft > tolerance;
    const hasRight = scrollLeft < maxScrollLeft - tolerance;

    setCanScrollLeft(hasLeft);
    setCanScrollRight(hasRight);

    // Apply CSS mask-image (linear-gradient) fading 48px at the active scroll edges
    const fadeWidth = '48px';
    let maskValue = 'none';

    if (hasLeft && hasRight) {
      // Both edges fade
      maskValue = `linear-gradient(to right, transparent 0, black ${fadeWidth}, black calc(100% - ${fadeWidth}), transparent 100%)`;
    } else if (hasLeft && !hasRight) {
      // Only left edge fades
      maskValue = `linear-gradient(to right, transparent 0, black ${fadeWidth}, black 100%)`;
    } else if (!hasLeft && hasRight) {
      // Only right edge fades
      maskValue = `linear-gradient(to right, black 0, black calc(100% - ${fadeWidth}), transparent 100%)`;
    } else {
      // Content fits without scrolling
      maskValue = 'none';
    }

    el.style.maskImage = maskValue;
    el.style.webkitMaskImage = maskValue;
  }, []);

  // 2. SLIDING ACTIVE INDICATOR ANIMATION (GSAP power2.out, 280ms)
  const updateIndicatorPosition = useCallback((targetIndex: number, immediate = false) => {
    const targetTab = tabRefs.current[targetIndex];
    const container = scrollContainerRef.current;
    const indicator = indicatorRef.current;

    if (!targetTab || !container || !indicator) return;

    const tabRect = targetTab.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    // Position relative to the scroll container's scrollable content
    const left = targetTab.offsetLeft;
    const width = targetTab.offsetWidth;
    const top = targetTab.offsetTop;
    const height = targetTab.offsetHeight;

    if (immediate) {
      gsap.set(indicator, {
        x: left,
        y: top,
        width,
        height,
        opacity: 1
      });
    } else {
      gsap.to(indicator, {
        x: left,
        y: top,
        width,
        height,
        opacity: 1,
        duration: 0.28,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    }
  }, []);

  // 3. HOVER INDICATOR ANIMATION (Outline / soft ghost pill)
  const updateHoverIndicator = useCallback((index: number | null) => {
    const hoverIndicator = hoverIndicatorRef.current;
    if (!hoverIndicator) return;

    if (index === null || index === activeIndex) {
      gsap.to(hoverIndicator, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.out'
      });
      return;
    }

    const targetTab = tabRefs.current[index];
    if (!targetTab) return;

    const left = targetTab.offsetLeft;
    const width = targetTab.offsetWidth;
    const top = targetTab.offsetTop;
    const height = targetTab.offsetHeight;

    gsap.to(hoverIndicator, {
      x: left,
      y: top,
      width,
      height,
      opacity: 1,
      duration: 0.22,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  }, [activeIndex]);

  // 4. AUTO-SCROLL ACTIVE TAB INTO VIEW WITH SMOOTH CENTERING
  const scrollTabIntoView = useCallback((targetIndex: number) => {
    const container = scrollContainerRef.current;
    const targetTab = tabRefs.current[targetIndex];
    if (!container || !targetTab) return;

    const containerWidth = container.clientWidth;
    const tabLeft = targetTab.offsetLeft;
    const tabWidth = targetTab.offsetWidth;

    // Calculate ideal scrollLeft so the tab is centered in the scroll viewport
    const targetScrollLeft = tabLeft - (containerWidth / 2) + (tabWidth / 2);
    const clampedScrollLeft = Math.max(0, Math.min(container.scrollWidth - containerWidth, targetScrollLeft));

    // Smooth animate scroll via GSAP or native scrollTo
    gsap.to(container, {
      scrollLeft: clampedScrollLeft,
      duration: 0.45,
      ease: 'power2.out',
      onUpdate: updateScrollAndMask
    });
  }, [updateScrollAndMask]);

  // Effect: When activeIndex changes, reposition indicator & auto-scroll into view
  useEffect(() => {
    updateIndicatorPosition(activeIndex);
    scrollTabIntoView(activeIndex);
  }, [activeIndex, updateIndicatorPosition, scrollTabIntoView]);

  // Handle Resize & Container Scroll
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    updateScrollAndMask();
    updateIndicatorPosition(activeIndex, true);

    const handleScroll = () => {
      updateScrollAndMask();
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateScrollAndMask);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateScrollAndMask);
    };
  }, [activeIndex, updateScrollAndMask, updateIndicatorPosition]);

  // Re-check mask after fonts load or layout shifts
  useEffect(() => {
    const timeout = setTimeout(() => {
      updateScrollAndMask();
      updateIndicatorPosition(activeIndex, true);
    }, 80);
    return () => clearTimeout(timeout);
  }, [updateScrollAndMask, updateIndicatorPosition, activeIndex]);

  // Handle Arrow Prev/Next Clicks (Visual Anchored Controls)
  const handleArrowNav = (direction: 'prev' | 'next') => {
    let nextIndex = direction === 'prev' ? activeIndex - 1 : activeIndex + 1;
    if (nextIndex < 0) nextIndex = 0;
    if (nextIndex >= tabs.length) nextIndex = tabs.length - 1;

    if (nextIndex !== activeIndex) {
      onTabChange(tabs[nextIndex].id, nextIndex);
      const targetTab = tabRefs.current[nextIndex];
      targetTab?.focus();
    } else {
      // If already at end, nudge scroll
      const container = scrollContainerRef.current;
      if (container) {
        const delta = direction === 'prev' ? -180 : 180;
        gsap.to(container, {
          scrollLeft: container.scrollLeft + delta,
          duration: 0.35,
          ease: 'power2.out',
          onUpdate: updateScrollAndMask
        });
      }
    }
  };

  // Keyboard navigation for full WCAG accessibility
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let targetIndex = -1;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        targetIndex = (index + 1) % tabs.length;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        targetIndex = (index - 1 + tabs.length) % tabs.length;
        break;
      case 'Home':
        e.preventDefault();
        targetIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        targetIndex = tabs.length - 1;
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        onTabChange(tabs[index].id, index);
        return;
      default:
        return;
    }

    if (targetIndex >= 0) {
      onTabChange(tabs[targetIndex].id, targetIndex);
      tabRefs.current[targetIndex]?.focus();
    }
  };

  // Drag to Scroll Handling (Mouse & Touch)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only handle primary button
    if (e.button !== 0) return;
    const container = scrollContainerRef.current;
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
    const container = scrollContainerRef.current;
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

  return (
    <div 
      className={`relative flex items-center gap-1.5 sm:gap-2 max-w-full ${containerClassName}`}
    >
      {/* Left Navigation Arrow Button (Anchored to the tab row) */}
      <button
        type="button"
        onClick={() => handleArrowNav('prev')}
        disabled={!canScrollLeft}
        aria-label="Previous tab"
        className={`shrink-0 h-7 w-7 sm:h-8 sm:w-8 rounded-full border border-[#18181b]/15 bg-white/90 backdrop-blur-md text-[#18181b] flex items-center justify-center transition-all shadow-2xs ${
          canScrollLeft
            ? 'opacity-100 hover:bg-[#18181b] hover:text-white cursor-pointer active:scale-95'
            : 'opacity-30 cursor-not-allowed pointer-events-none'
        }`}
      >
        <ChevronLeft className="h-3.5 w-3.5" />
      </button>

      {/* Main Tab Bar Housing (Light gray pill container with dynamic edge fade mask) */}
      <div className="relative flex-1 min-w-0 bg-[#f1ede4]/90 p-1 sm:p-1.5 rounded-full border border-[#18181b]/15 backdrop-blur-md shadow-inner overflow-hidden">
        
        {/* Scrollable Row with Dynamic CSS Mask Image */}
        <div
          ref={scrollContainerRef}
          role="tablist"
          aria-label={ariaLabel}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className={`relative flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5 px-1 scroll-smooth select-none ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          } ${className}`}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {/* 1. SHARED ACTIVE INDICATOR PILL (Slides & morphs between tabs) */}
          <div
            ref={indicatorRef}
            aria-hidden="true"
            className="absolute top-0 left-0 rounded-full bg-[#18181b] shadow-xs pointer-events-none will-change-[transform,width]"
            style={{ opacity: 0 }}
          />

          {/* 2. SHARED HOVER GHOST INDICATOR PILL (Outlined pill) */}
          <div
            ref={hoverIndicatorRef}
            aria-hidden="true"
            className="absolute top-0 left-0 rounded-full border border-[#18181b]/30 bg-black/5 pointer-events-none will-change-[transform,width]"
            style={{ opacity: 0 }}
          />

          {/* 3. INDIVIDUAL TAB ITEMS */}
          {tabs.map((tab, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[idx] = el;
                }}
                id={`tab-${tablistId}-${tab.id}`}
                role="tab"
                aria-selected={isActive}
                aria-controls={`tabpanel-${tablistId}-${tab.id}`}
                tabIndex={isActive ? 0 : -1}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                onMouseEnter={() => {
                  setHoveredIndex(idx);
                  updateHoverIndicator(idx);
                }}
                onMouseLeave={() => {
                  setHoveredIndex(null);
                  updateHoverIndicator(null);
                }}
                onClick={() => {
                  if (dragStartRef.current.hasMoved) return;
                  onTabChange(tab.id, idx);
                }}
                className={`relative z-10 px-3 sm:px-3.5 py-1 sm:py-1.5 text-[10.5px] sm:text-[11.5px] font-sans font-bold rounded-full transition-colors duration-200 whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-[#18181b] focus-visible:ring-offset-1 cursor-pointer select-none ${
                  isActive
                    ? 'text-white'
                    : 'text-[#52525b] hover:text-[#18181b]'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span 
                      className={`text-[8.5px] font-mono px-1 py-0.2 rounded transition-colors ${
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
        </div>
      </div>

      {/* Right Navigation Arrow Button (Anchored to the tab row) */}
      <button
        type="button"
        onClick={() => handleArrowNav('next')}
        disabled={!canScrollRight}
        aria-label="Next tab"
        className={`shrink-0 h-7 w-7 sm:h-8 sm:w-8 rounded-full border border-[#18181b]/15 bg-white/90 backdrop-blur-md text-[#18181b] flex items-center justify-center transition-all shadow-2xs ${
          canScrollRight
            ? 'opacity-100 hover:bg-[#18181b] hover:text-white cursor-pointer active:scale-95'
            : 'opacity-30 cursor-not-allowed pointer-events-none'
        }`}
      >
        <ChevronRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};
