import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { teaCupsNow } from './timelineUtils';

// #region StatBadge
export function StatBadge({
  added,
  removed,
  files,
}: {
  added: number;
  removed: number;
  files: number;
}) {
  return (
    <span className="git-stat">
      <span className="git-stat-files">
        {files} file{files !== 1 ? 's' : ''}
      </span>
      <span className="git-stat-add">+{added}</span>
      <span className="git-stat-del">−{removed}</span>
    </span>
  );
}
// #endregion

// #region TypedText
export function TypedText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const id = setTimeout(() => {
      const tick = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(tick);
          setDone(true);
        }
      }, 18);
      return () => clearInterval(tick);
    }, delay);
    return () => clearTimeout(id);
  }, [inView, text, delay]);

  return (
    <span ref={ref} className="git-typed">
      {displayed}
      {!done && <span className="git-cursor">▌</span>}
    </span>
  );
}
// #endregion

// #region CommitParticles
export function CommitParticles({ color, active }: { color: string; active: boolean }) {
  if (!active) return null;
  return (
    <div className="git-particles" aria-hidden>
      {Array.from({ length: 8 }, (_, i) => (
        <motion.span
          key={i}
          className="git-particle"
          style={{ background: color, '--i': i } as React.CSSProperties}
          initial={{ scale: 0, opacity: 1, x: 0, y: 0 }}
          animate={{
            scale: [0, 1, 0],
            opacity: [1, 0.7, 0],
            x: Math.cos((i / 8) * Math.PI * 2) * 32,
            y: Math.sin((i / 8) * Math.PI * 2) * 32,
          }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}
// #endregion

// #region TeaCupCount
export function TeaCupCount() {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [count, setCount] = useState(0);
  const target = teaCupsNow();

  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;
    const id = setInterval(() => {
      step++;
      setCount(Math.round((step / steps) * target));
      if (step >= steps) clearInterval(id);
    }, interval);
    return () => clearInterval(id);
  }, [inView, target]);

  return (
    <span ref={ref} className="git-tea-count">
      {count.toLocaleString()}
    </span>
  );
}
// #endregion

// #region TermBar
export function TermBar() {
  return (
    <div className="git-term-bar">
      <span className="git-term-dot git-term-dot--red" />
      <span className="git-term-dot git-term-dot--yellow" />
      <span className="git-term-dot git-term-dot--green" />
      <span className="git-term-title">
        <svg
          viewBox="0 0 16 16"
          fill="currentColor"
          width={13}
          height={13}
          style={{ marginRight: 5, opacity: 0.7 }}
        >
          <path d="M0 2.75C0 1.784.784 1 1.75 1h12.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0 1 14.25 15H1.75A1.75 1.75 0 0 1 0 13.25Zm1.75-.25a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V2.75a.25.25 0 0 0-.25-.25ZM7.25 8a.75.75 0 0 1-.22.53l-2.25 2.25a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L5.44 8 3.72 6.28a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215l2.25 2.25c.141.14.22.331.22.53Zm1.5 1.5h3a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1 0-1.5Z" />
        </svg>
        git log --oneline --graph — udhay/career
      </span>
      <span className="git-term-cmd">
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1.1, repeat: Infinity }}
        >
          ▌
        </motion.span>
      </span>
    </div>
  );
}
// #endregion

// #region LogHeader
export function LogHeader() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="git-log-header">
      {inView && (
        <>
          <span className="git-prompt">~/career</span>
          <span className="git-prompt-sym"> $ </span>
          <TypedText text="git log --graph --decorate --all" delay={200} />
        </>
      )}
    </div>
  );
}
// #endregion
