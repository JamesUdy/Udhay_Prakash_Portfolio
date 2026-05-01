import { timeline } from '../../constants';

// #region Commit data
/*
  Lane layout (newest → oldest):
    lane 0 (main):    future, SDE-1, Junior, [merge KANISKART], Adrig, [branch KANISKART], Legacy HQ, [merge SkillVertex], Education, [branch SkillVertex], origin
    lane 1 (feature): KANISKART (branches from Adrig, merges into Junior), SkillVertex (branches from Education, merges into Legacy HQ)

  Visual (top = newest):
    * future          lane 0
    * SDE-1           lane 0
    *   Junior        lane 0  ← merge from lane 1 (KANISKART ends)
    |\
    | * KANISKART     lane 1
    * | Adrig         lane 0  → branch to lane 1 (KANISKART starts)
    |/
    *   Legacy HQ     lane 0  ← merge from lane 1 (SkillVertex ends)
    |\
    | * SkillVertex   lane 1
    * | Education     lane 0  → branch to lane 1 (SkillVertex starts)
    |/
    * origin          lane 0
*/
export const COMMITS = [
  {
    sha: 'f4d1a09',
    branch: 'HEAD → main',
    ref: 'origin/main',
    tag: 'v7.0.0',
    typeBadge: 'fulltime',
    author: 'Udhay Prakash',
    date: 'May 2025 – Present',
    message: 'chore: promote to SDE-1 @ TerraByte Technologies',
    body: timeline[7].description ?? [],
    stats: { added: 212, removed: 18, files: 19 },
    color: '#915eff',
    lane: 0,
    isCurrent: true,
  },
  {
    sha: 'b8e3c71',
    branch: 'role/junior-frontend',
    ref: null,
    tag: 'v6.0.0',
    typeBadge: 'fulltime',
    author: 'Udhay Prakash',
    date: 'Jul 2024 – May 2025',
    message: 'feat: join TerraByte as Junior Frontend Developer',
    body: timeline[6].description ?? [],
    stats: { added: 148, removed: 0, files: 12 },
    color: '#7c3aed',
    lane: 0,
    isCurrent: false,
    mergeFrom: 1,
  },
  {
    sha: 'd2f7b34',
    branch: 'freelance/kaniskart',
    ref: null,
    tag: 'v5.0.0',
    typeBadge: 'freelance',
    author: 'Udhay Prakash',
    date: 'Mar 2024 – Aug 2024',
    message: 'feat: freelance — e-commerce platform for KANISKART',
    body: timeline[5].description ?? [],
    stats: { added: 96, removed: 4, files: 11 },
    color: '#f59e0b',
    lane: 1,
    isCurrent: false,
  },
  {
    sha: 'c7b2e45',
    branch: 'feature/adrig',
    ref: null,
    tag: 'v4.0.0',
    typeBadge: 'fulltime',
    author: 'Udhay Prakash',
    date: 'Jan 2024 – Jun 2024',
    message: 'feat: Frontend Developer @ Adrig Technologies',
    body: timeline[4].description ?? [],
    stats: { added: 84, removed: 12, files: 7 },
    color: '#f72585',
    lane: 0,
    isCurrent: false,
    branchTo: 1,
  },
  {
    sha: '9d4a771',
    branch: 'feature/legacy-hq',
    ref: null,
    tag: 'v3.0.0',
    typeBadge: 'fulltime',
    author: 'Udhay Prakash',
    date: 'Aug 2023 – Jan 2024',
    message: 'feat: Frontend Developer @ Legacy Code HQ',
    body: timeline[3].description ?? [],
    stats: { added: 56, removed: 3, files: 5 },
    color: '#4cc9f0',
    lane: 0,
    isCurrent: false,
    mergeFrom: 1,
  },
  {
    sha: 'a1e6c22',
    branch: 'intern/skillvertex',
    ref: null,
    tag: 'v2.0.0',
    typeBadge: 'internship',
    author: 'Udhay Prakash',
    date: 'Jul 2022 – Oct 2022',
    message: 'feat: Web Developer Intern @ SkillVertex',
    body: timeline[2].description ?? [],
    stats: { added: 34, removed: 0, files: 4 },
    color: '#10b981',
    lane: 1,
    isCurrent: false,
  },
  {
    sha: 'e1c8340',
    branch: 'init/education',
    ref: null,
    tag: 'v1.0.0',
    typeBadge: 'education',
    author: 'Udhay Prakash',
    date: 'Jul 2019 – May 2023',
    message: 'init: B.Tech EEE @ Vellore Institute of Technology',
    body: timeline[1].description ?? [],
    stats: { added: 23, removed: 0, files: 1 },
    color: '#7209b7',
    lane: 0,
    isCurrent: false,
    branchTo: 1,
  },
  {
    sha: '0000001',
    branch: 'init/origin',
    ref: null,
    tag: 'v0.0.0',
    typeBadge: 'origin',
    author: 'Unknown',
    date: 'Sometime, Somewhere',
    message: 'init: repository accidentally initialized — no consent given',
    body: timeline[0].description ?? [],
    stats: { added: 1, removed: 0, files: 1 },
    color: '#64748b',
    lane: 0,
    isCurrent: false,
  },
] as const;

export type Commit = (typeof COMMITS)[number];

export const FUTURE = {
  sha: '???????',
  branch: 'feature/next-chapter',
  date: 'Next Chapter',
  message: 'feat: ??? — open to opportunities',
  color: '#555577',
};

export const TYPE_META: Record<string, { label: string; color: string }> = {
  fulltime: { label: 'full-time', color: '#4cc9f0' },
  freelance: { label: 'freelance', color: '#f59e0b' },
  internship: { label: 'internship', color: '#10b981' },
  education: { label: 'education', color: '#7209b7' },
  origin: { label: 'origin', color: '#64748b' },
};

export const DOT_R = 7;
export const FUTURE_H = 76;

export const TEA_START = new Date('2006-09-15');
export const CUPS_PER_DAY = 3;
// #endregion
