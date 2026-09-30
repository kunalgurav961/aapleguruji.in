import { MapPin, ChevronDown, AlertCircle } from "lucide-react";

const FormSelect = ({
  label,
  name,
  register,
  rules = {},
  error,
  options = [],
  placeholder = "Select your city",
}) => {
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
        <MapPin
          size={16}
          strokeWidth={1.8}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] pointer-events-none"
        />

        <select
          id={name}
          {...register(name, rules)}
          defaultValue=""
          className={`
            appearance-none
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
            cursor-pointer
          `}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={15}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] pointer-events-none"
        />
      </div>

      {error && (
        <p className="mt-1 text-[10px] text-[var(--color-error)] flex items-center gap-1">
          <AlertCircle size={11} />
          {error.message}
        </p>
      )}
    </div>
  );
};

export default FormSelect;
