import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { LockKeyhole, Mail } from "lucide-react";
import { loginUser } from "../../state/authActions";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (credentials) => {
    try {
      const response = await dispatch(loginUser(credentials)).unwrap();
      toast.success(response.message);
      navigate(
        response.data.user.role === "admin" ? "/admin" : "/home",
      );
    } catch (error) {
      error.errors?.forEach(({ path, message }) => setError(path, { type: "server", message }));
      toast.error(error.message || "Unable to sign you in. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-[var(--color-register-bg)] px-4 py-12">
      <section className="card mx-auto w-full max-w-md p-6 sm:p-8">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold text-[var(--color-primary)]">🪔 Aaple Guruji</p>
          <h1 className="mt-2 text-3xl">Welcome Back</h1>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">Sign in to manage your sacred bookings.</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
          <label className="block text-sm font-semibold">
            Email address
            <span className="relative mt-2 block">
              <Mail className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-[var(--color-text-muted)]" />
              <input type="email" autoComplete="email" className="input pl-10" placeholder="devotee@aapleguruji.com" {...register("email", { required: "Email is required.", pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email address." } })} />
            </span>
            {errors.email && <span className="mt-1 block text-xs text-[var(--color-error)]">{errors.email.message}</span>}
          </label>

          <label className="block text-sm font-semibold">
            Password
            <span className="relative mt-2 block">
              <LockKeyhole className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-[var(--color-text-muted)]" />
              <input type="password" autoComplete="current-password" className="input pl-10" placeholder="••••••••" {...register("password", { required: "Password is required." })} />
            </span>
            {errors.password && <span className="mt-1 block text-xs text-[var(--color-error)]">{errors.password.message}</span>}
          </label>

          <button className="btn-primary w-full border-0" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Log In / प्रवेश करा"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[var(--color-text-secondary)]">
          New to Aaple Guruji? <Link className="font-bold text-[var(--color-primary-dark)] hover:underline" to="/register">Create an account</Link>
        </p>
      </section>
    </main>
  );
};

export default LoginPage;
