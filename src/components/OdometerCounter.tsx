import React, { useEffect, useState, useRef } from 'react';

interface OdometerCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
}

export const OdometerCounter: React.FC<OdometerCounterProps> = ({
  value,
  prefix = '',
  suffix = '',
  duration = 1400,
  decimals = 0,
  className = '',
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = performance.now();
          const startVal = 0;
          const endVal = value;

          const update = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = startVal + (endVal - startVal) * easeOut;
            setDisplayValue(current);

            if (progress < 1) {
              requestAnimationFrame(update);
            } else {
              setDisplayValue(endVal);
            }
          };

          requestAnimationFrame(update);
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, duration]);

  // If value updates after animation has run
  useEffect(() => {
    if (hasAnimated.current) {
      setDisplayValue(value);
    }
  }, [value]);

  const formatted = decimals > 0 
    ? displayValue.toFixed(decimals)
    : Math.floor(displayValue).toLocaleString();

  return (
    <span ref={ref} className={`inline-block font-mono tracking-tight tabular-nums ${className}`}>
      {prefix}{formatted}{suffix}
    </span>
  );
};
