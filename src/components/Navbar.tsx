import { useState, useRef, useEffect } from "react";
import { Menu, X, Search, ChevronDown, ArrowRight, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import geatLogo from "@/assets/geat-logo.png";

type NavChild = { label: string; href: string };
type NavCategory = { category: string; href: string; items: NavChild[] };
type NavItem = {
  label: string;
  href?: string;
  children?: NavChild[];
  megaMenu?: NavCategory[];
};

const navItems: NavItem[] = [
  {
    label: "Company",
    children: [
      { label: "About us", href: "/about" },
      { label: "Leadership", href: "/leadership" },
    ],
  },
  {
    label: "Products & Services",
    megaMenu: [
      {
        category: "Electrification",
        href: "/electrification",
        items: [
          { label: "Electrical Networks", href: "/electrification/electrical-networks" },
          { label: "Substations", href: "/electrification/substations" },
          { label: "Command & Control", href: "/electrification/command-control" },
          { label: "Telecom Systems", href: "/electrification/telecom-systems" },
          { label: "Switchgear & Electrical Equipment", href: "/electrification/switchgear" },
        ],
      },
      {
        category: "Services",
        href: "/services",
        items: [
          { label: "Power Plant Maintenance", href: "/services/power-plant-maintenance" },
          { label: "Repair Services", href: "/services/repair-services" },
          { label: "Aero Machines Services", href: "/services/aero-machines" },
        ],
      },
      {
        category: "Power",
        href: "/power",
        items: [
          { label: "Gas Turbines", href: "/power/gas-turbines" },
          { label: "Steam Turbines", href: "/power/steam-turbines" },
          { label: "Auxiliary Systems", href: "/power/auxiliary-systems" },
          { label: "Control Systems (Mark VI)", href: "/power/control-systems" },
        ],
      },
    ],
  },
  { label: "News", href: "#news" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "#contact" },
];

const Navbar = ({ showSearchJobs = false }: { showSearchJobs?: boolean }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [clickLocked, setClickLocked] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const megaRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
        megaRef.current && !megaRef.current.contains(e.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const renderDropdownItem = (item: NavItem) => {
    const isOpen = openDropdown === item.label;

    if (item.megaMenu) {
      const cancelClose = () => {
        if (closeTimerRef.current) {
          clearTimeout(closeTimerRef.current);
          closeTimerRef.current = null;
        }
      };
      const openMenu = () => {
        cancelClose();
        setOpenDropdown(item.label);
        setHoveredItem(item.label);
        if (!activeCategory) setActiveCategory(item.megaMenu![0].category);
      };
      const scheduleClose = () => {
        if (clickLocked) return;
        cancelClose();
        closeTimerRef.current = setTimeout(() => {
          setOpenDropdown(null);
          setHoveredItem(null);
          setActiveCategory(null);
        }, 250);
      };
      const handleClick = () => {
        if (isOpen) {
          setClickLocked(false);
          setOpenDropdown(null);
          setHoveredItem(null);
          setActiveCategory(null);
        } else {
          setClickLocked(true);
          openMenu();
        }
      };

      return (
        <div key={item.label} className="relative">
          <div
            onMouseEnter={openMenu}
            onMouseLeave={scheduleClose}
          >
            <button
              onClick={handleClick}
              className="relative text-sm font-medium flex items-center gap-1 transition-colors py-2 text-foreground hover:text-primary group"
            >
              {item.label}
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
              <span className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-300 ease-out ${hoveredItem === item.label || isOpen ? 'w-full' : 'w-0'}`} />
            </button>
          </div>

          <div
            onMouseEnter={() => { cancelClose(); openMenu(); }}
            onMouseLeave={scheduleClose}
            className={`fixed left-0 right-0 top-16 lg:top-20 bg-background border-b border-border shadow-lg transition-all duration-300 ease-out overflow-hidden ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
          >
            <div className="section-container py-10">
              <div className="flex items-start gap-0">
                <div className="flex flex-col gap-4 min-w-[220px]">
                  {item.megaMenu.map((cat) => (
                    <div
                      key={cat.category}
                      onMouseEnter={() => setActiveCategory(cat.category)}
                      className={`flex items-center gap-3 text-left transition-all duration-200 cursor-pointer ${activeCategory === cat.category ? 'text-primary' : 'text-foreground hover:text-primary'}`}
                      onClick={() => { setOpenDropdown(null); setClickLocked(false); navigate(cat.href); }}
                    >
                      <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeCategory === cat.category ? 'bg-primary scale-100' : 'bg-transparent scale-0'}`} />
                      <span className="font-heading font-bold text-lg">{cat.category}</span>
                    </div>
                  ))}
                </div>
                <div className="w-px self-stretch bg-border mx-10" />
                <div className="flex-1 relative min-h-[180px]">
                  {item.megaMenu.map((cat) => (
                    <div
                      key={cat.category}
                      className={`grid grid-cols-2 gap-x-16 gap-y-1 absolute inset-0 transition-all duration-300 ease-out ${
                        activeCategory === cat.category ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'
                      }`}
                    >
                      {cat.items.map((child) => (
                        <button
                          key={child.label}
                          onClick={() => { setOpenDropdown(null); setClickLocked(false); navigate(child.href); }}
                          className="text-left text-base font-heading text-foreground hover:text-primary hover:bg-muted/50 rounded-md px-3 py-2.5 transition-all duration-200 flex items-center gap-2 group/link cursor-pointer"
                        >
                          {child.label}
                          <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover/link:opacity-100 transition-opacity duration-200" />
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (item.children) {
      return (
        <div
          key={item.label}
          ref={dropdownRef}
          className="relative"
          onMouseEnter={() => { setOpenDropdown(item.label); setHoveredItem(item.label); }}
          onMouseLeave={() => { setOpenDropdown(null); setHoveredItem(null); }}
        >
          <button className="relative text-sm font-medium flex items-center gap-1 transition-colors py-2 text-foreground hover:text-primary group">
            {item.label}
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            <span className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-300 ease-out ${hoveredItem === item.label || isOpen ? 'w-full' : 'w-0'}`} />
          </button>

          <div className={`fixed left-0 right-0 top-16 lg:top-20 bg-background border-b border-border shadow-lg transition-all duration-300 ease-out overflow-hidden ${isOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
            <div className="section-container py-10">
              <div className="flex items-start gap-16">
                <div className="flex items-center gap-3 min-w-[180px]">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                  <span className="font-heading font-bold text-xl text-foreground">{item.label}</span>
                </div>
                <div className="w-px h-24 bg-border" />
                <div className="flex flex-col gap-5">
                  {item.children.map((child) => (
                    <button
                      key={child.label}
                      onClick={() => { setOpenDropdown(null); navigate(child.href); }}
                      className="text-left text-base font-heading text-foreground hover:text-primary transition-colors duration-200 relative group/link"
                    >
                      {child.label}
                      <span className="absolute -bottom-1 left-0 h-[1.5px] bg-primary w-0 group-hover/link:w-full transition-all duration-300 ease-out" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="section-container flex items-center justify-between h-16 lg:h-20">
        <a href="/" className="flex items-center gap-2">
          <img src={geatLogo} alt="GEAT Logo" className="h-12 lg:h-16 w-auto" />
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) =>
            item.children || item.megaMenu ? (
              renderDropdownItem(item)
            ) : item.href?.startsWith("/") ? (
              <button
                key={item.label}
                onClick={() => navigate(item.href!)}
                onMouseEnter={() => setHoveredItem(item.label)}
                onMouseLeave={() => setHoveredItem(null)}
                className="relative text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-300 ease-out ${hoveredItem === item.label ? 'w-full' : 'w-0'}`} />
              </button>
            ) : (
              <a
                key={item.label}
                href={item.href}
                onMouseEnter={() => setHoveredItem(item.label)}
                onMouseLeave={() => setHoveredItem(null)}
                className="relative text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-300 ease-out ${hoveredItem === item.label ? 'w-full' : 'w-0'}`} />
              </a>
            )
          )}
        </nav>

        <div className="flex items-center gap-3">
          {showSearchJobs && (
            <a
              href="#open-jobs"
              className="hidden lg:inline-flex items-center gap-1.5 bg-primary text-primary-foreground font-heading font-bold text-sm px-5 py-2 rounded-full hover:brightness-110 transition-all"
            >
              Search Jobs
              <ArrowRight className="w-4 h-4" />
            </a>
          )}
          <button className="text-foreground hover:text-primary transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button
            className="lg:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden bg-background border-t border-border transition-all duration-300 ease-out overflow-hidden ${mobileOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <nav className="section-container py-6 flex flex-col gap-4">
          {navItems.map((item) =>
            item.megaMenu ? (
              <div key={item.label}>
                <span className="text-base font-medium text-foreground py-2 block">{item.label}</span>
                <div className="pl-4 flex flex-col gap-3 mt-1">
                  {item.megaMenu.map((cat) => (
                    <div key={cat.category}>
                      <span className="text-sm font-bold text-primary block py-1">{cat.category}</span>
                      <div className="pl-3 flex flex-col gap-1">
                        {cat.items.map((child) => (
                          <a
                            key={child.label}
                            href={child.href}
                            className="text-sm text-accent hover:text-primary transition-colors py-1"
                            onClick={() => setMobileOpen(false)}
                          >
                            {child.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : item.children ? (
              <div key={item.label}>
                <span className="text-base font-medium text-foreground py-2 block">{item.label}</span>
                <div className="pl-4 flex flex-col gap-2">
                  {item.children.map((child) => (
                    <button
                      key={child.label}
                      onClick={() => { setMobileOpen(false); navigate(child.href); }}
                      className="text-left text-sm text-accent hover:text-primary transition-colors py-1"
                    >
                      {child.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="text-base font-medium text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            )
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
