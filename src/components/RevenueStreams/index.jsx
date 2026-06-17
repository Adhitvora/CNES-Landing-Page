import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { revenueData } from "../../data/revenueData";
import { SectionTitle, Button } from "../UI";
import section from "../../styles/Sections.module.css";
import styles from "./RevenueStreams.module.css";
import { scrollToEnquiry } from "../../utils/analytics";

export default function RevenueStreams() {
  const [activeId, setActiveId] = useState(revenueData.categories[0].id);
  const reduceMotion = useReducedMotion();
  const active = revenueData.categories.find((category) => category.id === activeId);

  function handleKeyDown(event, index) {
    if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (index + direction + revenueData.categories.length) % revenueData.categories.length;
    setActiveId(revenueData.categories[nextIndex].id);
    document.querySelector(`#tab-${revenueData.categories[nextIndex].id}`)?.focus();
  }

  function handleTabClick(categoryId) {
    setActiveId(categoryId);
  }

  return (
    <section className={`${section.section} ${section.dark}`} id="revenue">
      <div className="container">
        <SectionTitle eyebrow={revenueData.eyebrow} title={revenueData.title} description={revenueData.intro} />

        <div className={styles.tabs} role="tablist" aria-label={revenueData.tabsLabel}>
          {revenueData.categories.map((category, index) => {
            const isActive = activeId === category.id;
            return (
              <button
                key={category.id}
                type="button"
                id={`tab-${category.id}`}
                className={styles.tab}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${category.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => handleTabClick(category.id)}
                onKeyDown={(event) => handleKeyDown(event, index)}
              >
                {category.label}
                {isActive && <motion.span className={styles.activeIndicator} layoutId="activeTab" transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} />}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            id={`panel-${active.id}`}
            className={section.revenuePanel}
            role="tabpanel"
            aria-labelledby={`tab-${active.id}`}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.32 }}
          >
            <div>
              <h3>{active.title}</h3>
              <p>{active.description}</p>
              <ul className={section.programList}>
                {active.programs.map((program) => (
                  <li key={program}>
                    <Check size={16} color="var(--color-cyan-500)" aria-hidden="true" />
                    {program}
                  </li>
                ))}
              </ul>
            </div>
            <aside className={styles.supportPanel}>
              <h4>{revenueData.cta.title}</h4>
              <p>{revenueData.cta.description}</p>
              <Button full magnetic={false} icon={false} 
                            onClick={() => scrollToEnquiry("faq_sidebar")}
                            style={{ marginTop: 8 }}
                          >
                {revenueData.cta.primaryButton}
              </Button>
            </aside>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
