import { useEffect, useRef, useState } from 'react';

type ScrollDirection = 'up' | 'down' | null;

export function useScrollDirection(threshold = 10): ScrollDirection {
  const [direction, setDirection] = useState<ScrollDirection>(null);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;

    const handler = () => {
      const currentY = window.scrollY;
      if (currentY < threshold) {
        setDirection('up');
        lastY.current = currentY;
        return;
      }
      const delta = currentY - lastY.current;
      if (Math.abs(delta) < threshold) return;
      setDirection(delta > 0 ? 'down' : 'up');
      lastY.current = currentY;
    };

    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [threshold]);

  return direction;
}
