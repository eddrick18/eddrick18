import { useEffect, useRef } from "react";
import "../service-illustrations.css";

export default function ServiceIllustration({ kind, paused }) {
  const host = useRef(null);
  useEffect(() => {
    let visible = false;
    const element = host.current;
    const sync = () => element.style.setProperty("--illustration-play", visible && !document.hidden && !paused ? "running" : "paused");
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(element);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", sync); };
  }, [paused]);
  return <span ref={host} className={`service-illustration service-illustration-${kind}`} aria-hidden="true">
    <svg viewBox="0 0 112 84" fill="none" stroke="currentColor" strokeWidth="1.5" focusable="false">
      {kind === 0 && <g className="mini-browser"><rect x="15" y="14" width="82" height="56" rx="4" /><path d="M15 27h82" /><circle cx="22" cy="21" r="1" /><circle cx="27" cy="21" r="1" /><path className="illustration-accent" d="M25 38h28v21H25zM61 39h25M61 46h20M61 53h23" /></g>}
      {kind === 1 && <><rect x="8" y="24" width="27" height="36" rx="3" /><path d="M14 33h15M14 40h10M14 47h12M78 30h23M78 42h23M78 54h23" /><rect x="72" y="22" width="35" height="40" rx="3" /><path d="M39 42h28" strokeDasharray="3 4" /><circle className="api-packet illustration-fill" cx="41" cy="42" r="3" /></>}
      {kind === 2 && <><rect x="34" y="5" width="44" height="74" rx="8" /><path d="M48 11h16M49 73h14" /><g className="phone-boot illustration-accent"><rect x="40" y="19" width="32" height="46" rx="3" /><rect x="46" y="26" width="20" height="12" rx="2" /><path d="M46 45h20M46 51h14M46 57h17" /></g><circle className="phone-power illustration-fill" cx="56" cy="41" r="5" /></>}
      {kind === 3 && <><path d="M19 20 55 13 91 25M19 20 55 42 91 25M19 64 55 42 91 63M19 64 55 72 91 63M55 13v59" stroke="var(--border)" />{[[19,20],[19,64],[55,13],[55,42],[55,72],[91,25],[91,63]].map(([x,y],i)=><circle key={i} className="ml-node illustration-accent" style={{animationDelay:`${i*180}ms`}} cx={x} cy={y} r="5" />)}</>}
      {kind === 4 && <><rect x="17" y="13" width="78" height="58" rx="4" /><path d="M17 25h78M26 37h29M26 47h23M26 57h27" /><path className="test-check illustration-accent" d="m65 47 8 8 14-18" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></>}
    </svg>
  </span>;
}
