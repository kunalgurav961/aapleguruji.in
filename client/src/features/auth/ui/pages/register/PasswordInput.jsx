import { useState } from "react";
import { Lock, Eye, EyeOff, ShieldCheck, AlertCircle } from "lucide-react";

const PasswordInput = ({ name, label, register, watch, rules = {}, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  const value = watch(name, "");

  const getStrength = () => {
    let score = 0;

    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;

    return score;
  };

  const strength = getStrength();

  const strengthData = {
    0: {
      width: "10%",
      text: "Min. 8 characters",
    },
    1: {
      width: "25%",
      text: "Weak password",
    },
    2: {
      width: "50%",
      text: "Medium password",
    },
    3: {
      width: "75%",
      text: "Good password",
    },
    4: {
      width: "100%",
      text: "Strong password ✓",
    },
  };

  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className="block mb-1.5 text-xs font-bold text-[var(--color-text-primary)]"
      >
        {label}

        {rules.required && (
          <span className="text-[var(--color-error)] ml-1">*</span>
        )}
      </label>

      <div className="relative">
        <Lock
          size={16}
          strokeWidth={1.8}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]"
        />

        <input
          id={name}
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          {...register(name, rules)}
          className={`
            w-full
            h-[38px]
            pl-10
            pr-10
            rounded-[var(--radius)]
            bg-[var(--color-register-input)]
            border
            ${error ? "border-[var(--color-error)]" : "border-transparent"}
            text-xs
            text-[var(--color-text-primary)]
            outline-none
            focus:bg-white
            focus:border-[var(--color-primary)]
            focus:ring-2
            focus:ring-orange-100
            transition-all
          `}
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]"
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>

      {name === "password" && (
        <div className="mt-1.5">
          <div className="flex justify-between items-center">
            <span
              className={`
                text-[10px] font-semibold
                ${
                  strength >= 3
                    ? "text-[var(--color-success)]"
                    : "text-[var(--color-text-primary)]"
                }
              `}
            >
              {strengthData[strength].text}
            </span>

            <span className="text-[10px] text-[var(--color-text-secondary)]">
              Letters, numbers & symbols
            </span>
          </div>

          <div className="h-[3px] mt-1 rounded-full bg-gray-200 overflow-hidden">
            <div
              className={`
                h-full rounded-full transition-all duration-300
                ${
                  strength <= 1
                    ? "bg-[var(--color-error)]"
                    : strength === 2
                      ? "bg-[var(--color-warning)]"
                      : "bg-[var(--color-success)]"
                }
              `}
              style={{
                width: strengthData[strength].width,
              }}
            />
          </div>
        </div>
      )}

      {name === "confirmPassword" && !error && (
        <div className="mt-1 flex items-center gap-1 text-[10px] text-[var(--color-text-secondary)]">
          <ShieldCheck size={12} className="text-[var(--color-primary-dark)]" />
          Secure 256-Bit Encrypted
        </div>
      )}

      {error && (
        <p className="mt-1 text-[10px] text-[var(--color-error)] flex items-center gap-1">
          <AlertCircle size={11} />
          {error.message}
        </p>
      )}
    </div>
  );
};

export default PasswordInput;
