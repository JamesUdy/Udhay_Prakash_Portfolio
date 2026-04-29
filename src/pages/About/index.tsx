import About from '../../components/About/About';
import Skills from '../../components/Skills/Skills';

export default function AboutRoute() {
  return (
    <div className="bg-[var(--color-bg)] min-h-screen">
      <About />
      <Skills />
    </div>
  );
}
