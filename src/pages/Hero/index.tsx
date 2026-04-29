import Hero from '../../components/Hero/Hero';
import { StarsCanvas } from '../../components/canvas';

export default function HeroRoute() {
  return (
    <div className="relative min-h-screen bg-[var(--color-bg)]">
      <Hero />
      <StarsCanvas />
    </div>
  );
}
