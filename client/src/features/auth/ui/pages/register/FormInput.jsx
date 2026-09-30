import {
  User,
  Smartphone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

import { useState } from "react";

const icons = {
  user: User,
  smartphone: Smartphone,
  mail: Mail,
  lock: Lock,
};

const FormInput = ({
  label,
  name,
  type = "text",
  placeholder,
  icon,
  prefix,
  optional,
  register,
  rules = {},
  error,
}) => {
  const Icon = icons[icon];
  const [show, setShow] = useState(false);

  const isPassword = type === "password";

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

        {optional && (
          <span className="font-normal text-[10px] text-[var(--color-text-muted)] ml-1">
            ({optional})
          </span>
        )}
      </label>

      <div className="relative">

        {Icon && (
          <Icon
            size={16}
            strokeWidth={1.8}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]"
          />
        )}

        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[var(--color-primary-dark)]">
            {prefix}
          </span>
        )}

        <input
          id={name}
          type={isPassword && show ? "text" : type}
          placeholder={placeholder}
          {...register(name, rules)}
          className={`
            w-full
            h-[38px]
            ${prefix ? "pl-12" : "pl-10"}
            ${isPassword ? "pr-10" : "pr-4"}
            rounded-[var(--radius)]
            bg-[var(--color-register-input)]
            border
            ${error
              ? "border-[var(--color-error)]"
              : "border-transparent"
            }
            text-xs
            text-[var(--color-text-primary)]
            placeholder:text-[var(--color-text-muted)]
            outline-none
            focus:bg-white
            focus:border-[var(--color-primary)]
            focus:ring-2
            focus:ring-orange-100
            transition-all
          `}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]"
          >
            {show ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        )}
      </div>

      {name === "mobileNumber" && !error && (
        <p className="mt-1 text-[10px] text-[var(--color-text-secondary)] flex items-center gap-1">
          <CheckCircle size={11} className="text-[var(--color-success)]" />
          Instant OTP verification via WhatsApp/SMS
        </p>
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

export default FormInput;