import { accreditationData } from "../../data/accreditationData";
import { accreditationLogos, mediaLogos, partnerLogos } from "../../assets";
import { Reveal, SectionTitle, InfiniteMarquee } from "../UI";
import styles from "./Accreditation.module.css";

const accents = {
  cyan: "var(--color-cyan-500)",
  gold: "var(--color-gold-500)",
  violet: "var(--color-violet-500)",
};

/* Logos that need a light background for visibility */
const needsLightBg = new Set(["EREPS", "ACE · NASM · AFAA", "SPEFL-SC", "ISSA"]);

export default function Accreditation() {
  return (
    <section className={styles.section} id="accreditation">
      <div className="container">
        <SectionTitle
          eyebrow={accreditationData.eyebrow}
          title={accreditationData.title}
          description={accreditationData.intro}
          align="center"
        />
        <div className={styles.cardGrid}>
          {accreditationData.items.map((item, index) => {
            const logoSrc = accreditationLogos[item.short];
            const isLight = needsLightBg.has(item.short);
            return (
              <Reveal key={item.short} delay={index * 0.06}>
                <article
                  className={styles.card}
                  style={{ "--accent": accents[item.tone] }}
                >
                  <div className={`${styles.logoWrap} ${isLight ? styles.logoWrapLight : ""}`}>
                    {logoSrc ? (
                      <img src={logoSrc} alt={item.short} loading="lazy" />
                    ) : (
                      <span className={styles.logoText}>{item.short}</span>
                    )}
                  </div>
                  <div className={styles.cardBody}>
                    <h3>{item.title}</h3>
                    <p>{item.detail}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
        <p className={styles.closing}>{accreditationData.closing}</p>
      </div>

      {/* Infinite Marquee Carousels */}
      <div className={styles.carousels}>
        <div className="container">
          <div className={styles.marqueeSection}>
            <span className={styles.marqueeLabel}>Featured In</span>
            <InfiniteMarquee items={mediaLogos} speed={32} />
          </div>
          <div className={styles.marqueeSection}>
            <span className={styles.marqueeLabel}>Our Students Work At</span>
            <InfiniteMarquee items={partnerLogos} speed={38} />
          </div>
        </div>
      </div>
    </section>
  );
}
