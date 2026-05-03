import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import whoWeAreImg from "@/assets/who-we-are.jpg";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative h-[60vh] min-h-[340px] overflow-hidden">
        <img
          src={whoWeAreImg}
          alt="GEAT facility"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-geat-dark/70" />
        <div className="relative z-10 h-full flex flex-col justify-end pb-16 section-container">
          <div className="pl-8 relative">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-geat-orange" />
            <h1 className="hero-headline text-primary-foreground">ABOUT US</h1>
            <p className="text-primary-foreground/80 text-lg mt-4 max-w-lg">
              Discover who we are and what drives GEAT forward.
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are Content */}
      <section className="py-20 bg-card">
        <div className="section-container">
          <div className="max-w-4xl">
            <div className="w-12 h-1 bg-geat-orange mb-6" />
            <h2 className="font-heading font-700 text-3xl lg:text-4xl text-foreground mb-8">
              Who we are
            </h2>
            <div className="space-y-6 text-muted-foreground text-base lg:text-lg leading-relaxed">
              <p>
                GEAT is a joint venture between Sonelgaz and GE, located in Aïn Yagout in the Batna province of Algeria.
              </p>
              <p>
                It was created to manufacture turbine modules and auxiliaries, assemble gas and steam turbines and control systems, develop digital solutions, and provide maintenance and repair services for electricity generation equipment.
              </p>
              <p>
                GEAT plays a major role in industrial localization, the development of national skills, and the creation of sustainable value in Algeria. The company operates in a demanding industrial environment governed by GE's international standards in quality, safety, ethics, and operational excellence, offering its employees a structured, multicultural, and performance-driven workplace.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20 bg-secondary">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-12 h-1 bg-geat-orange mb-6" />
              <h2 className="font-heading font-700 text-3xl lg:text-4xl text-foreground mb-6">
                Our Mission
              </h2>
              <p className="text-muted-foreground text-base lg:text-lg leading-relaxed mb-4">
                To deliver world-class energy solutions that power Algeria's growth, leveraging GE's global expertise and Sonelgaz's deep understanding of Algeria's energy landscape.
              </p>
              <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">
                We are committed to developing national talent, driving industrial localization, and ensuring the highest standards of quality, safety, and operational excellence.
              </p>
            </div>
            <div className="bg-geat-orange rounded-xl p-10 text-primary-foreground">
              <h3 className="font-heading font-700 text-2xl mb-6">Key Facts</h3>
              <div className="space-y-4">
                <div className="border-b border-primary-foreground/20 pb-4">
                  <p className="font-heading font-800 text-3xl">+12</p>
                  <p className="text-primary-foreground/80">Years of Operation</p>
                </div>
                <div className="border-b border-primary-foreground/20 pb-4">
                  <p className="font-heading font-800 text-3xl">200+</p>
                  <p className="text-primary-foreground/80">Engineers & Specialists</p>
                </div>
                <div>
                  <p className="font-heading font-800 text-3xl">10+ GW</p>
                  <p className="text-primary-foreground/80">Installed Capacity</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-card">
        <div className="section-container">
          <div className="text-center mb-12">
            <div className="w-12 h-1 bg-geat-orange mx-auto mb-6" />
            <h2 className="font-heading font-700 text-3xl lg:text-4xl text-foreground">
              Our Values
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Act with Humility", desc: "We approach every challenge with openness, respect for others, and a willingness to learn." },
              { title: "Lead with Transparency", desc: "We believe in honest communication, clear accountability, and building trust through openness." },
              { title: "Deliver with Focus", desc: "We commit to excellence in execution, staying disciplined in our goals and delivering measurable results." },
            ].map((v, i) => (
              <div
                key={i}
                className={`rounded-xl p-8 text-center ${
                  i === 0
                    ? "bg-geat-orange text-primary-foreground"
                    : "bg-card border border-border"
                }`}
              >
                <h3 className={`font-heading font-600 text-lg mb-3 ${i === 0 ? "text-primary-foreground" : "text-foreground"}`}>
                  {v.title}
                </h3>
                <p className={`text-sm leading-relaxed ${i === 0 ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
