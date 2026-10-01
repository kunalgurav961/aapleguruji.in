import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { LogOut, Menu, UserCircle, X } from "lucide-react";
import { toast } from "react-toastify";
import { logoutUser } from "../../../features/auth/state/authActions";
import logo from "../../../assets/images/logo.png";

const linksByRole = {
  devotee: [
    { path: "/home", name: "Dashboard" },
    { path: "/home/book-pooja", name: "Book a Puja" },
    { path: "/home/my-bookings", name: "My Bookings" },
  ],
  pandit: [
    { path: "/pandit", name: "Dashboard" },
    { path: "/pandit/bookings", name: "Bookings" },
    { path: "/pandit/availability", name: "Availability" },
  ],
  admin: [
    { path: "/admin", name: "Dashboard" },
    { path: "/admin/users", name: "Users" },
    { path: "/admin/services", name: "Services" },
    { path: "/admin/bookings", name: "Bookings" },
  ],
};

const profilePathByRole = {
  devotee: "/home/profile",
  pandit: "/pandit/profile",
  admin: "/admin/profile",
};

const dashboardPathByRole = {
  devotee: "/home",
  pandit: "/pandit",
  admin: "/admin",
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, user } = useSelector(
    (store) => store.auth,
  );
  const role = user?.role;
  const navItems = isAuthenticated
    ? linksByRole[role] || []
    : [
        { path: "/", name: "Home" },
        { path: "/about", name: "About" },
        { path: "/pooja", name: "Pooja" },
        { path: "/blogs", name: "Blogs" },
      ];
  const profilePath = profilePathByRole[role];
  const homePath = dashboardPathByRole[role] || "/";

  const handleLogout = async () => {
    try {
      const response = await dispatch(logoutUser()).unwrap();
      toast.success(response.message);
      setIsMobileMenuOpen(false);
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Unable to log out. Please try again.");
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--color-border-warm)] bg-[var(--color-background)]/95 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        {/* Logo */}
        <NavLink to={homePath} className="flex items-center">
          <img
            src={logo}
            alt="Aaple Guruji"
            className="h-11 w-auto object-contain sm:h-14"
          />
        </NavLink>

        {/* Navigation */}
        <div className="hidden items-center gap-1 lg:gap-2 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `rounded-[var(--radius-xl)] px-3 py-2 text-sm font-semibold lg:px-6 lg:py-3 lg:text-base
        transition-all duration-200
        ${
          isActive
            ? "bg-[var(--color-primary)] text-white"
            : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-soft)] hover:text-[var(--color-primary)]"
        }`
              }
              end
            >
              {item.name}
            </NavLink>
          ))}
        </div>
        {/* Account actions */}
        <div className="hidden items-center gap-2 lg:gap-3 md:flex">
          {isAuthenticated ? (
            <>
              <NavLink
                to={profilePath}
                className="inline-flex items-center gap-2 rounded-[var(--radius)] px-3 py-2.5 text-sm font-semibold text-[var(--color-temple-brown)] transition hover:bg-[var(--color-surface-soft)]"
              >
                <UserCircle size={18} />
                {user?.fullName?.split(" ")[0] || "Profile"}
              </NavLink>
              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoading}
                className="inline-flex items-center gap-2 rounded-[var(--radius)] bg-[var(--color-primary)] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-hover)] disabled:opacity-60"
              >
                <LogOut size={17} /> Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="rounded-[var(--radius)] px-4 py-2.5 text-sm font-semibold text-[var(--color-temple-brown)] transition hover:bg-[var(--color-surface-soft)]"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="rounded-[var(--radius)] bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-[var(--color-primary-hover)] hover:shadow-[var(--shadow-hover)]"
              >
                Register
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <button
          type="button"
          className="rounded-[var(--radius)] p-2 text-[var(--color-temple-brown)] hover:bg-[var(--color-surface-soft)] md:hidden"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="border-t border-[var(--color-border-warm)] bg-[var(--color-background)] px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded-[var(--radius)] px-4 py-3 text-base font-semibold ${
                    isActive
                      ? "bg-[var(--color-primary)] text-white"
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-soft)]"
                  }`
                }
                end
              >
                {item.name}
              </NavLink>
            ))}

            <div className="mt-3 flex gap-2 border-t border-[var(--color-border-warm)] pt-3">
              {isAuthenticated ? (
                <>
                  <NavLink
                    to={profilePath}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex-1 rounded-[var(--radius)] px-4 py-3 text-center text-sm font-semibold text-[var(--color-temple-brown)] hover:bg-[var(--color-surface-soft)]"
                  >
                    Profile
                  </NavLink>
                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={isLoading}
                    className="flex-1 rounded-[var(--radius)] bg-[var(--color-primary)] px-4 py-3 text-center text-sm font-semibold text-white disabled:opacity-60"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex-1 rounded-[var(--radius)] px-4 py-3 text-center text-sm font-semibold text-[var(--color-temple-brown)] hover:bg-[var(--color-surface-soft)]"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex-1 rounded-[var(--radius)] bg-[var(--color-primary)] px-4 py-3 text-center text-sm font-semibold text-white"
                  >
                    Register
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
