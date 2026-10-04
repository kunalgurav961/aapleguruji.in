import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  AlertCircle,
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Check,
  Clock3,
  Flame,
  MapPin,
  Phone,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { fetchMyBookings } from "../../state/bookingActions";

const formatRupees = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount || 0);

const formatDate = (date) => {
  if (!date) return "तारीख उपलब्ध नाही";

  return new Intl.DateTimeFormat("mr-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
};

const bookingSteps = [
  { label: "बुकिंग नोंदली", icon: Check },
  { label: "गुरुजींची पुष्टी", icon: BadgeCheck },
];

const BookingProgress = ({ status }) => {
  const isConfirmed = status === "confirmed";
  const isCancelled = status === "cancelled";

  return (
    <div
      aria-label={`बुकिंग स्थिती: ${isCancelled ? "रद्द" : isConfirmed ? "पुष्टी झाली" : "पुष्टीची प्रतीक्षा"}`}
      className={`mb-5 rounded-xl border p-4 ${
        isCancelled
          ? "border-[var(--color-error)] bg-[var(--color-error-light)]"
          : "border-[var(--color-booking-border)] bg-[var(--color-booking-muted)]"
      }`}
      role="group"
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="text-xs font-bold uppercase tracking-wide text-[var(--color-booking-muted-ink)]">
          बुकिंगची स्थिती
        </span>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-bold capitalize ${
            isCancelled
              ? "bg-[var(--color-error-light)] text-[var(--color-error)]"
              : isConfirmed
                ? "bg-[var(--color-success-light)] text-[var(--color-success)]"
                : "bg-[var(--color-warning-light)] text-[var(--color-warning)]"
          }`}
        >
          {isCancelled ? "रद्द" : isConfirmed ? "पुष्टी झाली" : "पुष्टीची प्रतीक्षा"}
        </span>
      </div>
      <ol className="grid grid-cols-2 gap-2">
        {bookingSteps.map(({ label, icon: Icon }, index) => {
          const complete = index === 0 || isConfirmed;
          const current = !isCancelled && (isConfirmed ? index === 1 : index === 0);

          return (
            <li className="relative flex items-center gap-2.5" key={label}>
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                  isCancelled && index === 1
                    ? "bg-[var(--color-booking-border)] text-[var(--color-booking-muted-ink)]"
                    : complete
                      ? "bg-[var(--color-success)] text-white"
                      : "bg-[var(--color-booking-border)] text-[var(--color-booking-muted-ink)]"
                } ${current ? "ring-4 ring-[var(--color-primary)]/15" : ""}`}
              >
                <Icon aria-hidden="true" size={16} />
              </span>
              <span
                className={`text-xs font-semibold sm:text-sm ${
                  complete && !isCancelled
                    ? "text-[var(--color-booking-ink)]"
                    : "text-[var(--color-booking-muted-ink)]"
                }`}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ol>
      {isCancelled && (
        <p className="mt-3 text-xs font-semibold text-[var(--color-error)]">
          ही बुकिंग रद्द करण्यात आली आहे.
        </p>
      )}
    </div>
  );
};

const BookingDetail = ({ icon: Icon, label, children }) => (
  <div className="flex min-w-0 items-start gap-3">
    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-booking-muted)] text-[var(--color-primary-dark)]">
      <Icon aria-hidden="true" size={16} />
    </span>
    <div className="min-w-0">
      <p className="text-xs font-medium text-[var(--color-booking-muted-ink)]">
        {label}
      </p>
      <div className="mt-1 break-words text-sm font-semibold text-[var(--color-booking-ink)]">
        {children}
      </div>
    </div>
  </div>
);

const MyBookingsPage = () => {
  const dispatch = useDispatch();
  const { myBookings, isLoadingMyBookings, myBookingsError } = useSelector(
    (state) => state.booking,
  );

  useEffect(() => {
    dispatch(fetchMyBookings());
  }, [dispatch]);

  return (
    <main className="min-h-[calc(100vh-100px)] bg-[var(--color-booking-bg)]">
      <div className="container-app py-8 sm:py-10">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex items-center gap-2 text-xs font-medium text-[var(--color-booking-muted-ink)] sm:text-sm"
        >
          <Link className="hover:text-[var(--color-primary-dark)]" to="/">
            मुख्यपृष्ठ
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="text-[var(--color-primary-dark)]">
            माझी बुकिंग
          </span>
        </nav>

        <header className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-[var(--color-booking-badge)] px-3 py-1.5 text-xs font-semibold text-[var(--color-secondary)]">
              <Flame aria-hidden="true" size={14} />
              आपल्या पूजेचा तपशील
            </span>
            <h1 className="text-3xl font-bold leading-tight text-[var(--color-booking-ink)] sm:text-4xl">
              माझी बुकिंग
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-booking-muted-ink)] sm:text-base">
              तुमच्या पूजा बुकिंगची स्थिती, तारीख आणि इतर तपशील येथे पाहा.
            </p>
          </div>
          <Link
            className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-[var(--color-booking-border)] bg-white px-4 py-2 text-sm font-bold text-[var(--color-primary-dark)] transition hover:bg-[var(--color-booking-muted)]"
            to="/home/book-pooja"
          >
            नवीन पूजा बुक करा <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </header>

        {myBookingsError && (
          <div
            className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--color-error)] bg-[var(--color-error-light)] p-4 text-sm text-[var(--color-error)]"
            role="alert"
          >
            <span className="inline-flex items-center gap-2">
              <AlertCircle aria-hidden="true" size={18} />
              {myBookingsError}
            </span>
            <button
              className="inline-flex items-center gap-2 font-semibold underline"
              onClick={() => dispatch(fetchMyBookings())}
              type="button"
            >
              <RefreshCw aria-hidden="true" size={14} />
              पुन्हा प्रयत्न करा
            </button>
          </div>
        )}

        {isLoadingMyBookings && myBookings.length === 0 ? (
          <div
            className="rounded-2xl border border-[var(--color-booking-border)] bg-white p-10 text-center shadow-[var(--shadow-booking-card)]"
            role="status"
          >
            <RefreshCw
              aria-hidden="true"
              className="mx-auto mb-3 animate-spin text-[var(--color-primary)]"
              size={25}
            />
            <p className="text-sm font-semibold text-[var(--color-booking-muted-ink)]">
              तुमच्या बुकिंग लोड होत आहेत...
            </p>
          </div>
        ) : myBookings.length === 0 ? (
          <section className="rounded-2xl border border-[var(--color-booking-border)] bg-white px-6 py-12 text-center shadow-[var(--shadow-booking-card)]">
            <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-booking-muted)] text-[var(--color-primary-dark)]">
              <CalendarDays aria-hidden="true" size={26} />
            </span>
            <h2 className="text-lg font-bold text-[var(--color-booking-ink)]">
              अजून कोणतीही बुकिंग नाही
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--color-booking-muted-ink)]">
              तुमच्या घरी विधी करण्यासाठी योग्य पूजा निवडा आणि बुकिंग सुरू करा.
            </p>
            <Link
              className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-5 py-3 text-sm font-bold text-white transition hover:bg-[var(--color-primary-hover)]"
              to="/home/book-pooja"
            >
              पूजा बुक करा <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </section>
        ) : (
          <div className="space-y-5">
            {myBookings.map((booking) => {
              const poojaName =
                booking.poojaId?.name || booking.poojaSnapshot?.name || "पूजा";
              const address =
                booking.address?.fullAddress ||
                (typeof booking.address === "string" ? booking.address : "");

              return (
                <article
                  className="overflow-hidden rounded-2xl border border-[var(--color-booking-border)] bg-white shadow-[var(--shadow-booking-card)]"
                  key={booking._id}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-booking-border)] px-5 py-4 sm:px-6">
                    <div>
                      <p className="text-xs font-medium text-[var(--color-booking-muted-ink)]">
                        बुकिंग क्रमांक
                      </p>
                      <p className="mt-1 break-all text-sm font-bold text-[var(--color-primary-dark)]">
                        {booking.bookingNumber || booking.bookingId || booking._id}
                      </p>
                    </div>
                    <p className="text-xs text-[var(--color-booking-muted-ink)]">
                      नोंदणी: {formatDate(booking.createdAt)}
                    </p>
                  </div>
                  <div className="p-5 sm:p-6">
                    <BookingProgress status={booking.bookingStatus} />
                    <div className="mb-5 flex items-start gap-3">
                      {booking.poojaId?.images?.[0] ? (
                        <img
                          alt=""
                          className="h-12 w-12 shrink-0 rounded-xl object-cover"
                          src={booking.poojaId.images[0]}
                        />
                      ) : (
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-booking-badge)] text-[var(--color-primary-dark)]">
                          <Flame aria-hidden="true" size={21} />
                        </span>
                      )}
                      <div>
                        <h2 className="text-lg font-bold text-[var(--color-booking-ink)]">
                          {poojaName}
                        </h2>
                        <p className="mt-1 text-xs text-[var(--color-booking-muted-ink)]">
                          {booking.poojaId?.duration
                            ? `${booking.poojaId.duration} मिनिटे · `
                            : ""}
                          विधीची बुकिंग
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-x-6 gap-y-5 border-t border-[var(--color-booking-border)] pt-5 sm:grid-cols-2 lg:grid-cols-3">
                      <BookingDetail icon={CalendarDays} label="पूजेची तारीख">
                        {formatDate(booking.bookingDate)}
                      </BookingDetail>
                      <BookingDetail icon={Clock3} label="पूजेची वेळ">
                        {booking.bookingTime || "वेळ निश्चित होत आहे"}
                      </BookingDetail>
                      <BookingDetail icon={MapPin} label="पूजेचे ठिकाण">
                        {address || booking.gmapLocation || "पत्ता उपलब्ध नाही"}
                      </BookingDetail>
                      <BookingDetail icon={ShieldCheck} label="भक्ताचे नाव">
                        {booking.customerSnapshot?.fullName || "—"}
                      </BookingDetail>
                      <BookingDetail icon={Phone} label="नोंदणीकृत मोबाईल">
                        {booking.customerSnapshot?.mobileNumber || "—"}
                      </BookingDetail>
                      <BookingDetail icon={Flame} label="दक्षिणा / रक्कम">
                        {formatRupees(booking.paymentSnapshot?.amount)}
                      </BookingDetail>
                      <BookingDetail icon={BadgeCheck} label="पेमेंट पद्धत व स्थिती">
                        <span className="capitalize">
                          {booking.paymentSnapshot?.method || "—"} ·{" "}
                          {booking.paymentSnapshot?.status || "प्रलंबित"}
                        </span>
                      </BookingDetail>
                    </div>

                    {booking.remarks?.length > 0 && (
                      <div className="mt-5 rounded-xl bg-[var(--color-booking-muted)] p-4">
                        <p className="text-xs font-bold text-[var(--color-booking-ink)]">
                          बुकिंगबद्दलची नोंद
                        </p>
                        <ul className="mt-2 space-y-1 text-sm text-[var(--color-booking-muted-ink)]">
                          {booking.remarks.map((remark, index) => (
                            <li key={`${booking._id}-remark-${index}`}>{remark}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
};

export default MyBookingsPage;
