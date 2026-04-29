import { Resume as resumePDF } from '../../assets/resume';

export default function ResumeRoute() {
  return (
    <div className="bg-[var(--color-bg)] min-h-screen flex flex-col items-center justify-start pt-10 px-4">
      <div className="w-full max-w-4xl flex justify-end mb-4">
        <a
          href={resumePDF}
          download="UDHAYA_PRAKASH_M_Resume.pdf"
          className="px-5 py-2 rounded-lg text-sm font-semibold bg-[var(--color-accent)] text-white hover:opacity-90 transition-opacity"
        >
          Download PDF
        </a>
      </div>
      <div className="w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl border border-[var(--color-surface)]">
        <iframe
          src={resumePDF}
          title="Udhaya Prakash Resume"
          className="w-full h-[85vh]"
        />
      </div>
    </div>
  );
}
