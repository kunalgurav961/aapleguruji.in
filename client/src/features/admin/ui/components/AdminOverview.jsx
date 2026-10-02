import { CalendarCheck, ClipboardList, UsersRound } from "lucide-react";
import { Link } from "react-router-dom";

const formatRupees = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount || 0);

const summaryCards = [
  {
    key: "bookings",
    label: "Total bookings",
    icon: CalendarCheck,
    link: "/admin/bookings",
  },
  {
    key: "users",
    label: "Registered users",
    icon: UsersRound,
    link: "/admin/users",
  },
  {
    key: "poojas",
    label: "Active pujas",
    icon: ClipboardList,
    link: "/admin/services",
  },
];

const AdminOverview = ({ bookings, users, poojas }) => {
  const counts = {
    bookings: bookings.length,
    users: users.length,
    poojas: poojas.length,
  };
  const pendingBookings = bookings.filter(
    (booking) => booking.bookingStatus === "pending",
  ).length;

  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {summaryCards.map(({ key, label, icon: Icon, link }) => (
          <Link
            className="rounded-2xl border border-[var(--color-booking-border)] bg-white p-5 shadow-[var(--shadow-booking-card)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-hover)]"
            key={key}
            to={link}
          >
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-booking-muted)] text-[var(--color-primary-dark)]">
                <Icon aria-hidden="true" size={19} />
              </span>
              <span className="text-xs font-semibold text-[var(--color-primary-dark)]">
                View
              </span>
            </div>
            <p className="mt-5 text-3xl font-bold text-[var(--color-booking-ink)]">
              {counts[key]}
            </p>
            <p className="mt-1 text-sm text-[var(--color-booking-muted-ink)]">
              {label}
            </p>
          </Link>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(260px,.6fr)]">
        <div className="overflow-hidden rounded-2xl border border-[var(--color-booking-border)] bg-white shadow-[var(--shadow-booking-card)]">
          <div className="flex items-center justify-between gap-3 border-b border-[var(--color-booking-border)] px-5 py-4">
            <div>
              <h2 className="font-bold text-[var(--color-booking-ink)]">
                Recent bookings
              </h2>
              <p className="mt-1 text-xs text-[var(--color-booking-muted-ink)]">
                Latest customer requests
              </p>
            </div>
            <Link
              className="text-sm font-semibold text-[var(--color-primary-dark)] hover:underline"
              to="/admin/bookings"
            >
              View all
            </Link>
          </div>
          {bookings.length === 0 ? (
            <p className="p-5 text-sm text-[var(--color-booking-muted-ink)]">
              No bookings to show yet.
            </p>
          ) : (
            <ul className="divide-y divide-[var(--color-booking-border)]">
              {bookings.slice(0, 5).map((booking) => (
                <li
                  className="flex items-center justify-between gap-4 px-5 py-3.5"
                  key={booking._id}
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[var(--color-booking-ink)]">
                      {booking.customerSnapshot?.fullName ||
                        booking.userId?.fullName ||
                        "Customer"}
                    </p>
                    <p className="mt-1 truncate text-xs text-[var(--color-booking-muted-ink)]">
                      {booking.poojaId?.name || "Puja"} ·{" "}
                      {new Date(booking.bookingDate).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="shrink-0 text-sm font-semibold text-[var(--color-primary-dark)]">
                    {formatRupees(booking.paymentSnapshot?.amount)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-2xl border border-[var(--color-booking-border)] bg-white p-5 shadow-[var(--shadow-booking-card)]">
          <h2 className="font-bold text-[var(--color-booking-ink)]">
            Booking status
          </h2>
          <p className="mt-1 text-xs text-[var(--color-booking-muted-ink)]">
            Current requests needing attention
          </p>
          <p className="mt-6 text-4xl font-bold text-[var(--color-primary-dark)]">
            {pendingBookings}
          </p>
          <p className="mt-1 text-sm text-[var(--color-booking-muted-ink)]">
            Pending bookings
          </p>
          <Link
            className="mt-5 inline-flex text-sm font-semibold text-[var(--color-primary-dark)] hover:underline"
            to="/admin/bookings"
          >
            Review bookings
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AdminOverview;
