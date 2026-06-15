import { CheckCircle2 } from "lucide-react";
import { siteData } from "../../data/siteData";
import { Badge, Reveal, SectionTitle } from "../UI";
import section from "../../styles/Sections.module.css";

export default function FutureFitness() {
  const data = siteData.future;
  return (
    <section className={section.futureSection} id="future">
      <div className={section.futureMedia}>
        <img
          src={data.image.src}
          alt={data.image.alt}
          width={data.image.width}
          height={data.image.height}
          loading="lazy"
        />
      </div>
      <div className="container">
        <Reveal className={section.futureCopy}>
          <SectionTitle eyebrow={data.eyebrow} title={data.title} />
          {data.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className={section.pointRow}>
            {data.points.map((point) => (
              <Badge key={point}>
                <CheckCircle2 size={15} aria-hidden="true" />
                {point}
              </Badge>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
