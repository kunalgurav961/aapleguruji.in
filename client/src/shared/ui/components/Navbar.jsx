import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LogOut, Menu, UserCircle, X } from "lucide-react";
import { toast } from "react-toastify";
import { logoutUser } from "../../../features/auth/state/authActions";
import logo from "../../../assets/images/logo.png";
import "./Navbar.css";

const landingNavItems = [
  { path: "/", name: "Home" },
  { path: "/pooja", name: "Puja Services" },
  { path: "/book-pooja", name: "Book a Puja" },
  { path: "/blogs", name: "Blog" },
  { path: "/about", name: "About" },
];

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
    { path: "/admin/reviews", name: "Reviews" },
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
  const { pathname } = useLocation();
  const { isAuthenticated, isLoading, user } = useSelector(
    (store) => store.auth,
  );
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const role = user?.role;
  const navItems = isAuthenticated
    ? linksByRole[role] || []
    : landingNavItems;
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
    <header className="site-navigation">
      <div className="site-promo-bar">
        <span>
          🕉️ Verified Vedic Pandits · Authentic rituals · Serving families
          across Maharashtra
        </span>
        <a href="tel:+918888333430">Call Support: +91 8888333430</a>
      </div>
      <nav aria-label="Main navigation" className="site-navigation-row">
        <NavLink to={homePath} aria-label="Aaple Guruji home" className="site-navigation-logo">
          <img src={logo} alt="Aaple Guruji" />
        </NavLink>

        <div className="site-navigation-links">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `site-navigation-link${isActive ? " is-active" : ""}`
              }
              end
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        <div className="site-navigation-actions">
          {isAuthenticated ? (
            <>
              <NavLink to={profilePath} className="site-navigation-profile">
                <UserCircle size={18} />
                {user?.fullName?.split(" ")[0] || "Profile"}
              </NavLink>
              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoading}
                className="site-navigation-primary"
              >
                <LogOut size={17} /> Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="site-navigation-profile">
                Sign In
              </NavLink>
              <NavLink to="/register" className="site-navigation-primary">
                <UserCircle aria-hidden="true" size={17} />
                Create Account
              </NavLink>
            </>
          )}
        </div>

        <button
          type="button"
          className="site-navigation-toggle"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div className="site-navigation-mobile">
          <div className="site-navigation-mobile__links">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `site-navigation-mobile__link${isActive ? " is-active" : ""}`
                }
                end
              >
                {item.name}
              </NavLink>
            ))}

            <div className="site-navigation-mobile__actions">
              {isAuthenticated ? (
                <>
                  <NavLink
                    to={profilePath}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="site-navigation-profile"
                  >
                    Profile
                  </NavLink>
                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={isLoading}
                    className="site-navigation-primary"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="site-navigation-profile"
                  >
                    Sign In
                  </NavLink>
                  <NavLink
                    to="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="site-navigation-primary"
                  >
                    Create Account
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
