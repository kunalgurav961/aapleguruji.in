import RegisterHeader from "./register/RegisterHeader";
import RoleSelector from "./register/RoleSelector";
import RegistrationBonus from "./register/RegistrationBonus";
import FormInput from "./register/FormInput";
import FormSelect from "./register/FormSelect";
import PasswordInput from "./register/PasswordInput";
import PanditFields from "./register/PanditFields";
import TermsAgreement from "./register/TermsAgreement";
import SocialSignup from "./register/SocialSignup";
import LoginPrompt from "./register/LoginPrompt";
import TrustPanel from "./register/TrustPanel";
import SupportCard from "./register/SupportCard";
import RegistrationBenefits from "./register/RegistrationBenefits";
import { useAuthHook } from "../../hooks/useAuthHook";

const RegisterPage = () => {
  let {
    role,
    setRole,
    password,
    register,
    errors,
    handleSubmit,
    formSubmit,
    watch,
    isSubmitting,
    cities,
    vedicShakhas,
    optionsError,
    registrationMessage,
  } = useAuthHook();

  return (
    <main className="min-h-screen bg-[var(--color-register-bg)] py-8 px-4">
      <div className="container-app">
        <RegisterHeader />

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2.1fr)_minmax(300px,1fr)] gap-8">
          {/* LEFT */}
          <section>
            <div className="relative overflow-hidden bg-[var(--color-surface-white)] rounded-[var(--radius-lg)] border border-[var(--color-border-warm)] shadow-[var(--shadow-modal)]">
              {/* subtle decoration */}
              <div className="absolute top-0 right-0 w-56 h-56 rounded-full bg-orange-100/30 blur-3xl pointer-events-none" />

              <div className="relative p-6 sm:p-8 lg:p-9">
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100 text-[var(--color-temple-brown)] text-xs font-semibold">
                    🪷 शुभ आरंभ • Join Aaple Guruji
                  </div>

                  <h1 className="mt-5 text-3xl sm:text-4xl font-bold tracking-tight">
                    Create Your Account{" "}
                    <span className="text-[var(--color-temple-brown)]">
                      / नवीन खाते तयार करा
                    </span>
                  </h1>

                  <p className="mt-3 text-sm sm:text-[15px] text-[var(--color-text-secondary)] max-w-2xl">
                    Book certified Vedic Pandits, schedule auspicious muhurats,
                    and receive ₹501 Dakshina credit on your first consecrated
                    ritual.
                  </p>
                </div>

                <RoleSelector
                  role={role}
                  onChange={setRole}
                  register={register}
                />

                <RegistrationBonus />

                {optionsError && (
                  <p role="alert" className="mb-4 rounded-[var(--radius)] bg-[var(--color-error-light)] p-3 text-sm text-[var(--color-error)]">
                    {optionsError}
                  </p>
                )}

                {registrationMessage && (
                  <p role="status" className="mb-4 rounded-[var(--radius)] bg-[var(--color-success-light)] p-3 text-sm text-[var(--color-success)]">
                    {registrationMessage}
                  </p>
                )}

                <form onSubmit={handleSubmit(formSubmit)} className="space-y-5">
                  <FormInput
                    label="Full Name / पूर्ण नाव"
                    name="fullName"
                    placeholder="तुमचे पूर्ण नाव"
                    icon="user"
                    register={register}
                    error={errors.fullName}
                    rules={{
                      required: "Full name is required",
                      minLength: {
                        value: 3,
                        message: "Minimum 3 characters",
                      },
                    }}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormInput
                      label="Mobile Number / मोबाईल नंबर"
                      name="mobileNumber"
                      type="tel"
                      placeholder="8888333430"
                      prefix="+91"
                      icon="smartphone"
                      register={register}
                      error={errors.mobileNumber}
                      rules={{
                        required: "Mobile number is required",
                        pattern: {
                          value: /^[6-9]\d{9}$/,
                          message: "Enter valid mobile number",
                        },
                      }}
                    />

                    <FormSelect
                      label="Sacred City / शहर"
                      name="city"
                      icon="map-pin"
                      register={register}
                      error={errors.city}
                      options={cities}
                      rules={{
                        required: "Please select your city",
                      }}
                    />
                  </div>

                  <FormInput
                    label="Email Address / ईमेल"
                    name="email"
                    type="email"
                    placeholder="devotee@aapleguruji.com"
                    icon="mail"
                    optional="Recommended for receipts & muhurat calendar"
                    register={register}
                    error={errors.email}
                      rules={{
                        required: "Email is required",
                        pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: "Enter valid email",
                      },
                    }}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <PasswordInput
                      name="password"
                      label="Password / पासवर्ड"
                      register={register}
                      watch={watch}
                      error={errors.password}
                      rules={{
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message: "Minimum 8 characters",
                        },
                      }}
                    />

                    <PasswordInput
                      name="confirmPassword"
                      label="Confirm Password / पुष्टी करा"
                      register={register}
                      watch={watch}
                      error={errors.confirmPassword}
                      rules={{
                        required: "Please confirm your password",
                        validate: (value) =>
                          value === password || "Passwords do not match",
                      }}
                    />
                  </div>

                  {role === "pandit" && (
                    <PanditFields
                      register={register}
                      errors={errors}
                      vedicShakhas={vedicShakhas}
                    />
                  )}

                  <TermsAgreement register={register} error={errors.terms} />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-[var(--radius)] bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold shadow-[var(--shadow-hover)] transition-all disabled:opacity-60"
                  >
                    {isSubmitting
                      ? "Creating Account..."
                      : role === "devotee"
                        ? "Create Free Account / खाते तयार करा"
                        : "Submit Pandit Application / अर्ज सादर करा"}

                    {!isSubmitting && <span>→</span>}
                  </button>
                </form>

                <SocialSignup />

                <LoginPrompt />
              </div>
            </div>
          </section>

          {/* RIGHT */}
          <aside className="space-y-5">
            <TrustPanel />
            <SupportCard />
            <RegistrationBenefits />
          </aside>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
