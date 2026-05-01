import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { timeline } from '../../constants';
import './timeline.css';

/* ─── Git metadata — newest first (git log order) ────────────────────────── */
const COMMITS = [
  {
    sha:       'f4d1a09',
    branch:    'HEAD → main',
    ref:       'origin/main',
    tag:       'v7.0.0',
    typeBadge: 'fulltime',
    author:    'Udhay Prakash',
    date:      'May 2025 – Present',
    message:   'chore: promote to SDE-1 @ TerraByte Technologies',
    body:      timeline[7].description ?? [],
    stats:     { added: 212, removed: 18, files: 19 },
    color:     '#915eff',
    isCurrent: true,
  },
  {
    sha:       'b8e3c71',
    branch:    'role/junior-frontend',
    ref:       null,
    tag:       'v6.0.0',
    typeBadge: 'fulltime',
    author:    'Udhay Prakash',
    date:      'Jul 2024 – May 2025',
    message:   'feat: join TerraByte as Junior Frontend Developer',
    body:      timeline[6].description ?? [],
    stats:     { added: 148, removed: 0, files: 12 },
    color:     '#7c3aed',
    isCurrent: false,
  },
  {
    sha:       'd2f7b34',
    branch:    'freelance/kaniskart',
    ref:       null,
    tag:       'v5.0.0',
    typeBadge: 'freelance',
    author:    'Udhay Prakash',
    date:      'Mar 2024 – Aug 2024',
    message:   'feat: freelance — e-commerce platform for KANISKART',
    body:      timeline[5].description ?? [],
    stats:     { added: 96, removed: 4, files: 11 },
    color:     '#f59e0b',
    isCurrent: false,
  },
  {
    sha:       'c7b2e45',
    branch:    'feature/adrig',
    ref:       null,
    tag:       'v4.0.0',
    typeBadge: 'fulltime',
    author:    'Udhay Prakash',
    date:      'Jan 2024 – Jun 2024',
    message:   'feat: Frontend Developer @ Adrig Technologies',
    body:      timeline[4].description ?? [],
    stats:     { added: 84, removed: 12, files: 7 },
    color:     '#f72585',
    isCurrent: false,
  },
  {
    sha:       '9d4a771',
    branch:    'feature/legacy-hq',
    ref:       null,
    tag:       'v3.0.0',
    typeBadge: 'fulltime',
    author:    'Udhay Prakash',
    date:      'Aug 2023 – Jan 2024',
    message:   'feat: Frontend Developer @ Legacy Code HQ',
    body:      timeline[3].description ?? [],
    stats:     { added: 56, removed: 3, files: 5 },
    color:     '#4cc9f0',
    isCurrent: false,
  },
  {
    sha:       'a1e6c22',
    branch:    'intern/skillvertex',
    ref:       null,
    tag:       'v2.0.0',
    typeBadge: 'internship',
    author:    'Udhay Prakash',
    date:      'Jul 2022 – Oct 2022',
    message:   'feat: Web Developer Intern @ SkillVertex',
    body:      timeline[2].description ?? [],
    stats:     { added: 34, removed: 0, files: 4 },
    color:     '#10b981',
    isCurrent: false,
  },
  {
    sha:       'e1c8340',
    branch:    'init/education',
    ref:       null,
    tag:       'v1.0.0',
    typeBadge: 'education',
    author:    'Udhay Prakash',
    date:      'Jul 2019 – May 2023',
    message:   'init: B.Tech EEE @ Vellore Institute of Technology',
    body:      timeline[1].description ?? [],
    stats:     { added: 23, removed: 0, files: 1 },
    color:     '#7209b7',
    isCurrent: false,
  },
  {
    sha:       '0000001',
    branch:    'init/origin',
    ref:       null,
    tag:       'v0.0.0',
    typeBadge: 'origin',
    author:    'Unknown',
    date:      'Sometime, Somewhere',
    message:   'init: repository accidentally initialized — no consent given',
    body:      timeline[0].description ?? [],
    stats:     { added: 1, removed: 0, files: 1 },
    color:     '#64748b',
    isCurrent: false,
  },
];

const FUTURE = {
  sha:    '???????',
  branch: 'feature/next-chapter',
  tag:    null,
  date:   'Next Chapter',
  message: 'feat: ??? — open to opportunities',
  color:  '#555577',
};

/* ─── Helpers ────────────────────────────────────────────────────────────── */
function shortSha(sha: string) { return sha.slice(0, 7); }

const TYPE_META: Record<string, { label: string; color: string }> = {
  fulltime:   { label: 'full-time',  color: '#4cc9f0' },
  freelance:  { label: 'freelance',  color: '#f59e0b' },
  internship: { label: 'internship', color: '#10b981' },
  education:  { label: 'education',  color: '#7209b7' },
  origin:     { label: 'origin',     color: '#64748b' },
};

function StatBadge({ added, removed, files }: { added: number; removed: number; files: number }) {
  return (
    <span className="git-stat">
      <span className="git-stat-files">{files} file{files !== 1 ? 's' : ''}</span>
      <span className="git-stat-add">+{added}</span>
      <span className="git-stat-del">−{removed}</span>
    </span>
  );
}

/* ─── Animated typing cursor ─────────────────────────────────────────────── */
function TypedText({ text, delay = 0 }: { text: string; delay?: number }) {
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
        if (i >= text.length) { clearInterval(tick); setDone(true); }
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

/* ─── Particle burst on commit expand ───────────────────────────────────── */
function CommitParticles({ color, active }: { color: string; active: boolean }) {
  if (!active) return null;
  return (
    <div className="git-particles" aria-hidden>
      {Array.from({ length: 8 }, (_, i) => (
        <motion.span key={i} className="git-particle"
          style={{ background: color, '--i': i } as React.CSSProperties}
          initial={{ scale: 0, opacity: 1, x: 0, y: 0 }}
          animate={{ scale: [0, 1, 0], opacity: [1, 0.7, 0],
            x: Math.cos((i / 8) * Math.PI * 2) * 32,
            y: Math.sin((i / 8) * Math.PI * 2) * 32,
          }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}

/* ─── Single commit row ──────────────────────────────────────────────────── */
function CommitRow({ commit, index, isOpen, onToggle }: {
  commit: typeof COMMITS[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const ref  = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [burst, setBurst] = useState(false);

  function handleToggle() {
    if (!isOpen) { setBurst(true); setTimeout(() => setBurst(false), 600); }
    onToggle();
  }

  return (
    <motion.div
      ref={ref}
      className={`git-row${isOpen ? ' git-row--open' : ''}`}
      initial={{ opacity: 0, x: -28 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.42, delay: (index + 1) * 0.1, ease: 'easeOut' }}
      style={{ '--cc': commit.color } as React.CSSProperties}
    >
      {/* ── Graph lane ── */}
      <div className="git-lane">
        {/* vertical pipe above */}
        <motion.div className="git-pipe git-pipe--above"
          initial={{ scaleY: 0 }} animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.35, delay: index * 0.1 }}
        />
        {/* commit dot */}
        <div className="git-dot-wrap" onClick={handleToggle} role="button" tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && handleToggle()}>
          <CommitParticles color={commit.color} active={burst} />
          <motion.div className="git-dot"
            animate={commit.isCurrent
              ? { boxShadow: [`0 0 0 0px ${commit.color}55`, `0 0 0 10px ${commit.color}00`] }
              : {}}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
          {commit.isCurrent && (
            <motion.div className="git-dot-ring"
              animate={{ scale: [1, 1.55, 1], opacity: [0.7, 0, 0.7] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
          )}
        </div>
        {/* vertical pipe below */}
        <motion.div className="git-pipe git-pipe--below"
          initial={{ scaleY: 0 }} animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.35, delay: index * 0.1 + 0.15 }}
        />
      </div>

      {/* ── Commit card ── */}
      <div className="git-card" onClick={handleToggle} role="button" tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && handleToggle()}>

        {/* header row */}
        <div className="git-card-head">
          {/* left: sha + branch refs */}
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
          {/* right: date + chevron */}
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

        {/* commit message */}
        <div className="git-msg">
          <TypedText text={commit.message} delay={index * 120} />
        </div>

        {/* stat strip */}
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

        {/* expanded body */}
        <AnimatePresence>
          {isOpen && (
            <motion.div className="git-body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.32, ease: 'easeInOut' }}
            >
              <div className="git-body-inner">
                {/* fake diff header */}
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

/* ─── Future / pending commit ────────────────────────────────────────────── */
function FutureCommit() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div ref={ref} className="git-row git-row--future"
      initial={{ opacity: 0, x: -28 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.42, delay: 0 }}
      style={{ '--cc': FUTURE.color } as React.CSSProperties}
    >
      <div className="git-lane">
        <div style={{ flex: 1, minHeight: 20 }} />
        <div className="git-dot git-dot--future">
          <motion.span animate={{ opacity: [0.3, 0.9, 0.3] }} transition={{ duration: 1.6, repeat: Infinity }}>?</motion.span>
        </div>
        <div className="git-pipe git-pipe--below" style={{ opacity: 0.28 }} />
      </div>
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

/* ─── Terminal top bar ───────────────────────────────────────────────────── */
function TermBar() {
  return (
    <div className="git-term-bar">
      <span className="git-term-dot git-term-dot--red" />
      <span className="git-term-dot git-term-dot--yellow" />
      <span className="git-term-dot git-term-dot--green" />
      <span className="git-term-title">
        <svg viewBox="0 0 16 16" fill="currentColor" width={13} height={13} style={{ marginRight: 5, opacity: 0.7 }}>
          <path d="M0 2.75C0 1.784.784 1 1.75 1h12.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0 1 14.25 15H1.75A1.75 1.75 0 0 1 0 13.25Zm1.75-.25a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V2.75a.25.25 0 0 0-.25-.25ZM7.25 8a.75.75 0 0 1-.22.53l-2.25 2.25a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L5.44 8 3.72 6.28a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215l2.25 2.25c.141.14.22.331.22.53Zm1.5 1.5h3a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1 0-1.5Z" />
        </svg>
        git log --oneline --graph — udhay/career
      </span>
      <span className="git-term-cmd">
        <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1.1, repeat: Infinity }}>▌</motion.span>
      </span>
    </div>
  );
}


/* ─── Log command line at top ─────────────────────────────────────────────── */
function LogHeader() {
  const ref    = useRef<HTMLDivElement>(null);
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

/* ─── Section ────────────────────────────────────────────────────────────── */
export default function Timeline() {
  const headerRef    = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });
  const [openId, setOpenId]       = useState<number | null>(null);
  const wrapRef  = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start end', 'end start'] });
  const progressH = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section className="tl-root">
      {/* ── Section header ── */}
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

      {/* ── Git graph panel ── */}
      <div className="git-wrap" ref={wrapRef}>
        {/* progress bar — fills as you scroll through */}
        <div className="git-progress-track">
          <motion.div className="git-progress-bar" style={{ height: progressH }} />
        </div>

        <div className="git-main">
          <TermBar />
          <LogHeader />

          <div className="git-log">
            <FutureCommit />
            {COMMITS.map((c, i) => (
              <CommitRow key={c.sha}
                commit={c} index={i}
                isOpen={openId === i}
                onToggle={() => setOpenId(openId === i ? null : i)}
              />
            ))}
          </div>

          {/* bottom prompt */}
          <div className="git-bottom-prompt">
            <span className="git-prompt">~/career</span>
            <span className="git-prompt-sym"> $ </span>
            <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1.1, repeat: Infinity }}>▌</motion.span>
          </div>
        </div>
      </div>
    </section>
  );
}
