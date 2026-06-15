import { aboutData } from "../../data/aboutData";
import { Reveal, SectionTitle } from "../UI";
import section from "../../styles/Sections.module.css";

export default function MissionVision() {
  const items = [aboutData.mission, aboutData.vision];
  return (
    <section className={`${section.section} ${section.deep}`} aria-label="CNES mission and vision">
      <div className="container">
        <SectionTitle
          eyebrow="Our Foundation"
          title="Driven by Purpose, Built for Impact"
          align="center"
        />
        <div className={section.missionGrid} style={{ marginTop: 48 }}>
          {items.map((item, index) => (
            <Reveal key={item.label} delay={index * 0.12}>
              <article className={section.missionCard}>
                <span>{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
