import { siteData } from "../../data/siteData";
import { Reveal, SectionTitle } from "../UI";
import section from "../../styles/Sections.module.css";

export default function Growth() {
  const data = siteData.growth;
  return (
    <section className={`${section.section} ${section.dark}`} id="growth">
      <div className="container">
        <div className={section.growthHeader}>
          <SectionTitle eyebrow={data.eyebrow} title={data.title} description={data.intro} />
          <strong className={section.duration}>{data.duration}</strong>
        </div>
        <div className={section.timeline}>
          {data.stages.map((stage, index) => (
            <Reveal key={stage} delay={index * 0.08}>
              <div className={section.timelineItem}>{stage}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
