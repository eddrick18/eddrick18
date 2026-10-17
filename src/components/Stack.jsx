import SectionHeader from "./SectionHeader";
import { stackGroups } from "../data/stack";

const stackIcons = {
  "JavaScript": "javascript",
  "TypeScript": "typescript",
  "Python": "python",
  "PHP": "php",
  "C++": "cplusplus",
  "React": "react",
  "React Native": "react",
  "Expo": "expo",
  "HTML": "html5",
  "CSS": "css",
  "Tailwind CSS": "tailwindcss",
  "Node.js": "nodedotjs",
  "Laravel": "laravel",
  "REST API Integration": "network",
  "TensorFlow": "tensorflow",
  "TensorFlow Lite": "tensorflow",
  "n8n": "n8n",
  "MySQL": "mysql",
  "Airtable": "airtable",
  "Git": "git",
  "GitHub": "github",
  "Figma": "figma"
};

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
                <span className="stack-technology" key={item}>
                  <img className="stack-icon" src={`${import.meta.env.BASE_URL}icons/${stackIcons[item]}.svg`} alt="" aria-hidden="true" width="22" height="22" loading="lazy" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
