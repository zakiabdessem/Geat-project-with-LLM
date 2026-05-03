import { ExternalLink } from "lucide-react";

const SubscribeSection = () => {
  return (
    <section className="py-16 bg-primary/10">
      <div className="section-container flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-lg text-primary">
          <span className="font-heading font-700">Subscribe to The Current</span>{" "}
          and explore the latest news on electrification systems and software, energy generation technologies, and sustainability.
        </p>
        <a
          href="#"
          className="inline-flex items-center gap-2 border-2 border-primary bg-primary text-primary-foreground font-heading font-700 px-6 py-3 rounded-full hover:bg-primary/90 transition-all whitespace-nowrap text-sm"
        >
          Subscribe Now
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
};

export default SubscribeSection;
