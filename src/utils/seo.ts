const SITE_URL = 'https://udhay-prakash-portfolio.vercel.app';
const OG_IMAGE = 'https://i.imgur.com/9KeqkMu.png';
const AUTHOR = 'Udhaya Prakash M';

export interface RouteMeta {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
}

export const routeMeta: Record<string, RouteMeta> = {
  '/': {
    title: 'Udhaya Prakash — Full Stack Developer',
    description:
      'Portfolio of Udhaya Prakash M, Full Stack Developer specialising in React, Node.js, and modern web experiences.',
    path: '/',
    ogImage: OG_IMAGE,
  },
  '/about': {
    title: 'About — Udhaya Prakash',
    description: 'Skills, background, and expertise of Udhaya Prakash M — Full Stack Developer.',
    path: '/about',
    ogImage: OG_IMAGE,
  },
  '/timeline': {
    title: 'Experience — Udhaya Prakash',
    description: 'Work experience and education timeline of Udhaya Prakash M.',
    path: '/timeline',
    ogImage: OG_IMAGE,
  },
  '/projects': {
    title: 'Projects — Udhaya Prakash',
    description: 'Showcase of projects built by Udhaya Prakash M.',
    path: '/projects',
    ogImage: OG_IMAGE,
  },
  '/contact': {
    title: 'Contact — Udhaya Prakash',
    description: 'Get in touch with Udhaya Prakash M.',
    path: '/contact',
    ogImage: OG_IMAGE,
  },
  '/resume': {
    title: 'Resume — Udhaya Prakash',
    description: 'View and download the resume of Udhaya Prakash M.',
    path: '/resume',
    ogImage: OG_IMAGE,
  },
};

export { SITE_URL, OG_IMAGE, AUTHOR };
