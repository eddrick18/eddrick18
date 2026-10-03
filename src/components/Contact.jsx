export default function Contact() {
  const email = "eddrickmiano11@gmail.com";

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      const button = document.getElementById("copy-email");
      if (button) {
        button.textContent = "EMAIL COPIED";
        window.setTimeout(() => {
          button.textContent = "COPY EMAIL";
        }, 1800);
      }
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <section className="contact section" id="contact">
      <div className="contact-heading reveal">
        <div className="section-index">
          <span>06</span>
          <span>—</span>
          <span>CONTACT</span>
        </div>
        <h2>Let’s build something useful<span className="accent">.</span></h2>
      </div>

      <div className="contact-grid reveal">
        <p>
          Open to entry-level frontend, mobile, software-development, and Computer
          Engineering opportunities.
        </p>

        <div className="contact-actions">
          <a className="contact-email" href={`mailto:${email}`}>
            {email} ↗
          </a>
          <button id="copy-email" type="button" onClick={copyEmail}>
            COPY EMAIL
          </button>
        </div>
      </div>

      <div className="contact-details reveal">
        <a href="https://github.com/eddrick18" target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
        <a href="tel:+639454817970">+63 945 481 7970</a>
        <span>Escalante City, Negros Occidental, PH</span>
      </div>
    </section>
  );
}
