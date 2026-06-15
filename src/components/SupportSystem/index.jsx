import { Rocket, BookOpen, BarChart3, Megaphone, Briefcase, TrendingUp } from "lucide-react";
import { supportData } from "../../data/supportData";
import { Reveal, SectionTitle } from "../UI";
import styles from "./SupportSystem.module.css";

const stepIcons = [Rocket, BookOpen, BarChart3, Megaphone, Briefcase, TrendingUp];

export default function SupportSystem() {
  return (
    <section className={styles.section} id="support">
      <div className="container">
        <SectionTitle
          eyebrow={supportData.eyebrow}
          title={supportData.title}
          description={supportData.intro}
          align="center"
        />
        <div className={styles.timeline}>
          <div className={styles.timelineLine} aria-hidden="true" />
          {supportData.items.map((item, index) => {
            const Icon = stepIcons[index] || Rocket;
            const isEven = index % 2 === 0;
            return (
              <Reveal key={item.number} delay={index * 0.08}>
                <div className={`${styles.step} ${isEven ? styles.stepUp : styles.stepDown}`}>
                  <div className={styles.connector} aria-hidden="true">
                    <div className={styles.node}>
                      <span className={styles.nodeNumber}>{item.number}</span>
                    </div>
                    <div className={styles.stem} />
                  </div>
                  <article className={styles.card}>
                    <div className={styles.cardIcon}>
                      <Icon size={22} aria-hidden="true" />
                    </div>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    {item.description && (
                      <p className={styles.cardDesc}>{item.description}</p>
                    )}
                    <ul className={styles.cardList}>
                      {item.items.map((support) => (
                        <li key={support}>{support}</li>
                      ))}
                    </ul>
                  </article>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
