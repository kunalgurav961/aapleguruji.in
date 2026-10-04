import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import logo from "../../../../assets/images/logo.png";
import {
  CalendarDays,
  BookOpenText,
  LayoutDashboard,
  LogOut,
  GraduationCap,
  MessageSquareQuote,
  PlusCircle,
  UsersRound,
} from "lucide-react";
import { logoutUser } from "../../../auth/state/authActions";

const adminLinks = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/bookings", label: "Bookings", icon: CalendarDays },
  { to: "/admin/pandits", label: "Guruji applications", icon: GraduationCap },
  { to: "/admin/services", label: "Pujas", icon: PlusCircle },
  { to: "/admin/reviews", label: "Reviews", icon: MessageSquareQuote },
  { to: "/admin/blogs", label: "Blogs", icon: BookOpenText },
  { to: "/admin/users", label: "Users", icon: UsersRound },
];

const AdminSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const initials = user?.fullName
    ?.split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/login");
    } catch (error) {
      toast.error(error || "Unable to sign out. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <aside className="adm-sidebar">
      <NavLink className="adm-brand" to="/admin" end>
        <img
          className="adm-brand__logo"
          src={logo}
          alt="Aaple Guruji"
        />
      </NavLink>
      <div className="adm-sidebar__label">प्रशासन कक्ष · Administration</div>
      <nav aria-label="Admin sections" className="adm-sidebar__nav">
        {adminLinks.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            className={({ isActive }) => `adm-sidebar__link${isActive ? " is-active" : ""}`}
            end={end}
            key={to}
            to={to}
          >
            <Icon aria-hidden="true" size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <a className="adm-sidebar__support" href="tel:+918888333430">
        <span className="adm-sidebar__support-icon">☏</span>
        <span><small>Admin support</small><strong>+91 8888333430</strong></span>
      </a>
      <div className="adm-sidebar__account">
        <div className="adm-sidebar__user">
          <span className="adm-avatar">{initials || "AD"}</span>
          <span><strong>{user?.fullName || "Administrator"}</strong><small>Administrator</small></span>
        </div>
        <button
          className="adm-sidebar__logout"
          disabled={isLoggingOut}
          onClick={handleLogout}
          type="button"
        >
          <LogOut size={16} />
          {isLoggingOut ? "Signing out…" : "Sign out"}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
