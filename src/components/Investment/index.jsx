import { Check } from "lucide-react";
import { siteData } from "../../data/siteData";
import { Reveal, SectionTitle, LinkButton } from "../UI";
import section from "../../styles/Sections.module.css";

export default function Investment() {
  const data = siteData.investment;
  return (
    <section className={`${section.section} ${section.investmentBand}`} id="investment">
      <div className={`container ${section.investmentGrid}`}>
        <Reveal>
          <SectionTitle eyebrow={data.eyebrow} title={data.title} description={data.intro} />
          <span>{data.label}</span>
          <strong className={section.amount}>{data.amount}</strong>
        </Reveal>
        <Reveal delay={0.1}>
          <strong>{data.note}</strong>
          <ul className={section.factorList}>
            {data.factors.map((factor) => (
              <li key={factor}>
                <Check size={17} aria-hidden="true" />
                {factor}
              </li>
            ))}
          </ul>
          <div style={{ marginTop: 18 }}>
            <LinkButton
              href={`tel:${siteData.contact.phoneHref}`}
              variant="dark"
              onClick={() => {
                // small analytics hook
                try { window.trackEvent?.("cta_click", { source: "investment_call" }); } catch (e) {}
              }}
            >
              {siteData.actions.call || "Call an Advisor"}
            </LinkButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
