import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  BadgeCheck,
  BriefcaseBusiness,
  Check,
  CircleUserRound,
  Mail,
  MapPin,
  Phone,
  Save,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { toast } from "react-toastify";
import { updateUserProfile } from "../../state/authActions";

const cities = [
  { value: "pune", label: "Pune" },
  { value: "mumbai", label: "Mumbai" },
  { value: "nashik", label: "Nashik" },
  { value: "nagpur", label: "Nagpur" },
  { value: "sambhajinagar", label: "Chhatrapati Sambhajinagar" },
  { value: "kolhapur", label: "Kolhapur" },
  { value: "satara", label: "Satara" },
  { value: "other", label: "Other" },
];

const vedicShakhas = [
  { value: "rigveda", label: "Rigveda (ऋग्वेद)" },
  { value: "yajurveda", label: "Yajurveda (शुक्ल / कृष्ण यजुर्वेद)" },
  { value: "samaveda", label: "Samaveda (सामवेद)" },
  { value: "atharvaveda", label: "Atharvaveda (अथर्ववेद)" },
];

const statusLabels = {
  not_applicable: "Devotee account",
  pending_review: "Application under review",
  approved: "Verified Guruji",
  rejected: "Application needs updates",
};

const ProfileField = ({ icon: Icon, label, error, children }) => (
  <label className="block">
    <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-[var(--color-booking-ink)]">
      <Icon aria-hidden="true" className="text-[var(--color-primary-dark)]" size={16} />
      {label}
    </span>
    {children}
    {error && (
      <span className="mt-1.5 block text-xs font-medium text-[var(--color-error)]" role="alert">
        {error}
      </span>
    )}
  </label>
);

const fieldClassName =
  "min-h-11 w-full rounded-xl border border-[var(--color-booking-border)] bg-white px-3.5 py-2.5 text-sm text-[var(--color-booking-ink)] outline-none transition placeholder:text-[var(--color-booking-muted-ink)] focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/10 disabled:cursor-not-allowed disabled:bg-[var(--color-booking-muted)]";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);
  const [form, setForm] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    setForm({
      fullName: user.fullName || "",
      mobileNumber: user.mobileNumber || "",
      city: user.city || "",
      whatsappUpdates: user.whatsappUpdates ?? true,
      vedicShakha: user.vedicShakha || "",
      experience: user.experience || "",
    });
  }, [user]);

  const updateField = (event) => {
    const { name, value, checked, type } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((current) => ({ ...current, [name]: undefined, form: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    setIsSaving(true);

    try {
      const response = await dispatch(updateUserProfile(form)).unwrap();
      toast.success(response.data.message || "Profile updated successfully.");
    } catch (error) {
      const fieldErrors = Object.fromEntries(
        (error?.errors || []).map(({ path, message }) => [path, message]),
      );
      setErrors({
        ...fieldErrors,
        form: error?.message || "Unable to save your profile. Please try again.",
      });
      toast.error(error?.message || "Unable to save your profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!form || isLoading) {
    return (
      <main className="grid min-h-[50vh] place-items-center bg-[var(--color-booking-bg)] p-6">
        <p className="text-sm font-semibold text-[var(--color-booking-muted-ink)]" role="status">
          तुमची प्रोफाइल उघडत आहे...
        </p>
      </main>
    );
  }

  const cityLabel = cities.find((city) => city.value === user.city)?.label || user.city;
  const roleLabel =
    user.role === "pandit"
      ? "Guruji"
      : user.role === "admin"
        ? "Administrator"
        : "Devotee";
  const memberSince = user.createdAt
    ? new Intl.DateTimeFormat("en-IN", {
        month: "long",
        year: "numeric",
      }).format(new Date(user.createdAt))
    : "—";
  const panditStatus =
    statusLabels[user.panditApplicationStatus] || "Application status unavailable";

  return (
    <main className="min-h-[calc(100vh-100px)] bg-[var(--color-booking-bg)]">
      <div className="container-app py-8 sm:py-10">
        <Link
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-booking-muted-ink)] transition hover:text-[var(--color-primary-dark)]"
          to={user.role === "pandit" ? "/pandit" : user.role === "admin" ? "/admin" : "/home"}
        >
          <ArrowLeft aria-hidden="true" size={16} />
          खात्यावर परत जा
        </Link>

        <header className="mb-7">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-[var(--color-booking-badge)] px-3 py-1.5 text-xs font-semibold text-[var(--color-secondary)]">
            <CircleUserRound aria-hidden="true" size={15} />
            खाते व्यवस्थापन
          </span>
          <h1 className="text-3xl font-bold leading-tight text-[var(--color-booking-ink)] sm:text-4xl">
            माझी प्रोफाइल
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-booking-muted-ink)] sm:text-base">
            तुमची माहिती तपासा आणि आवश्यक तपशील कधीही अद्ययावत करा.
          </p>
        </header>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(250px,0.75fr)_minmax(0,1.6fr)]">
          <aside className="overflow-hidden rounded-2xl border border-[var(--color-booking-border)] bg-white shadow-[var(--shadow-booking-card)]">
            <div className="h-24 bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary)]" />
            <div className="px-5 pb-5">
              <div className="-mt-10 mb-4 grid h-20 w-20 place-items-center rounded-2xl border-4 border-white bg-[var(--color-booking-badge)] text-2xl font-bold text-[var(--color-primary-dark)] shadow-sm">
                {user.fullName?.trim()?.charAt(0)?.toUpperCase() || <UserRound size={28} />}
              </div>
              <h2 className="text-xl font-bold text-[var(--color-booking-ink)]">
                {user.fullName}
              </h2>
              <p className="mt-1 text-sm text-[var(--color-booking-muted-ink)]">{user.email}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[var(--color-booking-muted)] px-3 py-1 text-xs font-bold capitalize text-[var(--color-primary-dark)]">
                <BadgeCheck aria-hidden="true" size={14} />
                {roleLabel}
              </span>

              <dl className="mt-6 space-y-4 border-t border-[var(--color-booking-border)] pt-5">
                <div className="flex items-start gap-3">
                  <MapPin aria-hidden="true" className="mt-0.5 text-[var(--color-primary-dark)]" size={17} />
                  <div>
                    <dt className="text-xs text-[var(--color-booking-muted-ink)]">शहर</dt>
                    <dd className="mt-1 text-sm font-semibold text-[var(--color-booking-ink)]">
                      {cityLabel || "—"}
                    </dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck aria-hidden="true" className="mt-0.5 text-[var(--color-primary-dark)]" size={17} />
                  <div>
                    <dt className="text-xs text-[var(--color-booking-muted-ink)]">सदस्यत्व</dt>
                    <dd className="mt-1 text-sm font-semibold text-[var(--color-booking-ink)]">
                      {memberSince}
                    </dd>
                  </div>
                </div>
                {user.role === "pandit" && (
                  <div className="flex items-start gap-3">
                    <BriefcaseBusiness
                      aria-hidden="true"
                      className="mt-0.5 text-[var(--color-primary-dark)]"
                      size={17}
                    />
                    <div>
                      <dt className="text-xs text-[var(--color-booking-muted-ink)]">
                        गुरुजी अर्ज स्थिती
                      </dt>
                      <dd className="mt-1 text-sm font-semibold text-[var(--color-booking-ink)]">
                        {panditStatus}
                      </dd>
                    </div>
                  </div>
                )}
              </dl>
            </div>
          </aside>

          <section className="rounded-2xl border border-[var(--color-booking-border)] bg-white p-5 shadow-[var(--shadow-booking-card)] sm:p-7">
            <div className="mb-6 border-b border-[var(--color-booking-border)] pb-5">
              <h2 className="text-lg font-bold text-[var(--color-booking-ink)]">
                वैयक्तिक माहिती
              </h2>
              <p className="mt-1 text-sm leading-6 text-[var(--color-booking-muted-ink)]">
                तुमच्या पूजा बुकिंगसाठी वापरली जाणारी माहिती अद्ययावत ठेवा.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {errors.form && (
                <p
                  className="rounded-xl border border-[var(--color-error)] bg-[var(--color-error-light)] p-3 text-sm text-[var(--color-error)]"
                  role="alert"
                >
                  {errors.form}
                </p>
              )}
              <ProfileField error={errors.fullName} icon={UserRound} label="पूर्ण नाव">
                <input
                  autoComplete="name"
                  className={fieldClassName}
                  maxLength={255}
                  minLength={3}
                  name="fullName"
                  onChange={updateField}
                  required
                  value={form.fullName}
                />
              </ProfileField>

              <div className="grid gap-5 sm:grid-cols-2">
                <ProfileField error={errors.mobileNumber} icon={Phone} label="मोबाईल नंबर">
                  <input
                    autoComplete="tel-national"
                    className={fieldClassName}
                    inputMode="numeric"
                    maxLength={10}
                    minLength={10}
                    name="mobileNumber"
                    onChange={updateField}
                    pattern="[6-9][0-9]{9}"
                    required
                    type="tel"
                    value={form.mobileNumber}
                  />
                </ProfileField>
                <ProfileField error={errors.city} icon={MapPin} label="शहर">
                  <select
                    className={fieldClassName}
                    name="city"
                    onChange={updateField}
                    required
                    value={form.city}
                  >
                    <option disabled value="">शहर निवडा</option>
                    {cities.map((city) => (
                      <option key={city.value} value={city.value}>{city.label}</option>
                    ))}
                  </select>
                </ProfileField>
              </div>

              <ProfileField icon={Mail} label="ईमेल (बदलता येणार नाही)">
                <input
                  autoComplete="email"
                  className={fieldClassName}
                  readOnly
                  type="email"
                  value={user.email || ""}
                />
                <span className="mt-1.5 block text-xs text-[var(--color-booking-muted-ink)]">
                  खात्याची सुरक्षितता राखण्यासाठी ईमेल पत्ता सध्या बदलता येत नाही.
                </span>
              </ProfileField>

              {user.role === "pandit" && (
                <>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <ProfileField
                      error={errors.vedicShakha}
                      icon={BadgeCheck}
                      label="वेद शाखा"
                    >
                      <select
                        className={fieldClassName}
                        name="vedicShakha"
                        onChange={updateField}
                        required
                        value={form.vedicShakha}
                      >
                        <option disabled value="">वेद शाखा निवडा</option>
                        {vedicShakhas.map((shakha) => (
                          <option key={shakha.value} value={shakha.value}>
                            {shakha.label}
                          </option>
                        ))}
                      </select>
                    </ProfileField>
                    <ProfileField error={errors.experience} icon={BriefcaseBusiness} label="अनुभव">
                      <input
                        className={fieldClassName}
                        maxLength={100}
                        name="experience"
                        onChange={updateField}
                        placeholder="उदा. ५ वर्षे"
                        value={form.experience}
                      />
                    </ProfileField>
                  </div>
                  <div className="rounded-xl bg-[var(--color-booking-muted)] p-4">
                    <p className="text-xs font-semibold text-[var(--color-booking-muted-ink)]">
                      गुरुजी अर्ज स्थिती
                    </p>
                    <p className="mt-1 text-sm font-bold text-[var(--color-booking-ink)]">
                      {panditStatus}
                    </p>
                  </div>
                </>
              )}

              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-[var(--color-booking-border)] bg-[var(--color-booking-muted)] p-4">
                <input
                  checked={form.whatsappUpdates}
                  className="mt-0.5 h-4 w-4 accent-[var(--color-primary)]"
                  name="whatsappUpdates"
                  onChange={updateField}
                  type="checkbox"
                />
                <span>
                  <span className="block text-sm font-semibold text-[var(--color-booking-ink)]">
                    WhatsApp अपडेट्स मिळवा
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-[var(--color-booking-muted-ink)]">
                    बुकिंग आणि पूजेच्या माहितीसंबंधी उपयुक्त अपडेट्स पाठवण्यासाठी परवानगी.
                  </span>
                </span>
              </label>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--color-booking-border)] pt-5">
                <span className="inline-flex items-center gap-1.5 text-xs text-[var(--color-booking-muted-ink)]">
                  <Check aria-hidden="true" size={14} />
                  बदल सुरक्षितपणे जतन केले जातील.
                </span>
                <button
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[var(--color-primary-hover)] disabled:cursor-wait disabled:opacity-60"
                  disabled={isSaving}
                  type="submit"
                >
                  <Save aria-hidden="true" size={16} />
                  {isSaving ? "जतन होत आहे..." : "बदल जतन करा"}
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
