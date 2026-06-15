import { Target, Eye, CheckCircle } from "lucide-react";
import { aboutData } from "../../data/aboutData";
import { Reveal, SectionTitle } from "../UI";
import section from "../../styles/Sections.module.css";

const missionHighlights = ["Affordable Education", "Industry-Relevant Skills", "Career Readiness"];
const visionHighlights = ["Global Standards", "Professional Excellence", "Trusted Network"];

export default function MissionVision() {
  const items = [aboutData.mission, aboutData.vision];
  const icons = [Target, Eye];
  const highlights = [missionHighlights, visionHighlights];

  return (
    <section className={`${section.section} ${section.deep}`} aria-label="CNES mission and vision">
      <div className="container">
        <SectionTitle
          eyebrow="Our Foundation"
          title="Driven by Purpose, Built for Impact"
          align="center"
        />
        <div className={section.missionGrid} style={{ marginTop: 36 }}>
          {items.map((item, index) => {
            const Icon = icons[index];
            return (
              <Reveal key={item.label} delay={index * 0.12}>
                <article className={section.missionCard}>
                  <div className={section.missionIconBox}>
                    <Icon size={26} aria-hidden="true" />
                  </div>
                  <span>{item.label}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <div className={section.missionHighlights}>
                    {highlights[index].map((point) => (
                      <span key={point} className={section.missionHighlight}>
                        <CheckCircle size={12} aria-hidden="true" />
                        {point}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
