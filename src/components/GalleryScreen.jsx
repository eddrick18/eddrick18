import { useEffect, useRef, useState } from "react";

const asset = file => `${import.meta.env.BASE_URL}projects/${file}`;

function ScreenshotZoom({ screen, opener, onClose }) {
  const dialog = useRef(null);
  const [actualSize, setActualSize] = useState(false);
  useEffect(() => {
    dialog.current.showModal();
    return () => { dialog.current?.close(); opener?.focus({preventScroll:true}); };
  }, []);
  return <dialog ref={dialog} className="screenshot-zoom" aria-label={`${screen.label} screenshot enlarged`} onCancel={event => { event.preventDefault(); event.stopPropagation(); onClose(); }}>
    <header className="screenshot-zoom-header"><span>{screen.label}</span><div><button className="showcase-button" onClick={() => setActualSize(value => !value)} aria-pressed={actualSize}>{actualSize ? "Fit to screen" : "Actual size"}</button><button className="showcase-button" onClick={onClose} autoFocus>Close zoom <span aria-hidden="true">×</span></button></div></header>
    <div className={`screenshot-zoom-canvas ${actualSize ? "screenshot-actual-size" : ""}`}><img src={asset(screen.file)} alt={screen.alt} /></div>
    <p>{screen.caption}</p>
  </dialog>;
}

export default function GalleryScreen({ screen }) {
  const [previous, setPrevious] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [zoom, setZoom] = useState(null);
  const last = useRef(screen);
  useEffect(() => {
    if (last.current.file !== screen.file) {
      setPrevious(last.current);
      last.current = screen;
      setLoaded(false);
      setFailed(false);
    }
  }, [screen.file]);
  useEffect(() => {
    if (!loaded) return;
    const timer = setTimeout(() => setPrevious(null), 300);
    return () => clearTimeout(timer);
  }, [loaded]);
  return <>
    <div className="gallery-crossfade" aria-busy={!loaded && !failed}>
      {previous && !failed && <img className="gallery-previous" src={asset(previous.file)} alt="" aria-hidden="true" />}
      {!failed ? <img key={screen.file} className={`gallery-current ${loaded ? "is-loaded" : ""}`} src={asset(screen.file)} alt={screen.alt} onLoad={() => setLoaded(true)} onError={() => {setFailed(true); setPrevious(null);}} /> : <p className="media-unavailable" role="status">Screenshot unavailable. You can still read the project details below.</p>}
    </div>
    <div className="gallery-image-actions"><span className="gallery-image-status" role="status">{!loaded && !failed ? "Loading screenshot…" : ""}</span><button className="showcase-button" disabled={!loaded || failed} onClick={event => setZoom(event.currentTarget)} aria-label={`Enlarge ${screen.label} screenshot`}>Enlarge screenshot <span aria-hidden="true">↗</span></button></div>
    {zoom && <ScreenshotZoom screen={screen} opener={zoom} onClose={() => setZoom(null)} />}
  </>;
}
