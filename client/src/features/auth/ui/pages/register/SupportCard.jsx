import { Headphones } from "lucide-react";

const SupportCard = () => {
  return (
    <div className="bg-white rounded-[var(--radius-lg)] p-6 shadow-[var(--shadow-card)] flex items-center gap-4">
      <div className="w-11 h-11 shrink-0 rounded-full bg-orange-100 flex items-center justify-center text-[var(--color-primary-dark)]">
        <Headphones size={20} />
      </div>

      <div>
        <p className="text-[9px] font-bold uppercase tracking-wide text-[var(--color-primary-dark)]">
          Need Booking Guidance?
        </p>

        <h3 className="text-base font-bold text-[var(--color-text-primary)]">
          1800-200-VEDA
        </h3>

        <p className="text-[10px] text-[var(--color-text-secondary)]">
          Speak with our Acharyas 7:00 AM - 9:00 PM
        </p>
      </div>
    </div>
  );
};

export default SupportCard;
