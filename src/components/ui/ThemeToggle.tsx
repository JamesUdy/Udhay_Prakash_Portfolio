import { useRef, useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

/* ─── Web Audio zap ─────────────────────────────────────────────────────── */

function playZapSound() {
  try {
    const ctx = new AudioContext();
    const bufferSize = Math.floor(ctx.sampleRate * 0.15);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2.5);
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const bpf = ctx.createBiquadFilter();
    bpf.type = 'bandpass';
    bpf.frequency.value = 2800;
    bpf.Q.value = 0.6;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.45, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

    noise.connect(bpf);
    bpf.connect(gain);
    gain.connect(ctx.destination);
    noise.start();
    noise.stop(ctx.currentTime + 0.18);

    const osc = ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(700, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.14);
    const oscGain = ctx.createGain();
    oscGain.gain.setValueAtTime(0.15, ctx.currentTime);
    oscGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);
    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.14);
  } catch {
    // silently skip if AudioContext unavailable
  }
}

/* ─── Ink bleed portal overlay ──────────────────────────────────────────── */

interface BleedProps {
  x: number;
  y: number;
  toLight: boolean;
  onDone: () => void;
}

function InkBleedOverlay({ x, y, toLight, onDone }: BleedProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // diagonal of viewport = max radius we need
    const maxR = Math.ceil(Math.hypot(window.innerWidth, window.innerHeight));

    // colors
    const burstColor = toLight ? '#e8e0ff' : '#0d0820';
    const edgeColor = toLight ? '#f8f7ff' : '#050816';

    el.style.setProperty('--bleed-x', `${x}px`);
    el.style.setProperty('--bleed-y', `${y}px`);
    el.style.setProperty('--bleed-burst', burstColor);
    el.style.setProperty('--bleed-edge', edgeColor);
    el.style.setProperty('--bleed-max-r', `${maxR}px`);

    // trigger reflow then start animation
    el.getBoundingClientRect();
    el.classList.add('ink-bleed--active');

    const timer = setTimeout(onDone, 750);
    return () => clearTimeout(timer);
  }, [x, y, toLight, onDone]);

  return createPortal(<div ref={ref} className="ink-bleed" aria-hidden="true" />, document.body);
}

/* ─── Lightning sparks ───────────────────────────────────────────────────── */

const SPARK_COUNT = 8;
const SPARK_LENGTHS = Array.from({ length: SPARK_COUNT }, () => 18 + Math.random() * 18);

interface SparksProps {
  x: number;
  y: number;
  toLight: boolean;
}

function LightningSparks({ x, y, toLight }: SparksProps) {
  const color = toLight ? '#c4b5fd' : '#7c3aed';
  const count = SPARK_COUNT;
  const lengths = SPARK_LENGTHS;

  return createPortal(
    <div
      className="fixed pointer-events-none"
      style={{ left: x, top: y, zIndex: 10001 }}
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, i) => {
        const angle = (360 / count) * i;
        const len = lengths[i];
        return (
          <div
            key={i}
            className="spark"
            style={
              {
                '--spark-angle': `${angle}deg`,
                '--spark-len': `${len}px`,
                '--spark-color': color,
              } as React.CSSProperties
            }
          />
        );
      })}
    </div>,
    document.body
  );
}

/* ─── Main component ─────────────────────────────────────────────────────── */

interface FlashState {
  id: number;
  x: number;
  y: number;
  toLight: boolean;
}

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [flash, setFlash] = useState<FlashState | null>(null);
  const [sparks, setSparks] = useState<FlashState | null>(null);
  const counterRef = useRef(0);

  const handleToggle = useCallback(() => {
    navigator.vibrate?.([10, 25, 6]);
    playZapSound();

    const rect = buttonRef.current?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
    const toLight = theme === 'dark';
    const id = ++counterRef.current;

    setSparks({ id, x, y, toLight });
    setFlash({ id, x, y, toLight });

    // flip theme at the peak of the bleed (170ms in)
    setTimeout(() => toggleTheme(), 170);

    // clear sparks after their CSS animation ends
    setTimeout(() => setSparks(null), 500);
  }, [theme, toggleTheme]);

  return (
    <>
      {flash && (
        <InkBleedOverlay
          key={flash.id}
          x={flash.x}
          y={flash.y}
          toLight={flash.toLight}
          onDone={() => setFlash(null)}
        />
      )}
      {sparks && (
        <LightningSparks key={sparks.id} x={sparks.x} y={sparks.y} toLight={sparks.toLight} />
      )}

      <div className="relative group">
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none bg-[var(--color-surface-2)] text-[var(--color-text)] border border-[var(--color-border)] hidden sm:block">
          {theme === 'dark' ? 'Light mode' : 'Dark mode'}
        </span>

        <motion.button
          ref={buttonRef}
          onClick={handleToggle}
          whileHover={{ scale: 1.18 }}
          whileTap={{ scale: 0.82 }}
          className="relative flex items-center justify-center w-10 h-10 rounded-full text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors duration-200"
          aria-label="Toggle theme"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={theme}
              initial={{ rotate: -90, opacity: 0, scale: 0.5, filter: 'blur(4px)' }}
              animate={{ rotate: 0, opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5, filter: 'blur(4px)' }}
              transition={{ duration: 0.28, ease: [0.34, 1.56, 0.64, 1] }}
            >
              {theme === 'dark' ? (
                <Sun size={20} strokeWidth={1.8} />
              ) : (
                <Moon size={20} strokeWidth={1.8} />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  );
}
