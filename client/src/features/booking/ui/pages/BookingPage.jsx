import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Check,
  Clock3,
  Flame,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { toast } from "react-toastify";
import { bookPooja, fetchPoojaOptions } from "../../state/bookingActions";

const formatRupees = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const getLocalDate = () => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
};

const toApiDate = (date) => {
  const [year, month, day] = date.split("-");
  return `${day}-${month}-${year}`;
};

const toApiTime = (time) => {
  const [hourValue, minute] = time.split(":");
  const hour = Number(hourValue);
  const meridiem = hour >= 12 ? "PM" : "AM";
  return `${hour % 12 || 12}:${minute} ${meridiem}`;
};

const SectionHeading = ({ icon: Icon, eyebrow, title, detail }) => (
  <div className="mb-5 flex items-start gap-3">
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-booking-muted)] text-[var(--color-primary-dark)]">
      <Icon aria-hidden="true" size={19} />
    </span>
    <div>
      {eyebrow && (
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-secondary)]">
          {eyebrow}
        </p>
      )}
      <h2 className="text-lg font-bold leading-tight text-[var(--color-booking-ink)] sm:text-xl">
        {title}
      </h2>
      {detail && (
        <p className="mt-1 text-sm leading-6 text-[var(--color-booking-muted-ink)]">
          {detail}
        </p>
      )}
    </div>
  </div>
);

const ProgressSteps = () => {
  const steps = ["पूजा निवड", "तारीख व वेळ", "पत्ता", "पुष्टी"];

  return (
    <nav
      aria-label="बुकिंग प्रक्रिया"
      className="grid grid-cols-2 gap-2 rounded-2xl border border-[var(--color-booking-border)] bg-[var(--color-booking-panel)] p-3 shadow-[var(--shadow-booking-card)] sm:grid-cols-4 sm:gap-0 sm:p-4"
    >
      {steps.map((step, index) => (
        <div className="flex items-center gap-2.5 px-1 py-2 sm:px-2" key={step}>
          <span
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
              index === 0
                ? "bg-[var(--color-success-light)] text-[var(--color-success)]"
                : index === 1
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-[var(--color-booking-muted)] text-[var(--color-booking-muted-ink)]"
            }`}
          >
            {index === 0 ? <Check aria-hidden="true" size={14} /> : index + 1}
          </span>
          <span
            className={`text-xs font-semibold sm:text-sm ${
              index === 1
                ? "text-[var(--color-primary-dark)]"
                : "text-[var(--color-booking-muted-ink)]"
            }`}
          >
            {step}
          </span>
        </div>
      ))}
    </nav>
  );
};

const PujaSelection = ({ options, selectedPujaId, onSelect, disabled }) => (
  <section className="booking-card">
    <SectionHeading
      icon={Flame}
      eyebrow="चरण १ · विधी"
      title="आपल्या घरासाठी पूजा निवडा"
      detail="पूजा आणि तिची दक्षिणा व्यवस्थापनाकडून अद्ययावत केली जाते."
    />
    {options.length === 0 ? (
      <p className="rounded-xl bg-[var(--color-booking-muted)] p-4 text-sm text-[var(--color-booking-muted-ink)]">
        सध्या पूजा उपलब्ध नाहीत. कृपया नंतर पुन्हा प्रयत्न करा.
      </p>
    ) : (
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((pooja) => {
          const selected = pooja._id === selectedPujaId;
          return (
            <button
              aria-pressed={selected}
              className={`rounded-xl border p-4 text-left transition disabled:cursor-not-allowed disabled:opacity-60 ${
                selected
                  ? "border-[var(--color-primary)] bg-[var(--color-booking-selected)] shadow-[var(--shadow-booking-card)]"
                  : "border-[var(--color-booking-border)] bg-[var(--color-booking-panel)] hover:border-[var(--color-secondary-light)]"
              }`}
              disabled={disabled}
              key={pooja._id}
              onClick={() => onSelect(pooja._id)}
              type="button"
            >
              <span className="mb-3 flex items-start justify-between gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-booking-muted)] text-[var(--color-primary-dark)]">
                  <Flame aria-hidden="true" size={18} />
                </span>
                {selected && (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-primary)] text-white">
                    <Check aria-hidden="true" size={14} />
                  </span>
                )}
              </span>
              <span className="block font-semibold leading-6 text-[var(--color-booking-ink)]">
                {pooja.name}
              </span>
              <span className="mt-2 block text-sm font-bold text-[var(--color-primary-dark)]">
                {formatRupees(pooja.basePrice)}
              </span>
            </button>
          );
        })}
      </div>
    )}
  </section>
);

const ScheduleSelection = ({ bookingDate, bookingTime, onChange }) => (
  <section className="booking-card">
    <SectionHeading
      icon={CalendarDays}
      eyebrow="चरण २ · वेळापत्रक"
      title="बुकिंगची तारीख व वेळ"
      detail="आपल्या सोयीची तारीख आणि पूजा सुरू करण्याची वेळ निवडा."
    />
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="block">
        <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-[var(--color-booking-ink)]">
          <CalendarDays aria-hidden="true" size={16} />
          बुकिंगची तारीख *
        </span>
        <input
          className="booking-input"
          min={getLocalDate()}
          name="bookingDate"
          onChange={onChange}
          required
          type="date"
          value={bookingDate}
        />
      </label>
      <label className="block">
        <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-[var(--color-booking-ink)]">
          <Clock3 aria-hidden="true" size={16} />
          पूजा सुरू होण्याची वेळ *
        </span>
        <input
          className="booking-input"
          name="bookingTime"
          onChange={onChange}
          required
          type="time"
          value={bookingTime}
        />
      </label>
    </div>
  </section>
);

const AddressDetails = ({ address, onChange }) => (
  <section className="booking-card">
    <SectionHeading
      icon={MapPin}
      eyebrow="चरण ३ · ठिकाण"
      title="पूजा स्थानाचा पत्ता"
      detail="या पत्त्यावर पूजा होईल. कृपया संपूर्ण पत्ता आणि पिनकोड लिहा."
    />
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-[var(--color-booking-ink)]">
        संपूर्ण पत्ता *
      </span>
      <textarea
        className="booking-input min-h-28 resize-y"
        name="address"
        onChange={onChange}
        placeholder="घर क्रमांक, परिसर, शहर आणि पिनकोड"
        required
        rows={4}
        value={address}
      />
    </label>
  </section>
);

const BookingSummary = ({ pooja, bookingDate, bookingTime, isSubmitting }) => (
  <aside className="booking-card h-fit lg:sticky lg:top-24">
    <SectionHeading
      icon={BadgeCheck}
      eyebrow="बुकिंग तपशील"
      title="पूजा सारांश"
    />
    <dl className="space-y-4">
      <div className="flex items-start justify-between gap-4 text-sm">
        <dt className="shrink-0 text-[var(--color-booking-muted-ink)]">पूजा</dt>
        <dd className="text-right font-semibold text-[var(--color-booking-ink)]">
          {pooja?.name || "पूजा निवडा"}
        </dd>
      </div>
      <div className="flex items-start justify-between gap-4 text-sm">
        <dt className="shrink-0 text-[var(--color-booking-muted-ink)]">तारीख</dt>
        <dd className="text-right font-semibold text-[var(--color-booking-ink)]">
          {bookingDate || "तारीख निवडा"}
        </dd>
      </div>
      <div className="flex items-start justify-between gap-4 text-sm">
        <dt className="shrink-0 text-[var(--color-booking-muted-ink)]">वेळ</dt>
        <dd className="text-right font-semibold text-[var(--color-booking-ink)]">
          {bookingTime ? toApiTime(bookingTime) : "वेळ निवडा"}
        </dd>
      </div>
      <div className="flex items-start justify-between gap-4 border-t border-[var(--color-booking-border)] pt-4">
        <dt className="font-bold text-[var(--color-booking-ink)]">देय रक्कम</dt>
        <dd className="text-right text-xl font-bold text-[var(--color-primary-dark)]">
          {pooja ? formatRupees(pooja.basePrice) : "—"}
        </dd>
      </div>
    </dl>
    <div className="mt-5 rounded-xl border border-[var(--color-booking-border)] bg-[var(--color-booking-muted)] p-3">
      <p className="text-sm font-semibold text-[var(--color-booking-ink)]">
        पेमेंट पद्धत
      </p>
      <p className="mt-1 text-sm text-[var(--color-booking-muted-ink)]">
        पूजा पूर्ण झाल्यावर गुरुजींना रोख पेमेंट (COD)
      </p>
    </div>
    <button
      className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-4 py-3.5 font-bold text-white shadow-[var(--shadow-booking-cta)] transition hover:bg-[var(--color-primary-hover)] disabled:cursor-not-allowed disabled:opacity-60"
      disabled={!pooja || isSubmitting}
      form="booking-form"
      type="submit"
    >
      {isSubmitting ? "बुकिंग नोंदवत आहे..." : "बुकिंग निश्चित करा"}
      {!isSubmitting && <ArrowRight aria-hidden="true" size={18} />}
    </button>
    <p className="mt-3 flex items-center justify-center gap-2 text-center text-xs leading-5 text-[var(--color-booking-muted-ink)]">
      <ShieldCheck
        aria-hidden="true"
        className="shrink-0 text-[var(--color-success)]"
        size={15}
      />
      बुकिंगची माहिती सुरक्षितपणे जतन केली जाईल.
    </p>
  </aside>
);

const BookingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const {
    booking: savedBooking,
    poojaOptions,
    isLoadingPoojas,
    poojaError,
    isSubmitting,
    submitError,
    createdBooking,
  } = useSelector((state) => state.booking);
  const [selectedPujaId, setSelectedPujaId] = useState("");
  const [bookingDate, setBookingDate] = useState(
    savedBooking?.bookingDate || getLocalDate(),
  );
  const [bookingTime, setBookingTime] = useState(
    savedBooking?.bookingTime || "19:00",
  );
  const [address, setAddress] = useState(
    typeof savedBooking?.address === "string"
      ? savedBooking.address
      : savedBooking?.address?.fullAddress || "",
  );
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (poojaOptions.length === 0 && !isLoadingPoojas && !poojaError) {
      dispatch(fetchPoojaOptions());
    }
  }, [dispatch, isLoadingPoojas, poojaError, poojaOptions.length]);

  const selectedPooja = useMemo(
    () => poojaOptions.find((pooja) => pooja._id === selectedPujaId) || null,
    [poojaOptions, selectedPujaId],
  );

  useEffect(() => {
    if (!selectedPujaId && poojaOptions.length > 0) {
      const savedPooja = poojaOptions.find(
        (pooja) =>
          pooja._id === savedBooking?.poojaId ||
          pooja._id === savedBooking?.puja,
      );
      setSelectedPujaId(savedPooja?._id || poojaOptions[0]._id);
    }
  }, [poojaOptions, savedBooking?.poojaId, savedBooking?.puja, selectedPujaId]);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormError("");
    if (name === "bookingDate") setBookingDate(value);
    if (name === "bookingTime") setBookingTime(value);
    if (name === "address") setAddress(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");

    const userId = user?.id || user?._id;
    if (!userId) {
      navigate("/login", { replace: true });
      return;
    }
    if (!selectedPooja) {
      setFormError("कृपया उपलब्ध पूजांपैकी एक पूजा निवडा.");
      return;
    }

    try {
      const response = await dispatch(
        bookPooja({
        userId,
        poojaId: selectedPooja._id,
        bookingDate: toApiDate(bookingDate),
        bookingTime: toApiTime(bookingTime),
        paymentMethod: "COD",
        paymentAmount: selectedPooja.basePrice,
        address: { fullAddress: address.trim() },
        }),
      ).unwrap();
      toast.success(response.message || "Booking created successfully");
    } catch (error) {
      toast.error(
        typeof error === "string"
        ? error
        : error?.message || "Failed to create booking",
      );
    }
  };

  return (
    <main className="bg-[var(--color-booking-bg)]">
      <div className="container-app py-8 sm:py-10">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex items-center gap-2 text-xs font-medium text-[var(--color-booking-muted-ink)] sm:text-sm"
        >
          <Link className="hover:text-[var(--color-primary-dark)]" to="/">
            मुख्यपृष्ठ
          </Link>
          <span aria-hidden="true">/</span>
          <span>पूजा सेवा</span>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="text-[var(--color-primary-dark)]">
            पूजा बुकिंग
          </span>
        </nav>

        <header className="mb-7">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[var(--color-booking-badge)] px-3 py-1.5 text-xs font-semibold text-[var(--color-secondary)]">
            <Flame aria-hidden="true" size={14} />
            वेदोक्त विधी अधिष्ठान
          </div>
          <h1 className="max-w-3xl text-3xl font-bold leading-tight text-[var(--color-booking-ink)] sm:text-4xl">
            आपल्या पूजेची बुकिंग करा
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-booking-muted-ink)] sm:text-base">
            पूजा निवडा, तारीख व वेळ ठरवा आणि बुकिंगची माहिती भरा.
          </p>
        </header>

        <div className="mb-6">
          <ProgressSteps />
        </div>

        {poojaError && (
          <div
            className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--color-error)] bg-[var(--color-error-light)] p-4 text-sm text-[var(--color-error)]"
            role="alert"
          >
            <span>{poojaError}</span>
            <button
              className="font-semibold underline"
              onClick={() => dispatch(fetchPoojaOptions())}
              type="button"
            >
              पुन्हा प्रयत्न करा
            </button>
          </div>
        )}

        {createdBooking && (
          <div
            className="mb-5 rounded-xl border border-[var(--color-success)] bg-[var(--color-success-light)] p-4 text-sm text-[var(--color-success)]"
            role="status"
          >
            <p className="font-bold">बुकिंग यशस्वीरित्या नोंदवली!</p>
            <p className="mt-1">
              बुकिंग क्रमांक: {createdBooking.bookingNumber || createdBooking._id}
            </p>
          </div>
        )}

        <form id="booking-form" onSubmit={handleSubmit}>
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
            <div className="space-y-5">
              <PujaSelection
                disabled={isSubmitting}
                onSelect={setSelectedPujaId}
                options={poojaOptions}
                selectedPujaId={selectedPujaId}
              />
              {isLoadingPoojas && (
                <p
                  className="text-center text-sm text-[var(--color-booking-muted-ink)]"
                  role="status"
                >
                  पूजा पर्याय लोड होत आहेत...
                </p>
              )}
              <ScheduleSelection
                bookingDate={bookingDate}
                bookingTime={bookingTime}
                onChange={handleFormChange}
              />
              <AddressDetails address={address} onChange={handleFormChange} />
              {(formError || submitError) && (
                <p
                  className="rounded-xl border border-[var(--color-error)] bg-[var(--color-error-light)] p-4 text-sm text-[var(--color-error)]"
                  role="alert"
                >
                  {formError || submitError}
                </p>
              )}
              <div className="flex items-start gap-3 rounded-xl border border-[var(--color-booking-border)] bg-[var(--color-booking-muted)] p-4">
                <BadgeCheck
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-[var(--color-success)]"
                  size={19}
                />
                <p className="text-sm leading-6 text-[var(--color-booking-muted-ink)]">
                  बुकिंगनंतर आपल्या खात्यातील नोंदणीकृत नाव आणि मोबाईल क्रमांक
                  बुकिंगसह जतन केला जाईल.
                </p>
              </div>
            </div>
            <BookingSummary
              bookingDate={bookingDate}
              bookingTime={bookingTime}
              isSubmitting={isSubmitting}
              pooja={selectedPooja}
            />
          </div>
        </form>
      </div>
    </main>
  );
};

export default BookingPage;
