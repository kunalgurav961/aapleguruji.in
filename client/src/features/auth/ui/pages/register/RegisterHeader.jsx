import { ArrowLeft, Sparkles } from "lucide-react";

const RegisterHeader = () => {
  return (
    <div className="flex items-center justify-between mb-7 px-1">
      {/* Back */}
      <button
        type="button"
        onClick={() => window.history.back()}
        className="group flex items-center gap-2 text-sm font-medium text-[var(--color-text-primary)] hover:text-[var(--color-primary-dark)] transition-colors"
      >
        <ArrowLeft
          size={17}
          strokeWidth={1.8}
          className="group-hover:-translate-x-0.5 transition-transform"
        />

        <span>
          Back to Home <span className="font-marathi">/ मुख्यपृष्ठावर जा</span>
        </span>
      </button>

      {/* Muhurat Status */}
      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-100 shadow-sm">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-60 animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-primary)]" />
        </span>

        <span className="text-xs font-semibold text-[var(--color-primary-dark)]">
          Shubh Muhurat Active
        </span>

        <Sparkles size={14} className="text-[var(--color-divine-gold)]" />
      </div>
    </div>
  );
};

export default RegisterHeader;
