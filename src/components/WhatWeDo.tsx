import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "Electrification",
    href: "/electrification",
    description:
      "We deliver comprehensive electrification solutions—from high-voltage electrical networks and substations to advanced command & control systems, telecom infrastructure, and switchgear equipment—powering Algeria's industrial and energy sectors with reliability and innovation.",
    featured: [
      {
        title: "Electrical Networks",
        desc: "Design, installation, and commissioning of high and medium voltage electrical networks for industrial and power generation facilities.",
        href: "/electrification/electrical-networks",
      },
      {
        title: "Substations",
        desc: "Engineering and construction of electrical substations, ensuring efficient power transformation and distribution across the grid.",
        href: "/electrification/substations",
      },
      {
        title: "Command & Control",
        desc: "Advanced command and control systems for centralized monitoring and management of electrical infrastructure and power assets.",
        href: "/electrification/command-control",
      },
      {
        title: "Telecom Systems",
        desc: "Deployment of industrial telecommunications systems enabling reliable data transmission and remote communication across facilities.",
        href: "/electrification/telecom-systems",
      },
      {
        title: "Switchgear & Electrical Equipment",
        desc: "Supply and integration of switchgear, circuit breakers, and electrical protection equipment built to international safety standards.",
        href: "/electrification/switchgear",
      },
    ],
  },
  {
    name: "Services",
    href: "/services",
    description:
      "Our services division provides end-to-end maintenance, repair, and overhaul solutions for power generation equipment, ensuring maximum uptime, extended asset life, and peak operational performance.",
    featured: [
      {
        title: "Power Plant Maintenance",
        desc: "Comprehensive scheduled and preventive maintenance programs for gas and steam turbine power plants, minimizing unplanned downtime.",
        href: "/services/power-plant-maintenance",
      },
      {
        title: "Repair Services",
        desc: "Expert repair and overhaul services for turbine components, generators, and auxiliary equipment, restoring assets to factory specifications.",
        href: "/services/repair-services",
      },
      {
        title: "Aero Machines Services",
        desc: "Specialized maintenance and repair services for aeroderivative gas turbines, including inspection, hot section repair, and performance optimization.",
        href: "/services/aero-machines",
      },
    ],
  },
  {
    name: "Power",
    href: "/power",
    description:
      "As a key player in power generation, we manufacture, assemble, and deliver gas turbines, steam turbines, auxiliary systems, and advanced control platforms—driving Algeria's energy independence with world-class technology.",
    featured: [
      {
        title: "Gas Turbines",
        desc: "Manufacturing and assembly of heavy-duty gas turbines for power generation, meeting GE's international standards for performance and reliability.",
        href: "/power/gas-turbines",
      },
      {
        title: "Steam Turbines",
        desc: "Production and integration of steam turbines for combined cycle and thermal power plants across the region.",
        href: "/power/steam-turbines",
      },
      {
        title: "Auxiliary Systems",
        desc: "Design and supply of turbine auxiliary systems including lubrication, fuel, cooling, and hydraulic systems essential for plant operations.",
        href: "/power/auxiliary-systems",
      },
      {
        title: "Control Systems (Mark VI)",
        desc: "Integration and upgrade of GE Mark VI turbine control systems, enabling safe, efficient, and automated power generation operations.",
        href: "/power/control-systems",
      },
    ],
  },
];

const WhatWeDo = () => {
  const [active, setActive] = useState(0);
  const cat = categories[active];
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-secondary">
      <div className="section-container">
        <div className="w-12 h-1 bg-primary mb-6" />
        <h2 className="font-heading font-bold text-3xl lg:text-4xl text-foreground mb-4">
          What we do
        </h2>
        <p className="text-muted-foreground text-base lg:text-lg max-w-4xl mb-12">
          Established as part of an ambitious industrial development and technology transfer program, GEAT plays a major role in industrial localization, the development of national skills, and the creation of sustainable value in Algeria.
        </p>

        <div className="grid lg:grid-cols-[240px_1fr] gap-0 border border-border rounded-lg overflow-hidden bg-background">
          <div className="border-r border-border bg-secondary">
            {categories.map((c, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-full text-left px-6 py-5 text-sm font-medium border-l-4 transition-colors ${
                  active === i
                    ? "border-l-primary bg-background text-primary"
                    : "border-l-transparent text-muted-foreground hover:bg-muted"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          <div className="p-8">
            <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-2xl">
              {cat.description}
            </p>

            <div className="w-12 h-1 bg-primary mb-4" />
            <h3 className="font-heading font-semibold text-lg text-foreground mb-6">Featured</h3>

            <div className="space-y-6">
              {cat.featured.map((item, j) => (
                <div key={j}>
                  <h4 className="font-heading font-semibold text-base text-foreground mb-1">
                    {item.title}
                  </h4>
                  <p className="text-muted-foreground text-sm mb-2">{item.desc}</p>
                  <button
                    onClick={() => navigate(item.href)}
                    className="inline-flex items-center gap-1 text-primary font-medium text-xs uppercase tracking-wider hover:gap-2 transition-all"
                  >
                    Read More
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
