import { toast } from "react-toastify";
import { MessageSquare } from "lucide-react";

const SocialSignup = () => {
  const handleGoogle = () => {
    toast.info("Google signup coming soon.");
  };

  const handleWhatsApp = () => {
    toast.info("WhatsApp login coming soon.");
  };

  return (
    <div className="mt-7">
      {/* Divider */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 h-px bg-[var(--color-border)]" />

        <span className="text-[10px] text-[var(--color-text-muted)]">
          or sign up with
        </span>

        <div className="flex-1 h-px bg-[var(--color-border)]" />
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          type="button"
          onClick={handleGoogle}
          className="h-11 rounded-[var(--radius)] bg-white border border-gray-100 shadow-sm flex items-center justify-center gap-3 text-xs font-bold hover:shadow-md transition"
        >
          <span className="text-lg font-bold text-blue-500">G</span>
          Continue with Google
        </button>

        <button
          type="button"
          onClick={handleWhatsApp}
          className="h-11 rounded-[var(--radius)] bg-white border border-gray-100 shadow-sm flex items-center justify-center gap-3 text-xs font-bold hover:shadow-md transition"
        >
          <MessageSquare size={17} className="text-[#25D366]" />
          Fast Login via WhatsApp
        </button>
      </div>
    </div>
  );
};

export default SocialSignup;
