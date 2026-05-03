import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 12, prefix: "+", suffix: "", label: "Years Operating", description: "Powering Algeria's energy future" },
  { value: 200, prefix: "", suffix: "+", label: "Engineers & Specialists", description: "Skilled national workforce" },
  { value: 10, prefix: "", suffix: "+", label: "GW Installed Capacity", description: "Across Algeria's grid" },
];

const useCountUp = (end: number, duration = 2000, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start]);
  return count;
};

const StatItem = ({ stat, index }: { stat: typeof stats[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const count = useCountUp(stat.value, 2000, visible);

  return (
    <div ref={ref}>
      <span className={`font-heading font-800 text-5xl md:text-6xl ${index === 1 ? "text-accent" : "text-primary"}`}>
        {stat.prefix}{count}{stat.suffix}
      </span>
      <p className="font-heading font-700 text-lg mt-3 text-foreground">{stat.label}</p>
      <p className="text-muted-foreground text-sm mt-1">{stat.description}</p>
    </div>
  );
};

const StatsSection = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="section-container">
        <h2 className="font-heading font-800 text-3xl md:text-4xl text-center mb-4 text-foreground">
          Numbers tell our story
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16">
          A track record of industrial excellence and commitment to Algeria's energy independence.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {stats.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;