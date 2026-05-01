import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './notfound.css';

const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  size: Math.random() * 6 + 3,
  left: Math.random() * 100,
  top: Math.random() * 100,
  dur: `${Math.random() * 4 + 3}s`,
  delay: `${Math.random() * 5}s`,
}));

const ORBITS = [
  { size: 280, speed: '18s', hasDot: true },
  { size: 420, speed: '28s', hasDot: false },
  { size: 560, speed: '40s', hasDot: true },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export default function NotFound() {
  const glitchRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = glitchRef.current;
    if (!el) return;
    el.setAttribute('data-text', '404');
  }, []);

  return (
    <section className="nf-root">
      {/* Aurora blobs */}
      <div className="nf-blob nf-blob--1" />
      <div className="nf-blob nf-blob--2" />
      <div className="nf-blob nf-blob--3" />

      {/* Scanlines */}
      <div className="nf-scanlines" aria-hidden="true" />

      {/* Floating particles */}
      {PARTICLES.map((p) => (
        <span
          key={p.id}
          className="nf-particle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
            ['--dur' as string]: p.dur,
            ['--delay' as string]: p.delay,
          }}
        />
      ))}

      {/* Orbit rings */}
      <div className="nf-orbit-wrap" aria-hidden="true">
        {ORBITS.map((o) => (
          <div
            key={o.size}
            className={`nf-orbit${o.hasDot ? ' nf-orbit--dot' : ''}`}
            style={{
              width: o.size,
              height: o.size,
              ['--speed' as string]: o.speed,
            }}
          />
        ))}
      </div>

      {/* Glitch 404 */}
      <motion.div
        className="nf-glitch-wrap"
        initial={{ opacity: 0, scale: 0.6, filter: 'blur(20px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <span className="nf-glitch" ref={glitchRef} data-text="404">
          404
        </span>
      </motion.div>

      {/* Content */}
      <motion.div
        className="nf-content"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        <motion.span variants={fadeUp} className="nf-label">
          Page Not Found
        </motion.span>

        <motion.h1 variants={fadeUp} className="nf-title">
          You&apos;ve drifted into the void.
        </motion.h1>

        <motion.p variants={fadeUp} className="nf-desc">
          This page doesn&apos;t exist — or maybe it got lost somewhere between
          dimensions. Let&apos;s get you back.
        </motion.p>

        <motion.div variants={fadeUp}>
          <Link to="/" className="nf-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
