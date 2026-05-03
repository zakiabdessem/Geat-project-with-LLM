import { ArrowRight } from "lucide-react";

const PortalSection = () => {
  return (
    <section className="relative py-20 bg-secondary">
      <div className="section-container flex flex-col lg:flex-row items-center gap-8 lg:gap-20">
        {/* Left: Title */}
        <h2 className="font-heading font-bold text-3xl lg:text-5xl text-foreground uppercase leading-tight lg:w-1/2">
          Our DMS Portal
        </h2>

        {/* Right: Description + Button (no vertical line) */}
        <div className="lg:w-1/2 flex flex-col items-start gap-6">
          <p className="text-muted-foreground text-base leading-relaxed">
            Our DMS portal provides seamless communication and document management between our employees and suppliers, ensuring efficiency, transparency, and timely collaboration.
          </p>
          <a
            href="https://dms.geat.dz/#"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-primary text-primary-foreground font-heading font-700 px-7 py-3 rounded-full hover:bg-primary/90 transition-all text-sm"
          >
            Access the Portal
            <span className="w-8 h-8 rounded-full border-2 border-primary-foreground/50 flex items-center justify-center">
              <ArrowRight className="w-4 h-4" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default PortalSection;
