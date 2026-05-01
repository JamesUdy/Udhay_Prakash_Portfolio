import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { projects } from '../../constants';
import './projects.css';

// #region Status badge
const STATUS_CONFIG: Record<Project['status'], { label: string; cls: string }> = {
  completed: { label: 'Completed', cls: 'proj-badge--completed' },
  developing: { label: 'Developing', cls: 'proj-badge--developing' },
  abandoned: { label: 'Abandoned', cls: 'proj-badge--abandoned' },
  'coming-soon': { label: 'Coming Soon', cls: 'proj-badge--soon' },
};

function StatusBadge({ status }: { status: Project['status'] }) {
  const cfg = STATUS_CONFIG[status];
  return <span className={`proj-badge ${cfg.cls}`}>{cfg.label}</span>;
}
// #endregion

// #region Link button
function LinkBtn({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="proj-link-btn"
      aria-label={label}
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}

const GithubIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" width={14} height={14}>
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

const ExternalIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" width={13} height={13}>
    <path d="M3.75 2h3.5a.75.75 0 0 1 0 1.5h-3.5a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-3.5a.75.75 0 0 1 1.5 0v3.5A1.75 1.75 0 0 1 12.25 14h-8.5A1.75 1.75 0 0 1 2 12.25v-8.5C2 2.784 2.784 2 3.75 2zm6.854-1h4.146a.25.25 0 0 1 .25.25v4.146a.75.75 0 0 1-1.5 0V2.561l-7.22 7.22a.749.749 0 1 1-1.06-1.06L13.439 1.5H10.604a.75.75 0 0 1 0-1.5z" />
  </svg>
);
// #endregion

// #region ProjectCard
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const sizeClass = `proj-card--${project.size ?? 'medium'}`;
  const isAbandoned = project.status === 'abandoned';

  return (
    <motion.div
      ref={ref}
      className={`proj-card ${sizeClass}${isAbandoned ? ' proj-card--abandoned' : ''}`}
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* background image */}
      <div className="proj-card-img">
        <img src={project.image} alt={project.title} loading="lazy" />
        {isAbandoned && <div className="proj-abandoned-overlay" />}
      </div>

      {/* always-visible footer strip */}
      <div className="proj-footer">
        <span className="proj-title">{project.title}</span>
        <StatusBadge status={project.status} />
      </div>

      {/* hover panel */}
      <div className="proj-hover-panel">
        <div className="proj-hover-inner">
          <div className="proj-hover-top">
            <p className="proj-hover-title">{project.title}</p>
            <StatusBadge status={project.status} />
          </div>

          <p className="proj-hover-desc">{project.description}</p>

          <div className="proj-tags">
            {project.tags.map((t) => (
              <span key={t.skills} className="proj-tag">
                {t.skills}
              </span>
            ))}
          </div>

          <div className="proj-links">
            {project.source && (
              <LinkBtn href={project.source} icon={<GithubIcon />} label="Source" />
            )}
            {project.demo && <LinkBtn href={project.demo} icon={<ExternalIcon />} label="Live" />}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
// #endregion

// #region Projects section
export default function Projects() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });

  return (
    <section className="proj-root">
      <motion.div
        ref={headerRef}
        className="proj-header"
        initial="hidden"
        animate={headerInView ? 'show' : 'hidden'}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
      >
        <motion.p
          className="proj-eyebrow"
          variants={{
            hidden: { opacity: 0, y: 24 },
            show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
        >
          PROJECTS
        </motion.p>
        <motion.h2
          className="proj-heading"
          variants={{
            hidden: { opacity: 0, y: 24 },
            show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
        >
          Things I&apos;ve Built.
        </motion.h2>
      </motion.div>

      <div className="proj-grid">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
// #endregion
