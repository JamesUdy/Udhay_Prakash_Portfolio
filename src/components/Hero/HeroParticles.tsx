import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { ISourceOptions } from '@tsparticles/engine';
import { ThemeContext } from '../../context/ThemeContext';

let engineReady = false;
let enginePromise: Promise<void> | null = null;

function ensureEngine() {
  if (engineReady) return Promise.resolve();
  if (!enginePromise) {
    enginePromise = initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      engineReady = true;
    });
  }
  return enginePromise;
}

export default function HeroParticles() {
  const { theme } = useContext(ThemeContext);
  const [ready, setReady] = useState(engineReady);

  useEffect(() => {
    if (ready) return;
    ensureEngine().then(() => setReady(true));
  }, [ready]);

  const options: ISourceOptions = useMemo(() => {
    const isDark = theme === 'dark';
    return {
      fullScreen: { enable: false },
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: { enable: true, mode: 'grab' },
          onClick: { enable: true, mode: 'push' },
        },
        modes: {
          grab: { distance: 160, links: { opacity: isDark ? 0.5 : 0.7 } },
          push: { quantity: 3 },
        },
      },
      particles: {
        number: { value: 72, density: { enable: true } },
        color: {
          value: isDark
            ? ['#a78bfa', '#06b6d4', '#ec4899', '#f59e0b']
            : ['#6d28d9', '#0891b2', '#be185d', '#b45309'],
        },
        links: {
          enable: true,
          distance: 140,
          color: isDark ? '#a78bfa' : '#6d28d9',
          opacity: isDark ? 0.18 : 0.35,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.7,
          direction: 'none',
          random: true,
          straight: false,
          outModes: { default: 'bounce' },
        },
        opacity: {
          value: isDark ? { min: 0.2, max: 0.7 } : { min: 0.45, max: 0.9 },
          animation: { enable: true, speed: 0.8, sync: false },
        },
        size: {
          value: { min: 1, max: 3 },
          animation: { enable: true, speed: 2, sync: false },
        },
        shape: { type: 'circle' },
      },
      detectRetina: true,
    };
  }, [theme]);

  const particlesLoaded = useCallback(async () => {}, []);

  if (!ready) return null;

  return (
    <Particles
      key={theme}
      id="hero-particles"
      className="hero-particles"
      options={options}
      particlesLoaded={particlesLoaded}
    />
  );
}
