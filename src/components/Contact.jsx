import { useState } from "react";

export default function Contact() {
  const email = "eddrickmiano11@gmail.com";
  const [copyStatus, setCopyStatus] = useState("");
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopyStatus("Email copied to clipboard.");
    } catch {
      setCopyStatus("Could not copy. Select the email address or use the email link.");
    }
  };
  return (
    <section className="contact contact-finale section" id="contact" aria-labelledby="contact-title">
      <div className="contact-heading reveal">
        <div className="contact-masthead"><div className="section-index"><span>06</span><span>—</span><span>CONTACT</span></div><span className="contact-availability"><span aria-hidden="true" />OPEN TO OPPORTUNITIES</span></div>
        <h2 id="contact-title">Let’s build<span>something</span><span className="accent">useful.</span></h2>
      </div>
      <div className="contact-grid reveal">
        <div className="contact-invitation"><p>Open to entry-level frontend, mobile, software-development, and Computer Engineering opportunities.</p><p className="contact-location">Escalante City, Negros Occidental, PH</p></div>
        <div className="contact-actions">
          <span className="contact-action-label">START A CONVERSATION</span>
          <a className="contact-email" href={`mailto:${email}`}>{email}<span className="action-arrow arrow-diagonal" aria-hidden="true">↗</span></a>
          <div className="contact-secondary-actions"><button id="copy-email" type="button" onClick={copyEmail}>{copyStatus === "Email copied to clipboard." ? "EMAIL COPIED" : "COPY EMAIL"}</button><a href={`${import.meta.env.BASE_URL}Eddrick_Miano_Resume_2026.pdf?v=25ccadc27551`} target="_blank" rel="noreferrer">VIEW RÉSUMÉ <span className="action-arrow arrow-diagonal" aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a></div>
          <p className="contact-copy-status" role="status">{copyStatus}</p>
        </div>
      </div>
      <div className="contact-details reveal">
        <a href="https://github.com/eddrick18" target="_blank" rel="noreferrer">GitHub <span className="action-arrow arrow-diagonal" aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
        <a href="https://www.linkedin.com/in/eddrick-miano-03971b400" target="_blank" rel="noreferrer">LinkedIn <span className="action-arrow arrow-diagonal" aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
        <a href="tel:+639454817970">+63 945 481 7970</a>
        <a href="#top">Back to top <span className="action-arrow arrow-up" aria-hidden="true">↑</span></a>
      </div>
    </section>
  );
}
