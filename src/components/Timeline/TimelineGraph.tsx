import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState, useLayoutEffect } from 'react';
import { COMMITS, FUTURE, FUTURE_H, DOT_R, TYPE_META, type Commit } from './timelineData';
import { laneX, shortSha } from './timelineUtils';
import { StatBadge, TypedText, CommitParticles } from './TimelineAtoms';

// #region GraphSVG
/*
  Node indices (yCenters):
    0 = future
    1 = SDE-1        lane 0
    2 = Junior       lane 0  ← mergeFrom lane 1 (KANISKART)
    3 = KANISKART    lane 1
    4 = Adrig        lane 0  → branchTo lane 1 (KANISKART)
    5 = Legacy HQ    lane 0  ← mergeFrom lane 1 (SkillVertex)
    6 = SkillVertex  lane 1
    7 = Education    lane 0  → branchTo lane 1 (SkillVertex)
    8 = origin       lane 0
*/
export function GraphSVG({ rowHeights, laneW, svgW }: { rowHeights: number[]; laneW: number; svgW: number }) {
  const yCenters: number[] = [FUTURE_H / 2];
  let acc = FUTURE_H;
  for (let i = 0; i < rowHeights.length; i++) {
    acc += rowHeights[i] / 2;
    yCenters.push(acc);
    acc += rowHeights[i] / 2;
  }
  const totalH = acc;

  const laneOf  = (idx: number) => idx === 0 ? 0 : COMMITS[idx - 1].lane;
  const colorOf = (idx: number) => idx === 0 ? '#555577' : COMMITS[idx - 1].color;

  const x0 = laneX(0, laneW);
  const x1 = laneX(1, laneW);

  const pipes:  React.ReactNode[] = [];
  const curves: React.ReactNode[] = [];
  const dots:   React.ReactNode[] = [];

  // #region Lane 0 pipes
  const l0 = yCenters.map((_, i) => i).filter(i => laneOf(i) === 0);
  for (let k = 0; k < l0.length - 1; k++) {
    pipes.push(
      <line key={`p0-${k}`}
        x1={x0} y1={yCenters[l0[k]]}
        x2={x0} y2={yCenters[l0[k + 1]]}
        stroke={colorOf(l0[k])} strokeWidth={2} strokeOpacity={0.45}
      />
    );
  }
  // #endregion

  // #region Bezier branch/merge curves
  const bezierDefs = [
    { fx: x0, fy: yCenters[4], tx: x1, ty: yCenters[3], color: COMMITS[2].color, dashed: true,  delay: 0.1 },
    { fx: x1, fy: yCenters[3], tx: x0, ty: yCenters[2], color: COMMITS[1].color, dashed: false, delay: 0.2 },
    { fx: x0, fy: yCenters[7], tx: x1, ty: yCenters[6], color: COMMITS[5].color, dashed: true,  delay: 0.3 },
    { fx: x1, fy: yCenters[6], tx: x0, ty: yCenters[5], color: COMMITS[5].color, dashed: false, delay: 0.4 },
  ];

  for (const b of bezierDefs) {
    const midY = (b.fy + b.ty) / 2;
    curves.push(
      <motion.path key={`bez-${b.fy.toFixed(0)}-${b.fx}`}
        d={`M ${b.fx} ${b.fy} C ${b.fx} ${midY}, ${b.tx} ${midY}, ${b.tx} ${b.ty}`}
        fill="none" stroke={b.color} strokeWidth={2} strokeOpacity={0.65}
        strokeDasharray={b.dashed ? '5 3' : undefined}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.65, delay: b.delay }}
      />
    );
  }
  // #endregion

  // #region Dots
  dots.push(
    <g key="dot-future">
      <circle cx={x0} cy={yCenters[0]} r={DOT_R + 1}
        fill="none" stroke="#555577" strokeWidth={1.5} strokeDasharray="3 2" opacity={0.45} />
      <text x={x0} y={yCenters[0] + 4} textAnchor="middle"
        fontSize={7} fill="#555577" opacity={0.55}>?</text>
    </g>
  );
  for (let i = 0; i < COMMITS.length; i++) {
    const commit = COMMITS[i];
    const cx = laneX(commit.lane, laneW);
    const cy = yCenters[i + 1];
    dots.push(
      <g key={`dot-${commit.sha}`}>
        <circle cx={cx} cy={cy} r={DOT_R + 4} fill={commit.color} fillOpacity={0.1} />
        <circle cx={cx} cy={cy} r={DOT_R}
          fill={commit.color} stroke="var(--color-surface)" strokeWidth={2.5} />
        {commit.isCurrent && (
          <motion.circle cx={cx} cy={cy} r={DOT_R + 5}
            fill="none" stroke={commit.color} strokeWidth={1.5} strokeOpacity={0.7}
            animate={{ r: [DOT_R + 4, DOT_R + 11], opacity: [0.7, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        )}
      </g>
    );
  }
  // #endregion

  return (
    <svg className="git-graph-svg" width={svgW} height={totalH}>
      <g>{pipes}</g>
      <g>{curves}</g>
      <g>{dots}</g>
    </svg>
  );
}
// #endregion

// #region CommitRow
export function CommitRow({ commit, index, isOpen, onToggle, onHeightChange, svgW, laneW }: {
  commit: Commit;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  onHeightChange: (index: number, h: number) => void;
  svgW: number;
  laneW: number;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rowRef, { once: true, margin: '-60px' });
  const [burst, setBurst] = useState(false);

  useLayoutEffect(() => {
    if (!rowRef.current) return;
    const ro = new ResizeObserver(() => {
      if (rowRef.current) onHeightChange(index, rowRef.current.offsetHeight);
    });
    ro.observe(rowRef.current);
    return () => ro.disconnect();
  }, [index, onHeightChange]);

  function handleToggle() {
    if (!isOpen) { setBurst(true); setTimeout(() => setBurst(false), 600); }
    onToggle();
  }

  return (
    <motion.div
      ref={rowRef}
      className={`git-row${isOpen ? ' git-row--open' : ''}`}
      initial={{ opacity: 0, x: -28 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.42, delay: (index + 1) * 0.1, ease: 'easeOut' }}
      style={{ '--cc': commit.color, paddingLeft: svgW + 0 } as React.CSSProperties}
    >
      <div className="git-dot-hitbox"
        style={{ left: laneX(commit.lane, laneW) - 14 }}
        onClick={handleToggle} role="button" tabIndex={-1}
        aria-hidden
      >
        <CommitParticles color={commit.color} active={burst} />
      </div>

      <div className="git-card" onClick={handleToggle} role="button" tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && handleToggle()}>

        <div className="git-card-head">
          <div className="git-refs">
            <span className="git-sha">
              <svg viewBox="0 0 16 16" fill="currentColor" width={11} height={11} style={{ marginRight: 4, opacity: 0.6 }}>
                <path d="M11.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5zm-2.25.75a2.25 2.25 0 1 1 3 2.122V6A2.5 2.5 0 0 1 10 8.5H6a1 1 0 0 0-1 1v1.128a2.251 2.251 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.5 0v1.836A2.493 2.493 0 0 1 6 7h4a1 1 0 0 0 1-1v-.628A2.25 2.25 0 0 1 9.5 3.25zM4.25 12a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5zM4.25 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5z" />
              </svg>
              {shortSha(commit.sha)}
            </span>
            <span className="git-branch-badge" style={{ '--bc': commit.color } as React.CSSProperties}>
              <svg viewBox="0 0 16 16" fill="currentColor" width={10} height={10} style={{ marginRight: 3 }}>
                <path d="M9.5 3.25a2.25 2.25 0 1 1 3 2.122V6A2.5 2.5 0 0 1 10 8.5H6a1 1 0 0 0-1 1v1.128a2.251 2.251 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.5 0v1.836A2.493 2.493 0 0 1 6 7h4a1 1 0 0 0 1-1v-.628A2.25 2.25 0 0 1 9.5 3.25z" />
              </svg>
              {commit.branch}
            </span>
            {commit.ref && <span className="git-ref-badge">{commit.ref}</span>}
            {commit.tag && <span className="git-tag-badge">🏷 {commit.tag}</span>}
            {(() => { const m = TYPE_META[commit.typeBadge]; return m ? (
              <span className="git-type-badge" style={{ '--tc': m.color } as React.CSSProperties}>{m.label}</span>
            ) : null; })()}
          </div>
          <div className="git-card-right">
            <span className="git-date">{commit.date}</span>
            <motion.svg viewBox="0 0 16 16" fill="currentColor" width={14} height={14}
              className="git-chevron"
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.22 }}>
              <path d="M6.22 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06Z" />
            </motion.svg>
          </div>
        </div>

        <div className="git-msg">
          <TypedText text={commit.message} delay={index * 120} />
        </div>

        <div className="git-card-foot">
          <span className="git-author">
            <span className="git-author-avatar">{commit.author[0]}</span>
            {commit.author}
          </span>
          <StatBadge {...commit.stats} />
          {commit.isCurrent && (
            <span className="git-head-badge">
              <motion.span className="git-head-dot"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
              HEAD
            </span>
          )}
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div className="git-body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.32, ease: 'easeInOut' }}
            >
              <div className="git-body-inner">
                <div className="git-diff-header">
                  <span className="git-diff-file">📄 CAREER.md</span>
                  <span className="git-diff-range">@@ -{index + 1},0 +{index + 1},{commit.body.length} @@</span>
                </div>
                {commit.body.map((line, i) => (
                  <motion.div key={i} className="git-diff-line"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <span className="git-diff-plus">+</span>
                    <span className="git-diff-text">{line}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
// #endregion

// #region FutureCommit
export function FutureCommit({ svgW }: { svgW: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div ref={ref} className="git-row git-row--future"
      initial={{ opacity: 0, x: -28 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.42 }}
      style={{ '--cc': FUTURE.color, paddingLeft: svgW + 4 } as React.CSSProperties}
    >
      <div className="git-card git-card--future">
        <div className="git-card-head">
          <div className="git-refs">
            <span className="git-sha" style={{ opacity: 0.45 }}>{FUTURE.sha}</span>
            <span className="git-branch-badge git-branch-badge--future">{FUTURE.branch}</span>
          </div>
          <span className="git-date" style={{ opacity: 0.45 }}>{FUTURE.date}</span>
        </div>
        <div className="git-msg git-msg--future">
          <motion.span animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 2.2, repeat: Infinity }}>
            {FUTURE.message}
          </motion.span>
        </div>
        <div className="git-pending">
          <motion.span className="git-pending-dot"
            animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.7, repeat: Infinity }} />
          <motion.span className="git-pending-dot"
            animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.7, repeat: Infinity, delay: 0.23 }} />
          <motion.span className="git-pending-dot"
            animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.7, repeat: Infinity, delay: 0.46 }} />
          <span style={{ marginLeft: 6, fontSize: '0.7rem', opacity: 0.5 }}>pending review</span>
        </div>
      </div>
    </motion.div>
  );
}
// #endregion
