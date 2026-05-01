import { Suspense, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { avatar } from '../../assets';
import HeroParticles from './HeroParticles';
import CodeBlock from './CodeBlock';
import { useTheme } from '../../hooks/useTheme';
import './Hero.css';

const FloatingImg = styled.img`
  object-fit: contain;
  position: absolute;
  top: 0;
  bottom: 0;
  left: -1.6rem;
  right: 0;
  margin: auto;
  width: 78%;
  height: 78%;
  animation: floatAvatar 3s ease-in-out infinite alternate;
  filter: drop-shadow(0 0 28px rgba(167, 139, 250, 0.5));

  @keyframes floatAvatar {
    from {
      transform: translateY(0px);
    }
    to {
      transform: translateY(16px);
    }
  }
`;

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' as const } },
};

const charVariant = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.45, ease: 'easeOut' as const },
  },
};

const typewriterSubtitles = [
  'Building scalable full-stack experiences.',
  'Turning ideas into production-ready code.',
  'React • Node.js • Cloud • TypeScript.',
];

function TypewriterText({ texts }: { texts: string[] }) {
  const [textIdx, setTextIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [phase, setPhase] = useState<'typing' | 'pause' | 'erasing'>('typing');

  useEffect(() => {
    const current = texts[textIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === 'typing') {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 45);
      } else {
        timeout = setTimeout(() => setPhase('pause'), 1800);
      }
    } else if (phase === 'pause') {
      timeout = setTimeout(() => setPhase('erasing'), 400);
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 28);
      } else {
        setTextIdx((i) => (i + 1) % texts.length);
        setPhase('typing');
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, phase, textIdx, texts]);

  return (
    <span className="hero-typewriter">
      {displayed}
      <span className="hero-typewriter-cursor" aria-hidden="true">
        |
      </span>
    </span>
  );
}

const marqueeSkills = [
  'React',
  'TypeScript',
  'Node.js',
  'MongoDB',
  'Next.js',
  'Python',
  'Firebase',
  'Redux',
  'Tailwind CSS',
  'REST APIs',
];

const floatingBadges = [
  { label: '3+ Years Exp', icon: '🚀', delay: 0.9, cls: 'badge--tl' },
  { label: '20+ Projects', icon: '💼', delay: 1.1, cls: 'badge--tr' },
  { label: 'Open to Work', icon: '✅', delay: 1.3, cls: 'badge--bl' },
  { label: 'Full Stack', icon: '⚡', delay: 1.5, cls: 'badge--br' },
];

const nameVariants = [
  { lang: 'English', text: 'Udhaya Prakash M' },
  { lang: 'Tamil', text: 'உதய பிரகாஷ் மு' },
  { lang: 'Tamil-Brahmi', text: '𑀉𑀢𑀬 𑀧𑀭𑀓𑀲 𑀫𑀼' },
  { lang: 'German', text: 'Udaya Prakasch M' },
  { lang: 'Japanese', text: 'ウダヤ プラカシュ ム' },
];

const langFade = {
  initial: { opacity: 0, y: 18, filter: 'blur(8px)' },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: 'easeOut' as const },
  },
  exit: {
    opacity: 0,
    y: -18,
    filter: 'blur(8px)',
    transition: { duration: 0.45, ease: 'easeIn' as const },
  },
};

export default function Hero() {
  const { theme } = useTheme();
  const sphereColor = theme === 'light' ? '#ab7cff' : '#6d28d9';
  const [langIdx, setLangIdx] = useState(0);
  const [nameRevealed, setNameRevealed] = useState(false);

  useEffect(() => {
    // delay cycling until after the initial letter-by-letter reveal (~1.2s)
    const reveal = setTimeout(() => setNameRevealed(true), 1200);
    return () => clearTimeout(reveal);
  }, []);

  useEffect(() => {
    if (!nameRevealed) return;
    const id = setInterval(() => setLangIdx((i) => (i + 1) % nameVariants.length), 2600);
    return () => clearInterval(id);
  }, [nameRevealed]);

  const englishChars = nameVariants[0].text.split('');

  return (
    <section className="hero-root">
      <HeroParticles />

      <div className="aurora-blob aurora-blob--1" />
      <div className="aurora-blob aurora-blob--2" />
      <div className="aurora-blob aurora-blob--3" />

      <div className="hero-inner">
        {/* ── Row 1: centered header ── */}
        <motion.div className="hero-header" variants={stagger} initial="hidden" animate="show">
          <motion.div variants={fadeUp} className="hero-role-chip">
            <span className="hero-role-dot" />
            Full Stack Engineer
          </motion.div>

          <motion.div variants={fadeUp} className="hero-lang-wrap">
            <p className="hero-lang-hi">Hi, I&apos;m</p>
            <div className="hero-lang-name-box">
              {!nameRevealed ? (
                /* letter-by-letter reveal on first load */
                <motion.span
                  className="hero-lang-name"
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.055 } } }}
                  initial="hidden"
                  animate="show"
                >
                  {englishChars.map((ch, i) => (
                    <motion.span key={i} variants={charVariant} style={{ display: 'inline-block' }}>
                      {ch === ' ' ? ' ' : ch}
                    </motion.span>
                  ))}
                </motion.span>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.span
                    key={langIdx}
                    className="hero-lang-name"
                    variants={langFade}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    {nameVariants[langIdx].text}
                  </motion.span>
                </AnimatePresence>
              )}
            </div>
            <span className="hero-lang-badge">{nameVariants[langIdx].lang}</span>
          </motion.div>

          {/* typewriter subtitle */}
          <motion.div variants={fadeUp} className="hero-subtitle">
            <TypewriterText texts={typewriterSubtitles} />
          </motion.div>

          {/* CTA buttons */}
          <motion.div variants={fadeUp} className="hero-ctas">
            <Link to="/projects" className="hero-cta hero-cta--primary">
              View Work
            </Link>
            <Link to="/contact" className="hero-cta hero-cta--secondary">
              Contact Me
            </Link>
          </motion.div>
        </motion.div>

        {/* ── Row 2: code editor + sphere ── */}
        <div className="hero-bottom-row">
          {/* Code editor */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
          >
            <CodeBlock />
          </motion.div>

          {/* 3D sphere */}
          <motion.div
            className="hero-sphere-wrap"
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut' as const, delay: 0.2 }}
          >
            <div className="hero-glow-ring" />
            <div className="hero-pulse-ring" />

            <div className="hero-canvas-wrap">
              <Canvas style={{ width: '100%', height: '100%' }}>
                <Suspense fallback={null}>
                  <OrbitControls enableZoom={false} />
                  <ambientLight intensity={0.7} />
                  <directionalLight position={[3, 2, 1]} intensity={1.2} />
                  <pointLight position={[-3, -2, -2]} intensity={0.4} color="#06b6d4" />
                  <Sphere args={[1, 64, 64]} scale={2.4}>
                    <MeshDistortMaterial
                      color={sphereColor}
                      attach="material"
                      distort={0.48}
                      speed={2.2}
                      roughness={0.08}
                      metalness={0.2}
                    />
                  </Sphere>
                </Suspense>
              </Canvas>
              <FloatingImg src={avatar} alt="Udhaya Prakash M" />
            </div>

            {floatingBadges.map((b) => (
              <motion.div
                key={b.label}
                className={`hero-badge ${b.cls}`}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: b.delay, duration: 0.45, ease: 'easeOut' as const }}
              >
                <span className="hero-badge-icon">{b.icon}</span>
                <span className="hero-badge-label">{b.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
        {/* end hero-bottom-row */}
      </div>
      {/* end hero-inner */}

      {/* Scrolling tech marquee */}
      <div className="hero-marquee-wrap">
        <div className="hero-marquee-track">
          {[...marqueeSkills, ...marqueeSkills].map((s, i) => (
            <span key={i} className="hero-marquee-item">
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll-down caret */}
      <motion.div
        className="hero-scroll-caret"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </motion.div>
    </section>
  );
}
