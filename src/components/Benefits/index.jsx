import { siteData } from "../../data/siteData";
import { iconMap } from "../../utils/iconMap";
import { Reveal, SectionTitle } from "../UI";
import styles from "./Benefits.module.css";

export default function Benefits() {
  const data = siteData.benefits;
  return (
    <section className={styles.section} id="why-cnes">
      <div className="container">
        <SectionTitle eyebrow={data.eyebrow} title={data.title} description={`${data.intro} ${data.body}`} />
        <div className={styles.grid}>
          {data.items.map((item, index) => {
            const Icon = iconMap[item.icon];
            return (
              <Reveal key={item.title} delay={(index % 4) * 0.06}>
                <article className={styles.card}>
                  <div className={styles.cardNumber}>
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className={styles.iconBox}>
                    {Icon ? <Icon size={22} aria-hidden="true" /> : null}
                  </div>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardDesc}>{item.description}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
