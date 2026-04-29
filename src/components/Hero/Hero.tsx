import { Suspense, useEffect, useState } from 'react';
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
    from { transform: translateY(0px); }
    to   { transform: translateY(16px); }
  }
`;

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' as const } },
};

const marqueeSkills = [
  'React', 'TypeScript', 'Node.js', 'MongoDB', 'Next.js',
  'Python', 'Firebase', 'Redux', 'Tailwind CSS', 'REST APIs',
];

const floatingBadges = [
  { label: '3+ Years Exp', icon: '🚀', delay: 0.9,  cls: 'badge--tl' },
  { label: '20+ Projects', icon: '💼', delay: 1.1,  cls: 'badge--tr' },
  { label: 'Open to Work', icon: '✅', delay: 1.3,  cls: 'badge--bl' },
  { label: 'Full Stack',   icon: '⚡', delay: 1.5,  cls: 'badge--br' },
];

const nameVariants = [
  { lang: 'English',  text: 'Udhaya Prakash M' },
  { lang: 'Tamil',    text: 'உதய பிரகாஷ் மு'   },
  { lang: 'Tamil-Brahmi', text: '𑀉𑀢𑀬 𑀧𑀭𑀓𑀲 𑀫𑀼' },
  { lang: 'German',   text: 'Udaya Prakasch M' },
  { lang: 'Japanese', text: 'ウダヤ プラカシュ ム' },
];

const langFade = {
  initial: { opacity: 0, y: 18,  filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0,   filter: 'blur(0px)', transition: { duration: 0.7,  ease: 'easeOut' as const } },
  exit:    { opacity: 0, y: -18, filter: 'blur(8px)', transition: { duration: 0.45, ease: 'easeIn'  as const } },
};

export default function Hero() {
  const { theme } = useTheme();
  const sphereColor = theme === 'light' ? '#ab7cff' : '#6d28d9';
  const [langIdx, setLangIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setLangIdx((i) => (i + 1) % nameVariants.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="hero-root">
      <HeroParticles />

      <div className="aurora-blob aurora-blob--1" />
      <div className="aurora-blob aurora-blob--2" />
      <div className="aurora-blob aurora-blob--3" />

      <div className="hero-inner">

        {/* ── Row 1: centered header ── */}
        <motion.div
          className="hero-header"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={fadeUp} className="hero-role-chip">
            <span className="hero-role-dot" />
            Full Stack Engineer
          </motion.div>

          <motion.div variants={fadeUp} className="hero-lang-wrap">
            <p className="hero-lang-hi">Hi, I&apos;m</p>
            <div className="hero-lang-name-box">
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
            </div>
            <span className="hero-lang-badge">{nameVariants[langIdx].lang}</span>
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

        </div>{/* end hero-bottom-row */}

      </div>{/* end hero-inner */}

      {/* Scrolling tech marquee */}
      <div className="hero-marquee-wrap">
        <div className="hero-marquee-track">
          {[...marqueeSkills, ...marqueeSkills].map((s, i) => (
            <span key={i} className="hero-marquee-item">{s}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
