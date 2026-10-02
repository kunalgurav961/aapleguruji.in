import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  fetchAdminBookings,
  fetchAdminPoojas,
  fetchAdminUsers,
} from "../../state/adminActions";
import AdminBookings from "../components/AdminBookings";
import AdminOverview from "../components/AdminOverview";
import AdminPoojas from "../components/AdminPoojas";
import AdminSidebar from "../components/AdminSidebar";
import AdminUsers from "../components/AdminUsers";

const sectionByPath = {
  "/admin": {
    title: "Dashboard overview",
    description: "A quick view of bookings, users, and puja services.",
  },
  "/admin/bookings": {
    title: "Bookings",
    description: "Review the latest customer booking requests.",
  },
  "/admin/services": {
    title: "Puja services",
    description: "Manage the services available in the booking catalogue.",
  },
  "/admin/users": {
    title: "Users",
    description: "View registered devotee and pandit accounts.",
  },
};

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { user } = useSelector((state) => state.auth);
  const { bookings, users, poojas } = useSelector((state) => state.admin);
  const section = sectionByPath[pathname] || sectionByPath["/admin"];

  useEffect(() => {
    dispatch(fetchAdminBookings());
    dispatch(fetchAdminUsers());
    dispatch(fetchAdminPoojas());
  }, [dispatch]);

  const handleRetry = (resource) => {
    if (resource === "bookings" || resource === "all") {
      dispatch(fetchAdminBookings());
    }
    if (resource === "users" || resource === "all") {
      dispatch(fetchAdminUsers());
    }
    if (resource === "poojas" || resource === "all") {
      dispatch(fetchAdminPoojas());
    }
  };

  const activeError =
    pathname === "/admin/bookings"
      ? ["bookings"]
      : pathname === "/admin/users"
        ? ["users"]
        : pathname === "/admin/services"
          ? ["poojas"]
          : ["bookings", "users", "poojas"];
  const errors = activeError
    .map((key) => [key, { bookings, users, poojas }[key].error])
    .filter(([, error]) => error);

  return (
    <main className="min-h-[calc(100vh-5rem)] bg-[var(--color-booking-bg)]">
      <div className="container-app py-7 sm:py-10">
        <header className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-secondary)]">
              आपले गुरुजी · Administration
            </p>
            <h1 className="text-3xl font-bold text-[var(--color-booking-ink)] sm:text-4xl">
              {section.title}
            </h1>
            <p className="mt-2 text-sm text-[var(--color-booking-muted-ink)] sm:text-base">
              {section.description}
            </p>
          </div>
          <div className="rounded-full border border-[var(--color-booking-border)] bg-white px-4 py-2 text-sm font-semibold text-[var(--color-booking-muted-ink)]">
            Admin · {user?.fullName}
          </div>
        </header>

        <div className="grid items-start gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
          <AdminSidebar />
          <div className="min-w-0 space-y-5">
            {errors.map(([resource, error]) => (
              <div
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--color-error)] bg-[var(--color-error-light)] p-4 text-sm text-[var(--color-error)]"
                key={resource}
                role="alert"
              >
                <span>{error}</span>
                <button
                  className="font-semibold underline"
                  onClick={() => handleRetry(resource)}
                  type="button"
                >
                  Retry
                </button>
              </div>
            ))}
            {pathname === "/admin/bookings" ? (
              bookings.isLoading ? (
                <p className="p-6 text-sm text-[var(--color-booking-muted-ink)]">
                  Loading bookings...
                </p>
              ) : (
                <AdminBookings bookings={bookings.items} />
              )
            ) : pathname === "/admin/services" ? (
              poojas.isLoading ? (
                <p className="p-6 text-sm text-[var(--color-booking-muted-ink)]">
                  Loading pujas...
                </p>
              ) : (
                <AdminPoojas poojas={poojas.items} />
              )
            ) : pathname === "/admin/users" ? (
              users.isLoading ? (
                <p className="p-6 text-sm text-[var(--color-booking-muted-ink)]">
                  Loading users...
                </p>
              ) : (
                <AdminUsers users={users.items} />
              )
            ) : bookings.isLoading || users.isLoading || poojas.isLoading ? (
              <p className="p-6 text-sm text-[var(--color-booking-muted-ink)]">
                Loading dashboard...
              </p>
            ) : (
              <AdminOverview
                bookings={bookings.items}
                poojas={poojas.items}
                users={users.items}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
