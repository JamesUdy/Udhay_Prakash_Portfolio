import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

// #region Route config

interface RouteConfig {
  lines: string[];
  finalLine: string;
  accent: string;
  label: string;
}

const CHAR_INTERVAL = 24;

const ROUTE_CONFIG: Record<string, RouteConfig> = {
  '/about': {
    lines: ['loading profile...', 'reading experience...', 'compiling skills...'],
    finalLine: 'rendering human.',
    accent: '#915eff',
    label: 'ABOUT',
  },
  '/timeline': {
    lines: ['rewinding tape...', 'indexing chapters...'],
    finalLine: 'timeline loaded.',
    accent: '#7c3aed',
    label: 'TIMELINE',
  },
  '/projects': {
    lines: ['initializing workspace...', 'mounting components...', 'bundling assets...'],
    finalLine: 'project ready.',
    accent: '#804dee',
    label: 'PROJECTS',
  },
  '/contact': {
    lines: ['opening secure channel...', 'encrypting handshake...'],
    finalLine: 'connection established.',
    accent: '#915eff',
    label: 'CONTACT',
  },
  '/resume': {
    lines: ['fetching document...', 'rendering pages...'],
    finalLine: 'document ready.',
    accent: '#6d28d9',
    label: 'RESUME',
  },
};

function buildLineDelays(lines: string[]): number[] {
  return lines.reduce<number[]>((acc, _line, i) => {
    if (i === 0) return [80];
    const prev = acc[i - 1] + lines[i - 1].length * CHAR_INTERVAL + 60;
    return [...acc, prev];
  }, []);
}

// #endregion

// #region useTypewriter

function useTypewriter(text: string, startDelay: number) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setDisplayed('');
      setDone(false);
    }, 0);
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, CHAR_INTERVAL);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text, startDelay]);

  return { displayed, done };
}

// #endregion

// #region TerminalLine

function TerminalLine({
  text,
  startDelay,
  accent,
  isFinal,
  isDark,
  onDone,
}: {
  text: string;
  startDelay: number;
  accent: string;
  isFinal: boolean;
  isDark: boolean;
  onDone: () => void;
}) {
  const { displayed, done } = useTypewriter(text, startDelay);

  useEffect(() => {
    if (done) onDone();
  }, [done, onDone]);

  const textColor =
    isFinal && done ? accent : isDark ? 'rgba(200,195,230,0.9)' : 'rgba(60,50,90,0.88)';

  return (
    <motion.div
      className="flex items-center gap-3 font-mono text-sm leading-7"
      initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.35, delay: startDelay / 1000, ease: 'easeOut' }}
    >
      <span style={{ color: accent, textShadow: `0 0 8px ${accent}` }}>$</span>
      <span
        style={{
          color: textColor,
          textShadow: isFinal && done ? `0 0 12px ${accent}88` : 'none',
          transition: 'color 0.3s, text-shadow 0.3s',
        }}
      >
        {displayed}
        {!done && (
          <span
            className="inline-block w-[2px] h-[0.85em] align-middle ml-[2px]"
            style={{
              background: accent,
              boxShadow: `0 0 4px ${accent}`,
              animation: 'cursorBlink 0.7s step-end infinite',
            }}
          />
        )}
      </span>
      {done && isFinal && (
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          style={{ color: accent, fontSize: 16 }}
        >
          ✓
        </motion.span>
      )}
    </motion.div>
  );
}

// #endregion

// #region PageTransition

interface PageTransitionProps {
  pathname: string;
  onComplete: () => void;
}

export default function PageTransition({ pathname, onComplete }: PageTransitionProps) {
  const { theme } = useTheme();
  const [visible, setVisible] = useState(true);
  const [completedLines, setCompletedLines] = useState(0);
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  });

  const config = ROUTE_CONFIG[pathname] ?? null;
  const isDark = theme === 'dark';

  const allLines = config ? [...config.lines, config.finalLine] : [];
  const lineDelays = buildLineDelays(allLines);
  const lastDelay = lineDelays[allLines.length - 1] ?? 0;
  const lastDuration = (allLines[allLines.length - 1] ?? '').length * CHAR_INTERVAL;
  const exitAt = config ? lastDelay + lastDuration + 320 : 0;

  useEffect(() => {
    if (!config) {
      onCompleteRef.current();
      return;
    }
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onCompleteRef.current(), 420);
    }, exitAt);
    return () => clearTimeout(t);
  }, [config, exitAt]);

  if (!config) return null;

  const bgColor = isDark ? 'rgba(5,8,22,0.96)' : 'rgba(248,247,255,0.96)';
  const cardBg = isDark ? 'rgba(21,16,48,0.85)' : 'rgba(237,233,254,0.75)';
  const cardBorder = `${config.accent}44`;

  return createPortal(
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9997] flex flex-col items-center justify-center px-6"
          style={{ background: bgColor, backdropFilter: 'blur(4px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(6px)' }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
        >
          {/* ambient glow */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: 500,
              height: 500,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${config.accent}18 0%, transparent 70%)`,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />

          {/* glass card */}
          <motion.div
            className="relative w-full max-w-sm rounded-2xl px-8 py-8 overflow-hidden"
            style={{
              background: cardBg,
              border: `1px solid ${cardBorder}`,
              boxShadow: `0 0 40px ${config.accent}22, 0 8px 32px rgba(0,0,0,0.25)`,
              backdropFilter: 'blur(12px)',
            }}
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          >
            {/* scan-line shimmer */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(105deg, transparent 40%, ${config.accent}22 50%, transparent 60%)`,
                backgroundSize: '200% 100%',
              }}
              animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
              transition={{ duration: 1.2, delay: exitAt / 1000 - 0.8, ease: 'easeInOut' }}
            />

            {/* route label */}
            <motion.div
              className="mb-5 flex items-center gap-2"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: config.accent, boxShadow: `0 0 6px ${config.accent}` }}
              />
              <span
                className="text-[10px] tracking-[0.35em] font-semibold font-mono"
                style={{ color: config.accent }}
              >
                {config.label}
              </span>
            </motion.div>

            {/* terminal lines */}
            <div className="flex flex-col gap-0.5">
              {allLines.map((line, i) => (
                <TerminalLine
                  key={i}
                  text={line}
                  startDelay={lineDelays[i]}
                  accent={config.accent}
                  isFinal={i === allLines.length - 1}
                  isDark={isDark}
                  onDone={() => setCompletedLines((p) => Math.max(p, i + 1))}
                />
              ))}
            </div>

            {/* progress bar */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-2xl overflow-hidden"
              style={{ background: `${config.accent}22` }}
            >
              <motion.div
                className="h-full rounded-b-2xl"
                style={{
                  background: `linear-gradient(to right, ${config.accent}88, ${config.accent})`,
                }}
                initial={{ width: '0%' }}
                animate={{ width: `${(completedLines / allLines.length) * 100}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

// #endregion
