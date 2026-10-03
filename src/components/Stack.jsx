import SectionHeader from "./SectionHeader";
import { stackGroups } from "../data/stack";

export default function Stack() {
  return (
    <section className="section" id="stack">
      <SectionHeader number="04" label="TECHNICAL STACK" title="Tools I use to turn requirements into working software." />

      <div className="stack-table reveal">
        {stackGroups.map((group) => (
          <div className="stack-row" key={group.label}>
            <h3>{group.label}</h3>
            <div className="stack-items">
              {group.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
