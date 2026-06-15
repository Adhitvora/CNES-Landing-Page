import { Info } from "lucide-react";
import { siteData } from "../../data/siteData";
import { Reveal, SectionTitle } from "../UI";
import section from "../../styles/Sections.module.css";

export default function ROI() {
  const data = siteData.roi;
  return (
    <section className={`${section.section} ${section.light}`} id="roi">
      <div className={`container ${section.roiGrid}`}>
        <Reveal>
          <SectionTitle eyebrow={data.eyebrow} title={data.title} description={data.intro} />
          <div className={section.disclaimer}>
            <Info size={18} aria-hidden="true" />
            <span>{data.disclaimer}</span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <ul className={section.roiList}>
            {data.streams.map((stream) => (
              <li key={stream}>{stream}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
