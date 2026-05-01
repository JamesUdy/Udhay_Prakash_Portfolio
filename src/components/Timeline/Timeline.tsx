import { useState, useRef, useCallback } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { COMMITS } from './timelineData';
import { useIsMobile, getLaneW, getSvgW } from './timelineUtils';
import { TeaCupCount, TermBar, LogHeader } from './TimelineAtoms';
import { GraphSVG, CommitRow, FutureCommit } from './TimelineGraph';
import './timeline.css';

// #region Timeline section
export default function Timeline() {
  const headerRef    = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });
  const [openId, setOpenId] = useState<number | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start end', 'end start'] });
  const progressH = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const mobile = useIsMobile();
  const laneW  = getLaneW(mobile);
  const svgW   = getSvgW(mobile);

  const [rowHeights, setRowHeights] = useState<number[]>(() => Array(COMMITS.length).fill(76));

  const handleHeightChange = useCallback((index: number, h: number) => {
    setRowHeights(prev => {
      if (prev[index] === h) return prev;
      const next = [...prev];
      next[index] = h;
      return next;
    });
  }, []);

  return (
    <section className="tl-root">
      <motion.div ref={headerRef} className="tl-header"
        initial="hidden"
        animate={headerInView ? 'show' : 'hidden'}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
      >
        <motion.p className="tl-eyebrow"
          variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
        >TIMELINE</motion.p>
        <motion.h2 className="tl-heading"
          variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
        >What I&apos;ve Done So Far.</motion.h2>
      </motion.div>

      <div className="git-wrap" ref={wrapRef}>
        <div className="git-progress-track">
          <motion.div className="git-progress-bar" style={{ height: progressH }} />
        </div>

        <div className="git-main">
          <TermBar />
          <LogHeader />

          <div className="git-log" style={{ position: 'relative' }}>
            <GraphSVG rowHeights={rowHeights} laneW={laneW} svgW={svgW} />

            <FutureCommit svgW={svgW} />
            {COMMITS.map((c, i) => (
              <CommitRow key={c.sha}
                commit={c} index={i}
                isOpen={openId === i}
                onToggle={() => setOpenId(openId === i ? null : i)}
                onHeightChange={handleHeightChange}
                svgW={svgW} laneW={laneW}
              />
            ))}
          </div>

          <div className="git-bottom-prompt">
            <span className="git-prompt">~/career</span>
            <span className="git-prompt-sym"> $ </span>
            <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1.1, repeat: Infinity }}>▌</motion.span>
          </div>

          <div className="git-footer-jokes">
            <p className="git-joke-line">
              <span className="git-joke-label">warning:</span> <TeaCupCount /> cups of tea consumed. no refunds.
            </p>
            <p className="git-joke-line">
              <span className="git-joke-label">note:</span> no rubber ducks were harmed during debugging.
            </p>
            <p className="git-joke-line">
              <span className="git-joke-label">fun fact:</span> 99% of bugs fixed by turning it off and on again.
            </p>
            <p className="git-joke-line git-joke-line--muted">
              — end of git log —
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
// #endregion
