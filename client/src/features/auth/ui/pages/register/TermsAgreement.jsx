import { ShieldCheck } from "lucide-react";

const TermsAgreement = ({ register, error }) => {
  return (
    <div className="space-y-3">
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          {...register("terms", {
            required: "You must accept the Terms and Privacy Policy",
          })}
          className="mt-0.5 w-4 h-4 accent-[var(--color-primary)]"
        />

        <span className="text-[11px] leading-5 text-[var(--color-text-secondary)]">
          I agree to Aaple Guruji's{" "}
          <a
            href="/terms"
            className="font-bold text-[var(--color-primary-dark)] hover:underline"
          >
            Terms of Ritual Service
          </a>{" "}
          and{" "}
          <a
            href="/privacy"
            className="font-bold text-[var(--color-primary-dark)] hover:underline"
          >
            Privacy Policy
          </a>
          .
        </span>
      </label>

      {error && (
        <p className="text-[10px] text-[var(--color-error)]">{error.message}</p>
      )}

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          defaultChecked
          {...register("whatsappUpdates")}
          className="mt-0.5 w-4 h-4 accent-[var(--color-primary)]"
        />

        <span className="text-[11px] leading-5 text-[var(--color-text-secondary)]">
          Send auspicious Panchang dates, festival muhurat reminders, and puja
          updates to my WhatsApp.
        </span>
      </label>

      <div className="flex items-center gap-1 text-[9px] text-[var(--color-text-muted)]">
        <ShieldCheck size={12} />
        Your personal information is securely protected.
      </div>
    </div>
  );
};

export default TermsAgreement;
