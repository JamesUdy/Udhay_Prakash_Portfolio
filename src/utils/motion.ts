import { type Variants, type Easing } from 'framer-motion';

type Direction = 'left' | 'right' | 'up' | 'down' | '';
type AnimationType = 'spring' | 'tween' | 'keyframes' | 'inertia' | 'decay';

const easeOut: Easing = 'easeOut';

export const textVariant = (delay?: number): Variants => ({
  hidden: { y: -50, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', duration: 1.25, delay: delay ?? 0 },
  },
});

export const fadeIn = (
  direction: Direction,
  type: AnimationType,
  delay: number,
  duration: number
): Variants => ({
  hidden: {
    x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
    y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: { type, delay, duration, ease: easeOut },
  },
});

export const slideIn = (
  direction: Direction,
  type: AnimationType,
  delay: number,
  duration: number
): Variants => ({
  hidden: {
    x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0,
    y: direction === 'up' ? '100%' : direction === 'down' ? '100%' : 0,
  },
  show: {
    x: 0,
    y: 0,
    transition: { type, delay, duration, ease: easeOut },
  },
});

export const staggerContainer = (staggerChildren?: number, delayChildren?: number): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: staggerChildren ?? 0,
      delayChildren: delayChildren ?? 0,
    },
  },
});
