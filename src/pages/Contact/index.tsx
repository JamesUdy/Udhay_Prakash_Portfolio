import Contact from '../../components/Contact/Contact';
import { StarsCanvas } from '../../components/canvas';

export default function ContactRoute() {
  return (
    <div className="relative bg-[var(--color-bg)] min-h-screen">
      <Contact />
      <StarsCanvas />
    </div>
  );
}
