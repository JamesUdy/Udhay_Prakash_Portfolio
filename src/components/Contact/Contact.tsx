import {
  useState,
  useRef,
  useContext,
  useCallback,
  useEffect,
  useMemo,
  type ChangeEvent,
} from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { ISourceOptions } from '@tsparticles/engine';
import { ThemeContext } from '../../context/ThemeContext';
import socialMediaLinks from '../SocialMedia/SocialMediaLinks';
import './contact.css';

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

function ContactParticles() {
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
      id="contact-particles"
      className="ctf-particles"
      options={options}
      particlesLoaded={particlesLoaded}
    />
  );
}
// #endregion

// #region Types
type FormState = { name: string; email: string; message: string };
type Phase = 'idle' | 'sending' | 'success' | 'error';
const EMPTY: FormState = { name: '', email: '', message: '' };
// #endregion

// #region TerminalLine — typed output with cursor
function TerminalLine({
  text,
  delay = 0,
  color,
}: {
  text: string;
  delay?: number;
  color?: string;
}) {
  const [shown, setShown] = useState('');

  useEffect(() => {
    let i = 0;
    const t = setTimeout(() => {
      const id = setInterval(() => {
        i++;
        setShown(text.slice(0, i));
        if (i >= text.length) clearInterval(id);
      }, 22);
      return () => clearInterval(id);
    }, delay);
    return () => clearTimeout(t);
  }, [text, delay]);

  return (
    <div className="ctf-term-line" style={color ? { color } : {}}>
      <span className="ctf-term-prompt">›</span>
      <span>{shown}</span>
    </div>
  );
}
// #endregion

// #region ProgressBar — fake delivery progress
function DeliveryProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const steps = [15, 38, 62, 80, 95, 100];
    let i = 0;
    const id = setInterval(() => {
      setPct(steps[i]);
      i++;
      if (i >= steps.length) clearInterval(id);
    }, 220);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="ctf-delivery">
      <div className="ctf-delivery-track">
        <motion.div
          className="ctf-delivery-fill"
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>
      <span className="ctf-delivery-pct">{pct}%</span>
    </div>
  );
}
// #endregion

// #region TerminalForm
function TerminalForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [phase, setPhase] = useState<Phase>('idle');

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setPhase('sending');

    emailjs
      .send(
        'service_02o4n3k',
        'template_wzx16is',
        {
          from_name: form.name,
          to_name: 'Udhay',
          from_email: form.email,
          to_email: 'udayamvad@gmail.com',
          message: form.message,
        },
        '5wQj0dSc8N7OG7Vk9'
      )
      .then(() => {
        setPhase('success');
        setForm(EMPTY);
      })
      .catch(() => setPhase('error'));
  }

  const done = phase === 'success' || phase === 'error';
  const sending = phase === 'sending';

  return (
    <div className="ctf-terminal">
      {/* title bar */}
      <div className="ctf-term-bar">
        <span className="ctf-term-dot ctf-term-dot--red" />
        <span className="ctf-term-dot ctf-term-dot--amber" />
        <span className="ctf-term-dot ctf-term-dot--green" />
        <span className="ctf-term-bar-title">udhay@portfolio ~ contact</span>
      </div>

      {/* terminal body */}
      <div className="ctf-term-body">
        <div className="ctf-term-line ctf-term-line--dim">
          <span className="ctf-term-prompt">$</span>
          <span>send-message --interactive</span>
        </div>

        <AnimatePresence mode="wait">
          {!done ? (
            <motion.form
              key="form"
              ref={formRef}
              onSubmit={handleSubmit}
              className="ctf-term-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {/* name */}
              <div className="ctf-term-field">
                <label className="ctf-term-field-label">
                  <span className="ctf-term-prompt">›</span> name
                  <span className="ctf-term-field-sep">:</span>
                </label>
                <input
                  name="name"
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  disabled={sending}
                  className="ctf-term-input"
                  placeholder="your name"
                  spellCheck={false}
                />
              </div>

              {/* email */}
              <div className="ctf-term-field">
                <label className="ctf-term-field-label">
                  <span className="ctf-term-prompt">›</span> email
                  <span className="ctf-term-field-sep">:</span>
                </label>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  disabled={sending}
                  className="ctf-term-input"
                  placeholder="you@example.com"
                  spellCheck={false}
                />
              </div>

              {/* message */}
              <div className="ctf-term-field ctf-term-field--message">
                <label className="ctf-term-field-label ctf-term-field-label--top">
                  <span className="ctf-term-prompt">›</span> message
                  <span className="ctf-term-field-sep">:</span>
                </label>
                <textarea
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  required
                  disabled={sending}
                  className="ctf-term-input ctf-term-textarea"
                  placeholder="what's on your mind?"
                  spellCheck={false}
                />
              </div>

              {/* submit */}
              <button type="submit" disabled={sending} className="ctf-term-submit">
                {sending ? (
                  <>
                    <span className="ctf-term-spinner" /> executing…
                  </>
                ) : (
                  <>
                    <span className="ctf-term-prompt">$</span> send --message
                  </>
                )}
              </button>

              {sending && (
                <motion.div
                  className="ctf-term-line ctf-term-line--dim"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <span className="ctf-term-prompt">›</span>
                  <span>establishing connection to udhay@portfolio…</span>
                </motion.div>
              )}
            </motion.form>
          ) : (
            <motion.div
              key="result"
              className="ctf-term-result"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              {phase === 'success' ? (
                <>
                  <TerminalLine
                    text="connecting to mail relay…"
                    delay={0}
                    color="var(--color-text-muted)"
                  />
                  <TerminalLine
                    text="authenticating sender…"
                    delay={320}
                    color="var(--color-text-muted)"
                  />
                  <TerminalLine
                    text="encrypting payload…"
                    delay={620}
                    color="var(--color-text-muted)"
                  />
                  <DeliveryProgress />
                  <TerminalLine
                    text="✓ message delivered successfully."
                    delay={1600}
                    color="#00c878"
                  />
                  <TerminalLine
                    text="✓ Udhay will get back to you soon."
                    delay={1900}
                    color="#00c878"
                  />
                  <div className="ctf-term-line ctf-term-line--dim" style={{ marginTop: '0.8rem' }}>
                    <span className="ctf-term-prompt">$</span>
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 1.1, repeat: Infinity }}
                    >
                      ▌
                    </motion.span>
                  </div>
                </>
              ) : (
                <>
                  <TerminalLine text="✗ connection refused." delay={0} color="#f72585" />
                  <TerminalLine
                    text="✗ error: failed to send message."
                    delay={280}
                    color="#f72585"
                  />
                  <button className="ctf-term-retry" onClick={() => setPhase('idle')}>
                    <span className="ctf-term-prompt">$</span> retry
                  </button>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
// #endregion

// #region SignalCard
const SIGNAL_COLORS: Record<string, string> = {
  LinkedIn: '#0a66c2',
  GitHub: '#915eff',
  WhatsApp: '#25d366',
  Mail: '#f72585',
};

function SignalBars({ color }: { color: string }) {
  return (
    <div className="ctf-signal-bars">
      {[0.4, 0.65, 0.85, 1].map((h, i) => (
        <motion.span
          key={i}
          className="ctf-signal-bar"
          style={{ '--bar-color': color, '--bar-h': h } as React.CSSProperties}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 0.3 + i * 0.07, duration: 0.4, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}

function SignalCard({ link, index }: { link: (typeof socialMediaLinks)[0]; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const color = SIGNAL_COLORS[link.siteName] ?? '#915eff';

  return (
    <motion.a
      ref={ref}
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="ctf-signal-card"
      style={{ '--card-accent': color } as React.CSSProperties}
      initial={{ opacity: 0, x: 36 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.025 }}
      whileTap={{ scale: 0.975 }}
      aria-label={link.siteName}
    >
      {/* left accent bar */}
      <span className="ctf-signal-accentbar" />

      {/* icon */}
      <span
        className="ctf-signal-icon"
        style={{ background: `${color}22`, border: `1px solid ${color}44` }}
      >
        <link.icon />
      </span>

      {/* info */}
      <div className="ctf-signal-info">
        <span className="ctf-signal-name">{link.siteName}</span>
        <span className="ctf-signal-status">
          <motion.span
            className="ctf-signal-dot"
            style={{ background: color }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.6 + index * 0.2, repeat: Infinity }}
          />
          online
        </span>
      </div>

      {/* signal bars */}
      <SignalBars color={color} />

      {/* arrow */}
      <svg
        className="ctf-signal-arrow"
        viewBox="0 0 16 16"
        fill="currentColor"
        width={12}
        height={12}
      >
        <path d="M6.22 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06Z" />
      </svg>
    </motion.a>
  );
}
// #endregion

// #region Contact section
export default function Contact() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });

  return (
    <section className="ctf-root">
      <ContactParticles />
      {/* ambient blobs */}
      <div className="ctf-blob ctf-blob--1" />
      <div className="ctf-blob ctf-blob--2" />

      {/* header */}
      <motion.div
        ref={headerRef}
        className="ctf-header"
        initial="hidden"
        animate={headerInView ? 'show' : 'hidden'}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
      >
        <motion.p
          className="ctf-eyebrow"
          variants={{
            hidden: { opacity: 0, y: 24 },
            show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
        >
          CONTACT
        </motion.p>
        <motion.h2
          className="ctf-heading"
          variants={{
            hidden: { opacity: 0, y: 24 },
            show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
        >
          Get In Touch.
        </motion.h2>
        <motion.p
          className="ctf-subheading"
          variants={{
            hidden: { opacity: 0, y: 24 },
            show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
        >
          Drop a message via the terminal or connect on any platform.
        </motion.p>
      </motion.div>

      {/* body */}
      <div className="ctf-body">
        {/* terminal */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <TerminalForm />
        </motion.div>

        {/* signal cards */}
        <div className="ctf-social-panel">
          <p className="ctf-social-label">Connect via</p>
          <div className="ctf-social-list">
            {socialMediaLinks.map((link, i) => (
              <SignalCard key={link.id} link={link} index={i} />
            ))}
          </div>

          <div className="ctf-availability">
            <motion.span
              className="ctf-avail-dot"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            Available for full-time roles
          </div>
        </div>
      </div>
    </section>
  );
}
// #endregion
