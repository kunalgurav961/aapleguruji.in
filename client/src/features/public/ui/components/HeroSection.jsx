import {
  ArrowRight,
  CalendarDays,
  ChevronDown,
  Languages,
  LockKeyhole,
  MapPin,
  Star,
  Utensils,
} from "lucide-react";
import { useHomeHook } from "../../hooks/useHomeHook";

const HeroSection = () => {
  const { handleSubmit, handleBook, register } = useHomeHook();
  return (
    <section
      id="home"
      className="hero-gradient relative isolate overflow-hidden font-sans pt-24 sm:pt-28"
    >
      <div className="pointer-events-none absolute left-1/2 top-[-280px] h-[620px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_50%_72%,rgba(255,220,207,.9),rgba(255,236,229,.5)_48%,transparent_74%)] blur-2xl" />

      <div className="w-full px-8 sm:px-5">
        <div className="grid lg:p-20 md:p-5 sm:p-2 w-full min-h-[calc(100vh-112px)] items-center gap-10 lg:grid-cols-[1.08fr_.92fr] lg:gap-12 lg:py-0">
          <div className="relative z-10">
            <div className="glass mb-7 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[.08em] text-deepMaroon sm:text-sm">
              <span className="text-base">🪔</span>
              <span>
                Maharashtra&apos;s most trusted spiritual platform • 50,000+
                blessings
              </span>
            </div>

            <h1 className="max-w-3xl font-[var(--font-heading)] text-5xl font-bold leading-[1.08] tracking-[-.02em] text-dark sm:text-6xl lg:text-[clamp(3.8rem,5.2vw,5.3rem)]">
              Bring Divine Blessings to Your Home with
              <span className="text-gradient block italic">
                Trusted Vedic Pandits
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#604d45] sm:text-xl">
              Experience authentic Vedic ceremonies performed by
              background-verified, pathshala-trained Gurujis. Complete, 100%
              consecrated samagri kits delivered fresh to your doorstep.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 rounded-lg bg-saffron px-7 py-4 font-semibold text-white shadow-lg shadow-orange-200 transition hover:bg-maroon"
              >
                Book a Puja
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-3 rounded-lg bg-[#e7edff] px-7 py-4 font-semibold text-deepMaroon transition hover:bg-[#dbe5ff]"
              >
                <Utensils className="h-5 w-5" />
                Explore Services
              </a>
            </div>

            <div className="mt-9 grid max-w-3xl gap-3 sm:grid-cols-3">
              <div className="rounded-lg bg-[#edf2ff] px-4 py-3 text-sm text-[#25324b]">
                <div className="flex items-center gap-2 font-semibold">
                  <span className="text-xl text-[#e49a00]">✥</span> 100%
                  Certified
                </div>
                <p className="pl-7 text-xs text-[#59647a]">Vedic Gurujis</p>
              </div>
              <div className="rounded-lg bg-[#edf2ff] px-4 py-3 text-sm text-[#25324b]">
                <div className="flex items-center gap-2 font-semibold">
                  <Star className="h-5 w-5 fill-[#e49a00] text-[#e49a00]" /> 4.9
                  / 5 Rating
                </div>
                <p className="pl-7 text-xs text-[#59647a]">12,400+ Families</p>
              </div>
              <div className="rounded-lg bg-[#edf2ff] px-4 py-3 text-sm text-[#25324b]">
                <div className="flex items-center gap-2 font-semibold">
                  <Utensils className="h-5 w-5 text-[#b95018]" /> Pure Samagri
                </div>
                <p className="pl-7 text-xs text-[#59647a]">100% Kit Included</p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[540px]">
            <div className="glass overflow-hidden rounded-2xl border-t-8 border-saffron bg-white/90 p-6 shadow-[0_20px_35px_rgba(28,36,58,.14)] sm:p-7">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-[var(--font-heading)] text-2xl font-bold text-dark sm:text-3xl">
                    🪔 Quick Pandit Booking
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-[#604d45]">
                    Check authentic Pandit availability and auspicious muhurats
                    in under 60 seconds.
                  </p>
                </div>
                <span className="shrink-0 rounded bg-cream px-3 py-1.5 text-xs font-semibold text-deepMaroon">
                  Instant Check
                </span>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit(handleBook)}>
                {/* Puja */}
                <label className="block text-sm font-semibold text-[#182338]">
                  <span className="mb-1.5 flex justify-between">
                    <span>Select Sacred Puja</span>
                    <span className="font-normal text-[#b95018]">
                      25+ Rituals
                    </span>
                  </span>

                  <span className="relative block">
                    <select
                      {...register("puja", {
                        required: "Please select a puja",
                      })}
                      className="w-full appearance-none rounded-lg border-0 bg-[#edf2ff] px-4 py-3 pr-10 font-normal text-[#25324b] outline-none ring-[#ff7415] focus:ring-2"
                    >
                      <option value="">Select a Puja</option>
                      <option value="griha-pravesh">
                        Griha Pravesh Puja (गृहप्रवेश पूजा)
                      </option>
                      <option value="satyanarayan">Satyanarayan Puja</option>
                      <option value="vastu-shanti">Vastu Shanti Puja</option>
                    </select>

                    <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-4 w-4 text-[#604d45]" />
                  </span>
                </label>

                {/* City + Language */}
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* City */}
                  <label className="text-sm font-semibold text-[#182338]">
                    <span className="mb-1.5 block">Your City</span>

                    <span className="relative block">
                      <input
                        {...register("city", {
                          required: "City is required",
                        })}
                        placeholder="Pune & PCMC"
                        className="w-full rounded-lg border-0 bg-[#edf2ff] px-4 py-3 pr-10 font-normal text-[#25324b] outline-none ring-[#ff7415] focus:ring-2"
                      />

                      <MapPin className="pointer-events-none absolute right-3 top-3.5 h-4 w-4 text-[#604d45]" />
                    </span>
                  </label>

                  {/* Language */}
                  <label className="text-sm font-semibold text-[#182338]">
                    <span className="mb-1.5 block">Language</span>

                    <span className="relative block">
                      <select
                        {...register("language", {
                          required: "Language is required",
                        })}
                        className="w-full appearance-none rounded-lg border-0 bg-[#edf2ff] px-4 py-3 pr-10 font-normal text-[#25324b] outline-none ring-[#ff7415] focus:ring-2"
                      >
                        <option value="">Select Language</option>
                        <option value="marathi">Marathi (मराठी)</option>
                        <option value="hindi">Hindi (हिंदी)</option>
                        <option value="english">English</option>
                      </select>

                      <Languages className="pointer-events-none absolute right-3 top-3.5 h-4 w-4 text-[#604d45]" />
                    </span>
                  </label>
                </div>

                {/* Date */}
                <label className="block text-sm font-semibold text-[#182338]">
                  <span className="mb-1.5 flex justify-between">
                    <span>Auspicious Date / Muhurat</span>

                    <span className="font-normal text-[#b95018]">
                      Free Panchang check
                    </span>
                  </span>

                  <span className="relative block">
                    <input
                      type="date"
                      {...register("date", {
                        required: "Please select a date",
                      })}
                      className="w-full rounded-lg border-0 bg-[#edf2ff] px-4 py-3 font-normal text-[#25324b] outline-none ring-[#ff7415] focus:ring-2"
                    />

                    <CalendarDays className="pointer-events-none absolute right-3 top-3.5 h-4 w-4 text-[#604d45]" />
                  </span>
                </label>

                {/* Samagri */}
                <label className="flex items-center gap-3 rounded-lg bg-[#edf2ff] px-4 py-3 text-sm text-[#182338]">
                  <input
                    type="checkbox"
                    {...register("includeSamagri")}
                    className="h-4 w-4 accent-[#b95018]"
                  />
                  <Utensils className="h-4 w-4 text-[#b95018]" />
                  Include 100% Consecrated Samagri Kit
                </label>

                {/* Submit */}
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#ff7415] px-4 py-4 font-semibold text-white shadow-lg shadow-orange-200 transition hover:bg-[#e85f05]"
                >
                  Check Pandit Availability
                  <CalendarDays className="h-5 w-5" />
                </button>
              </form>

              <p className="mt-4 flex items-center justify-center gap-2 text-xs text-[#604d45]">
                <LockKeyhole className="h-4 w-4 text-[#b95018]" />
                No advance payment required for verification
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
