import { useEffect, useRef, useState } from 'react';

/*
  Syntax token types — each maps to a color pair [dark, light]
  chosen to read well on both theme backgrounds.
*/
const TOKEN_COLORS: Record<string, [string, string]> = {
  kw: ['#c792ea', '#7c3aed'], // keyword      — purple
  vn: ['#82aaff', '#1d4ed8'], // variable     — blue
  pu: ['#89ddff', '#0891b2'], // punctuation  — cyan
  str: ['#c3e88d', '#15803d'], // string       — green
  num: ['#f78c6c', '#c2410c'], // number/stat  — orange
  bool: ['#ff9cac', '#be185d'], // boolean      — pink
  cmt: ['#4a5568', '#94a3b8'], // comment      — grey
  err: ['#ef4444', '#dc2626'], // error        — red
  ok: ['#22c55e', '#16a34a'], // success      — green
};

type Token = { text: string; tk: string };
type Line = { tokens: Token[]; kind?: 'error' | 'success' | 'comment' };

const LINES: Line[] = [
  {
    tokens: [
      { text: 'const ', tk: 'kw' },
      { text: 'engineer', tk: 'vn' },
      { text: ' = {', tk: 'pu' },
    ],
  },
  {
    tokens: [
      { text: '  name', tk: 'kw' },
      { text: ':  ', tk: 'pu' },
      { text: '"Udhaya Prakash M"', tk: 'str' },
      { text: ',', tk: 'pu' },
    ],
  },
  {
    tokens: [
      { text: '  role', tk: 'kw' },
      { text: ':  ', tk: 'pu' },
      { text: '"Full Stack Engineer"', tk: 'str' },
      { text: ',', tk: 'pu' },
    ],
  },
  {
    tokens: [
      { text: '  stack', tk: 'kw' },
      { text: ': ', tk: 'pu' },
      { text: '["React","Node.js","Next.js"]', tk: 'str' },
      { text: ',', tk: 'pu' },
    ],
  },
  {
    tokens: [
      { text: '  loves', tk: 'kw' },
      { text: ': ', tk: 'pu' },
      { text: '"real-time systems"', tk: 'str' },
      { text: ',', tk: 'pu' },
    ],
  },
  {
    tokens: [
      { text: '  users', tk: 'kw' },
      { text: ': ', tk: 'pu' },
      { text: '"150K+"', tk: 'num' },
      { text: ',', tk: 'pu' },
    ],
  },
  {
    tokens: [
      { text: '  open', tk: 'kw' },
      { text: ':  ', tk: 'pu' },
      { text: 'true', tk: 'bool' },
    ],
  },
  { tokens: [{ text: '}', tk: 'pu' }] },
  { tokens: [{ text: '', tk: 'pu' }] },
  { kind: 'comment', tokens: [{ text: '// TODO: fix bugs before interview 😅', tk: 'cmt' }] },
  {
    kind: 'error',
    tokens: [{ text: '// ⚠ RuntimeError: too_much_coffee detected ☕', tk: 'err' }],
  },
  { kind: 'comment', tokens: [{ text: '// Restarting engineer...', tk: 'cmt' }] },
  { kind: 'success', tokens: [{ text: '// ✅ Ready to ship.', tk: 'ok' }] },
];

function lineText(line: Line) {
  return line.tokens.map((t) => t.text).join('');
}

export default function CodeBlock() {
  const [isDark, setIsDark] = useState(
    () => document.documentElement.getAttribute('data-theme') !== 'light'
  );
  const [visibleChars, setVisibleChars] = useState<number[]>(LINES.map(() => 0));
  const [activeLine, setActiveLine] = useState(0);
  const [done, setDone] = useState(false);

  // track theme changes without needing context
  useEffect(() => {
    const obs = new MutationObserver(() => {
      setIsDark(document.documentElement.getAttribute('data-theme') !== 'light');
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
  }, []);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let li = 0;
    let ci = 0;
    setTimeout(() => {
      setVisibleChars(LINES.map(() => 0));
      setActiveLine(0);
      setDone(false);
    }, 0);

    function tick() {
      if (li >= LINES.length) {
        setDone(true);
        return;
      }
      const full = lineText(LINES[li]);
      const isComical = LINES[li].kind === 'error' || LINES[li].kind === 'success';

      if (ci <= full.length) {
        const capturedLi = li;
        const capturedCi = ci;
        setVisibleChars((prev) => {
          const n = [...prev];
          n[capturedLi] = capturedCi;
          return n;
        });
        setActiveLine(capturedLi);
        ci++;
        timerRef.current = setTimeout(tick, isComical ? 20 : 24);
      } else {
        li++;
        ci = 0;
        timerRef.current = setTimeout(tick, isComical ? 180 : 65);
      }
    }

    timerRef.current = setTimeout(tick, 500);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  function color(tk: string) {
    const pair = TOKEN_COLORS[tk];
    return pair ? pair[isDark ? 0 : 1] : 'inherit';
  }

  // theme-aware surface values via CSS vars so they auto-adapt
  const wrapStyle: React.CSSProperties = {
    background: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    backdropFilter: 'blur(18px)',
    WebkitBackdropFilter: 'blur(18px)',
    boxShadow: isDark
      ? '0 8px 40px rgba(0,0,0,0.5), 0 0 50px rgba(109,40,217,0.15)'
      : '0 8px 32px rgba(109,40,217,0.12), 0 2px 8px rgba(0,0,0,0.08)',
    fontFamily: "'JetBrains Mono','Fira Code','Cascadia Code',Consolas,monospace",
  };

  const barStyle: React.CSSProperties = {
    background: 'var(--color-surface-2)',
    borderBottom: '1px solid var(--color-border)',
  };

  const lnColor = isDark ? 'rgba(120,113,150,0.4)' : 'rgba(75,64,104,0.35)';

  return (
    <div className="w-full max-w-[460px] rounded-2xl overflow-hidden" style={wrapStyle}>
      {/* ── title bar ── */}
      <div className="flex items-center gap-[7px] px-3 py-[9px]" style={barStyle}>
        <span className="w-[11px] h-[11px] rounded-full flex-shrink-0 bg-[#ff5f57]" />
        <span className="w-[11px] h-[11px] rounded-full flex-shrink-0 bg-[#febc2e]" />
        <span className="w-[11px] h-[11px] rounded-full flex-shrink-0 bg-[#28c840]" />
        <span className="ml-2 text-[0.68rem] tracking-wide select-none" style={{ color: lnColor }}>
          engineer.ts
        </span>
      </div>

      {/* ── code body ── */}
      <pre
        className="m-0 overflow-x-auto min-h-[14rem]"
        style={{
          padding: '0.9rem 0.6rem 1rem',
          fontSize: 'clamp(0.67rem, 1.45vw, 0.79rem)',
          lineHeight: '1.9',
          color: 'var(--color-text)',
        }}
      >
        {LINES.map((line, idx) => {
          const full = lineText(line);
          const shown = visibleChars[idx] ?? 0;
          const isCurrent = !done && idx === activeLine;

          // don't render lines not yet reached
          if (shown === 0 && idx > activeLine) return null;

          let remaining = shown;
          const tokens = line.tokens.map((tok, ti) => {
            if (remaining <= 0) return null;
            const visible = tok.text.slice(0, remaining);
            remaining -= tok.text.length;
            if (!visible) return null;
            return (
              <span key={ti} style={{ color: color(tok.tk) }}>
                {visible}
              </span>
            );
          });

          const rowBg =
            line.kind === 'error'
              ? isDark
                ? 'rgba(239,68,68,0.12)'
                : 'rgba(220,38,38,0.08)'
              : line.kind === 'success'
                ? isDark
                  ? 'rgba(34,197,94,0.1)'
                  : 'rgba(22,163,74,0.08)'
                : 'transparent';

          return (
            <div
              key={idx}
              className="flex items-baseline rounded-sm px-1 transition-colors duration-200"
              style={{ background: rowBg }}
            >
              <span
                className="inline-block w-7 text-right mr-4 text-[0.63rem] select-none shrink-0"
                style={{ color: lnColor }}
              >
                {idx + 1}
              </span>

              {tokens}

              {isCurrent && shown < full.length && (
                <span
                  className="inline-block w-[2px] rounded-sm align-text-bottom ml-px"
                  style={{
                    height: '0.9em',
                    background: 'var(--color-accent)',
                    animation: 'cursorBlink 0.75s step-end infinite',
                  }}
                />
              )}
            </div>
          );
        })}

        {done && (
          <span
            className="inline-block w-[2px] rounded-sm align-text-bottom ml-1"
            style={{
              height: '0.9em',
              background: 'var(--color-accent)',
              animation: 'cursorBlink 0.75s step-end infinite',
            }}
          />
        )}
      </pre>
    </div>
  );
}
