import { siteData } from "../../data/siteData";
import { scrollToEnquiry } from "../../utils/analytics";
import { Button, Reveal } from "../UI";
import section from "../../styles/Sections.module.css";

export default function CTA() {
  const data = siteData.cta;
  return (
    <section className={section.ctaBand} aria-labelledby="cta-title">
      <div className={`container ${section.ctaGrid}`}>
        <Reveal>
          <span className={section.eyebrowRule}>{data.eyebrow}</span>
          <h2 id="cta-title">{data.title}</h2>
          <div className={section.ctaLines}>
            {data.lines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </div>
          <p>{data.body}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <Button variant="dark" magnetic onClick={() => scrollToEnquiry("conversion_band")}>
            {siteData.actions.primary}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
