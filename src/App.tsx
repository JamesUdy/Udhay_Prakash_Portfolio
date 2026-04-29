import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import BottomNav from './components/Navbar/BottomNav';

const Hero = lazy(() => import('./pages/Hero'));
const About = lazy(() => import('./pages/About'));
const Timeline = lazy(() => import('./pages/Timeline'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));
const Resume = lazy(() => import('./pages/Resume'));

function PageFallback() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center">
      <div className="canvas-loader" />
    </div>
  );
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <Suspense fallback={<PageFallback />}>{children}</Suspense>
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Hero /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/timeline" element={<PageWrapper><Timeline /></PageWrapper>} />
        <Route path="/projects" element={<PageWrapper><Projects /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
        <Route path="/resume" element={<PageWrapper><Resume /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="relative min-h-screen bg-[var(--color-bg)]">
          <AnimatedRoutes />
          <BottomNav />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
