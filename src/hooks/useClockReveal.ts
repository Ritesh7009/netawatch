import React, { useEffect, useRef, useState, useCallback, RefObject } from 'react';
import gsap from 'gsap';

export interface ClockRevealOptions {
  durationPhase1?: number; // Radial sweep duration in seconds (default ~1.35)
  durationPhase2?: number; // Shape morph duration in seconds (default ~0.75)
  easePhase1?: string;    // Easing for radial sweep (default: 'power2.inOut')
  easePhase2?: string;    // Easing for shape morph (default: 'power3.out')
  autoPlay?: boolean;
  wedgeArcDegrees?: number; // Width of the dark wedge sweep tail in degrees (e.g. 90-120)
  targetBorderRadius?: string; // Final rounded corner size (default: '24px')
  onPhaseChange?: (phase: 'idle' | 'phase1' | 'phase2' | 'completed') => void;
  onComplete?: () => void;
}

export interface ClockRevealState {
  isAnimating: boolean;
  phase: 'idle' | 'phase1' | 'phase2' | 'completed';
  progress: number; // 0 to 1
  angle: number;    // 0 to 360
  morphProgress: number; // 0 to 1
}

export function useClockReveal(
  containerRef: RefObject<HTMLElement | null>,
  imageWrapperRef: RefObject<HTMLElement | null>,
  imageRef: RefObject<HTMLElement | null>,
  ticksRef?: RefObject<SVGSVGElement | null>,
  options: ClockRevealOptions = {}
) {
  const {
    durationPhase1 = 1.35,
    durationPhase2 = 0.75,
    easePhase1 = 'power2.inOut',
    easePhase2 = 'power3.out',
    autoPlay = true,
    wedgeArcDegrees = 110,
    targetBorderRadius = '24px',
    onPhaseChange,
    onComplete
  } = options;

  const [state, setState] = useState<ClockRevealState>({
    isAnimating: false,
    phase: 'idle',
    progress: 0,
    angle: 0,
    morphProgress: 0
  });

  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const animProxyRef = useRef<{
    angle: number;
    morphProgress: number;
    ticksOpacity: number;
    wedgeOpacity: number;
  }>({
    angle: 0,
    morphProgress: 0,
    ticksOpacity: 1,
    wedgeOpacity: 1
  });

  // Apply visual styles based on current animation values
  const applyFrameStyles = useCallback((
    angle: number,
    morph: number,
    ticksOpacity: number,
    wedgeOpacity: number
  ) => {
    const wrapper = imageWrapperRef.current;
    const img = imageRef.current;
    const ticks = ticksRef?.current;

    // Check prefers-reduced-motion
    const prefersReducedMotion = typeof window !== 'undefined' && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      if (wrapper) {
        wrapper.style.maskImage = 'none';
        wrapper.style.webkitMaskImage = 'none';
        wrapper.style.clipPath = 'none';
        wrapper.style.borderRadius = targetBorderRadius;
      }
      if (img) {
        img.style.transform = 'scale(1)';
      }
      if (ticks) {
        ticks.style.opacity = '0';
      }
      return;
    }

    if (wrapper) {
      if (morph <= 0.001) {
        // Phase 1: Image is clipped to circle, with dynamic conic mask uncovering image
        // Conic gradient mask: transparent before sweep, black (#000) uncovered
        const startDeg = -90; // Start at 12 o'clock
        const sweepAngle = Math.min(360, Math.max(0, angle));
        
        // Crisp mask uncovering clockwise from 12 o'clock
        const maskStr = `conic-gradient(from ${startDeg}deg at 50% 50%, #000 0deg, #000 ${sweepAngle}deg, transparent ${sweepAngle}deg 360deg)`;
        wrapper.style.maskImage = maskStr;
        wrapper.style.webkitMaskImage = maskStr;
        
        // Circular clipping
        wrapper.style.clipPath = 'circle(50% at 50% 50%)';
        wrapper.style.borderRadius = '50%';
      } else {
        // Phase 2: Fully uncovered, morphing from circle to rounded rectangle
        wrapper.style.maskImage = 'none';
        wrapper.style.webkitMaskImage = 'none';

        // Calculate smooth morph between circle (50% radius) and rounded rect
        // We expand the circular clip mask or use inset with smooth borderRadius transition
        const insetX = (1 - morph) * 12; // starts slightly pulled in on width for portrait, expands to 0
        const insetY = (1 - morph) * 0;
        const currentRadiusPercent = (1 - morph) * 50;
        
        if (morph >= 0.999) {
          wrapper.style.clipPath = 'none';
          wrapper.style.borderRadius = targetBorderRadius;
        } else {
          // Morphing clip path with interpolating radius
          wrapper.style.clipPath = `inset(${insetY}% ${insetX}% ${insetY}% ${insetX}% round ${currentRadiusPercent}% / ${currentRadiusPercent}%)`;
          wrapper.style.borderRadius = `${(1 - morph) * 50}%`;
        }
      }
    }

    // Subtle image scale settling (1.10 down to 1.00) during phase 2
    if (img) {
      const scale = 1.10 - (morph * 0.10);
      img.style.transform = `scale(${scale.toFixed(4)})`;
    }

    // Ticks opacity
    if (ticks) {
      // During phase 1 ticks are visible, fade smoothly during phase 2
      const finalTicksOpacity = Math.max(0, ticksOpacity * (1 - morph * 1.2));
      ticks.style.opacity = finalTicksOpacity.toString();
    }
  }, [imageWrapperRef, imageRef, ticksRef, targetBorderRadius]);

  // Build and configure the GSAP Timeline
  const createTimeline = useCallback(() => {
    // Kill existing timeline if any
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const prefersReducedMotion = typeof window !== 'undefined' && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      applyFrameStyles(360, 1, 0, 0);
      setState({
        isAnimating: false,
        phase: 'completed',
        progress: 1,
        angle: 360,
        morphProgress: 1
      });
      return null;
    }

    const proxy = animProxyRef.current;
    proxy.angle = 0;
    proxy.morphProgress = 0;
    proxy.ticksOpacity = 0;
    proxy.wedgeOpacity = 1;

    // Apply initial state (hidden/clipped)
    applyFrameStyles(0, 0, 0, 1);

    const tl = gsap.timeline({
      paused: !autoPlay,
      onStart: () => {
        setState((prev) => ({ ...prev, isAnimating: true, phase: 'phase1' }));
        onPhaseChange?.('phase1');
      },
      onUpdate: () => {
        const totalDuration = tl.duration() || (durationPhase1 + durationPhase2);
        const currentProg = tl.progress();
        const curAngle = proxy.angle;
        const curMorph = proxy.morphProgress;

        applyFrameStyles(curAngle, curMorph, proxy.ticksOpacity, proxy.wedgeOpacity);

        const currentPhase = curMorph > 0 ? (currentProg >= 0.999 ? 'completed' : 'phase2') : 'phase1';

        setState({
          isAnimating: currentProg < 1 && tl.isActive(),
          phase: currentPhase,
          progress: currentProg,
          angle: curAngle,
          morphProgress: curMorph
        });
      },
      onComplete: () => {
        applyFrameStyles(360, 1, 0, 0);
        setState({
          isAnimating: false,
          phase: 'completed',
          progress: 1,
          angle: 360,
          morphProgress: 1
        });
        onPhaseChange?.('completed');
        onComplete?.();
      }
    });

    // 0. Stagger fade in radial ticks around perimeter
    if (ticksRef?.current) {
      const tickElements = ticksRef.current.querySelectorAll('.radial-tick-mark');
      if (tickElements.length > 0) {
        tl.fromTo(
          tickElements,
          { opacity: 0, scale: 0.6, transformOrigin: 'center center' },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: {
              each: 0.012,
              from: 'start'
            },
            ease: 'power2.out'
          },
          0
        );
      }
    }

    tl.to(
      proxy,
      {
        ticksOpacity: 1,
        duration: 0.4,
        ease: 'power1.out'
      },
      0
    );

    // PHASE 1: RADIAL REVEAL (~1.2 - 1.5s, power2.inOut)
    // Clock-hand / radar sweep uncovers image progressively from 0° to 360°
    tl.to(
      proxy,
      {
        angle: 360,
        duration: durationPhase1,
        ease: easePhase1
      },
      0.1
    );

    // Transition between Phase 1 and Phase 2 callback
    tl.add(() => {
      setState((prev) => ({ ...prev, phase: 'phase2' }));
      onPhaseChange?.('phase2');
    }, durationPhase1 + 0.05);

    // PHASE 2: SHAPE MORPH (~0.6 - 0.8s, power3.out, overlap slightly with -=0.08)
    // Smoothly expands circular frame into full rounded rectangular hero frame
    tl.to(
      proxy,
      {
        morphProgress: 1,
        duration: durationPhase2,
        ease: easePhase2
      },
      `-=${Math.min(0.12, durationPhase2 * 0.2)}`
    );

    timelineRef.current = tl;
    return tl;
  }, [
    autoPlay,
    durationPhase1,
    durationPhase2,
    easePhase1,
    easePhase2,
    applyFrameStyles,
    ticksRef,
    onPhaseChange,
    onComplete
  ]);

  // Initialize timeline on mount
  useEffect(() => {
    const tl = createTimeline();
    return () => {
      if (tl) tl.kill();
    };
  }, [createTimeline]);

  // Controls API
  const play = useCallback(() => {
    if (timelineRef.current) {
      if (timelineRef.current.progress() >= 1) {
        timelineRef.current.restart();
      } else {
        timelineRef.current.play();
      }
    } else {
      const tl = createTimeline();
      tl?.play();
    }
  }, [createTimeline]);

  const pause = useCallback(() => {
    timelineRef.current?.pause();
  }, []);

  const restart = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.restart();
    } else {
      const tl = createTimeline();
      tl?.restart();
    }
  }, [createTimeline]);

  const seek = useCallback((prog: number) => {
    if (timelineRef.current) {
      timelineRef.current.progress(Math.max(0, Math.min(1, prog)));
      timelineRef.current.pause();
    }
  }, []);

  return {
    ...state,
    play,
    pause,
    restart,
    seek,
    timeline: timelineRef.current
  };
}
