import { accreditationData } from "../../data/accreditationData";
import { accreditationLogos, mediaLogos, partnerLogos } from "../../assets";
import { Reveal, SectionTitle } from "../UI";
import styles from "./Accreditation.module.css";

const accents = {
  cyan: "var(--color-cyan-500)",
  gold: "var(--color-gold-500)",
  violet: "var(--color-violet-500)",
};

function Marquee({ items, label, speed = 30 }) {
  // Duplicate items for seamless loop
  const doubled = [...items, ...items];
  return (
    <div className={styles.marqueeSection}>
      <span className={styles.marqueeLabel}>{label}</span>
      <div className={styles.marqueeTrack} style={{ "--marquee-speed": `${speed}s` }}>
        <div className={styles.marqueeSlide} aria-hidden="false">
          {doubled.map((logo, i) => (
            <img key={`${logo.alt}-${i}`} src={logo.src} alt={logo.alt} loading="lazy" />
          ))}
        </div>
      </div>
    </div>
  );
}

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
            return (
              <Reveal key={item.short} delay={index * 0.06}>
                <article
                  className={styles.card}
                  style={{ "--accent": accents[item.tone] }}
                >
                  <div className={styles.logoWrap}>
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
          <Marquee items={mediaLogos} label="Featured In" speed={28} />
          <Marquee items={partnerLogos} label="Our Students Work At" speed={32} />
        </div>
      </div>
    </section>
  );
}
