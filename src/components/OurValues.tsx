import { Heart, Eye, Target } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Act with Humility",
    description:
      "We approach every challenge with openness, respect for others, and a willingness to learn. Humility drives collaboration and continuous improvement across our teams.",
  },
  {
    icon: Eye,
    title: "Lead with Transparency",
    description:
      "We believe in honest communication, clear accountability, and building trust through openness. Transparency is the foundation of our relationships with partners and employees.",
  },
  {
    icon: Target,
    title: "Deliver with Focus",
    description:
      "We commit to excellence in execution, staying disciplined in our goals and delivering measurable results. Focus ensures we meet the highest standards of quality and performance.",
  },
];

const OurValues = () => {
  return (
    <section className="py-20 bg-background">
      <div className="section-container">
        <div className="text-center mb-12">
          <div className="w-12 h-1 bg-primary mx-auto mb-6" />
          <h2 className="font-heading font-bold text-3xl lg:text-4xl text-foreground mb-4">
            Our Values
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {values.map((value, i) => {
            const Icon = value.icon;
            return (
              <div
                key={i}
                className={`rounded-xl p-8 text-center transition-shadow hover:shadow-lg ${
                  i === 0
                    ? "bg-primary text-primary-foreground"
                    : i === 1
                    ? "bg-geat-dark text-primary-foreground"
                    : "bg-accent text-accent-foreground"
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 ${
                    i === 0
                      ? "bg-primary-foreground/20"
                      : "bg-primary-foreground/10"
                  }`}
                >
                  <Icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-heading font-600 text-lg mb-3 text-primary-foreground">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-primary-foreground/80">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurValues;