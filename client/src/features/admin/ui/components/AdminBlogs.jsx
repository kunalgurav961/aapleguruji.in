import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Eye, EyeOff, FileVideo2, Plus, Upload } from "lucide-react";
import { toast } from "react-toastify";
import {
  createAdminBlog,
  updateAdminBlogStatus,
} from "../../state/adminActions";

const initialForm = {
  title: "",
  category: "",
  excerpt: "",
  content: "",
  video: null,
  coverImage: null,
  isPublished: true,
};

const formatDate = (value) =>
  new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));

const AdminBlogs = ({ blogs }) => {
  const dispatch = useDispatch();
  const { isCreatingBlog, createBlogError } = useSelector(
    (state) => state.admin,
  );
  const [form, setForm] = useState(initialForm);
  const [formError, setFormError] = useState("");
  const [mediaPreviews, setMediaPreviews] = useState({});
  const [updatingBlogId, setUpdatingBlogId] = useState(null);
  const videoInputRef = useRef(null);
  const coverInputRef = useRef(null);

  useEffect(() => {
    const previews = {
      video: form.video ? URL.createObjectURL(form.video) : "",
      coverImage: form.coverImage ? URL.createObjectURL(form.coverImage) : "",
    };
    setMediaPreviews(previews);
    return () => {
      Object.values(previews).forEach((preview) => {
        if (preview) URL.revokeObjectURL(preview);
      });
    };
  }, [form.video, form.coverImage]);

  const handleChange = (event) => {
    setFormError("");
    const { name, value, files, checked, type } = event.target;
    if (name === "video" || name === "coverImage") {
      const file = files?.[0] || null;
      const isVideo = name === "video";
      const supportedTypes = isVideo
        ? ["video/mp4", "video/webm", "video/quicktime"]
        : ["image/jpeg", "image/png", "image/webp"];
      const maxSize = isVideo ? 50 * 1024 * 1024 : 5 * 1024 * 1024;
      if (
        file &&
        (file.size > maxSize || !supportedTypes.includes(file.type))
      ) {
        setFormError(
          isVideo
            ? "Choose an MP4, WebM, or MOV video up to 50 MB."
            : "Choose a JPG, PNG, or WebP cover image up to 5 MB.",
        );
        event.target.value = "";
        return;
      }
      setForm((current) => ({ ...current, [name]: file }));
      return;
    }
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("category", form.category);
    formData.append("excerpt", form.excerpt);
    formData.append("content", form.content);
    formData.append("isPublished", String(form.isPublished));
    if (form.video) formData.append("video", form.video);
    if (form.coverImage) formData.append("coverImage", form.coverImage);

    try {
      const response = await dispatch(createAdminBlog(formData)).unwrap();
      setForm(initialForm);
      if (videoInputRef.current) videoInputRef.current.value = "";
      if (coverInputRef.current) coverInputRef.current.value = "";
      toast.success(response.message);
    } catch (error) {
      setFormError(
        typeof error === "string"
          ? error
          : error?.message || "Unable to save the blog article.",
      );
    }
  };

  const handlePublishChange = async (blog) => {
    setUpdatingBlogId(blog._id);
    try {
      const response = await dispatch(
        updateAdminBlogStatus({
          blogId: blog._id,
          isPublished: !blog.isPublished,
        }),
      ).unwrap();
      toast.success(response.message);
    } catch (error) {
      toast.error(
        typeof error === "string" ? error : "Unable to update blog status.",
      );
    } finally {
      setUpdatingBlogId(null);
    }
  };

  return (
    <div className="grid items-start gap-6 xl:grid-cols-[minmax(330px,.85fr)_minmax(0,1.15fr)]">
      <section className="rounded-2xl border border-[var(--color-booking-border)] bg-white p-5 shadow-[var(--shadow-booking-card)] sm:p-6">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-booking-muted)] text-[var(--color-primary-dark)]">
            <FileVideo2 aria-hidden="true" size={20} />
          </span>
          <div>
            <h2 className="font-bold text-[var(--color-booking-ink)]">
              Create a blog article
            </h2>
            <p className="mt-1 text-sm text-[var(--color-booking-muted-ink)]">
              Add an article with a video, then publish it to the public journal.
            </p>
          </div>
        </div>

        <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
          <label className="block text-sm font-semibold text-[var(--color-booking-ink)]">
            Article title *
            <input
              className="booking-input mt-2"
              maxLength={160}
              minLength={5}
              name="title"
              onChange={handleChange}
              required
              value={form.title}
            />
          </label>
          <label className="block text-sm font-semibold text-[var(--color-booking-ink)]">
            Category *
            <input
              className="booking-input mt-2"
              maxLength={60}
              name="category"
              onChange={handleChange}
              placeholder="Rituals & meaning"
              required
              value={form.category}
            />
          </label>
          <label className="block text-sm font-semibold text-[var(--color-booking-ink)]">
            Short description *
            <textarea
              className="booking-input mt-2 min-h-20 resize-y"
              maxLength={300}
              minLength={10}
              name="excerpt"
              onChange={handleChange}
              required
              rows={3}
              value={form.excerpt}
            />
            <span className="mt-1 block text-right text-xs font-normal text-[var(--color-booking-muted-ink)]">
              {form.excerpt.length}/300
            </span>
          </label>
          <label className="block text-sm font-semibold text-[var(--color-booking-ink)]">
            Article content *
            <textarea
              className="booking-input mt-2 min-h-40 resize-y"
              maxLength={20000}
              minLength={30}
              name="content"
              onChange={handleChange}
              required
              rows={7}
              value={form.content}
            />
            <span className="mt-1 block text-right text-xs font-normal text-[var(--color-booking-muted-ink)]">
              {form.content.length}/20,000
            </span>
          </label>
          <label className="block text-sm font-semibold text-[var(--color-booking-ink)]">
            Article video *
            <input
              accept="video/mp4,video/webm,video/quicktime"
              className="booking-input mt-2 cursor-pointer file:mr-3 file:rounded-md file:border-0 file:bg-[var(--color-booking-muted)] file:px-3 file:py-2 file:text-sm file:font-semibold file:text-[var(--color-booking-ink)]"
              name="video"
              onChange={handleChange}
              ref={videoInputRef}
              required
              type="file"
            />
            <span className="mt-1 block text-xs font-normal text-[var(--color-booking-muted-ink)]">
              MP4, WebM, or MOV; up to 50 MB.
            </span>
          </label>
          {mediaPreviews.video && (
            <video
              className="max-h-56 w-full rounded-xl bg-black"
              controls
              preload="metadata"
              src={mediaPreviews.video}
            >
              Your browser does not support video preview.
            </video>
          )}
          <label className="block text-sm font-semibold text-[var(--color-booking-ink)]">
            Cover image (optional)
            <input
              accept="image/jpeg,image/png,image/webp"
              className="booking-input mt-2 cursor-pointer file:mr-3 file:rounded-md file:border-0 file:bg-[var(--color-booking-muted)] file:px-3 file:py-2 file:text-sm file:font-semibold file:text-[var(--color-booking-ink)]"
              name="coverImage"
              onChange={handleChange}
              ref={coverInputRef}
              type="file"
            />
            <span className="mt-1 block text-xs font-normal text-[var(--color-booking-muted-ink)]">
              JPG, PNG, or WebP; up to 5 MB.
            </span>
          </label>
          {mediaPreviews.coverImage && (
            <img
              alt="Blog cover image preview"
              className="h-36 w-full rounded-xl object-cover"
              src={mediaPreviews.coverImage}
            />
          )}
          <label className="flex items-start gap-3 rounded-xl border border-[var(--color-booking-border)] bg-[var(--color-booking-muted)] p-3 text-sm">
            <input
              checked={form.isPublished}
              className="mt-1 accent-[var(--color-primary)]"
              name="isPublished"
              onChange={handleChange}
              type="checkbox"
            />
            <span>
              <strong className="block text-[var(--color-booking-ink)]">
                Publish immediately
              </strong>
              <span className="text-xs font-normal text-[var(--color-booking-muted-ink)]">
                Uncheck to save this article as a draft.
              </span>
            </span>
          </label>
          {(formError || createBlogError) && (
            <p
              className="rounded-lg bg-[var(--color-error-light)] p-3 text-sm text-[var(--color-error)]"
              role="alert"
            >
              {formError || createBlogError}
            </p>
          )}
          <button
            className="btn-primary inline-flex w-full items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isCreatingBlog}
            type="submit"
          >
            <Plus aria-hidden="true" size={16} />
            {isCreatingBlog
              ? "Saving article…"
              : form.isPublished
                ? "Publish article"
                : "Save draft"}
          </button>
        </form>
      </section>

      <section className="overflow-hidden rounded-2xl border border-[var(--color-booking-border)] bg-white shadow-[var(--shadow-booking-card)]">
        <header className="border-b border-[var(--color-booking-border)] p-5">
          <h2 className="font-bold text-[var(--color-booking-ink)]">
            Blog articles
          </h2>
          <p className="mt-1 text-sm text-[var(--color-booking-muted-ink)]">
            {blogs.length} article{blogs.length === 1 ? "" : "s"} ·{" "}
            {blogs.filter((blog) => blog.isPublished).length} published
          </p>
        </header>
        {blogs.length === 0 ? (
          <p className="p-5 text-sm text-[var(--color-booking-muted-ink)]">
            No blog articles yet. Add a video article to get started.
          </p>
        ) : (
          <ul className="divide-y divide-[var(--color-booking-border)]">
            {blogs.map((blog) => (
              <li
                className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
                key={blog._id}
              >
                <div className="flex min-w-0 items-center gap-3">
                  {blog.coverImageUrl ? (
                    <img
                      alt=""
                      className="h-16 w-20 shrink-0 rounded-lg object-cover"
                      src={blog.coverImageUrl}
                    />
                  ) : (
                    <span className="flex h-16 w-20 shrink-0 items-center justify-center rounded-lg bg-[var(--color-booking-muted)] text-[var(--color-primary-dark)]">
                      <FileVideo2 aria-hidden="true" size={23} />
                    </span>
                  )}
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-[var(--color-booking-ink)]">
                      {blog.title}
                    </p>
                    <p className="mt-1 text-xs text-[var(--color-booking-muted-ink)]">
                      {blog.category} · {formatDate(blog.createdAt)}
                    </p>
                    <a
                      className="mt-1 inline-block text-xs font-semibold text-[var(--color-primary-dark)] hover:underline"
                      href={blog.videoUrl}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Preview video
                    </a>
                  </div>
                </div>
                <div className="flex shrink-0 items-center justify-between gap-3 sm:justify-end">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                      blog.isPublished
                        ? "bg-[var(--color-success-light)] text-[var(--color-success)]"
                        : "bg-[var(--color-warning-light)] text-[var(--color-warning)]"
                    }`}
                  >
                    {blog.isPublished ? "Published" : "Draft"}
                  </span>
                  <button
                    aria-label={`${blog.isPublished ? "Unpublish" : "Publish"} ${blog.title}`}
                    className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-[var(--color-booking-border)] px-3 text-xs font-semibold text-[var(--color-booking-ink)] hover:bg-[var(--color-booking-muted)] disabled:cursor-wait disabled:opacity-60"
                    disabled={updatingBlogId === blog._id}
                    onClick={() => handlePublishChange(blog)}
                    type="button"
                  >
                    {blog.isPublished ? (
                      <EyeOff aria-hidden="true" size={15} />
                    ) : (
                      <Eye aria-hidden="true" size={15} />
                    )}
                    {updatingBlogId === blog._id
                      ? "Updating…"
                      : blog.isPublished
                        ? "Unpublish"
                        : "Publish"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="flex items-center gap-2 border-t border-[var(--color-booking-border)] bg-[var(--color-booking-muted)] p-4 text-xs text-[var(--color-booking-muted-ink)]">
          <Upload aria-hidden="true" size={15} />
          Uploaded videos are limited to 50 MB.
        </div>
      </section>
    </div>
  );
};

export default AdminBlogs;
