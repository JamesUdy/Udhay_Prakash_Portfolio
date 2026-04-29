import { useRef } from 'react';
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

const stats = [
  { value: '2+',   label: 'Years Experience' },
  { value: '150K', label: 'MAU Scaled To' },
  { value: '75%',  label: 'Pipeline Speedup' },
  { value: '9',    label: 'Projects Shipped' },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="about-root" ref={ref}>
      {/* ── Section header ── */}
      <motion.div
        className="about-header"
        variants={stagger}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
      >
        <motion.p variants={fadeUp} className="about-eyebrow">ABOUT ME</motion.p>
        <motion.h2 variants={fadeUp} className="about-heading">Get To Know Me.</motion.h2>
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
        className="about-stats"
        variants={stagger}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
      >
        {stats.map((s) => (
          <motion.div key={s.label} variants={fadeUp} className="about-stat">
            <span className="about-stat-value">{s.value}</span>
            <span className="about-stat-label">{s.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
