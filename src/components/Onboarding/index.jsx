import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { onboardingData } from "../../data/onboardingData";
import { SectionTitle } from "../UI";
import section from "../../styles/Sections.module.css";

export default function Onboarding() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const step = onboardingData.steps[activeIndex];
  const progress = ((activeIndex + 1) / onboardingData.steps.length) * 100;

  return (
    <section className={`${section.section} ${section.deep}`} id="onboarding">
      <div className="container">
        <SectionTitle eyebrow={onboardingData.eyebrow} title={onboardingData.title} />
        <div className={section.stepper}>
          <div className={section.stepNav} role="tablist" aria-label={onboardingData.title}>
            {onboardingData.steps.map((item, index) => (
              <button
                key={item.title}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                aria-controls="onboarding-panel"
                className={`${section.stepButton} ${index === activeIndex ? section.stepActive : ""}`}
                onClick={() => setActiveIndex(index)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {item.title}
              </button>
            ))}
          </div>

          <div className={section.progressTrack} role="progressbar" aria-label={onboardingData.progressLabel} aria-valuenow={progress}>
            <span style={{ width: `${progress}%` }} />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step.title}
              id="onboarding-panel"
              className={section.stepPanel}
              role="tabpanel"
              initial={reduceMotion ? false : { opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: reduceMotion ? 0 : 0.28 }}
            >
              <div>
                <span className={section.eyebrowRule}>{`Step ${activeIndex + 1}`}</span>
                <h3>{step.title}</h3>
                <p>{step.lead}</p>
              </div>
              <ul>
                {step.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>

          <div className={section.stepControls}>
            <button
              type="button"
              className={section.iconButton}
              aria-label={onboardingData.previousLabel}
              disabled={activeIndex === 0}
              onClick={() => setActiveIndex((index) => Math.max(0, index - 1))}
              title={onboardingData.previousLabel}
            >
              <ArrowLeft aria-hidden="true" />
            </button>
            <button
              type="button"
              className={section.iconButton}
              aria-label={onboardingData.nextLabel}
              disabled={activeIndex === onboardingData.steps.length - 1}
              onClick={() => setActiveIndex((index) => Math.min(onboardingData.steps.length - 1, index + 1))}
              title={onboardingData.nextLabel}
            >
              <ArrowRight aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
