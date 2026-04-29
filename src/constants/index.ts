import {
  predictor,
  cityscapeForecast,
  niftique,
  netzon5,
  grabNgo,
  budgetBuddy,
  laBelle,
  legacyCodeHQ,
  todoSentinel,
  markdown,
  figma,
  githubIcon,
  html5,
  css,
  reactIcon,
  tailwind,
  typescript,
  javascript,
  node,
  mongodb,
  next,
  python,
  firebase,
  postman,
  vscode,
  vercel,
  netlify,
  redux,
  express,
  flutter,
  dart,
  redis,
  aws,
  gcp,
  docker,
  shadcn,
} from '../assets';

export const navLinks: NavLink[] = [
  { id: 'about', title: 'About' },
  { id: 'project', title: 'Work' },
  { id: 'contact', title: 'Contact' },
];

export const skillSet: SkillItem[] = [
  // Frontend
  { name: 'React JS',     icon: reactIcon },
  { name: 'Next JS',      icon: next },
  { name: 'TypeScript',   icon: typescript },
  { name: 'JavaScript',   icon: javascript },
  { name: 'Tailwind CSS', icon: tailwind },
  { name: 'Redux',        icon: redux },
  { name: 'Flutter',      icon: flutter },
  { name: 'Dart',         icon: dart },
  { name: 'Shadcn',       icon: shadcn },
  { name: 'HTML 5',       icon: html5 },
  { name: 'CSS 3',        icon: css },
  // Backend
  { name: 'Node JS',      icon: node },
  { name: 'Express.js',   icon: express },
  { name: 'Python',       icon: python },
  { name: 'Firebase',     icon: firebase },
  // Databases & Cloud
  { name: 'MongoDB',      icon: mongodb },
  { name: 'Redis',        icon: redis },
  { name: 'AWS',          icon: aws },
  { name: 'GCP',          icon: gcp },
  { name: 'Docker',       icon: docker },
  // Tools
  { name: 'GitHub',       icon: githubIcon },
  { name: 'Figma',        icon: figma },
  { name: 'VSCode',       icon: vscode },
  { name: 'Postman',      icon: postman },
  { name: 'Vercel',       icon: vercel },
  { name: 'Netlify',      icon: netlify },
  { name: 'Markdown',     icon: markdown },
];

export const timeline: TimelineEntry[] = [
  {
    id: 1,
    title: 'B.Tech — Electrical & Electronics Engineering',
    location: 'Vellore Institute of Technology, Chennai',
    date: 'Jul 2019 – May 2023',
    description: ['CGPA: 7.88'],
  },
  {
    id: 2,
    title: 'Front End Developer — Legacy Code HQ',
    location: 'Remote',
    date: 'Aug 2023 – Jan 2024',
    description: [
      'Built frontend interface for a code migration platform with interactive dependency graph visualization and class hierarchy mapping for legacy Kotlin codebases, processing 50K+ lines of code and accelerating migration workflows by 50%.',
      'Achieved a 92 Lighthouse performance score, boosting search engine rankings by 20%.',
    ],
  },
  {
    id: 3,
    title: 'Front End Developer (Hybrid) — Adrig Technologies',
    location: 'Remote',
    date: 'Jan 2024 – Jul 2024',
    description: [
      'Architected company web presence with product demos, technical documentation, and a blog platform using responsive design principles.',
      'Designed proof-of-concept frontend dashboards for Southern Railways Rolling Block Management System, implementing RBAC with tailored interfaces for supervisors, station masters, and back-office teams.',
    ],
  },
  {
    id: 4,
    title: 'Software Engineer (Full Stack) — TerraByte Technologies',
    location: 'Bangalore',
    date: 'Jul 2024 – Present',
    description: [
      'Reduced content production time by 75% (2 days → 0.5 day) by building an automated, end-to-end pipeline for multi-modal content generation using LLMs and structured prompts.',
      'Scaled application from 5 to 2,000+ DAU (150K MAU) by optimizing architecture with caching and asynchronous processing, achieving under 150ms average latency.',
      'Built event-driven communication system between Unity and React/Flutter, reducing data synchronization errors by 60%.',
      'Developed recommendation system using user behavioral data, improving user retention (D1: 43%, D7: 24%).',
    ],
  },
];

export const projects: Project[] = [
  {
    title: 'Legacy Code HQ',
    description:
      'Built frontend interface for a code migration platform with interactive dependency graph visualization and class hierarchy mapping for legacy Kotlin codebases, processing 50K+ lines of code. Achieved a 92 Lighthouse performance score.',
    tags: [
      { skills: 'next js', color: 'pink-text-gradient' },
      { skills: 'tailwind css', color: 'green-text-gradient' },
      { skills: 'typescript', color: 'blue-text-gradient' },
      { skills: 'markdown', color: 'pink-text-gradient' },
    ],
    image: legacyCodeHQ,
    status: 'completed',
    demo: 'https://www.legacycode.com/',
  },
  {
    title: 'ToDo Sentinel',
    description:
      'Task management app built with TypeScript, Next.js, Tailwind CSS, and Firestore. Supports customizable tasks, deadlines, and seamless CRUD operations with a dynamic, real-time experience.',
    tags: [
      { skills: 'next js', color: 'pink-text-gradient' },
      { skills: 'typescript', color: 'blue-text-gradient' },
      { skills: 'firebase', color: 'pink-text-gradient' },
      { skills: 'tailwind css', color: 'green-text-gradient' },
    ],
    image: todoSentinel,
    source: 'https://github.com/JamesUdy/To-Do-Sentinel.git',
    status: 'completed',
    demo: 'https://to-do-sentinel.vercel.app/',
  },
  {
    title: 'Cityscape Forecast',
    description:
      'Global weather app with multi-day forecasts and air quality data via weather API integration. Built with Next.js, TypeScript, and Tailwind CSS for informed urban planning insights.',
    tags: [
      { skills: 'next js', color: 'pink-text-gradient' },
      { skills: 'tailwind css', color: 'green-text-gradient' },
      { skills: 'typescript', color: 'blue-text-gradient' },
      { skills: 'weather api', color: 'pink-text-gradient' },
    ],
    image: cityscapeForecast,
    source: 'https://github.com/JamesUdy/Cityscape_Forecast',
    status: 'completed',
    demo: 'https://cityscape-forecast.vercel.app/',
  },
  {
    title: 'Niftique — NFT Marketplace',
    description:
      'NFT marketplace with real-time crypto converter via APIs and OpenSea integration. Supports NFT creation, editing, buying, and selling with a secure, responsive interface.',
    tags: [
      { skills: 'react', color: 'pink-text-gradient' },
      { skills: 'tailwind css', color: 'green-text-gradient' },
      { skills: 'javascript', color: 'blue-text-gradient' },
      { skills: 'opensea api', color: 'pink-text-gradient' },
    ],
    image: niftique,
    source: 'https://github.com/JamesUdy/Niftique',
    status: 'developing',
    demo: 'https://niftique.vercel.app/home',
  },
  {
    title: 'Grab N Go',
    description:
      'Responsive grocery list app with Firebase real-time storage and Firebase Authentication for data privacy. Full CRUD operations with a clean, intuitive interface.',
    tags: [
      { skills: 'javascript', color: 'blue-text-gradient' },
      { skills: 'css', color: 'green-text-gradient' },
      { skills: 'html', color: 'pink-text-gradient' },
      { skills: 'firebase', color: 'blue-text-gradient' },
    ],
    image: grabNgo,
    source: 'https://github.com/JamesUdy/Grab_N_Go',
    status: 'completed',
    demo: 'https://grab-n-go.netlify.app/',
  },
  {
    title: 'Budget Buddy',
    description:
      'Personal finance tracker with voice recognition for automated income and expense entry. Features real-time visual graphs for data-driven financial decisions.',
    tags: [
      { skills: 'react', color: 'blue-text-gradient' },
      { skills: 'javascript', color: 'pink-text-gradient' },
      { skills: 'tailwind css', color: 'green-text-gradient' },
      { skills: 'voice assist', color: 'blue-text-gradient' },
    ],
    image: budgetBuddy,
    source: 'https://github.com/JamesUdy/Budget-Buddy',
    status: 'completed',
    demo: 'https://budget-buddy15.vercel.app/',
  },
  {
    title: 'Netzon5 — OTT Streaming Platform',
    description:
      'Responsive OTT platform using the TMDB API to search 1000+ films with narrative details, IMDB ratings, genre, and release year. Supports multitasking across multiple pages.',
    tags: [
      { skills: 'javascript', color: 'blue-text-gradient' },
      { skills: 'html', color: 'green-text-gradient' },
      { skills: 'tailwind css', color: 'pink-text-gradient' },
      { skills: 'tmdb api', color: 'blue-text-gradient' },
    ],
    image: netzon5,
    source: 'https://github.com/JamesUdy/Netzon5',
    status: 'developing',
  },
  {
    title: 'Real-Estate Price Predictor',
    description:
      'Machine learning model blending Data Science and Web Development to estimate house prices in Bangalore. Trained on 10,000+ rows for highly accurate predictions using linear regression.',
    tags: [
      { skills: 'python', color: 'pink-text-gradient' },
      { skills: 'machine learning', color: 'green-text-gradient' },
      { skills: 'javascript', color: 'blue-text-gradient' },
      { skills: 'html/css', color: 'pink-text-gradient' },
    ],
    image: predictor,
    source: 'https://github.com/JamesUdy/RE_Price_Prediction',
    status: 'completed',
  },
  {
    title: 'La Belle Assiette',
    description:
      'Food ordering and restaurant table reservation platform with multi-page navigation and a user-friendly menu browsing experience.',
    tags: [
      { skills: 'html', color: 'green-text-gradient' },
      { skills: 'css', color: 'blue-text-gradient' },
      { skills: 'javascript', color: 'pink-text-gradient' },
    ],
    image: laBelle,
    source: 'https://github.com/JamesUdy/La-Belle-Assiette',
    status: 'completed',
    demo: 'https://la-belle-assiette.netlify.app/',
  },
];
