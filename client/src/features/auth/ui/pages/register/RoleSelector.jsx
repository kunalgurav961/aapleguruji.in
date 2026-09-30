import { UserRound, GraduationCap } from "lucide-react";

const RoleSelector = ({ role, onChange, register }) => {
  return (
    <div className="mb-5">
      <div className="grid grid-cols-2 gap-1 p-1 rounded-[var(--radius-md)] bg-[#edf1fc]">
        <button
          type="button"
          onClick={() => onChange("devotee")}
          className={`
            flex items-center justify-center gap-2
            py-2.5
            rounded-[var(--radius)]
            transition-all
            ${
              role === "devotee"
                ? "bg-white shadow-sm text-[var(--color-primary-dark)]"
                : "text-[var(--color-text-secondary)]"
            }
          `}
        >
          <UserRound size={16} />

          <div className="text-left">
            <p className="text-xs font-bold">Devotee / यजमान</p>

            <p className="text-[9px]">Book Authentic Pujas</p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onChange("pandit")}
          className={`
            flex items-center justify-center gap-2
            py-2.5
            rounded-[var(--radius)]
            transition-all
            ${
              role === "pandit"
                ? "bg-white shadow-sm text-[var(--color-primary-dark)]"
                : "text-[var(--color-text-secondary)]"
            }
          `}
        >
          <GraduationCap size={16} />

          <div className="text-left">
            <p className="text-xs font-bold">Pandit / पुरोहित</p>

            <p className="text-[9px] text-[var(--color-primary-dark)] font-semibold">
              • Pathshala Certified
            </p>
          </div>
        </button>
      </div>

      <input type="hidden" value={role} {...register("role")} />
    </div>
  );
};

export default RoleSelector;
