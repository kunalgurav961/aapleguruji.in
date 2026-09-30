import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const LoginPrompt = () => {
  return (
    <div className="mt-6 p-4 rounded-[var(--radius)] bg-[var(--color-register-bg)] text-center">
      <p className="text-[11px] text-[var(--color-text-secondary)]">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-bold text-[var(--color-primary-dark)] hover:underline inline-flex items-center gap-1"
        >
          Log In / येथे प्रवेश करा
          <ArrowUpRight size={12} />
        </Link>
      </p>
    </div>
  );
};

export default LoginPrompt;
