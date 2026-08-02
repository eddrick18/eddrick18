export default function SectionHeader({ number, label, title }) {
  return (
    <div className="section-heading reveal">
      <div className="section-index">
        <span>{number}</span>
        <span>—</span>
        <span>{label}</span>
      </div>
      <h2>{title}</h2>
    </div>
  );
}
