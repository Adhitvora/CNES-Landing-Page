import { aboutData } from "../../data/aboutData";
import { Reveal, SectionTitle } from "../UI";
import section from "../../styles/Sections.module.css";

export default function About() {
  return (
    <section className={`${section.section} ${section.dark}`} id="about">
      <div className={`container ${section.grid2}`}>
        <Reveal className={section.mediaFrame}>
          <img
            src={aboutData.image.src}
            alt={aboutData.image.alt}
            width={aboutData.image.width}
            height={aboutData.image.height}
            loading="lazy"
          />
        </Reveal>
        <Reveal className={section.copy} delay={0.1}>
          <SectionTitle eyebrow={aboutData.eyebrow} title={aboutData.title} />
          <p>{aboutData.body}</p>
          {aboutData.story.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
