import { lazy, Suspense, useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import BottomNav from './components/Navbar/BottomNav';
import BulbLoader from './components/Loader/BulbLoader';
import PageTransition from './components/Loader/PageTransition';

const Hero     = lazy(() => import('./pages/Hero'));
const About    = lazy(() => import('./pages/About'));
const Timeline = lazy(() => import('./pages/Timeline'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact  = lazy(() => import('./pages/Contact'));
const Resume   = lazy(() => import('./pages/Resume'));

// #region Helpers

function isFirstVisit() {
  if (sessionStorage.getItem('visited')) return false;
  sessionStorage.setItem('visited', '1');
  return true;
}

// #endregion

// #region Animated routes

function AnimatedRoutes() {
  const location = useLocation();

  // renderedPath = what is actually mounted in <Routes>
  // during a transition this stays on the old path so the old page
  // sits frozen underneath the overlay (opacity 0 — not visible)
  const [renderedPath, setRenderedPath] = useState(location.pathname);
  const [transitioning, setTransitioning] = useState(false);
  const pendingPathRef = useRef<string>(location.pathname);

  useEffect(() => {
    const next = location.pathname;
    if (next === renderedPath) return;

    // hero has no page transition overlay — swap immediately
    if (next === '/') {
      setRenderedPath(next);
      return;
    }

    pendingPathRef.current = next;
    setTransitioning(true);
  }, [location.pathname]);

  function handleTransitionDone() {
    setRenderedPath(pendingPathRef.current);
    setTransitioning(false);
  }

  return (
    <>
      {/* Overlay fires BEFORE the page swaps */}
      {transitioning && (
        <PageTransition
          key={location.pathname}
          pathname={pendingPathRef.current}
          onComplete={handleTransitionDone}
        />
      )}

      {/* Page content — hidden while transition is playing */}
      <AnimatePresence mode="wait">
        <motion.div
          key={renderedPath}
          initial={{ opacity: 0 }}
          animate={{ opacity: transitioning ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{ visibility: transitioning ? 'hidden' : 'visible' }}
        >
          {/* No Suspense spinner — pages are hidden during transition so
              lazy chunks load silently behind the overlay */}
          <Suspense fallback={null}>
            <Routes location={{ ...location, pathname: renderedPath }}>
              <Route path="/"         element={<Hero />}     />
              <Route path="/about"    element={<About />}    />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact"  element={<Contact />}  />
              <Route path="/resume"   element={<Resume />}   />
            </Routes>
          </Suspense>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

// #endregion

// #region App root

export default function App() {
  const [bulbDone, setBulbDone] = useState(() => !isFirstVisit());

  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="relative min-h-screen bg-[var(--color-bg)]">
          {!bulbDone && <BulbLoader onComplete={() => setBulbDone(true)} />}
          {bulbDone && (
            <>
              <AnimatedRoutes />
              <BottomNav />
            </>
          )}
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

// #endregion
