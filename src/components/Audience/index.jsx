import { siteData } from "../../data/siteData";
import { iconMap } from "../../utils/iconMap";
import { Reveal, SectionTitle } from "../UI";
import section from "../../styles/Sections.module.css";

export default function Audience() {
  const data = siteData.audience;
  return (
    <section className={`${section.section} ${section.white}`} id="audience">
      <div className="container">
        <SectionTitle eyebrow={data.eyebrow} title={data.title} align="center" />
        <div className={section.personaGrid}>
          {data.items.map((item, index) => {
            const Icon = iconMap[item.icon];
            return (
              <Reveal key={item.title} delay={index * 0.06}>
                <article className={section.personaCard}>
                  <div className={section.iconBox}>{Icon ? <Icon size={23} aria-hidden="true" /> : null}</div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
