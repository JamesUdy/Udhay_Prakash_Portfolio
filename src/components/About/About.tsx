import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import './About.css';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.12 } },
};

// numeric target, suffix shown after count, display label
const stats: { end: number; suffix: string; label: string }[] = [
  { end: 2,   suffix: '+',  label: 'Years Experience'   },
  { end: 150, suffix: 'K',  label: 'MAU Scaled To'      },
  { end: 75,  suffix: '%',  label: 'Pipeline Speedup'   },
  { end: 60,  suffix: '%',  label: 'Sync Errors Reduced'},
];

function CountUp({ end, suffix, active }: { end: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const duration = 1400;
    const step = 16;
    const steps = duration / step;
    const increment = end / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [active, end]);

  return <>{count}{suffix}</>;
}

export default function About() {
  const ref     = useRef<HTMLDivElement>(null);
  const inView  = useInView(ref, { once: true, margin: '-80px' });
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-40px' });

  return (
    <section className="about-root" ref={ref}>
      {/* ── Section header ── */}
      <motion.div
        className="about-header"
        variants={stagger}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
      >
        <motion.p variants={fadeUp} className="about-eyebrow">INTRODUCTION</motion.p>
        <motion.h2 variants={fadeUp} className="about-heading">Who I Am.</motion.h2>
      </motion.div>

      {/* ── Split layout: bio | abstract shape ── */}
      <motion.div
        className="about-split"
        variants={stagger}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
      >
        {/* Left — bio */}
        <motion.div variants={fadeUp} className="about-bio">
          <p className="about-bio-text">
            Software Engineer with 2+ years of experience building scalable backend systems and
            real-time applications. Specialized in event-driven architecture, performance
            optimization, and high-throughput APIs.
          </p>
          <p className="about-bio-text">
            I&apos;ve reduced processing pipelines by 75% and scaled systems to 150K+ MAU with
            sub-150ms latency. Outside of engineering, I enjoy sketching and occasionally doodle.
            Let&apos;s build something great together!
          </p>

          <div className="about-ctas">
            <Link to="/contact" className="about-cta about-cta--primary">Let's Talk</Link>
            <a
              href="https://read.cv/jamesudy"
              target="_blank"
              rel="noreferrer"
              className="about-cta about-cta--secondary"
            >
              View CV ↗
            </a>
          </div>
        </motion.div>

        {/* Right — abstract glow shape */}
        <motion.div variants={fadeUp} className="about-shape-wrap" aria-hidden="true">
          <div className="about-shape">
            <div className="about-shape-ring about-shape-ring--1" />
            <div className="about-shape-ring about-shape-ring--2" />
            <div className="about-shape-ring about-shape-ring--3" />
            <span className="about-shape-initials">UP</span>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Stats strip ── */}
      <motion.div
        ref={statsRef}
        className="about-stats"
        variants={stagger}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
      >
        {stats.map((s) => (
          <motion.div key={s.label} variants={fadeUp} className="about-stat">
            <span className="about-stat-value">
              <CountUp end={s.end} suffix={s.suffix} active={statsInView} />
            </span>
            <span className="about-stat-label">{s.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
