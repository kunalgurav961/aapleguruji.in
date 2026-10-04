import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  ArrowLeft,
  BadgeCheck,
  Eye,
  EyeOff,
  Flame,
  GraduationCap,
  LockKeyhole,
  Mail,
  MessageCircle,
  ShieldCheck,
  Star,
  UserRound,
} from "lucide-react";
import { loginUser } from "../../state/authActions";
import "./AuthPages.css";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [role, setRole] = useState("devotee");
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (credentials) => {
    try {
      const response = await dispatch(loginUser(credentials)).unwrap();
      toast.success(response.message);
      navigate(response.data.user.role === "admin" ? "/admin" : "/home");
    } catch (error) {
      error.errors?.forEach(({ path, message }) =>
        setError(path, { type: "server", message }),
      );
      toast.error(error.message || "Unable to sign you in. Please try again.");
    }
  };

  return (
    <main className="auth-page auth-login">
      <div className="auth-atmosphere" aria-hidden="true" />
      <div className="auth-page__inner">
        <div className="auth-page__topbar">
          <Link to="/" className="auth-back-link">
            <span className="auth-back-link__icon"><ArrowLeft size={16} /></span>
            <span>Back to Home <span>/ मुख्यपृष्ठावर जा</span></span>
          </Link>
          <span className="auth-muhurat">
            <span className="auth-muhurat__dot" />
            Shubh Muhurat Active
            <Flame size={14} />
          </span>
        </div>

        <section className="auth-login__card" aria-label="Sign in to Aaple Guruji">
          <aside className="auth-login__story">
            <div className="auth-login__story-copy">
              <span className="auth-login__tradition">
                <Flame size={15} fill="currentColor" />
                सनातन वैदिक परंपरा
              </span>
              <h2>पवित्र संकल्प आणि शास्त्रोक्त पूजा विधींचे डिजिटल दालन</h2>
              <p>
                Authentic, certified Vedic Gurujis curated for your home
                ceremonies, Griha Pravesh, Satyanarayan Katha, and Navgrah
                Shanti rituals.
              </p>
            </div>

            <div className="auth-login__image">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZ_HIoLTI6-W8kplMi1gDJSS0Ota7tRn8IdAivVpsuDeVYH6K-lG0WfNvYOd_F7z6iT2FCjj0Em34vPGhmkLag4b7GukzmDuEmtzhKlL0ieOef8DIVq5hF3Bq216R3aGl-0bn_mp3Sg356javV_vknzBbNuLhG_hZjGdlzH4zOZM0ySSX6UAMqprTvqE2Sk3gTrCzwukI586nW7Fqz1A8g-9NQ8tZw539a-k2x0NNWbHAVXm2kIHYk"
                alt="A sacred Vedic havan ceremony"
              />
              <div className="auth-login__image-caption">
                <BadgeCheck size={18} />
                100% Shastra-Pramaan Certified Gurujis
              </div>
            </div>

            <blockquote className="auth-login__testimonial">
              <div className="auth-login__rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={14} fill="currentColor" />
                ))}
                <strong>4.9 / 5.0</strong>
              </div>
              <p>
                “आमच्या नवीन वास्तुशांतीसाठी योग्य गुरुजी आणि वेळेत संपूर्ण पूजा
                साहित्य मिळाले. मनःशांती लाभली!”
              </p>
              <cite>— डॉ. अमोल व मानसी जोशी, पुणे</cite>
            </blockquote>
          </aside>

          <div className="auth-login__form-panel">
            <header className="auth-login__header">
              <div className="auth-login__brand">
                <span className="auth-login__brand-mark"><Flame size={21} /></span>
                <span>
                  <strong>आपले गुरुजी</strong>
                  <small>Aaple Guruji Vedic Services</small>
                </span>
              </div>
              <span className="auth-login__welcome">
                शुभ आरंभ <span>•</span> Welcome Back
              </span>
              <h1>Log In to Your {role === "pandit" ? "Pandit" : "Devotee"} Account</h1>
              <p>
                आपल्या खात्यात प्रवेश करा • Access your booked Vedic Pujas,
                verified Pandits, and Muhurat schedules.
              </p>
            </header>

            <div className="auth-role-switch" aria-label="Choose account type">
              <button
                type="button"
                aria-pressed={role === "devotee"}
                className={role === "devotee" ? "is-active" : ""}
                onClick={() => setRole("devotee")}
              >
                <UserRound size={17} />
                Devotee / यजमान
              </button>
              <button
                type="button"
                aria-pressed={role === "pandit"}
                className={role === "pandit" ? "is-active" : ""}
                onClick={() => setRole("pandit")}
              >
                <GraduationCap size={17} />
                Verified Pandit / गुरुजी
              </button>
            </div>

            {role === "pandit" && (
              <div className="auth-login__notice" role="status">
                <BadgeCheck size={17} />
                गुरुजी पोर्टल: कृपया आपल्या नोंदणीकृत ईमेल पत्त्याने प्रवेश करा.
              </div>
            )}

            <form
              className="auth-login__form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <label className="auth-field" htmlFor="login-email">
                <span>Email Address / ईमेल</span>
                <span className="auth-field__control">
                  <Mail size={18} />
                  <input
                    id="login-email"
                    type="email"
                    autoComplete="email"
                    placeholder="devotee@aapleguruji.com"
                    aria-invalid={Boolean(errors.email)}
                    {...register("email", {
                      required: "Email is required.",
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: "Enter a valid email address.",
                      },
                    })}
                  />
                </span>
                {errors.email && (
                  <small role="alert">{errors.email.message}</small>
                )}
              </label>

              <label className="auth-field" htmlFor="login-password">
                <span>Password / पासवर्ड</span>
                <span className="auth-field__control">
                  <LockKeyhole size={18} />
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••••••"
                    aria-invalid={Boolean(errors.password)}
                    {...register("password", {
                      required: "Password is required.",
                    })}
                  />
                  <button
                    className="auth-field__toggle"
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((visible) => !visible)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </span>
                {errors.password && (
                  <small role="alert">{errors.password.message}</small>
                )}
              </label>

              <button
                className="auth-login__submit"
                type="submit"
                disabled={isSubmitting}
              >
                <ShieldCheck size={18} />
                {isSubmitting ? "Signing in..." : "Log In / प्रवेश करा"}
              </button>
            </form>

            <button
              className="auth-login__whatsapp"
              type="button"
              onClick={() => toast.info("WhatsApp OTP login is coming soon.")}
            >
              <MessageCircle size={18} />
              Log in with WhatsApp / Mobile OTP (जलद प्रवेश)
            </button>

            <div className="auth-login__divider"><span>or continue with</span></div>
            <button
              className="auth-login__google"
              type="button"
              onClick={() => toast.info("Google sign-in is coming soon.")}
            >
              <span className="auth-login__google-mark">G</span>
              Continue with Google
            </button>

            <p className="auth-login__register">
              New to Aaple Guruji?{" "}
              <Link to="/register">Create an account <span>↗</span></Link>
            </p>

            <div className="auth-login__security">
              <span><ShieldCheck size={14} /> 256-bit Secure</span>
              <span><BadgeCheck size={14} /> Verified Gurujis</span>
              <span><Flame size={14} /> Vedic Authenticity</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default LoginPage;
