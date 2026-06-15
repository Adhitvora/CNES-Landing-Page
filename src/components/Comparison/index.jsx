import { XCircle, CheckCircle2 } from "lucide-react";
import { siteData } from "../../data/siteData";
import { Reveal, SectionTitle } from "../UI";
import section from "../../styles/Sections.module.css";

export default function Comparison() {
  const data = siteData.comparison;
  return (
    <section className={`${section.section} ${section.light}`} id="comparison">
      <div className="container">
        <SectionTitle eyebrow={data.eyebrow} title={data.title} description={data.intro} align="center" />
        <div className={section.comparisonGrid}>
          {data.columns.map((column, index) => (
            <Reveal key={column.label} delay={index * 0.1}>
              <article className={`${section.comparisonColumn} ${column.tone === "accent" ? section.comparisonAccent : ""}`}>
                <h3>{column.label}</h3>
                <ul>
                  {column.items.map((item) => (
                    <li key={item}>
                      {column.tone === "accent" ? (
                        <CheckCircle2 size={19} color="var(--color-green-500)" aria-hidden="true" />
                      ) : (
                        <XCircle size={19} color="var(--color-danger)" aria-hidden="true" />
                      )}
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
