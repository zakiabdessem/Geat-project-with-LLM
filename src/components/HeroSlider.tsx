import { useState, useEffect, useCallback } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import hero1 from "@/assets/hero-bg-1.png";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

const slides = [
  {
    image: hero1,
    headline: "POWERING FORWARD ALGERIA",
    subtitle: "Our persistent optimism drives us to transform breakthrough invention into real-world impact.",
    cta: "Learn More About Us",
    label: "Learn More About Us",
  },
  {
    image: hero2,
    headline: "25+ YEARS OF EXPERTISE, 200+ SPECIALISTS",
    subtitle: "Our team of engineers and specialists ensures world-class performance and operational reliability.",
    cta: "Explore Our Solutions",
    label: "Explore Our Solutions",
  },
  {
    image: hero3,
    headline: "MODERNIZING ALGERIA'S ENERGY GRID",
    subtitle: "Our new grid solution project is transforming how electricity is delivered—smarter, safer, and more reliable. From real-time monitoring to predictive maintenance, we ensure communities and industries have uninterrupted power.",
    cta: "Explore Grid Solutions",
    label: "Explore Grid Solutions",
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
    setProgress(0);
  }, []);

  const prev = useCallback(() => {
    setCurrent((p) => (p - 1 + slides.length) % slides.length);
    setProgress(0);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          next();
          return 0;
        }
        return p + 2;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="relative h-screen overflow-hidden">
      {slides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img
            src={s.image}
            alt={s.headline}
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-geat-dark/60" />
        </div>
      ))}

      <div className="relative z-10 h-full flex flex-col justify-end pb-32 lg:pb-36 pt-20 lg:pt-24 section-container">
        <div className="max-w-2xl">
          <div className="relative pl-8 mb-8">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
            <h1 className="hero-headline text-primary-foreground mb-4">
              {slide.headline}
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-lg">
              {slide.subtitle}
            </p>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading font-600 px-6 py-3 rounded-full hover:brightness-110 transition-all"
          >
            {slide.cta}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Bottom navigation bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="section-container">
          {/* Slide labels with progress bars */}
          <div className="flex border-t border-primary-foreground/20">
            {slides.map((s, i) => (
              <button
                key={i}
                onClick={() => { setCurrent(i); setProgress(0); }}
                className="flex-1 py-4 text-left relative group"
              >
                <span className={`text-sm font-heading font-600 transition-colors ${i === current ? 'text-primary-foreground' : 'text-primary-foreground/50 group-hover:text-primary-foreground/80'}`}>
                  {s.label}
                </span>
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary-foreground/10">
                  {i === current && (
                    <div
                      className="h-full bg-primary transition-all duration-100"
                      style={{ width: `${progress}%` }}
                    />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Carousel dots + arrows */}
          <div className="flex items-center justify-center gap-3 py-4">
            <button
              onClick={prev}
              className="text-primary hover:text-primary/80 transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => { setCurrent(i); setProgress(0); }}
                className={`w-3.5 h-3.5 rounded-full border-2 transition-all ${
                  i === current
                    ? 'bg-primary border-primary'
                    : 'bg-transparent border-primary/60 hover:border-primary'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
            <button
              onClick={next}
              className="text-primary hover:text-primary/80 transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;