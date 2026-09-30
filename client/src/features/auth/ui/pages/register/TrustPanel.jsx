import {
  Flame,
  BadgeCheck,
  Leaf,
  CalendarCheck,
  IndianRupee,
  Star,
} from "lucide-react";

const promises = [
  {
    icon: BadgeCheck,
    title: "100% Certified Gurujis",
    description:
      "Every pandit is formally trained at certified Sanskrit Ved Pathshalas with background-verified ancestry.",
  },
  {
    icon: Leaf,
    title: "Sacred & Pure Samagri",
    description:
      "Unadulterated cow ghee, natural herbs, consecrated dravyas, and organic flowers delivered to your door.",
  },
  {
    icon: CalendarCheck,
    title: "Precise Muhurat Calculation",
    description:
      "Automated astrological alignment for Griha Pravesh, Vivah, Satyanarayan, and Nav Chandi Havans.",
  },
  {
    icon: IndianRupee,
    title: "Transparent Fixed Dakshina",
    description:
      "No sudden demands or hidden charges. Pay safely via UPI or card with zero ambiguity.",
  },
];

const TrustPanel = () => {
  return (
    <div className="bg-[#edf3ff] rounded-[var(--radius-lg)] p-6 shadow-[var(--shadow-card)]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-[var(--color-primary-dark)]">
          <Flame size={18} />
        </div>

        <div>
          <h2 className="text-xl font-bold">The Aaple Guruji Promise</h2>

          <p className="text-[10px] text-[var(--color-text-secondary)]">
            शुद्ध, प्रामाणिक आणि वैदिक परंपरेनुसार
          </p>
        </div>
      </div>

      {/* Promise list */}
      <div className="space-y-5">
        {promises.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.title} className="flex items-start gap-3">
              <div className="w-8 h-8 shrink-0 rounded-lg bg-white flex items-center justify-center text-[var(--color-primary-dark)] shadow-sm">
                <Icon size={16} />
              </div>

              <div>
                <h3 className="text-xs font-bold text-[var(--color-text-primary)]">
                  {item.title}
                </h3>

                <p className="text-[10px] leading-[1.45] text-[var(--color-text-secondary)]">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Rating */}
      <div className="mt-6 bg-white rounded-[var(--radius-md)] p-3 flex items-center gap-3">
        <div className="flex -space-x-2">
          {["RK", "MJ", "SD"].map((name) => (
            <div
              key={name}
              className="w-8 h-8 rounded-full bg-orange-100 border-2 border-white flex items-center justify-center text-[9px] font-bold text-[var(--color-primary-dark)]"
            >
              {name}
            </div>
          ))}
        </div>

        <div>
          <div className="flex items-center gap-1">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={12}
                  fill="currentColor"
                  className="text-[var(--color-divine-gold)]"
                />
              ))}
            </div>

            <span className="text-[11px] font-bold">4.9/5</span>
          </div>

          <p className="text-[9px] text-[var(--color-text-secondary)]">
            Over 18,500+ Pujas performed peacefully
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrustPanel;
