import { Gift } from "lucide-react";

const RegistrationBonus = () => {
  return (
    <div className="mb-5 flex items-center gap-3 p-3.5 rounded-[var(--radius-md)] bg-gradient-to-r from-orange-50 to-blue-50 border border-orange-100">
      <div className="w-9 h-9 shrink-0 rounded-full bg-[var(--color-primary-dark)] text-white flex items-center justify-center">
        <Gift size={17} />
      </div>

      <div>
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-bold text-[var(--color-text-primary)]">
            First Puja Bonus!
          </h3>

          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-[var(--color-primary-dark)]">
            Instant Credit
          </span>
        </div>

        <p className="text-[10px] leading-4 text-[var(--color-text-secondary)]">
          Get instant{" "}
          <strong className="text-[var(--color-primary-dark)]">
            ₹501 Dakshina discount
          </strong>{" "}
          automatically credited to your sacred ritual wallet upon successful
          sign-up.
        </p>
      </div>
    </div>
  );
};

export default RegistrationBonus;
