import { useEffect } from "react";

export default function MagneticButtons() {
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const fine = matchMedia("(hover: hover) and (pointer: fine)");
    const targets = [...document.querySelectorAll(".magnetic-target")];
    const reset = (event) => {
      const button = event.currentTarget.querySelector(".button");
      button.style.removeProperty("--magnetic-x");
      button.style.removeProperty("--magnetic-y");
      event.currentTarget.classList.remove("magnetic-active");
    };
    const move = (event) => {
      if (reduced.matches || !fine.matches || event.pointerType !== "mouse") return;
      const target = event.currentTarget;
      const button = target.querySelector(".button");
      if (button.matches(":focus-visible")) return;
      const rect = target.getBoundingClientRect();
      const x = Math.max(-6, Math.min(6, (event.clientX - rect.left - rect.width / 2) * .1));
      const y = Math.max(-4, Math.min(4, (event.clientY - rect.top - rect.height / 2) * .15));
      target.classList.add("magnetic-active");
      button.style.setProperty("--magnetic-x", `${x}px`);
      button.style.setProperty("--magnetic-y", `${y}px`);
    };
    const resetAll = () => targets.forEach(target => reset({currentTarget:target}));
    targets.forEach(target => {
      target.addEventListener("pointermove", move);
      target.addEventListener("pointerleave", reset);
      target.addEventListener("pointercancel", reset);
      target.addEventListener("focusin", reset);
      target.addEventListener("click", reset);
    });
    reduced.addEventListener("change", resetAll);
    fine.addEventListener("change", resetAll);
    return () => {
      targets.forEach(target => {
        target.removeEventListener("pointermove", move);
        target.removeEventListener("pointerleave", reset);
        target.removeEventListener("pointercancel", reset);
        target.removeEventListener("focusin", reset);
        target.removeEventListener("click", reset);
      });
      reduced.removeEventListener("change", resetAll);
      fine.removeEventListener("change", resetAll);
      resetAll();
    };
  }, []);
  return null;
}
