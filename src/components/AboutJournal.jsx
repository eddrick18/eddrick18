import StackedJournalAlbum from "./StackedJournalAlbum";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, LazyMotion, domAnimation, m as motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import photos from "../data/journalPhotos.json";
import "../about-journal.css";

const asset = file => `${import.meta.env.BASE_URL}journal/${file}`;
const photoById = Object.fromEntries(photos.map(photo => [photo.id, photo]));
const chapters = [
  { id:"hard-hatting", date:"19 MAY 2025", stage:"THIRD YEAR", title:"From classroom learning to real-world responsibility.", text:"Receiving my hard hat during my third year at Silliman University—a milestone in my engineering journey, symbolizing readiness to apply what I had learned and carry forward the values of safety, integrity, and accountability.", ids:["hard-hatting"] },
  { id:"internship", date:"MAY–JUL 2025", stage:"THIRD YEAR", title:"Learning, building, and growing together.", text:"My internship at Bluebeans Systems: building the mobile frontend, connecting authentication and backend APIs, and learning alongside the team. Between focused work and shared laughs, every day became part of my journey toward becoming a developer.", ids:["internship-team","internship-workspace","internship-learning"], video:true },
  { id:"thesis", date:"APR 2025–MAR 2026", stage:"THIRD TO FOURTH YEAR", title:"Building the prototype. Growing as a team.", text:"From training heart and lung sound models to assembling hardware and bringing the prototype together, our Smart Stethoscope thesis turned classroom knowledge into hands-on engineering. Debugging sessions, shared meals, and small breakthroughs made the journey as memorable as the finished project.", note:"Thesis development overlapped our internship and continued into fourth year.", ids:["thesis-team-prototype","thesis-assembly","thesis-hardware","thesis-team-break","thesis-evaluation","thesis-training","thesis-printing","thesis-bench"] },
  { id:"ring-hop", date:"19 MAR 2026", stage:"FOURTH YEAR", title:"One step closer to the next chapter.", text:"Celebrating our Ring Hop ceremony with classmates before graduation—a moment to appreciate the friendships, shared challenges, and memories that shaped our years at Silliman University.", ids:["ring-hop-friends","ring-hop-class","ring-hop-ceremony","ring-hop-portrait","ring-hop-ring"] },
  { id:"graduation", date:"MAR 2026", stage:"GRADUATION", title:"Closing one chapter. Ready to build the next.", text:"My final day at Silliman as a student, graduating in Computer Engineering. A day to celebrate the friendships, challenges, and shared achievements that shaped me—and carry those lessons into my next chapter as a developer.", ids:["graduation-class","graduation-portrait","graduation-mirror"] },
].map(chapter => ({...chapter, photos:chapter.ids.map(id => photoById[id])}));

function JournalImage({ photo, thumbnail=false, ...props }) {
  const [failed,setFailed]=useState(false);
  useEffect(()=>setFailed(false),[photo.file]);
  return failed ? <span className="journal-media-error" role="status">Photo unavailable. {photo.caption}</span> : <img {...props} src={asset(thumbnail?photo.thumb:photo.file)} alt={photo.alt} width={photo.width} height={photo.height} onError={()=>setFailed(true)} />;
}

function JournalAlbum({ selection, onClose }) {
  const reduced=useReducedMotion();
  const ref=useRef(null);
  const [index,setIndex]=useState(selection.index);
  const [closing,setClosing]=useState(false);
  const [videoError,setVideoError]=useState(false);
  const { chapter }=selection;
  const items=chapter.photos;
  const isVideo=index===items.length;
  const total=items.length+(chapter.video?1:0);
  const close=()=>setClosing(true);
  useEffect(()=>{
    const overflow=document.body.style.overflow;
    document.body.style.overflow="hidden";
    ref.current.showModal();
    ref.current.querySelector('.journal-album-close').focus();
    return ()=>{ ref.current?.close(); document.body.style.overflow=overflow; selection.opener?.focus({preventScroll:true}); };
  },[]);
  return <dialog ref={ref} className="journal-album" aria-labelledby="journal-album-title" onCancel={event=>{event.preventDefault();event.stopPropagation();close();}} onKeyDown={event=>{if(event.target.tagName==='VIDEO')return; if(event.key==='ArrowRight'){event.preventDefault();setIndex(value=>Math.min(total-1,value+1));} if(event.key==='ArrowLeft'){event.preventDefault();setIndex(value=>Math.max(0,value-1));}}}>
    <motion.div className="journal-album-inner" initial={reduced?false:{opacity:0,y:16}} animate={closing?{opacity:0,y:reduced?0:12}:{opacity:1,y:0}} transition={{duration:reduced?0:.2}} onAnimationComplete={()=>{if(closing)onClose();}}>
      <header className="journal-album-header"><div><p className="journal-kicker">FIELD JOURNAL / {chapter.date}</p><h3 id="journal-album-title">{chapter.title}</h3></div><button className="showcase-button journal-album-close" onClick={close}>Close <span aria-hidden="true">×</span></button></header>
      <div className="journal-album-stage"><AnimatePresence mode="wait" initial={false}><motion.figure key={index} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:reduced?0:.16}}>
        {isVideo?<><video controls playsInline preload="none" poster={asset('internship-video-poster.webp')} aria-label="Silent internship moments at Bluebeans Systems" onError={()=>setVideoError(true)}><source src={asset('internship-moments.mp4')} type="video/mp4" /></video>{videoError&&<p role="alert">Video unavailable. You can still explore the internship photos.</p>}<figcaption>Shared moments at the internship workspace. Silent clip; playback is entirely under your control.</figcaption></>:<><JournalImage photo={items[index]} /><figcaption>{items[index].caption}</figcaption></>}
      </motion.figure></AnimatePresence></div>
      <div className="journal-album-nav"><button className="showcase-button" disabled={index===0} onClick={()=>setIndex(index-1)} aria-label="Previous journal item">←</button><p role="status">{index+1} / {total} · {isVideo?'Video':'Photo'}</p><button className="showcase-button" disabled={index===total-1} onClick={()=>setIndex(index+1)} aria-label="Next journal item">→</button></div>
      <div className="journal-thumbnails" role="group" aria-label="Choose a journal photo">{items.map((photo,i)=><button key={photo.id} aria-label={`Show photo ${i+1}: ${photo.caption}`} aria-pressed={index===i} onClick={()=>setIndex(i)}><JournalImage photo={photo} thumbnail loading="lazy" /></button>)}{chapter.video&&<button aria-pressed={isVideo} onClick={()=>setIndex(items.length)}>Play clip <span aria-hidden="true">▷</span></button>}</div>
    </motion.div>
  </dialog>;
}

export default function AboutJournal() {
  const reduced=useReducedMotion();
  const rail=useRef(null);
  const [selection,setSelection]=useState(null);
  const {scrollYProgress}=useScroll({target:rail,offset:['start center','end center']});
  const progress=useSpring(scrollYProgress,{stiffness:100,damping:30});
  return <MotionConfig reducedMotion="user"><LazyMotion features={domAnimation} strict><section className="about-journal" aria-labelledby="journal-title" id="field-journal">
    <motion.header className="journal-heading" initial={reduced?false:{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.2}} transition={{duration:.5}}><p className="journal-kicker">BEYOND THE SCREEN / FIELD NOTES</p><h3 id="journal-title">The work—and the people—<span>behind the degree.</span></h3><p>A few moments from the classroom, the workspace, and everything in between.</p></motion.header>
    <div className="journal-chapters" ref={rail}><div className="journal-rail" aria-hidden="true"><motion.span style={{scaleY:reduced?1:progress}} /></div>
      {chapters.map((chapter,chapterIndex)=>{const chapterPhotos=chapter.photos; return <article className={`journal-chapter journal-chapter-${chapter.id}`} key={chapter.id}>
        <motion.div className="journal-entry" initial={reduced?false:{opacity:0,y:22}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.15}} transition={{duration:.5}}><p className="journal-date"><span aria-hidden="true" className="journal-dot" />{chapter.date}</p><p className="journal-kicker">{chapter.stage}</p><h4>{chapter.title}</h4><p>{chapter.text}</p>{chapter.note&&<p className="journal-overlap">{chapter.note}</p>}<button className="journal-open-link" onClick={event=>setSelection({chapter,index:0,opener:event.currentTarget})}>Explore this chapter <span aria-hidden="true">↗</span><span className="sr-only">: {chapter.id}</span></button></motion.div>
        <div className="journal-contact-sheet">{chapterPhotos.length > 1 ? <StackedJournalAlbum photos={chapterPhotos} label={chapter.id === "ring-hop" ? "Ring Hop" : chapter.id.charAt(0).toUpperCase() + chapter.id.slice(1)} number={chapterIndex+1} onOpen={event=>setSelection({chapter,index:0,opener:event.currentTarget})} /> : chapterPhotos.slice(0,3).map((photo,index)=><motion.figure className={`journal-photo journal-photo-${index}`} key={photo.id} initial={reduced?false:{opacity:0,y:28,rotate:index===1?2:-1}} whileInView={{opacity:1,y:0,rotate:0}} viewport={{once:true,amount:.12}} transition={{duration:.55,delay:index*.09}}><motion.button onClick={event=>setSelection({chapter,index,opener:event.currentTarget})} whileHover={reduced?undefined:{y:-5}} whileFocus={reduced?undefined:{y:-3}} whileTap={reduced?undefined:{scale:.99}} transition={{type:'spring',stiffness:280,damping:24}} aria-label={`Open ${chapter.id} photo ${index+1}: ${photo.caption}`}><JournalImage photo={photo} loading="lazy" decoding="async" /><span className="journal-photo-corner" aria-hidden="true">↗</span></motion.button><figcaption><span className="journal-frame-label">{String(chapterIndex+1).padStart(2,'0')} / {String(index+1).padStart(2,'0')}</span>{photo.caption}</figcaption></motion.figure>)}
          {chapter.video&&<button className="journal-video-link" onClick={event=>setSelection({chapter,index:chapterPhotos.length,opener:event.currentTarget})}>Watch internship moments <span aria-hidden="true">▷</span><small>11 sec · silent</small></button>}
        </div>
      </article>;})}
    </div>
    {selection&&<JournalAlbum selection={selection} onClose={()=>setSelection(null)} />}
  </section></LazyMotion></MotionConfig>;
}
