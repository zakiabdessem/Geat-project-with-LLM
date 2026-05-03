const announcements = [
  {
    category: "Careers",
    date: "April 7, 2026",
    title:
      "New Opportunities at GEAT — Explore openings and join a team shaping the future of energy.",
  },
  {
    category: "News",
    date: "April 2, 2026",
    title:
      "Launching Our GRID Initiative to advance energy infrastructure and improve efficiency across operations.",
  },
  {
    category: "Career Growth",
    date: "March 31, 2026",
    title:
      "Diverse Job Opportunities — From engineering to operations, discover career paths at GEAT.",
  },
];

const AnnouncementsSection = () => {
  return (
    <section className="py-10 bg-background">
      <div className="section-container">
        <div className="grid md:grid-cols-3 gap-10">
          {announcements.map((item, i) => (
            <a
              key={i}
              href="#"
              className="group block hover:text-primary transition-colors"
            >
              <span className="text-primary font-heading font-600 text-sm">
                {item.category}
              </span>
              <p className="text-muted-foreground text-xs mt-1">{item.date}</p>
              <h3 className="font-body text-foreground text-sm mt-2 leading-relaxed group-hover:text-primary transition-colors">
                {item.title}
              </h3>
            </a>
          ))}
        </div>
        <div className="mt-8 border-t border-border" />
      </div>
    </section>
  );
};

export default AnnouncementsSection;
