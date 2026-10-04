import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CalendarDays,
  Check,
  CircleDollarSign,
  Clock3,
  Flower2,
  Star,
  UsersRound,
  X,
} from "lucide-react";

const rupees = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount || 0);

const number = (value) => new Intl.NumberFormat("en-IN").format(value || 0);

const periods = [
  ["day", "Today"],
  ["week", "7 days"],
  ["month", "30 days"],
  ["quarter", "90 days"],
];

const metricCards = [
  {
    key: "periodBookings",
    label: "Ritual bookings",
    detail: "in selected period",
    icon: CalendarDays,
    format: number,
    link: "/admin/bookings",
    color: "saffron",
  },
  {
    key: "bookedDakshina",
    label: "Booked dakshina",
    detail: "non-cancelled booking value",
    icon: CircleDollarSign,
    format: rupees,
    link: "/admin/bookings",
    color: "green",
  },
  {
    key: "verifiedPandits",
    label: "Verified Gurujis",
    detail: "approved pandit accounts",
    icon: BadgeCheck,
    format: number,
    link: "/admin/pandits",
    color: "purple",
  },
  {
    key: "devotees",
    label: "Registered devotees",
    detail: "registered devotee accounts",
    icon: UsersRound,
    format: number,
    link: "/admin/users",
    color: "blue",
  },
];

const statusLabels = {
  confirmed: "Confirmed",
  pending: "Pending",
  cancelled: "Cancelled",
};

const AdminOverview = ({
  data,
  isLoading,
  period,
  onPeriodChange,
  onBookingStatusChange,
  onPanditStatusChange,
}) => {
  const [busyId, setBusyId] = useState("");
  const metrics = data?.metrics;
  const trend = data?.trend || [];
  const statuses = data?.statusBreakdown || {
    confirmed: 0,
    pending: 0,
    cancelled: 0,
  };
  const totalStatusCount = Object.values(statuses).reduce(
    (sum, count) => sum + count,
    0,
  );
  const chart = useMemo(() => {
    const max = Math.max(...trend.map((item) => item.bookedDakshina), 1);
    const width = 720;
    const height = 188;
    const points = trend.map((item, index) => ({
      x: trend.length === 1 ? width / 2 : (index / (trend.length - 1)) * width,
      y: height - (item.bookedDakshina / max) * (height - 18) - 6,
    }));
    return {
      points,
      line: points.map(({ x, y }) => `${x},${y}`).join(" "),
      area:
        points.length > 0
          ? `0,${height} ${points.map(({ x, y }) => `${x},${y}`).join(" ")} ${width},${height}`
          : "",
    };
  }, [trend]);

  const runAction = async (id, action) => {
    setBusyId(id);
    try {
      await action();
    } finally {
      setBusyId("");
    }
  };

  if (isLoading && !data) {
    return (
      <div className="adm-loading" role="status">
        <span className="adm-spinner" />
        Loading live dashboard data…
      </div>
    );
  }

  if (!data || !metrics) return null;

  const recentBookings = data.recentBookings || [];
  const pendingPandits = data.pendingPandits || [];
  const donutConfirmed = totalStatusCount
    ? (statuses.confirmed / totalStatusCount) * 100
    : 0;
  const donutPending = totalStatusCount
    ? donutConfirmed + (statuses.pending / totalStatusCount) * 100
    : 0;

  return (
    <div className="adm-dashboard">
      <section className="adm-greeting">
        <div>
          <p className="adm-eyebrow">अष्टम पटल संकलन</p>
          <h2>Namaste, Administrator <span>· नमस्कार</span></h2>
          <p className="adm-greeting__date">
            Live operations overview ·{" "}
            {new Intl.DateTimeFormat("en-IN", {
              dateStyle: "full",
            }).format(new Date())}
          </p>
        </div>
        <div className="adm-range-control" aria-label="Dashboard date range">
          {periods.map(([value, label]) => (
            <button
              aria-pressed={period === value}
              className={period === value ? "is-active" : ""}
              key={value}
              onClick={() => onPeriodChange(value)}
              type="button"
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      <section className="adm-metrics" aria-label="Key dashboard metrics">
        {metricCards.map(({ key, label, detail, icon: Icon, format, link, color }) => (
          <Link className="adm-metric-card" key={key} to={link}>
            <div className="adm-metric-card__top">
              <span>{label}</span>
              <span className={`adm-metric-card__icon is-${color}`}>
                <Icon size={18} />
              </span>
            </div>
            <strong>{format(metrics[key])}</strong>
            <div className="adm-metric-card__foot">
              <span>{detail}</span>
              <ArrowUpRight size={15} />
            </div>
          </Link>
        ))}
      </section>

      <section className="adm-pulse-grid" aria-label="Operations requiring attention">
        <Link className="adm-pulse-card" to="/admin/bookings">
          <span className="adm-pulse-card__icon is-rose"><Clock3 size={17} /></span>
          <span><small>Pending bookings</small><strong>{number(metrics.pendingBookings)}</strong></span>
          <ArrowRight size={15} />
        </Link>
        <Link className="adm-pulse-card" to="/admin/pandits">
          <span className="adm-pulse-card__icon is-amber"><BadgeCheck size={17} /></span>
          <span><small>Guruji verification</small><strong>{number(metrics.pendingPanditApplications)} awaiting review</strong></span>
          <ArrowRight size={15} />
        </Link>
        <Link className="adm-pulse-card" to="/admin/services">
          <span className="adm-pulse-card__icon is-blue"><Flower2 size={17} /></span>
          <span><small>Active puja services</small><strong>{number(metrics.activePujas)}</strong></span>
          <ArrowRight size={15} />
        </Link>
        <Link className="adm-pulse-card" to="/admin/reviews">
          <span className="adm-pulse-card__icon is-gold"><Star size={17} /></span>
          <span><small>Devotee rating</small><strong>{Number(metrics.averageRating).toFixed(1)} / 5 · {number(metrics.publishedReviews)} reviews</strong></span>
          <ArrowRight size={15} />
        </Link>
      </section>

      <section className="adm-live-strip">
        <span className="adm-live-strip__badge"><i /> Recent activity</span>
        <div className="adm-live-strip__events">
          {recentBookings.length ? recentBookings.slice(0, 3).map((booking) => (
            <span key={booking._id}>
              <CalendarDays size={14} />
              {booking.customerSnapshot?.fullName || booking.userId?.fullName || "A devotee"} requested{" "}
              {booking.poojaId?.name || booking.poojaSnapshot?.name || "a puja"} ·{" "}
              {new Date(booking.createdAt).toLocaleString("en-IN", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </span>
          )) : <span>No recent booking activity.</span>}
        </div>
      </section>

      <div className="adm-content-grid">
        <div className="adm-main-column">
          <section className="adm-panel">
            <header className="adm-panel__header">
              <div>
                <h3>Revenue &amp; Dakshina Trends</h3>
                <p>Value of non-cancelled puja bookings by booking date</p>
              </div>
              <span className="adm-period-note">
                {periods.find(([value]) => value === period)?.[1] || "30 days"}
              </span>
            </header>
            <div className="adm-chart-summary">
              <div><span><i className="is-saffron" /> Booked dakshina</span><strong>{rupees(metrics.bookedDakshina)}</strong></div>
              <div><span><i className="is-green" /> Bookings received</span><strong>{number(metrics.periodBookings)}</strong></div>
              <span className="adm-chart-disclaimer">Booking value, not payment settlement</span>
            </div>
            <div className="adm-chart">
              {trend.length ? (
                <svg viewBox="0 0 720 210" preserveAspectRatio="none" role="img" aria-label="Dakshina booked trend">
                  <defs>
                    <linearGradient id="adminTrendFill" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-primary)" stopOpacity=".22" />
                      <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {[24, 70, 116, 162, 198].map((y) => (
                    <line key={y} x1="0" x2="720" y1={y} y2={y} className="adm-chart__gridline" />
                  ))}
                  {chart.area && <polygon points={chart.area} fill="url(#adminTrendFill)" />}
                  {chart.line && <polyline points={chart.line} className="adm-chart__line" />}
                  {chart.points.map(({ x, y }, index) => (
                    <circle key={`${x}-${index}`} cx={x} cy={y} r={trend.length > 24 ? 2 : 3.5} className="adm-chart__point">
                      <title>{`${trend[index].date}: ${rupees(trend[index].bookedDakshina)} · ${trend[index].bookings} bookings`}</title>
                    </circle>
                  ))}
                </svg>
              ) : (
                <p className="adm-empty adm-chart__empty">No bookings recorded in this date range.</p>
              )}
            </div>
            <div className="adm-chart__labels">
              {trend.map((item, index) => {
                const stride = Math.max(1, Math.ceil(trend.length / 6));
                return index % stride === 0 || index === trend.length - 1 ? (
                  <span key={item.date}>
                    {new Date(`${item.date}T00:00:00Z`).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      timeZone: "UTC",
                    })}
                  </span>
                ) : null;
              })}
            </div>
          </section>

          <section className="adm-panel adm-bookings-panel">
            <header className="adm-panel__header">
              <div>
                <h3>Recent ritual bookings</h3>
                <p>Latest devotee requests · update booking status here</p>
              </div>
              <Link to="/admin/bookings">View all <ArrowRight size={14} /></Link>
            </header>
            {recentBookings.length ? (
              <div className="adm-table-wrap">
                <table className="adm-table">
                  <thead>
                    <tr>
                      <th>Booking ID</th><th>Devotee</th><th>Requested ritual</th>
                      <th>Muhurat</th><th>Dakshina</th><th>Status / Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.map((booking) => {
                      const customer = booking.customerSnapshot?.fullName || booking.userId?.fullName || "Devotee";
                      const city = booking.userId?.city || booking.address?.city || "";
                      const busy = busyId === booking._id;
                      return (
                        <tr key={booking._id}>
                          <td className="adm-booking-id">{booking.bookingNumber || booking.bookingId || booking._id}</td>
                          <td><strong>{customer}</strong><small>{city || booking.userId?.mobileNumber || "—"}</small></td>
                          <td>{booking.poojaId?.name || booking.poojaSnapshot?.name || "Puja"}</td>
                          <td>{new Date(booking.bookingDate).toLocaleDateString("en-IN")}<small>{booking.bookingTime}</small></td>
                          <td><strong>{rupees(booking.paymentSnapshot?.amount)}</strong><small>{booking.paymentSnapshot?.status || "pending payment"}</small></td>
                          <td>
                            <span className={`adm-status is-${booking.bookingStatus}`}>{statusLabels[booking.bookingStatus] || booking.bookingStatus}</span>
                            {booking.bookingStatus === "pending" && (
                              <div className="adm-row-actions">
                                <button
                                  disabled={busy}
                                  onClick={() => runAction(booking._id, () => onBookingStatusChange(booking._id, "confirmed"))}
                                  type="button"
                                  title="Confirm booking"
                                ><Check size={13} /> Confirm</button>
                                <button
                                  disabled={busy}
                                  onClick={() => runAction(booking._id, () => onBookingStatusChange(booking._id, "cancelled"))}
                                  type="button"
                                  title="Cancel booking"
                                ><X size={13} /> Cancel</button>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : <p className="adm-empty">No bookings have been received yet.</p>}
          </section>
        </div>

        <aside className="adm-side-column">
          <section className="adm-panel adm-fulfillment">
            <header className="adm-panel__header">
              <div><h3>Ceremony Fulfillment</h3><p>Booking status · selected period</p></div>
              <CalendarDays size={18} />
            </header>
            <div className="adm-donut-wrap">
              <div
                className="adm-donut"
                style={{
                  background: `conic-gradient(var(--color-primary-dark) 0% ${donutConfirmed}%, #fb923c ${donutConfirmed}% ${donutPending}%, #d7a737 ${donutPending}% 100%)`,
                }}
              >
                <div><strong>{number(totalStatusCount)}</strong><span>Total</span></div>
              </div>
            </div>
            <div className="adm-status-legend">
              {[
                ["confirmed", "Confirmed", "is-confirmed"],
                ["pending", "Pending", "is-pending"],
                ["cancelled", "Cancelled", "is-cancelled"],
              ].map(([key, label, color]) => (
                <div key={key}>
                  <span><i className={color} />{label}</span>
                  <strong>{number(statuses[key])}<small>{totalStatusCount ? `${Math.round(statuses[key] / totalStatusCount * 100)}%` : "0%"}</small></strong>
                </div>
              ))}
            </div>
          </section>

          <section className="adm-panel adm-verification">
            <header className="adm-panel__header">
              <div><h3>Pandit Verifications</h3><p>Applications awaiting review</p></div>
              <span className="adm-count-badge">{number(metrics.pendingPanditApplications)}</span>
            </header>
            {pendingPandits.length ? (
              <div className="adm-pandit-list">
                {pendingPandits.map((pandit) => {
                  const busy = busyId === pandit._id;
                  return (
                    <article className="adm-pandit-card" key={pandit._id}>
                      <div className="adm-pandit-card__person">
                        <span className="adm-avatar">{pandit.fullName?.slice(0, 1)?.toUpperCase() || "G"}</span>
                        <span><strong>{pandit.fullName}</strong><small>{pandit.vedicShakha || "Vedic details not provided"}</small></span>
                      </div>
                      <div className="adm-pandit-card__meta">
                        <span>{pandit.city || "Location not specified"}</span>
                        <span>{pandit.experience || "Experience not listed"}</span>
                      </div>
                      <div className="adm-pandit-card__actions">
                        <button
                          disabled={busy}
                          onClick={() => runAction(pandit._id, () => onPanditStatusChange(pandit._id, "approved"))}
                          type="button"
                        ><Check size={14} /> Approve</button>
                        <button
                          disabled={busy}
                          onClick={() => runAction(pandit._id, () => onPanditStatusChange(pandit._id, "rejected"))}
                          type="button"
                        ><X size={14} /> Reject</button>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <p className="adm-empty">No Guruji applications need review.</p>
            )}
            <Link className="adm-panel__footer-link" to="/admin/pandits">
              Manage applications <ArrowRight size={14} />
            </Link>
          </section>

          <section className="adm-panel adm-rating-panel">
            <span className="adm-rating-panel__icon"><Star size={18} fill="currentColor" /></span>
            <div>
              <strong>{Number(metrics.averageRating).toFixed(1)}<small> / 5.0</small></strong>
              <p>Average from {number(metrics.publishedReviews)} published family reviews</p>
            </div>
            <ArrowDownRight size={17} />
          </section>
        </aside>
      </div>
    </div>
  );
};

export default AdminOverview;
