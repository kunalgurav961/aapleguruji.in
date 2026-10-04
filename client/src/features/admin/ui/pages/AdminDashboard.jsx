import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Download, Flower2, GraduationCap, Search, UserRound, CalendarDays, Plus } from "lucide-react";
import { toast } from "react-toastify";
import {
  fetchAdminBookings,
  fetchAdminBlogs,
  fetchAdminDashboard,
  fetchAdminPandits,
  fetchAdminPoojas,
  fetchAdminReviews,
  fetchAdminUsers,
  searchAdminRecords,
  updateAdminBookingStatus,
  updatePanditApplicationStatus,
} from "../../state/adminActions";
import AdminBookings from "../components/AdminBookings";
import AdminBlogs from "../components/AdminBlogs";
import AdminOverview from "../components/AdminOverview";
import AdminPandits from "../components/AdminPandits";
import AdminPoojas from "../components/AdminPoojas";
import AdminReviews from "../components/AdminReviews";
import AdminSidebar from "../components/AdminSidebar";
import AdminUsers from "../components/AdminUsers";
import "./AdminDashboard.css";

const sectionByPath = {
  "/admin": {
    title: "Dashboard overview",
    description: "Live operations, bookings, and Guruji verification.",
  },
  "/admin/bookings": {
    title: "Bookings",
    description: "Review and manage the latest devotee booking requests.",
  },
  "/admin/pandits": {
    title: "Guruji applications",
    description: "Review Vedic qualifications and application details.",
  },
  "/admin/services": {
    title: "Puja services",
    description: "Manage services available in the booking catalogue.",
  },
  "/admin/users": {
    title: "Users",
    description: "View registered devotee and pandit accounts.",
  },
  "/admin/reviews": {
    title: "Family reviews",
    description: "Publish and manage testimonials shown on the public landing page.",
  },
  "/admin/blogs": {
    title: "Blog articles",
    description: "Create video articles and manage what appears in the public journal.",
  },
};

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { user } = useSelector((state) => state.auth);
  const search = useSelector((state) => state.admin.search);
  const {
    bookings,
    users,
    pandits,
    poojas,
    reviews,
    blogs,
    dashboard,
  } = useSelector((state) => state.admin);
  const [period, setPeriod] = useState("month");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef(null);
  const section = sectionByPath[pathname] || sectionByPath["/admin"];

  useEffect(() => {
    if (pathname === "/admin") {
      dispatch(fetchAdminDashboard(period));
    } else if (pathname === "/admin/bookings") {
      dispatch(fetchAdminBookings());
    } else if (pathname === "/admin/services") {
      dispatch(fetchAdminPoojas());
    } else if (pathname === "/admin/users") {
      dispatch(fetchAdminUsers());
    } else if (pathname === "/admin/pandits") {
      dispatch(fetchAdminPandits());
    } else if (pathname === "/admin/reviews") {
      dispatch(fetchAdminReviews());
    } else if (pathname === "/admin/blogs") {
      dispatch(fetchAdminBlogs());
    }
  }, [dispatch, pathname, period]);

  useEffect(() => {
    const query = searchTerm.trim();
    if (query.length < 2) return undefined;
    const timer = window.setTimeout(() => {
      dispatch(searchAdminRecords(query));
    }, 250);
    return () => window.clearTimeout(timer);
  }, [dispatch, searchTerm]);

  useEffect(() => {
    const handleShortcut = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchInputRef.current?.focus();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  const activeResource =
    pathname === "/admin"
      ? dashboard
      : pathname === "/admin/bookings"
        ? bookings
        : pathname === "/admin/users"
          ? users
          : pathname === "/admin/pandits"
            ? pandits
            : pathname === "/admin/services"
              ? poojas
              : pathname === "/admin/blogs"
                ? blogs
                : reviews;

  const retry = () => {
    if (pathname === "/admin") dispatch(fetchAdminDashboard(period));
    else if (pathname === "/admin/bookings") dispatch(fetchAdminBookings());
    else if (pathname === "/admin/users") dispatch(fetchAdminUsers());
    else if (pathname === "/admin/pandits") dispatch(fetchAdminPandits());
    else if (pathname === "/admin/services") dispatch(fetchAdminPoojas());
    else if (pathname === "/admin/blogs") dispatch(fetchAdminBlogs());
    else dispatch(fetchAdminReviews());
  };

  const handleBookingStatusChange = async (bookingId, bookingStatus) => {
    try {
      const response = await dispatch(
        updateAdminBookingStatus({ bookingId, bookingStatus }),
      ).unwrap();
      toast.success(response.message);
      dispatch(fetchAdminDashboard(period));
    } catch (error) {
      toast.error(error || "Unable to update booking status.");
    }
  };

  const handlePanditStatusChange = async (panditId, status) => {
    try {
      const response = await dispatch(
        updatePanditApplicationStatus({ panditId, status }),
      ).unwrap();
      toast.success(response.message);
      if (pathname === "/admin") dispatch(fetchAdminDashboard(period));
      if (pathname === "/admin/pandits") dispatch(fetchAdminPandits());
    } catch (error) {
      toast.error(error || "Unable to update pandit application.");
    }
  };

  const exportDashboard = () => {
    const data = dashboard.data;
    if (!data) {
      toast.error("Dashboard data is not available to export.");
      return;
    }

    const rows = [
      ["Aaple Guruji dashboard report", data.period],
      ["Generated at", data.generatedAt || new Date().toISOString()],
      [],
      ["Metric", "Value"],
      ["Bookings in period", data.metrics.periodBookings],
      ["Booked dakshina (INR)", data.metrics.bookedDakshina],
      ["Registered devotees", data.metrics.devotees],
      ["Verified Gurujis", data.metrics.verifiedPandits],
      ["Pending booking requests", data.metrics.pendingBookings],
      ["Pending Guruji applications", data.metrics.pendingPanditApplications],
      ["Active puja services", data.metrics.activePujas],
      [],
      ["Booking ID", "Devotee", "Puja", "Booking date", "Amount (INR)", "Status"],
      ...data.recentBookings.map((booking) => [
        booking.bookingNumber || booking.bookingId || booking._id,
        booking.customerSnapshot?.fullName || booking.userId?.fullName || "",
        booking.poojaId?.name || booking.poojaSnapshot?.name || "",
        booking.bookingDate || "",
        booking.paymentSnapshot?.amount || 0,
        booking.bookingStatus || "",
      ]),
    ];
    const csv = rows
      .map((row) =>
        row
          .map((cell) => {
            const text = String(cell ?? "");
            const safeText = /^[\s]*[=+\-@]/.test(text)
              ? `'${text}`
              : text;
            return `"${safeText.replaceAll('"', '""')}"`;
          })
          .join(","),
      )
      .join("\r\n");
    const url = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8;" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = `aaple-guruji-dashboard-${period}.csv`;
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
  };

  return (
    <main className="admin-shell">
      <AdminSidebar />
      <div className="adm-workspace">
        <header className="adm-topbar">
          <div className="adm-topbar__breadcrumb">
            <strong>मुख्य नियंत्रण कक्ष</strong><span>/</span><span>{section.title}</span>
          </div>
          <div className="adm-global-search">
            <Search size={16} />
            <input
              aria-label="Search bookings, devotees, Guruji accounts, and puja services"
              autoComplete="off"
              onChange={(event) => {
                setSearchTerm(event.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              onBlur={() => window.setTimeout(() => setIsSearchOpen(false), 120)}
              placeholder="Search bookings, devotees, pujas…"
              ref={searchInputRef}
              value={searchTerm}
            />
            <kbd>⌘K</kbd>
            {isSearchOpen && searchTerm.trim().length >= 2 && (
              <div className="adm-search-results">
                {search.isLoading ? (
                  <p>Searching records…</p>
                ) : search.error ? (
                  <p className="is-error">{search.error}</p>
                ) : search.results.length ? (
                  search.results.map((result) => {
                    const Icon = result.type === "puja"
                      ? Flower2
                      : result.type === "booking"
                        ? CalendarDays
                        : result.type === "pandit"
                          ? GraduationCap
                          : UserRound;
                    return (
                      <Link
                        key={`${result.type}-${result.id}`}
                        onClick={() => setIsSearchOpen(false)}
                        to={result.href}
                      >
                        <span className="adm-search-results__icon"><Icon size={15} /></span>
                        <span><strong>{result.title}</strong><small>{result.detail}</small></span>
                        <small className="adm-search-results__type">{result.type}</small>
                      </Link>
                    );
                  })
                ) : (
                  <p>No matching admin records.</p>
                )}
              </div>
            )}
          </div>
          <div className="adm-topbar__admin">
            <span className="adm-topbar__status"><i /> Admin session secured</span>
            <span className="adm-topbar__avatar">{user?.fullName?.slice(0, 1)?.toUpperCase() || "A"}</span>
          </div>
        </header>

        <div className="adm-workspace__content">
          <header className="adm-page-heading">
            <div>
              <p className="adm-eyebrow">आपले गुरुजी · Administration</p>
              <h1>{section.title}</h1>
              <p>{section.description}</p>
            </div>
            <div className="adm-page-heading__actions">
              {pathname === "/admin" && (
                <>
                  <button className="adm-secondary-action" onClick={exportDashboard} type="button">
                    <Download size={15} /> Export CSV
                  </button>
                  <Link className="adm-primary-action" to="/admin/services">
                    <Plus size={16} /> New puja
                  </Link>
                </>
              )}
            </div>
          </header>

          {activeResource.error && (
            <div className="adm-error" role="alert">
              <span>{activeResource.error}</span>
              <button onClick={retry} type="button">Retry</button>
            </div>
          )}

          {pathname === "/admin" ? (
            <AdminOverview
              data={dashboard.data}
              isLoading={dashboard.isLoading}
              onBookingStatusChange={handleBookingStatusChange}
              onPanditStatusChange={handlePanditStatusChange}
              onPeriodChange={setPeriod}
              period={period}
            />
          ) : pathname === "/admin/bookings" ? (
            bookings.isLoading ? <p className="adm-page-loading">Loading bookings…</p> : <AdminBookings bookings={bookings.items} />
          ) : pathname === "/admin/services" ? (
            poojas.isLoading ? <p className="adm-page-loading">Loading pujas…</p> : <AdminPoojas poojas={poojas.items} />
          ) : pathname === "/admin/users" ? (
            users.isLoading ? <p className="adm-page-loading">Loading users…</p> : <AdminUsers users={users.items} />
          ) : pathname === "/admin/pandits" ? (
            <AdminPandits
              isLoading={pandits.isLoading}
              onUpdate={handlePanditStatusChange}
              pandits={pandits.items}
            />
          ) : pathname === "/admin/blogs" ? (
            blogs.isLoading ? (
              <p className="adm-page-loading">Loading blogs…</p>
            ) : (
              <AdminBlogs blogs={blogs.items} />
            )
          ) : (
            reviews.isLoading ? <p className="adm-page-loading">Loading reviews…</p> : <AdminReviews reviews={reviews.items} />
          )}
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
