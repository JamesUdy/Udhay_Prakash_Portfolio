import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { ISourceOptions } from '@tsparticles/engine';
import { ThemeContext } from '../../context/ThemeContext';
import './resume.css';

const resumePDF = '/resume/UDHAYA_PRAKASH_M_Resume.pdf';

// #region Particles
let engineReady = false;
let enginePromise: Promise<void> | null = null;

function ensureEngine() {
  if (engineReady) return Promise.resolve();
  if (!enginePromise) {
    enginePromise = initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      engineReady = true;
    });
  }
  return enginePromise;
}

function ResumeParticles() {
  const { theme } = useContext(ThemeContext);
  const [ready, setReady] = useState(engineReady);

  useEffect(() => {
    if (ready) return;
    ensureEngine().then(() => setReady(true));
  }, [ready]);

  const options: ISourceOptions = useMemo(() => {
    const isDark = theme === 'dark';
    return {
      fullScreen: { enable: false },
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: { enable: true, mode: 'grab' },
          onClick: { enable: true, mode: 'push' },
        },
        modes: {
          grab: { distance: 160, links: { opacity: isDark ? 0.5 : 0.7 } },
          push: { quantity: 3 },
        },
      },
      particles: {
        number: { value: 72, density: { enable: true } },
        color: {
          value: isDark
            ? ['#a78bfa', '#06b6d4', '#ec4899', '#f59e0b']
            : ['#6d28d9', '#0891b2', '#be185d', '#b45309'],
        },
        links: {
          enable: true,
          distance: 140,
          color: isDark ? '#a78bfa' : '#6d28d9',
          opacity: isDark ? 0.18 : 0.35,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.7,
          direction: 'none',
          random: true,
          straight: false,
          outModes: { default: 'bounce' },
        },
        opacity: {
          value: isDark ? { min: 0.2, max: 0.7 } : { min: 0.45, max: 0.9 },
          animation: { enable: true, speed: 0.8, sync: false },
        },
        size: {
          value: { min: 1, max: 3 },
          animation: { enable: true, speed: 2, sync: false },
        },
        shape: { type: 'circle' },
      },
      detectRetina: true,
    };
  }, [theme]);

  const particlesLoaded = useCallback(async () => {}, []);

  if (!ready) return null;

  return (
    <Particles
      key={theme}
      id="resume-particles"
      className="rsm-particles"
      options={options}
      particlesLoaded={particlesLoaded}
    />
  );
}
// #endregion

export default function ResumeRoute() {
  return (
    <div className="rsm-root">
      <ResumeParticles />

      <div className="rsm-blob rsm-blob--1" />
      <div className="rsm-blob rsm-blob--2" />

      <div className="rsm-content">
        {/* header */}
        <motion.div
          className="rsm-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="rsm-header-left">
            <p className="rsm-eyebrow">RESUME</p>
            <h1 className="rsm-title">Udhaya Prakash M</h1>
            <p className="rsm-subtitle">Full Stack Developer</p>
          </div>

          <div className="rsm-actions">
            <motion.a
              href={resumePDF}
              download="UDHAYA_PRAKASH_M_Resume.pdf"
              className="rsm-btn rsm-btn--ghost"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <svg viewBox="0 0 16 16" fill="currentColor" width={14} height={14}>
                <path d="M8 1a.75.75 0 0 1 .75.75v6.69l1.97-1.97a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.53a.75.75 0 0 1 1.06-1.06L7.25 8.44V1.75A.75.75 0 0 1 8 1ZM1.75 13a.75.75 0 0 0 0 1.5h12.5a.75.75 0 0 0 0-1.5H1.75Z" />
              </svg>
              Download
            </motion.a>

            <motion.a
              href={resumePDF}
              target="_blank"
              rel="noopener noreferrer"
              className="rsm-btn rsm-btn--primary"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <svg viewBox="0 0 16 16" fill="currentColor" width={14} height={14}>
                <path d="M3.75 2h3.5a.75.75 0 0 1 0 1.5h-3.5a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-3.5a.75.75 0 0 1 1.5 0v3.5A1.75 1.75 0 0 1 12.25 14h-8.5A1.75 1.75 0 0 1 2 12.25v-8.5C2 2.784 2.784 2 3.75 2Zm6.854-1h4.146a.25.25 0 0 1 .25.25v4.146a.25.25 0 0 1-.427.177L13.03 4.03 9.28 7.78a.75.75 0 0 1-1.06-1.06l3.75-3.75-1.543-1.543A.25.25 0 0 1 10.604 1Z" />
              </svg>
              Open in tab
            </motion.a>
          </div>
        </motion.div>

        {/* PDF frame */}
        <motion.div
          className="rsm-frame"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="rsm-frame-bar">
            <span className="rsm-frame-dot rsm-frame-dot--red" />
            <span className="rsm-frame-dot rsm-frame-dot--amber" />
            <span className="rsm-frame-dot rsm-frame-dot--green" />
            <span className="rsm-frame-bar-title">UDHAYA_PRAKASH_M_Resume.pdf</span>
          </div>

          <iframe
            src={`${resumePDF}#toolbar=0&navpanes=0&scrollbar=0`}
            title="Udhaya Prakash Resume"
            className="rsm-iframe"
          />
        </motion.div>
      </div>
    </div>
  );
}
