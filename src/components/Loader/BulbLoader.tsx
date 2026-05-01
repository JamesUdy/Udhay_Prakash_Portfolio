import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

// #region Audio

function playBulbSound(phase: 'flicker' | 'bloom') {
  try {
    const ctx = new AudioContext();

    if (phase === 'flicker') {
      const osc = ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(60, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(80, ctx.currentTime + 2.2);

      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0.0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.07, ctx.currentTime + 0.3);
      for (let t = 0.1; t < 2.2; t += 0.08 + Math.random() * 0.12) {
        gainNode.gain.setValueAtTime(Math.random() * 0.1, ctx.currentTime + t);
      }

      const bpf = ctx.createBiquadFilter();
      bpf.type = 'bandpass';
      bpf.frequency.value = 120;
      bpf.Q.value = 1.2;

      osc.connect(bpf);
      bpf.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 2.3);
    }

    if (phase === 'bloom') {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.6);

      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0.25, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    }
  } catch {
    // silently skip
  }
}

// #endregion

// #region Bulb SVG

function BulbSVG({ glow }: { glow: number }) {
  const filamentOpacity = Math.min(1, glow * 1.4);
  const glowSize = 40 + glow * 140;
  const warmR = 255;
  const warmG = Math.floor(180 + glow * 75);
  const warmB = Math.floor(glow * 80);
  const warmColor = `rgba(${warmR}, ${warmG}, ${warmB}, ${glow * 0.85})`;

  return (
    <div className="relative flex items-center justify-center" style={{ width: 160, height: 220 }}>
      {glow > 0.05 && (
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            width: glowSize,
            height: glowSize,
            background: `radial-gradient(circle, ${warmColor} 0%, transparent 70%)`,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -60%)',
          }}
        />
      )}

      <svg
        viewBox="0 0 100 140"
        width="120"
        height="168"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'relative', zIndex: 1 }}
      >
        {/* base cap rings */}
        <rect x="36" y="112" width="28" height="6" rx="2" fill="#4a4a5a" />
        <rect x="38" y="118" width="24" height="5" rx="1.5" fill="#3a3a4a" />
        <rect x="40" y="123" width="20" height="4" rx="1.5" fill="#2e2e3e" />

        {/* neck */}
        <path d="M42 112 Q40 104 38 96 L62 96 Q60 104 58 112Z" fill="#3a3a4a" />

        {/* glass bulb */}
        <ellipse
          cx="50"
          cy="62"
          rx="30"
          ry="34"
          fill={
            glow > 0.4
              ? `rgba(255, ${warmG}, ${warmB + 60}, ${Math.min(0.95, glow * 0.88 + 0.05)})`
              : 'rgba(28, 26, 48, 0.88)'
          }
          stroke="rgba(180,160,255,0.2)"
          strokeWidth="1"
        />

        {/* glass shine */}
        <ellipse
          cx="38"
          cy="46"
          rx="7"
          ry="10"
          fill={`rgba(255,255,255,${0.03 + glow * 0.07})`}
          transform="rotate(-15 38 46)"
        />

        {/* filament support wires */}
        <line
          x1="44"
          y1="96"
          x2="44"
          y2="72"
          stroke={`rgba(180,160,100,${filamentOpacity * 0.55})`}
          strokeWidth="1"
        />
        <line
          x1="56"
          y1="96"
          x2="56"
          y2="72"
          stroke={`rgba(180,160,100,${filamentOpacity * 0.55})`}
          strokeWidth="1"
        />

        {/* filament coil */}
        <path
          d="M44 72 Q46 68 48 72 Q50 76 52 72 Q54 68 56 72"
          stroke={
            glow > 0.1
              ? `rgba(255, ${warmG}, ${Math.floor(50 + glow * 80)}, ${filamentOpacity})`
              : 'rgba(100, 85, 50, 0.4)'
          }
          strokeWidth={1.5 + glow * 1.2}
          strokeLinecap="round"
          fill="none"
          style={{
            filter: glow > 0.45 ? `drop-shadow(0 0 ${glow * 7}px rgba(255,180,40,0.9))` : 'none',
          }}
        />
      </svg>
    </div>
  );
}

// #endregion

// #region Main loader

interface BulbLoaderProps {
  onComplete: () => void;
}

type Phase = 'flicker' | 'struggle' | 'bloom' | 'done';

export default function BulbLoader({ onComplete }: BulbLoaderProps) {
  const { theme } = useTheme();
  const [phase, setPhase] = useState<Phase>('flicker');
  const [glow, setGlow] = useState(0);
  const [bloomScale, setBloomScale] = useState(0);
  const [visible, setVisible] = useState(true);
  const rafRef = useRef<number>(0);
  const startRef = useRef(0);

  const isDark = theme === 'dark';
  const bgColor = isDark ? '#050816' : '#f8f7ff';
  const bloomColor = isDark ? 'rgba(255, 210, 90, 0.96)' : 'rgba(255, 235, 160, 0.98)';

  useEffect(() => {
    playBulbSound('flicker');
    startRef.current = Date.now();

    // Timeline (ms):
    // 0 – 1400  flicker  rapid irregular pulses
    // 1400 – 2200  struggle  slow deliberate ramp
    // 2200 – 2900  bloom    full bright + radial flood
    // 2900 – 3300  exit     fade out, reveal page

    const flickerInterval = setInterval(() => {
      const elapsed = Date.now() - startRef.current;
      if (elapsed > 1400) {
        clearInterval(flickerInterval);
        return;
      }
      setGlow(Math.random() < 0.55 ? Math.random() * 0.38 : 0.02);
    }, 65);

    const phase2Timer = setTimeout(() => {
      setPhase('struggle');
      let g = 0.12;
      const ramp = setInterval(() => {
        g = Math.min(0.78, g + 0.02 + Math.random() * 0.025);
        setGlow(g);
        if (g >= 0.78) clearInterval(ramp);
      }, 38);
    }, 1400);

    const phase3Timer = setTimeout(() => {
      setPhase('bloom');
      setGlow(1);
      playBulbSound('bloom');

      let s = 0;
      const step = () => {
        s = Math.min(1, s + 0.05);
        setBloomScale(s);
        if (s < 1) rafRef.current = requestAnimationFrame(step);
      };
      rafRef.current = requestAnimationFrame(step);
    }, 2200);

    const doneTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        setPhase('done');
        onComplete();
      }, 480);
    }, 2950);

    return () => {
      clearInterval(flickerInterval);
      clearTimeout(phase2Timer);
      clearTimeout(phase3Timer);
      clearTimeout(doneTimer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center z-[9998]"
          style={{ background: bgColor }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.48, ease: 'easeInOut' }}
        >
          {bloomScale > 0 && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 50% 44%, ${bloomColor} 0%, transparent ${28 + bloomScale * 72}%)`,
                opacity: bloomScale > 0.75 ? 1 - (bloomScale - 0.75) * 3.2 : bloomScale * 1.3,
              }}
            />
          )}

          <BulbSVG glow={glow} />

          <AnimatePresence mode="wait">
            <motion.p
              key={phase}
              className="mt-8 text-xs tracking-[0.3em] uppercase font-medium select-none"
              style={{ color: isDark ? 'rgba(170,166,195,0.65)' : 'rgba(75,64,104,0.6)' }}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.28 }}
            >
              {phase === 'flicker' && 'warming up...'}
              {phase === 'struggle' && 'powering on...'}
              {phase === 'bloom' && 'ready'}
            </motion.p>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// #endregion
