import SectionHeader from "./SectionHeader";

const offerings = [
  {
    title: "Responsive web development",
    description: "Build clear, easy-to-use websites and interfaces with React and TypeScript that work across desktop and mobile screens.",
  },
  {
    title: "Backend and API integration",
    description: "Connect interfaces to REST APIs and build Laravel features for authentication, data management, and everyday business workflows.",
  },
  {
    title: "Mobile app development",
    description: "Develop mobile interfaces and features with React Native and Expo, drawing on hands-on internship experience.",
  },
  {
    title: "AI/ML Engineering",
    description: "Train, evaluate, and integrate machine-learning models using Python and TensorFlow, drawing on experience with audio analysis in a smart stethoscope project.",
  },
  {
    title: "Testing and troubleshooting",
    description: "Investigate bugs, verify user workflows, and write backend feature tests to help keep applications working as expected.",
  },
];

export default function Offer() {
  return (
    <section className="section offer" id="offer">
      <SectionHeader number="01" label="WHAT I CAN OFFER" title="Practical support for your next build." />
      <div className="offer-grid">
        {offerings.map((offering) => (
          <article className="offer-item reveal" key={offering.title}>
            <h3>{offering.title}</h3>
            <p>{offering.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
