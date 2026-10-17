import { useEffect } from "react";
import MotionEffects from "./components/MotionEffects";
import MagneticButtons from "./components/MagneticButtons";
import ScrollProgress from "./components/ScrollProgress";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Offer from "./components/Offer";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Stack from "./components/Stack";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <MotionEffects />
      <MagneticButtons />
      <Header />
      <ScrollProgress />
      <main>
        <Hero />
        <Projects />
        <Offer />
        <Experience />
        <Stack />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
