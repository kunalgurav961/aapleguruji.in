import { NavLink } from "react-router-dom";
import { CalendarDays, LayoutDashboard, PlusCircle, UsersRound } from "lucide-react";

const adminLinks = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/bookings", label: "Bookings", icon: CalendarDays },
  { to: "/admin/services", label: "Pujas", icon: PlusCircle },
  { to: "/admin/users", label: "Users", icon: UsersRound },
];

const AdminSidebar = () => (
  <nav
    aria-label="Admin sections"
    className="flex gap-2 overflow-x-auto rounded-2xl border border-[var(--color-border-warm)] bg-white p-2 shadow-[var(--shadow-card)] lg:flex-col lg:overflow-visible"
  >
    <p className="hidden px-3 pb-2 pt-3 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--color-text-muted)] lg:block">
      Administration
    </p>
    {adminLinks.map(({ to, label, icon: Icon, end }) => (
      <NavLink
        className={({ isActive }) =>
          `flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
            isActive
              ? "bg-[var(--color-booking-selected)] text-[var(--color-primary-dark)]"
              : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-soft)]"
          }`
        }
        end={end}
        key={to}
        to={to}
      >
        <Icon aria-hidden="true" size={18} />
        {label}
      </NavLink>
    ))}
  </nav>
);

export default AdminSidebar;
