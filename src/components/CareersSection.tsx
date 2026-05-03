import { ArrowUpRight } from "lucide-react";
import careers1 from "@/assets/careers-1.jpg";
import careers2 from "@/assets/careers-2.jpg";

const CareersSection = () => {
  return (
    <section id="careers" className="py-20 bg-white">
      <div className="section-container">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-[2px] bg-primary" />
              <span className="text-sm font-heading font-600 tracking-widest uppercase text-primary">
                Careers
              </span>
            </div>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-foreground mb-4">
              Be a part of our story
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6 max-w-md">
              Check out our Careers site to learn more about how you can be a part of the team.
            </p>
            <a
              href="/careers"
              className="inline-flex items-center gap-1.5 text-primary font-heading font-600 text-sm uppercase tracking-wider hover:gap-2.5 transition-all"
            >
              Explore
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="group">
              <div className="overflow-hidden rounded-lg mb-4 aspect-[4/5]">
                <img
                  src={careers1}
                  alt="Career opportunities at GEAT"
                  loading="lazy"
                  width={640}
                  height={800}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="font-heading font-700 text-xl text-foreground mb-2">
                Career opportunities
              </h3>
              <a
                href="#"
                className="inline-flex items-center gap-1.5 text-primary font-heading font-600 text-xs uppercase tracking-wider hover:gap-2.5 transition-all"
              >
                Learn More
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="group">
              <div className="overflow-hidden rounded-lg mb-4 aspect-[4/5]">
                <img
                  src={careers2}
                  alt="Application status at GEAT"
                  loading="lazy"
                  width={640}
                  height={800}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="font-heading font-700 text-xl text-foreground mb-2">
                Application status
              </h3>
              <a
                href="#"
                className="inline-flex items-center gap-1.5 text-primary font-heading font-600 text-xs uppercase tracking-wider hover:gap-2.5 transition-all"
              >
                Check Status
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareersSection;