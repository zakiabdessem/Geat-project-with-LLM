import { ArrowRight } from "lucide-react";
import whoWeAreImg from "@/assets/who-we-are.jpg";

const WhoWeAre = () => {
  return (
    <section className="py-20 bg-background">
      <div className="section-container">
        <div className="w-12 h-1 bg-primary mb-6" />
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-foreground mb-8">
              Who we are
            </h2>
            <p className="text-muted-foreground text-base lg:text-lg leading-relaxed mb-6">
              GEAT is a joint venture between Sonelgaz and GE, located in Aïn Yagout in the Batna province of Algeria.
            </p>
            <p className="text-muted-foreground text-base lg:text-lg leading-relaxed mb-8">
              It was created to manufacture turbine modules and auxiliaries, assemble gas and steam turbines and control systems, develop digital solutions, and provide maintenance and repair services for electricity generation equipment.
            </p>
            <a
              href="/about"
              className="inline-flex items-center gap-1 text-primary font-medium text-sm uppercase tracking-wider hover:gap-2 transition-all"
            >
              Discover More
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img
              src={whoWeAreImg}
              alt="GEAT engineers working in turbine manufacturing facility"
              className="w-full h-auto object-cover"
              loading="lazy"
              width={800}
              height={512}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;