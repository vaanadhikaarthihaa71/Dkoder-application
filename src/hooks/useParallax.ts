import { useState, useEffect, RefObject } from 'react';

interface ParallaxOffset {
  x: number;
  y: number;
  rotateX: number;
  rotateY: number;
}

export function useParallax(
  ref: RefObject<HTMLElement | null>,
  strength: number = 15
): ParallaxOffset {
  const [offset, setOffset] = useState<ParallaxOffset>({ x: 0, y: 0, rotateX: 0, rotateY: 0 });

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) {
        // Fall back to window coordinates
        const halfW = window.innerWidth / 2;
        const halfH = window.innerHeight / 2;
        const normX = (e.clientX - halfW) / halfW;
        const normY = (e.clientY - halfH) / halfH;
        setOffset({
          x: normX * strength,
          y: normY * strength,
          rotateX: -normY * (strength * 0.4),
          rotateY: normX * (strength * 0.4)
        });
        return;
      }

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);

      // Clamp to -1 to 1
      const clampedX = Math.max(-1, Math.min(1, deltaX));
      const clampedY = Math.max(-1, Math.min(1, deltaY));

      setOffset({
        x: clampedX * strength,
        y: clampedY * strength,
        rotateX: -clampedY * (strength * 0.3),
        rotateY: clampedX * (strength * 0.3)
      });
    };

    const handleMouseLeave = () => {
      setOffset({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref, strength]);

  return offset;
}
