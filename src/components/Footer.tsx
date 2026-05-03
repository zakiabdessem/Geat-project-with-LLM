const footerLinks = {
  Power: ["Gas Power", "Hydro Power", "Nuclear Power", "Steam Power"],
  Wind: ["Offshore Wind", "Onshore Wind", "Wind Turbine Blades"],
  Electrification: ["Software", "Grid Solutions", "Power Conversion"],
  News: ["Press Releases", "Articles & Insights"],
  "Quick Links": ["Contact", "Careers", "About", "Sustainability"],
};

import geatLogo from "@/assets/geat-logo.png";

const Footer = () => {
  return (
    <footer className="bg-geat-dark text-primary-foreground">
      <div className="section-container py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <img src={geatLogo} alt="GEAT Logo" className="h-16 w-auto brightness-0 invert" />
          </div>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-heading font-700 text-sm mb-4 text-primary-foreground">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-primary-foreground/50">
            © 2026 GEAT and/or its affiliates. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-primary-foreground/50">
            <a href="#" className="hover:text-primary-foreground transition-colors">Accessibility</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;