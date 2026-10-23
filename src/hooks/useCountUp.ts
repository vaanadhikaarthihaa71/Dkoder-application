import { useEffect, useState } from 'react';

export function useCountUp(
  targetValue: number,
  duration: number = 1200,
  startImmediately: boolean = true
): number {
  const [currentValue, setCurrentValue] = useState<number>(() => {
    // If reduced motion is requested, show final immediately
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return targetValue;
    }
    return 0;
  });

  useEffect(() => {
    if (!startImmediately) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCurrentValue(targetValue);
      return;
    }

    let startTimestamp: number | null = null;
    const startValue = 0;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing out quart: 1 - pow(1 - x, 4)
      const ease = 1 - Math.pow(1 - progress, 4);
      const val = Math.floor(startValue + (targetValue - startValue) * ease);
      
      setCurrentValue(val);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCurrentValue(targetValue);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, [targetValue, duration, startImmediately]);

  return currentValue;
}
