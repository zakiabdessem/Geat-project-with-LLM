import { useState, useRef, useEffect } from "react";
import { ArrowRight, Search, Play, MessageCircle, X, Send, ChevronDown, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import careersHero from "@/assets/careers-hero-bg.jpg";
import careersVideoThumb from "@/assets/powering-algeria.png";
import careersStartHere from "@/assets/careers-start-here.png";
import geatLogo from "@/assets/geat-logo.png";
import geatLogoChatAvatar from "@/assets/geat-logo-chat.jpg";

const TERMS_TEXT = `Hello, I'm Geni, your personal recruiting assistant. Before we get started I'd like to make sure you have had a chance to read and agree to the terms below:

By continuing to use this Generative AI Chatbot, you acknowledge that any Personal Information that is entered by you, such as your name, phone number, job interests, answers to screening questions and location, will be collected by GEAT, and will be used by recruiters and hiring managers for recruiting purposes.

Personal Information you provide will be retained by GEAT to the extent permitted by applicable law.

In addition to using GEAT Candidate Data for the position for which you have applied, GEAT may retain and use it to consider you for other positions. If you do not want to be considered for other positions or would like to have your GEAT Candidate Data removed, you may contact us at the portal.`;

const SUGGESTED_PROMPTS = [
  "I'm looking for a job.",
  "I'm looking for manufacturing jobs.",
  "Do you have any sales jobs?",
];

const pathCards = [
  { title: "Digital Technology & IT", desc: "Build secure systems and tools that support smarter, more efficient global operations." },
  { title: "Engineering & Technology", desc: "Solve real-world problems and power innovation through end-to-end engineering solutions." },
  { title: "Manufacturing & Logistics", desc: "Drive quality and efficiency by building products and optimizing production workflows." },
  { title: "Project Management", desc: "Lead complex projects with a focus on delivery, organization, and customer success." },
  { title: "Quality", desc: "Ensure product excellence through process improvement, standards, and risk reduction." },
  { title: "Sales", desc: "Connect with clients and customers, grow relationships, and bring energy solutions to new markets." },
  { title: "Services", desc: "Support on-site performance and reliability, from fixing turbines to preventing problems." },
  { title: "Sourcing & Supply Chain", desc: "Play a critical role in how we source materials, manage suppliers, and move products." },
];

const jobListings = [
  { title: "Ingénieur Qualité Fabrication | Manufacturing Quality Engineer", location: "Batna, Algérie", type: "Confirmé / Expérimenté", experience: "3-5 ans", url: "https://emploitic.com/entreprises/geat-general-electric-algeria-turbines/offres-d-emploi/energie-mines-matiere-premiere/ingenieur-qualite-fabrication-manufacturing-quality-engineer-gas-and-steam-turbines-assembly-6c7c5d5b0cd0def114832d22" },
  { title: "Contrôleur Qualité Production | Production Quality Controller", location: "Batna, Algérie", type: "Confirmé / Expérimenté", experience: "3-5 ans", url: "https://emploitic.com/entreprises/geat-general-electric-algeria-turbines/offres-d-emploi/energie-mines-matiere-premiere/controleur-qualite-production-production-quality-controller-gas-and-steam-turbines-assembly-e56bcd376a86a36e1eeafd26" },
  { title: "Analyste Logistique", location: "Batna, Algérie", type: "Responsable d'Équipe", experience: "6-10 ans", url: "https://emploitic.com/entreprises/geat-general-electric-algeria-turbines/offres-d-emploi/energie-mines-matiere-premiere/analyste-logistique-879eb1eec7afd6486df8c47d" },
  { title: "Ingénieur Qualité Projets | Project Quality Engineer", location: "Batna, Algérie", type: "Confirmé / Expérimenté", experience: "3-5 ans", url: "https://emploitic.com/entreprises/geat-general-electric-algeria-turbines/offres-d-emploi/energie-mines-matiere-premiere/ingenieur-qualite-projets-project-quality-engineer-power-plant-project-3663e3e8e2f5c559e58edc4e" },
  { title: "Ingénieur Qualité Sourcing | Sourcing Quality Engineer", location: "Batna, Algérie", type: "Confirmé / Expérimenté", experience: "3-5 ans", url: "https://emploitic.com/entreprises/geat-general-electric-algeria-turbines/offres-d-emploi/energie-mines-matiere-premiere/ingenieur-qualite-sourcing-sourcing-quality-engineer-77d2345765c41269db5f0574" },
  { title: "Ingénieur de Projets | Project Engineer – Substations Equipments", location: "Alger, Algérie", type: "Confirmé / Expérimenté", experience: "3-5 ans", url: "https://emploitic.com/entreprises/geat-general-electric-algeria-turbines/offres-d-emploi/energie-mines-matiere-premiere/ingenieur-de-projets-ec89b1c4f4f0bc0526e22cf7" },
  { title: "Ingénieur de Projets | Project Engineer – Power Plant Equipments", location: "Alger, Algérie", type: "Confirmé / Expérimenté", experience: "3-5 ans", url: "https://emploitic.com/entreprises/geat-general-electric-algeria-turbines/offres-d-emploi/energie-mines-matiere-premiere/ingenieur-de-projets-project-engineer-power-plant-equipments-0f9a62092c1545b025406c86" },
  { title: "Assistante RH | HR Assistant", location: "Batna, Algérie", type: "Confirmé / Expérimenté", experience: "1-2 ans", url: "https://emploitic.com/entreprises/geat-general-electric-algeria-turbines/offres-d-emploi/energie-mines-matiere-premiere/assistante-rh-e70fc8372bfffc591834ef84" },
  { title: "Ingénieur Contrôle et Test | Test and Control Engineer", location: "Batna, Algérie", type: "Confirmé / Expérimenté", experience: "1-2 ans", url: "https://emploitic.com/entreprises/geat-general-electric-algeria-turbines/offres-d-emploi/energie-mines-matiere-premiere/ingenieur-controle-et-test-31be1f16ece1707ba31e759f" },
  { title: "Ingénieur Contrôle et Automatisme | Control and Automation Engineer", location: "Batna, Algérie", type: "Confirmé / Expérimenté", experience: "1-2 ans", url: "https://emploitic.com/entreprises/geat-general-electric-algeria-turbines/offres-d-emploi/energie-mines-matiere-premiere/ingenieur-controle-et-automatisme-75f19cdef5aaf7628358c0f4" },
  { title: "Responsable Ingénierie | Engineering Manager", location: "Batna, Algérie", type: "Responsable d'Équipe", experience: "3-5 ans", url: "https://emploitic.com/entreprises/geat-general-electric-algeria-turbines/offres-d-emploi/energie-mines-matiere-premiere/responsable-ingenierie-267ae86ecff87465ba8e8161" },
  { title: "Ingénieur Etude et Projet Electrique | Electrical Design and Project Engineer", location: "Batna, Algérie", type: "Responsable d'Équipe", experience: "1-2 ans", url: "https://emploitic.com/entreprises/geat-general-electric-algeria-turbines/offres-d-emploi/energie-mines-matiere-premiere/ingenieur-etude-et-projet-electrique-c1c685e6e89a3860f5991304" },
  { title: "Ingénieur Télécom | Telecom Engineer", location: "Batna, Algérie", type: "Débutant / Junior", experience: "1-2 ans", url: "https://emploitic.com/entreprises/geat-general-electric-algeria-turbines/offres-d-emploi/energie-mines-matiere-premiere/ingenieur-telecom-c11a3a1d9865929ed493a5b0" },
  { title: "Ingénieur de Développement Informatique | Software Development Engineer", location: "Batna, Algérie", type: "Débutant / Junior", experience: "1-2 ans", url: "https://emploitic.com/entreprises/geat-general-electric-algeria-turbines/offres-d-emploi/energie-mines-matiere-premiere/ingenieur-de-developpement-informatique-4c6a160f75e8f4bbb078b0b3" },
  { title: "Fiscaliste | Tax Analyst", location: "Batna, Algérie", type: "Confirmé / Expérimenté", experience: "1-2 ans", url: "https://emploitic.com/entreprises/geat-general-electric-algeria-turbines/offres-d-emploi/energie-mines-matiere-premiere/fiscaliste-75b4f6d711abdeb1a73f1517" },
  { title: "Coordinateur de Transport | Transport Coordinator", location: "Batna, Algérie", type: "Débutant / Junior", experience: "1-2 ans", url: "https://emploitic.com/entreprises/geat-general-electric-algeria-turbines/offres-d-emploi/energie-mines-matiere-premiere/coordinateur-de-transport-0da01e38cf79245265c1e6af" },
  { title: "Gestionnaire de Stocks | Store Manager", location: "Batna, Algérie", type: "Débutant / Junior", experience: "1-2 ans", url: "https://emploitic.com/entreprises/geat-general-electric-algeria-turbines/offres-d-emploi/energie-mines-matiere-premiere/gestionnaire-de-stocks-2a3210b92ee56ae0863a0f49" },
  { title: "Analyste Ressources Humaines | Human Resources Analyst", location: "Batna, Algérie", type: "Débutant / Junior", experience: "<1 an", url: "https://emploitic.com/entreprises/geat-general-electric-algeria-turbines/offres-d-emploi/energie-mines-matiere-premiere/analyste-ressources-humaines-02921c4ef09827904186f3f5" },
  { title: "Planificateur de Production | Production Planner", location: "Batna, Algérie", type: "Confirmé / Expérimenté", experience: "3-5 ans", url: "https://emploitic.com/entreprises/geat-general-electric-algeria-turbines/offres-d-emploi/energie-mines-matiere-premiere/planificateur-de-production-82b74f8797045ce2546d8fd5" },
];

const Careers = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTermsDetail, setShowTermsDetail] = useState(false);
  const [chatMessages, setChatMessages] = useState<{role: "bot" | "user"; text: string}[]>([]);
  const [chatInput, setChatInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleAcceptTerms = () => {
    setTermsAccepted(true);
    setShowTermsDetail(false);
    setChatMessages([
      { role: "bot", text: "Thanks for accepting our Terms of Use. How can I help you?" },
    ]);
  };

  const handleChatSend = (text?: string) => {
    const msg = text || chatInput.trim();
    if (!msg) return;
    setChatMessages((prev) => [
      ...prev,
      { role: "user", text: msg },
      { role: "bot", text: "Thanks for your interest! Please visit our job listings above or contact our HR team for more specific information. I'm here to help!" },
    ]);
    setChatInput("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar showSearchJobs />

      {/* Hero */}
      <section className="relative h-screen overflow-hidden">
        <img src={careersHero} alt="Careers at GEAT" className="absolute inset-0 w-full h-full object-cover" width={1920} height={800} />
        <div className="absolute inset-0 bg-geat-dark/60" />
        <div className="relative z-10 h-full flex flex-col justify-end pb-32 lg:pb-36 pt-20 lg:pt-24 section-container">
          <div className="max-w-2xl">
            <div className="relative pl-8 mb-8">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
              <h1 className="hero-headline text-primary-foreground mb-4">
                THE ENERGY OF CHANGE STARTS WITH YOU
              </h1>
              <p className="text-primary-foreground/80 text-lg max-w-lg">
                Join a team driven by purpose, fueled by challenge, and united in shaping the future of energy.
              </p>
            </div>
            <a
              href="#open-jobs"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading font-600 px-6 py-3 rounded-full hover:brightness-110 transition-all"
            >
              Search Jobs
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Your Purpose Section */}
      <section className="py-20 bg-background">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-foreground leading-tight">
              Your purpose.<br />Our mission.
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                GEAT is helping change the world. Are you thinking about what impact you'll leave behind?
              </p>
              <p>
                Our team keeps the lights on for people around the world. We've installed gas turbines for customers operating in multiple countries, powering cities, stronger economies, and a better-connected world.
              </p>
              <p>
                Be part of something bigger — a team driven by purpose, fueled by challenge, and united in shaping the future of energy, every day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Find Your Path */}
      <section className="py-20 bg-secondary">
        <div className="section-container">
          <h2 className="font-heading font-bold text-3xl lg:text-4xl text-foreground mb-12">
            Find your path
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {pathCards.map((card) => (
              <div
                key={card.title}
                className="border border-border bg-background rounded-lg p-6 hover:border-primary hover:shadow-md transition-all cursor-pointer group"
              >
                <h3 className="font-heading font-bold text-sm text-accent group-hover:text-primary transition-colors mb-3 underline underline-offset-2">
                  {card.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
          <a
            href="#open-jobs"
            className="inline-flex items-center gap-2 border-2 border-foreground text-foreground font-heading font-bold text-sm px-6 py-3 rounded-full hover:bg-foreground hover:text-background transition-all"
          >
            Search All Opportunities
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Video / Why Join */}
      <section className="py-20 bg-background">
        <div className="section-container max-w-5xl mx-auto text-center">
          <div className="relative rounded-lg overflow-hidden mb-10">
            <img
              src={careersVideoThumb}
              alt="Powering Algeria"
              loading="lazy"
              width={1920}
              height={800}
              className="w-full h-auto object-cover"
            />
          </div>
          <h2 className="font-heading font-bold text-3xl lg:text-5xl text-accent uppercase mb-6">
            Why Join?
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            You'll get the chance to push boundaries, take energy where it's never been, and create smarter, more sustainable solutions that will power generations to come. This is your chance to help lead the energy of change and leave a legacy that matters.
          </p>
        </div>
      </section>

      {/* Start here. Grow your career */}
      <section className="py-20 bg-background">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="font-heading font-bold text-2xl lg:text-3xl text-foreground mb-3">
                Start here. Grow your career
              </h3>
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                GEAT helps early talent build skills, gain hands-on experience, and grow into impactful careers in the energy industry.
              </p>
              <a href="#open-jobs" className="inline-flex items-center gap-1.5 text-foreground font-heading font-bold text-sm underline underline-offset-4 hover:text-primary transition-colors">
                Explore Opportunities <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="group overflow-hidden rounded-lg aspect-[4/3]">
              <img
                src={careersStartHere}
                alt="Start here. Grow your career"
                loading="lazy"
                width={640}
                height={480}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Geni Chatbot Banner */}
      <section className="py-20 bg-accent text-accent-foreground">
        <div className="section-container">
          <div className="flex items-start gap-6 max-w-2xl mx-auto">
            <div className="border-l-4 border-primary pl-6">
              <h2 className="font-heading font-bold text-2xl lg:text-3xl mb-3">
                Hi, I'm Geni
              </h2>
              <p className="text-accent-foreground/80 leading-relaxed mb-6">
                I'm here to help you explore career opportunities, find the perfect fit, and guide you through the application process.
              </p>
              <button
                onClick={() => setChatOpen(true)}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading font-bold text-sm px-6 py-3 rounded-full hover:brightness-110 transition-all"
              >
                Chat with Geni
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Open Jobs */}
      <section id="open-jobs" className="py-20 bg-[hsl(210,80%,95%)]">
        <div className="section-container">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-[2px] bg-primary" />
            <span className="text-sm font-heading font-600 tracking-widest uppercase text-primary">Opportunities</span>
          </div>
          <h2 className="font-heading font-bold text-3xl lg:text-4xl text-foreground mb-10">Open jobs</h2>

          <div className="bg-secondary/50 rounded-2xl p-6 lg:p-8 mb-10 backdrop-blur-sm border border-border/50">
            <p className="text-foreground font-heading font-600 text-sm mb-5 tracking-wide">I'm Looking For</p>
            <div className="flex flex-col md:flex-row gap-3 mb-5">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by Keyword"
                  className="w-full bg-background text-foreground rounded-xl pl-11 pr-4 py-3.5 text-sm border border-border/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all shadow-sm"
                />
              </div>
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="City, State or Country"
                  className="w-full bg-background text-foreground rounded-xl px-4 py-3.5 text-sm border border-border/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all shadow-sm"
                />
              </div>
              <button className="bg-primary text-primary-foreground font-heading font-700 text-sm px-8 py-3.5 rounded-xl hover:brightness-110 transition-all shadow-sm">
                Search
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {["Job Function", "City", "Employment Type", "Experience Level"].map((filter) => (
                <button
                  key={filter}
                  className="flex items-center justify-between bg-background text-foreground rounded-xl px-4 py-3 text-sm border border-border/60 hover:border-primary/60 hover:shadow-sm transition-all"
                >
                  <span className="text-primary font-medium text-xs">{filter}</span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>

          <p className="text-muted-foreground font-heading font-600 text-sm mb-6">
            Showing 1-{jobListings.length} of {jobListings.length} jobs
          </p>

          <div className="space-y-3">
            {jobListings.map((job, i) => (
              <div
                key={i}
                className="bg-background rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-border/60 hover:border-primary/40 hover:shadow-md transition-all group"
              >
                <div>
                  <h3 className="font-heading font-bold text-foreground text-base mb-1 group-hover:text-primary transition-colors">{job.title}</h3>
                  <p className="text-muted-foreground text-sm">📍 {job.location} · {job.type} · {job.experience}</p>
                </div>
                <a
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-primary text-primary font-heading font-700 text-sm px-6 py-2.5 rounded-xl hover:bg-primary hover:text-primary-foreground transition-all whitespace-nowrap text-center"
                >
                  Apply Now
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Geni Chatbot Widget */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-white rounded-full pl-5 pr-1 py-1 shadow-[0_2px_12px_rgba(0,0,0,0.12)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.16)] transition-all flex items-center gap-3 border border-border/50"
        >
          <span className="text-[15px] text-muted-foreground leading-snug whitespace-nowrap text-left">Chat with our<br />Recruiting Assistant</span>
          <img src={geatLogoChatAvatar} alt="Geni" className="w-[52px] h-[52px] rounded-full object-cover shrink-0" />
        </button>
      )}

      {/* Terms Overlay - separate from chat */}
      {showTermsDetail && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-[420px] max-w-[calc(100vw-2rem)] max-h-[80vh] flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between shrink-0">
              <span className="text-muted-foreground text-sm">English (Default)</span>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <div className="flex items-start gap-3 mb-6">
                <img src={geatLogoChatAvatar} alt="Geni" className="w-10 h-10 rounded-full object-cover shrink-0 mt-0.5" />
                <p className="text-sm text-foreground leading-relaxed">
                  Hello, I'm Geni, your personal recruiting assistant. Before we get started I'd like to make sure you have had a chance to read and agree to the terms below:
                </p>
              </div>
              <div className="text-sm text-foreground/80 leading-relaxed space-y-4">
                <p>
                  By continuing to use this Generative AI Chatbot, you acknowledge that any Personal Information that is entered by you, such as your name, phone number, job interests, answers to screening questions and location, will be collected by GEAT, and will be used by recruiters and hiring managers for recruiting purposes.
                </p>
                <p>
                  Personal Information you provide will be retained by GEAT to the extent permitted by applicable law.
                </p>
                <p>
                  In addition to using GEAT Candidate Data for the position for which you have applied, GEAT may retain and use it to consider you for other positions. If you do not want to be considered for other positions or would like to have your GEAT Candidate Data removed, you may contact us at the portal.
                </p>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-border flex justify-between shrink-0">
              <button
                onClick={() => setShowTermsDetail(false)}
                className="bg-muted text-foreground font-heading font-bold text-sm px-6 py-2.5 rounded-lg hover:bg-muted/80 transition-all"
              >
                Decline
              </button>
              <button
                onClick={handleAcceptTerms}
                className="bg-primary text-primary-foreground font-heading font-bold text-sm px-6 py-2.5 rounded-lg hover:brightness-110 transition-all"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}

      {chatOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] bg-background border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden" style={{ maxHeight: "min(600px, calc(100vh - 3rem))" }}>
          {/* Header */}
          <div className="bg-white text-foreground px-5 py-3 flex items-center justify-between shrink-0 border-b border-border">
            <div className="flex items-center gap-2">
              <img src={geatLogoChatAvatar} alt="Geni" className="w-7 h-7 rounded-full object-cover" />
              <span className="font-heading font-bold">Geni</span>
            </div>
            <div className="flex items-center gap-3">
              <img src={geatLogo} alt="GEAT" className="h-6 w-auto" />
              <button onClick={() => setChatOpen(false)} className="hover:opacity-70 transition-opacity">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {!termsAccepted ? (
            <div className="flex-1 overflow-y-auto">
              <div className="p-5 flex flex-col items-center text-center">
                <img src={geatLogoChatAvatar} alt="Geni" className="w-20 h-20 rounded-full object-cover mb-4 mt-2" />
                <h3 className="font-heading font-bold text-lg text-foreground mb-1">Geni</h3>
                <p className="text-muted-foreground text-xs mb-6">
                  {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </p>

                <div className="flex items-start gap-3 mb-6 w-full">
                  <img src={geatLogoChatAvatar} alt="Geni" className="w-8 h-8 rounded-full object-cover shrink-0 mt-0.5" />
                  <div className="bg-secondary rounded-2xl rounded-bl-sm px-4 py-3 text-sm text-foreground text-left leading-relaxed">
                    Hi! I'm Geni, your personal job assistant at GEAT! You can ask me anything about open roles, culture, team and more.
                  </div>
                </div>

                <button
                  onClick={() => setShowTermsDetail(true)}
                  className="w-full flex items-center justify-between border border-border rounded-xl px-4 py-3 mb-3 hover:border-primary/50 transition-colors"
                >
                  <span className="font-heading font-600 text-sm text-foreground">Review Terms</span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </button>

                <div className="w-full flex items-center gap-2 border border-border rounded-full px-4 py-2.5">
                  <span className="text-muted-foreground text-sm flex-1 text-left">Review terms before proceeding</span>
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <Send className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                <div className="flex items-center gap-2 bg-secondary/60 rounded-lg px-3 py-2 text-xs text-muted-foreground mx-auto w-fit">
                  <Check className="w-3.5 h-3.5" />
                  Terms accepted on {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </div>

                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    {msg.role === "bot" && (
                      <img src={geatLogoChatAvatar} alt="Geni" className="w-7 h-7 rounded-full object-cover shrink-0 mr-2 mt-0.5" />
                    )}
                    <div
                      className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-sm"
                          : "bg-secondary text-foreground rounded-bl-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />

                {chatMessages.length === 1 && (
                  <div className="pt-2">
                    <p className="text-muted-foreground text-sm font-heading font-600 mb-2">You can say...</p>
                    <div className="space-y-2">
                      {SUGGESTED_PROMPTS.map((prompt) => (
                        <button
                          key={prompt}
                          onClick={() => handleChatSend(prompt)}
                          className="w-full text-left border border-border rounded-xl px-4 py-3 text-sm text-primary font-medium hover:border-primary/50 hover:bg-secondary/50 transition-all"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="border-t border-border p-3 flex items-center gap-2 shrink-0">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleChatSend()}
                  placeholder="Write a reply..."
                  className="flex-1 bg-secondary rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  onClick={() => handleChatSend()}
                  className="bg-primary text-primary-foreground rounded-full p-2 hover:brightness-110 transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Careers;
