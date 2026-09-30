import { BadgeCheck, Leaf, MessageSquareCheck } from "lucide-react";

const benefits = [
  {
    icon: BadgeCheck,
    title: "Verified Vedic Gurujis",
    description: "Rigorous scripture & background checks",
  },
  {
    icon: Leaf,
    title: "100% Pure Samagri",
    description: "Lab-tested ghee and authentic hawan herbs",
  },
  {
    icon: MessageSquareCheck,
    title: "Zero Spam Guarantee",
    description: "Only respectful muhurat notifications",
  },
];

const RegistrationBenefits = () => {
  return (
    <div className="grid grid-cols-1 gap-3">
      {benefits.map((benefit) => {
        const Icon = benefit.icon;

        return (
          <div key={benefit.title} className="flex items-center gap-3">
            <Icon
              size={21}
              className="shrink-0 text-[var(--color-primary-dark)]"
            />

            <div>
              <h4 className="text-[11px] font-bold text-[var(--color-text-primary)]">
                {benefit.title}
              </h4>

              <p className="text-[9px] text-[var(--color-text-secondary)]">
                {benefit.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RegistrationBenefits;
