import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import MarqueeLib from 'react-fast-marquee';
const Marquee = (MarqueeLib as { default?: typeof MarqueeLib }).default ?? MarqueeLib;
import { skillSet } from '../../constants';
import './skills.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

const cardStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

type Category = 'All' | 'Frontend' | 'Backend' | 'Cloud' | 'Tools';

const categoryMap: Record<Exclude<Category, 'All'>, string[]> = {
  Frontend: [
    'React JS',
    'Next JS',
    'TypeScript',
    'JavaScript',
    'Tailwind CSS',
    'Redux',
    'Flutter',
    'Dart',
    'Shadcn',
    'HTML 5',
    'CSS 3',
  ],
  Backend: ['Node JS', 'Express.js', 'Python', 'Firebase'],
  Cloud: ['MongoDB', 'Redis', 'AWS', 'GCP', 'Docker'],
  Tools: ['GitHub', 'Figma', 'VSCode', 'Postman', 'Vercel', 'Netlify', 'Markdown'],
};

const tabs: Category[] = ['All', 'Frontend', 'Backend', 'Cloud', 'Tools'];

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [active, setActive] = useState<Category>('All');

  const visible =
    active === 'All' ? skillSet : skillSet.filter((s) => categoryMap[active]?.includes(s.name));

  return (
    <section className="skills-root" ref={ref}>
      {/* ── Header ── */}
      <motion.div
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
      >
        <motion.p variants={fadeUp} className="skills-eyebrow">
          SKILLS &amp; TOOLS
        </motion.p>
        <motion.h2 variants={fadeUp} className="skills-heading">
          What I Work With.
        </motion.h2>
      </motion.div>

      {/* ── Category filter tabs ── */}
      <motion.div
        className="skills-tabs"
        variants={fadeUp}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`skills-tab${active === tab ? ' skills-tab--active' : ''}`}
            onClick={() => setActive(tab)}
          >
            {tab}
          </button>
        ))}
      </motion.div>

      {/* ── Skill cards ── */}
      <motion.div
        key={active}
        className="skills-grid"
        variants={cardStagger}
        initial="hidden"
        animate="show"
      >
        {visible.map((skill) => (
          <motion.div key={skill.name} variants={fadeUp} className="skill-card">
            <img src={skill.icon} alt={skill.name} className="skill-card-icon" />
            <span className="skill-card-label">{skill.name}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Marquee strip ── */}
      <div className="skills-marquee-wrap">
        <Marquee gradient={false} speed={38} pauseOnHover>
          {skillSet.map((s) => (
            <div key={s.name} className="skills-marquee-item">
              <img src={s.icon} alt={s.name} className="skills-marquee-icon" />
              <span>{s.name}</span>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
