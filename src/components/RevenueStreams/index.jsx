import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { revenueData } from "../../data/revenueData";
import { SectionTitle } from "../UI";
import section from "../../styles/Sections.module.css";

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

  return (
    <section className={`${section.section} ${section.dark}`} id="revenue">
      <div className="container">
        <SectionTitle eyebrow={revenueData.eyebrow} title={revenueData.title} description={revenueData.intro} />

        <div className={section.tabs} role="tablist" aria-label={revenueData.tabsLabel}>
          {revenueData.categories.map((category, index) => (
            <button
              key={category.id}
              type="button"
              id={`tab-${category.id}`}
              className={section.tab}
              role="tab"
              aria-selected={activeId === category.id}
              aria-controls={`panel-${category.id}`}
              tabIndex={activeId === category.id ? 0 : -1}
              onClick={() => setActiveId(category.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              {category.label}
            </button>
          ))}
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
            transition={{ duration: reduceMotion ? 0 : 0.28 }}
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
            <aside className={section.meterCard}>
              <span>{revenueData.visualization.label}</span>
              <strong>{active.strength}%</strong>
              <div className={section.meter} aria-hidden="true">
                <motion.span
                  initial={reduceMotion ? false : { width: 0 }}
                  animate={{ width: `${active.strength}%` }}
                  transition={{ duration: reduceMotion ? 0 : 0.45 }}
                />
              </div>
              <small>{revenueData.visualization.note}</small>
            </aside>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
