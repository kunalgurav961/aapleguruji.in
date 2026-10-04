import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createAdminPooja } from "../../state/adminActions";

const initialForm = {
  name: "",
  category: "",
  basePrice: "",
  duration: "",
  description: "",
  images: [],
};

const AdminPoojas = ({ poojas }) => {
  const dispatch = useDispatch();
  const { isCreatingPooja, createPoojaError } = useSelector(
    (state) => state.admin,
  );
  const [form, setForm] = useState(initialForm);
  const [formError, setFormError] = useState("");
  const fileInputRef = useRef(null);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    const previews = form.images.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
    return () => previews.forEach((preview) => URL.revokeObjectURL(preview));
  }, [form.images]);

  const handleChange = (event) => {
    setFormError("");
    const { name, value, files } = event.target;
    const selectedImages = Array.from(files || []);
    if (
      name === "images" &&
      (selectedImages.length > 5 ||
        selectedImages.some(
          (image) =>
            image.size > 5 * 1024 * 1024 ||
            !["image/jpeg", "image/png", "image/webp"].includes(image.type),
        ))
    ) {
      setFormError(
        "Choose up to 5 JPG, PNG, or WebP images, each no larger than 5 MB.",
      );
      event.target.value = "";
      return;
    }
    setForm({
      ...form,
      [name]: name === "images" ? selectedImages : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("category", form.category);
      formData.append("basePrice", form.basePrice);
      formData.append("duration", form.duration);
      formData.append("description", form.description);
      form.images.forEach((image) => formData.append("images", image));

      const response = await dispatch(
        createAdminPooja(formData),
      ).unwrap();
      setForm(initialForm);
      if (fileInputRef.current) fileInputRef.current.value = "";
      toast.success(response.message);
    } catch (error) {
      setFormError(
        typeof error === "string"
          ? error
          : error?.message || "Unable to add puja.",
      );
    }
  };

  return (
    <div className="grid items-start gap-6 xl:grid-cols-[minmax(300px,.8fr)_minmax(0,1.2fr)]">
      <section className="rounded-2xl border border-[var(--color-booking-border)] bg-white p-5 shadow-[var(--shadow-booking-card)] sm:p-6">
        <h2 className="font-bold text-[var(--color-booking-ink)]">Add a puja</h2>
        <p className="mt-1 text-sm text-[var(--color-booking-muted-ink)]">
          New services are added to the puja catalogue.
        </p>
        <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
          <label className="block text-sm font-semibold text-[var(--color-booking-ink)]">
            Puja name *
            <input
              className="booking-input mt-2"
              maxLength={120}
              minLength={3}
              name="name"
              onChange={handleChange}
              required
              value={form.name}
            />
          </label>
          <label className="block text-sm font-semibold text-[var(--color-booking-ink)]">
            Base price (INR) *
            <input
              className="booking-input mt-2"
              min="0"
              name="basePrice"
              onChange={handleChange}
              required
              step="1"
              type="number"
              value={form.basePrice}
            />
          </label>
          <label className="block text-sm font-semibold text-[var(--color-booking-ink)]">
            Category
            <select
              className="booking-input mt-2"
              name="category"
              onChange={handleChange}
              value={form.category}
            >
              <option value="">Choose a category</option>
              <option>Griha &amp; Vastu</option>
              <option>Festivals &amp; Vrat</option>
              <option>Havans &amp; Yagnas</option>
              <option>Naming &amp; Sanskars</option>
              <option>Ancestral (Shraadh)</option>
            </select>
          </label>
          <label className="block text-sm font-semibold text-[var(--color-booking-ink)]">
            Duration (minutes)
            <input
              className="booking-input mt-2"
              max="1440"
              min="1"
              name="duration"
              onChange={handleChange}
              placeholder="Optional"
              type="number"
              value={form.duration}
            />
          </label>
          <label className="block text-sm font-semibold text-[var(--color-booking-ink)]">
            Description
            <textarea
              className="booking-input mt-2 min-h-24 resize-y"
              maxLength={2000}
              name="description"
              onChange={handleChange}
              rows={4}
              value={form.description}
            />
          </label>
          <label className="block text-sm font-semibold text-[var(--color-booking-ink)]">
            Puja images
            <input
              accept="image/jpeg,image/png,image/webp"
              className="booking-input mt-2 cursor-pointer file:mr-3 file:rounded-md file:border-0 file:bg-[var(--color-booking-muted)] file:px-3 file:py-2 file:text-sm file:font-semibold file:text-[var(--color-booking-ink)]"
              multiple
              name="images"
              onChange={handleChange}
              ref={fileInputRef}
              type="file"
            />
            <span className="mt-1 block text-xs font-normal text-[var(--color-booking-muted-ink)]">
              Up to 5 JPG, PNG, or WebP images, maximum 5 MB each.
            </span>
          </label>
          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {imagePreviews.map((preview, index) => (
                <img
                  alt={`Selected puja image ${index + 1}`}
                  className="h-20 w-full rounded-lg object-cover"
                  key={preview}
                  src={preview}
                />
              ))}
            </div>
          )}
          {(formError || createPoojaError) && (
            <p
              className="rounded-lg bg-[var(--color-error-light)] p-3 text-sm text-[var(--color-error)]"
              role="alert"
            >
              {formError || createPoojaError}
            </p>
          )}
          <button
            className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isCreatingPooja}
            type="submit"
          >
            {isCreatingPooja ? "Adding puja..." : "Add puja"}
          </button>
        </form>
      </section>

      <section className="overflow-hidden rounded-2xl border border-[var(--color-booking-border)] bg-white shadow-[var(--shadow-booking-card)]">
        <header className="border-b border-[var(--color-booking-border)] p-5">
          <h2 className="font-bold text-[var(--color-booking-ink)]">
            Active pujas
          </h2>
          <p className="mt-1 text-sm text-[var(--color-booking-muted-ink)]">
            {poojas.length} available in the booking catalogue
          </p>
        </header>
        {poojas.length === 0 ? (
          <p className="p-5 text-sm text-[var(--color-booking-muted-ink)]">
            No active pujas found.
          </p>
        ) : (
          <ul className="divide-y divide-[var(--color-booking-border)]">
            {poojas.map((pooja) => (
              <li
                className="flex items-center justify-between gap-4 p-5"
                key={pooja._id}
              >
                <div>
                  <p className="font-semibold text-[var(--color-booking-ink)]">
                    {pooja.name}
                  </p>
                  {pooja.duration && (
                    <p className="mt-1 text-xs text-[var(--color-booking-muted-ink)]">
                      {pooja.duration} minutes
                    </p>
                  )}
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  {pooja.images?.[0] && (
                    <img
                      alt={`${pooja.name} puja`}
                      className="h-12 w-16 rounded-md object-cover"
                      src={pooja.images[0]}
                    />
                  )}
                  <span className="font-bold text-[var(--color-primary-dark)]">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                      maximumFractionDigits: 0,
                    }).format(pooja.basePrice)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default AdminPoojas;
