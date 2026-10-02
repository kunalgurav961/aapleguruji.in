import { CalendarDays } from "lucide-react";

const formatRupees = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount || 0);

const AdminBookings = ({ bookings }) => (
  <section className="overflow-hidden rounded-2xl border border-[var(--color-booking-border)] bg-white shadow-[var(--shadow-booking-card)]">
    <header className="border-b border-[var(--color-booking-border)] p-5">
      <h2 className="font-bold text-[var(--color-booking-ink)]">All bookings</h2>
      <p className="mt-1 text-sm text-[var(--color-booking-muted-ink)]">
        Most recent 100 bookings
      </p>
    </header>
    {bookings.length === 0 ? (
      <p className="p-6 text-sm text-[var(--color-booking-muted-ink)]">
        No bookings found.
      </p>
    ) : (
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-[var(--color-booking-muted)] text-xs uppercase tracking-wide text-[var(--color-booking-muted-ink)]">
            <tr>
              <th className="px-5 py-3 font-semibold">Booking</th>
              <th className="px-5 py-3 font-semibold">Customer</th>
              <th className="px-5 py-3 font-semibold">Puja</th>
              <th className="px-5 py-3 font-semibold">Date & time</th>
              <th className="px-5 py-3 font-semibold">Amount</th>
              <th className="px-5 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-booking-border)]">
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td className="px-5 py-4 font-semibold text-[var(--color-primary-dark)]">
                  {booking.bookingNumber || booking.bookingId || booking._id}
                </td>
                <td className="px-5 py-4">
                  <p className="font-semibold text-[var(--color-booking-ink)]">
                    {booking.customerSnapshot?.fullName ||
                      booking.userId?.fullName ||
                      "—"}
                  </p>
                  <p className="mt-1 text-xs text-[var(--color-booking-muted-ink)]">
                    {booking.customerSnapshot?.mobileNumber ||
                      booking.userId?.mobileNumber ||
                      "—"}
                  </p>
                </td>
                <td className="px-5 py-4 text-[var(--color-booking-ink)]">
                  {booking.poojaId?.name || "—"}
                </td>
                <td className="px-5 py-4">
                  <p className="flex items-center gap-1.5 text-[var(--color-booking-ink)]">
                    <CalendarDays aria-hidden="true" size={14} />
                    {new Date(booking.bookingDate).toLocaleDateString()}
                  </p>
                  <p className="mt-1 text-xs text-[var(--color-booking-muted-ink)]">
                    {booking.bookingTime}
                  </p>
                </td>
                <td className="px-5 py-4 font-semibold text-[var(--color-booking-ink)]">
                  {formatRupees(booking.paymentSnapshot?.amount)}
                </td>
                <td className="px-5 py-4">
                  <span className="rounded-full bg-[var(--color-warning-light)] px-2.5 py-1 text-xs font-semibold capitalize text-[var(--color-warning)]">
                    {booking.bookingStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </section>
);

export default AdminBookings;
