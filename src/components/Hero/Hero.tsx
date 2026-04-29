import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { avatar } from '../../assets';
import HeroParticles from './HeroParticles';
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

const skills = [
  'React', 'TypeScript', 'Node.js', 'MongoDB', 'Next.js',
  'Python', 'Firebase', 'Redux', 'Tailwind CSS', 'REST APIs',
];

const floatingBadges = [
  { label: '3+ Years Exp',     icon: '🚀', delay: 0.9,  cls: 'badge--tl' },
  { label: '20+ Projects',     icon: '💼', delay: 1.1,  cls: 'badge--tr' },
  { label: 'Open to Work',     icon: '✅', delay: 1.3,  cls: 'badge--bl' },
  { label: 'Full Stack',       icon: '⚡', delay: 1.5,  cls: 'badge--br' },
];

export default function Hero() {
  return (
    <section className="hero-root">
      {/* Particles field */}
      <HeroParticles />

      {/* Aurora blobs */}
      <div className="aurora-blob aurora-blob--1" />
      <div className="aurora-blob aurora-blob--2" />
      <div className="aurora-blob aurora-blob--3" />

      <div className="hero-inner">
        {/* ── Left: text ── */}
        <motion.div
          className="hero-content"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={fadeUp} className="hero-role-chip">
            <span className="hero-role-dot" />
            Full Stack Engineer
          </motion.div>

          <motion.h1 variants={fadeUp} className="hero-heading">
            Hi, I&apos;m<br />
            <span className="hero-name-gradient">Udhaya Prakash M</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="hero-sub">
            Building scalable systems &amp; real-time applications
            with modern web technologies.
          </motion.p>

          <motion.div variants={fadeUp} className="hero-skills">
            {skills.map((s) => (
              <span key={s} className="hero-skill-pill">{s}</span>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Right: sphere + avatar + glass card + floating badges ── */}
        <motion.div
          className="hero-sphere-wrap"
          initial={{ opacity: 0, scale: 0.82 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut' as const, delay: 0.2 }}
        >
          {/* Outer glow ring */}
          <div className="hero-glow-ring" />
          {/* Secondary pulse ring */}
          <div className="hero-pulse-ring" />

          {/* Three.js canvas */}
          <div className="hero-canvas-wrap sm:!left-10">
            <Canvas style={{ width: '100%', height: '100%' }}>
              <Suspense fallback={null}>
                <OrbitControls enableZoom={false} />
                <ambientLight intensity={0.7} />
                <directionalLight position={[3, 2, 1]} intensity={1.2} />
                <pointLight position={[-3, -2, -2]} intensity={0.4} color="#06b6d4" />
                <Sphere args={[1, 64, 64]} scale={2.4}>
                  <MeshDistortMaterial
                    color="#6d28d9"
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

          {/* Floating info badges */}
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

          {/* Glass name card */}
          <motion.div
            className="hero-glass-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.5, ease: 'easeOut' as const }}
          >
            <p className="hero-glass-name">Udhaya Prakash M</p>
            <p className="hero-glass-role">Software Engineer · Full Stack</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scrolling tech marquee */}
      <div className="hero-marquee-wrap">
        <div className="hero-marquee-track">
          {[...skills, ...skills].map((s, i) => (
            <span key={i} className="hero-marquee-item">{s}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
