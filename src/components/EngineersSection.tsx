import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import engineerImg from "@/assets/engineer-1.jpg";

const engineers = [
  {
    title: "MEET OUR ENGINEERS",
    quote: "Half the picture of being an engineer is sitting behind a computer solving problems. But there's also the critical element of talking to people and pushing the industry forward.",
    name: "Sarah Chen",
    role: "Decarbonization Technology Director",
  },
  {
    title: "DRIVEN BY DISCOVERY",
    quote: "Stay curious and passionate and you will continue to navigate obstacles and keep pushing ahead.",
    name: "Ahmed Khalil",
    role: "Senior Robotics & Autonomous Systems Engineer",
  },
  {
    title: "BREAKTHROUGHS",
    quote: "Robotics and automation will enable more consistent quality and increase the lifespan of our products, which has an important impact on sustainability.",
    name: "Maria Orozco",
    role: "Supply Chain Strategist",
  },
];

const EngineersSection = () => {
  const [current, setCurrent] = useState(0);
  const eng = engineers[current];

  return (
    <section className="py-20 bg-geat-dark">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-xl overflow-hidden">
            <img
              src={engineerImg}
              alt="GEAT Engineer"
              className="w-full h-[400px] lg:h-[500px] object-cover"
              loading="lazy"
              width={1200}
              height={800}
            />
          </div>
          <div>
            <h3 className="font-heading font-800 text-2xl lg:text-3xl text-primary-foreground uppercase tracking-wide mb-6">
              {eng.title}
            </h3>
            <blockquote className="text-primary-foreground/90 text-lg lg:text-xl italic leading-relaxed mb-6">
              "{eng.quote}"
            </blockquote>
            <p className="text-primary font-heading font-600">
              —{eng.name}, <span className="text-primary-foreground/70 font-normal">{eng.role}</span>
            </p>

            <div className="flex items-center gap-4 mt-10">
              <button
                onClick={() => setCurrent((c) => (c - 1 + engineers.length) % engineers.length)}
                className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              {engineers.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${i === current ? 'bg-primary' : 'bg-primary-foreground/30'}`}
                />
              ))}
              <button
                onClick={() => setCurrent((c) => (c + 1) % engineers.length)}
                className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EngineersSection;