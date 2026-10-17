import { useEffect } from "react";

export default function MotionEffects() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let frame = 0;
    const headings = [...document.querySelectorAll(".section-heading")];

    const previews = [...document.querySelectorAll(".preview-open")];

    const portrait = document.querySelector(".hero-portrait");
    const update = () => {
      frame = 0;
      if (reduced.matches) return;

      if (portrait) {
        const rect = portrait.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, (innerHeight - rect.top) / (innerHeight * .9)));
        portrait.style.setProperty("--portrait-reveal", progress);
      }
      headings.forEach((heading) => {
        const rect = heading.getBoundingClientRect();
        if (rect.bottom > -150 && rect.top < innerHeight + 150) {
          const progress = Math.max(
            -1,
            Math.min(1, (rect.top - innerHeight / 2) / innerHeight),
          );
          heading.style.setProperty("--word-drift", `${progress * 45}px`);
        }
      });

    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const move = (event) => {
      if (reduced.matches || !pointer.matches) return;
      const rect = event.currentTarget.getBoundingClientRect();
      event.currentTarget.style.setProperty(
        "--tilt-x",
        `${(-(event.clientY - rect.top - rect.height / 2) / rect.height) * 5}deg`,
      );
      event.currentTarget.style.setProperty(
        "--tilt-y",
        `${((event.clientX - rect.left - rect.width / 2) / rect.width) * 5}deg`,
      );
    };
    const reset = (event) => {
      event.currentTarget.style.removeProperty("--tilt-x");
      event.currentTarget.style.removeProperty("--tilt-y");
    };
    const preferenceChanged = () => {
      if (reduced.matches) {
        headings.forEach((h) => h.style.removeProperty("--word-drift"));

        portrait?.style.removeProperty("--portrait-reveal");

        previews.forEach((p) => reset({ currentTarget: p }));
      } else schedule();
    };
    previews.forEach((p) => {
      p.addEventListener("pointermove", move);
      p.addEventListener("pointerleave", reset);
    });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reduced.addEventListener("change", preferenceChanged);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reduced.removeEventListener("change", preferenceChanged);
      previews.forEach((p) => {
        p.removeEventListener("pointermove", move);
        p.removeEventListener("pointerleave", reset);
      });
    };
  }, []);
  return null;
}
