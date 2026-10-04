import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createAdminReview } from "../../state/adminActions";

const emptyForm = {
  name: "",
  city: "",
  poojaName: "",
  rating: "5",
  content: "",
};

const AdminReviews = ({ reviews }) => {
  const dispatch = useDispatch();
  const { isCreatingReview, createReviewError } = useSelector(
    (state) => state.admin,
  );
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");

  const handleChange = (event) => {
    setFormError("");
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");

    try {
      const response = await dispatch(
        createAdminReview({ ...form, rating: Number(form.rating) }),
      ).unwrap();
      setForm(emptyForm);
      toast.success(response.message);
    } catch (error) {
      setFormError(
        typeof error === "string"
          ? error
          : error?.message || "Unable to publish review.",
      );
    }
  };

  return (
    <div className="grid items-start gap-6 xl:grid-cols-[minmax(300px,.8fr)_minmax(0,1.2fr)]">
      <section className="rounded-2xl border border-[var(--color-booking-border)] bg-white p-5 shadow-[var(--shadow-booking-card)] sm:p-6">
        <h2 className="font-bold text-[var(--color-booking-ink)]">
          Publish a family review
        </h2>
        <p className="mt-1 text-sm text-[var(--color-booking-muted-ink)]">
          Published reviews appear on the public landing page.
        </p>
        <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
          <label className="block text-sm font-semibold text-[var(--color-booking-ink)]">
            Customer name *
            <input
              className="booking-input mt-2"
              maxLength={80}
              name="name"
              onChange={handleChange}
              required
              value={form.name}
            />
          </label>
          <label className="block text-sm font-semibold text-[var(--color-booking-ink)]">
            City
            <input
              className="booking-input mt-2"
              maxLength={100}
              name="city"
              onChange={handleChange}
              value={form.city}
            />
          </label>
          <label className="block text-sm font-semibold text-[var(--color-booking-ink)]">
            Puja *
            <input
              className="booking-input mt-2"
              maxLength={120}
              name="poojaName"
              onChange={handleChange}
              required
              value={form.poojaName}
            />
          </label>
          <label className="block text-sm font-semibold text-[var(--color-booking-ink)]">
            Rating *
            <select
              className="booking-input mt-2"
              name="rating"
              onChange={handleChange}
              value={form.rating}
            >
              {[5, 4, 3, 2, 1].map((rating) => (
                <option key={rating} value={rating}>
                  {rating} {rating === 1 ? "star" : "stars"}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-semibold text-[var(--color-booking-ink)]">
            Review *
            <textarea
              className="booking-input mt-2 min-h-28 resize-y"
              maxLength={1000}
              minLength={10}
              name="content"
              onChange={handleChange}
              required
              value={form.content}
            />
          </label>
          {(formError || createReviewError) && (
            <p
              className="rounded-lg bg-[var(--color-error-light)] p-3 text-sm text-[var(--color-error)]"
              role="alert"
            >
              {formError || createReviewError}
            </p>
          )}
          <button
            className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isCreatingReview}
            type="submit"
          >
            {isCreatingReview ? "Publishing…" : "Publish review"}
          </button>
        </form>
      </section>

      <section className="overflow-hidden rounded-2xl border border-[var(--color-booking-border)] bg-white shadow-[var(--shadow-booking-card)]">
        <header className="border-b border-[var(--color-booking-border)] p-5">
          <h2 className="font-bold text-[var(--color-booking-ink)]">
            Published reviews
          </h2>
          <p className="mt-1 text-sm text-[var(--color-booking-muted-ink)]">
            {reviews.length} reviews shown on the landing page
          </p>
        </header>
        {reviews.length === 0 ? (
          <p className="p-5 text-sm text-[var(--color-booking-muted-ink)]">
            No reviews have been published yet.
          </p>
        ) : (
          <ul className="divide-y divide-[var(--color-booking-border)]">
            {reviews.map((review) => (
              <li className="p-5" key={review._id}>
                <p className="text-sm leading-6 text-[var(--color-booking-muted-ink)]">
                  “{review.content}”
                </p>
                <p className="mt-3 text-sm font-semibold text-[var(--color-booking-ink)]">
                  {review.name}
                  {review.city ? ` · ${review.city}` : ""}
                </p>
                <p className="mt-1 text-xs text-[var(--color-booking-muted-ink)]">
                  {review.poojaName} · {review.rating}/5 stars
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default AdminReviews;
