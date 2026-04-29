import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, CalendarDays, Layers, Mail, FileText, Sun, Moon } from 'lucide-react';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import { useTheme } from '../../hooks/useTheme';

const NAV_ITEMS = [
  { path: '/',          label: 'Home',       Icon: Home         },
  { path: '/about',     label: 'About',      Icon: User         },
  { path: '/timeline',  label: 'Experience', Icon: CalendarDays },
  { path: '/projects',  label: 'Projects',   Icon: Layers       },
  { path: '/contact',   label: 'Contact',    Icon: Mail         },
  { path: '/resume',    label: 'Resume',     Icon: FileText     },
] as const;

export default function BottomNav() {
  const location = useLocation();
  const navigate  = useNavigate();
  const scrollDir = useScrollDirection(8);
  const { theme, toggleTheme } = useTheme();

  const isHidden = scrollDir === 'down';

  return (
    <motion.nav
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: isHidden ? 96 : 0, opacity: isHidden ? 0 : 1 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none"
    >
      <div className="pointer-events-auto flex items-center gap-1 px-3 py-2.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/80 backdrop-blur-xl shadow-xl">

        {NAV_ITEMS.map(({ path, label, Icon }) => {
          const isActive = location.pathname === path;
          return (
            <div key={path} className="relative group">
              {/* Tooltip — desktop only */}
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none bg-[var(--color-surface-2)] text-[var(--color-text)] border border-[var(--color-border)] hidden sm:block">
                {label}
              </span>

              <motion.button
                onClick={() => navigate(path)}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.92 }}
                className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200 ${
                  isActive
                    ? 'text-[var(--color-accent)] bg-[var(--color-accent)]/10'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                }`}
                aria-label={label}
              >
                <Icon size={19} strokeWidth={isActive ? 2.2 : 1.8} />
                {isActive && (
                  <motion.span
                    layoutId="active-dot"
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--color-accent)]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.button>
            </div>
          );
        })}

        {/* Divider */}
        <div className="w-px h-5 bg-[var(--color-border)] mx-1" />

        {/* Theme toggle */}
        <div className="relative group">
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none bg-[var(--color-surface-2)] text-[var(--color-text)] border border-[var(--color-border)] hidden sm:block">
            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </span>
          <motion.button
            onClick={(e) => toggleTheme(e.clientX, e.clientY)}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.92 }}
            className="flex items-center justify-center w-10 h-10 rounded-full text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors duration-200"
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={theme}
                initial={{ rotate: -30, opacity: 0, scale: 0.8 }}
                animate={{ rotate: 0,   opacity: 1, scale: 1   }}
                exit={{    rotate:  30, opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                {theme === 'dark' ? <Sun size={19} strokeWidth={1.8} /> : <Moon size={19} strokeWidth={1.8} />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>

      </div>
    </motion.nav>
  );
}
