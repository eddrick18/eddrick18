import { useState } from "react";
import { m as motion, useReducedMotion } from "motion/react";
import "../journal-stacks.css";

const asset = file => `${import.meta.env.BASE_URL}journal/${file}`;
export default function StackedJournalAlbum({ photos, label, number, onOpen }) {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  return <motion.figure className="journal-stacked-album" initial={reduced?false:{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.15}} transition={{duration:.5}}>
    <button className="journal-stack-button" type="button" aria-label={`Next ${label} photo (${active+1} of ${photos.length})`} onClick={()=>setActive(index=>(index+1)%photos.length)}>
      <span className="journal-stack-stage">
        {Array.from({length:Math.min(3,photos.length)},(_,position)=>{
          const photo=photos[(active+position)%photos.length];
          return <motion.span className="journal-stack-layer" aria-hidden="true" key={photo.id} initial={false} animate={{left:`${position*9}%`,bottom:`${position*9}%`,rotate:0}} style={{zIndex:photos.length-position}} transition={reduced?{duration:0}:{type:"spring",stiffness:230,damping:26}}><img src={asset(photo.file)} alt="" loading="lazy" decoding="async" width={photo.width} height={photo.height} /></motion.span>;
        })}
        <span className="journal-stack-count" aria-hidden="true">{active+1} / {photos.length} · NEXT ↻</span>
      </span>
    </button>
    <div className="journal-stack-label"><span>{label}</span><button type="button" className="journal-stack-open" aria-label={`Open ${label} album: ${photos.length} photos`} onClick={onOpen}>Open album ↗</button></div>
    <figcaption aria-live="polite"><span className="journal-frame-label">{String(number).padStart(2,"0")} / FIELD ALBUM</span>{photos[active].caption}</figcaption>
  </motion.figure>;
}
