import { useEffect, useState } from "react";

const navItems = ["offer", "projects", "experience", "stack", "about", "contact"];
const profilePhoto = `${import.meta.env.BASE_URL}profile-photo.jpg`;

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("offer");

  useEffect(() => {
    const sections = navItems
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActive(visible.target.id);
        }
      },
      {
        rootMargin: "-25% 0px -60%",
        threshold: [0.1, 0.35, 0.6],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header className="site-header">
      <a
        className="profile-brand"
        href="#top"
        onClick={closeMenu}
        aria-label="Go to the top of Eddrick Miano's portfolio"
      >
        <img src={profilePhoto} alt="" />
        <span className="profile-brand-name">Eddrick Miano</span>
      </a>

      <button
        className="menu-button"
        type="button"
        aria-expanded={open}
        aria-controls="primary-navigation"
        onClick={() => setOpen((currentValue) => !currentValue)}
      >
        {open ? "CLOSE" : "MENU"}
      </button>

      <nav
        id="primary-navigation"
        className={open ? "nav nav-open" : "nav"}
      >
        {navItems.map((item) => (
          <a
            key={item}
            className={active === item ? "nav-link active" : "nav-link"}
            href={`#${item}`}
            onClick={closeMenu}
          >
            {item === "offer" ? "services" : item}
          </a>
        ))}

        <a
          className="nav-resume"
          href={`${import.meta.env.BASE_URL}Eddrick_Miano_Resume_2026.pdf?v=25ccadc27551`}
          target="_blank"
          rel="noreferrer"
          onClick={closeMenu}
        >
          résumé ↗
        </a>
      </nav>
    </header>
  );
}
