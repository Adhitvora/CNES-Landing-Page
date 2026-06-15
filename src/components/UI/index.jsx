import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion, useSpring } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import { useMagnetic } from "../../hooks/useMagnetic";
import styles from "./UI.module.css";

export function Button({
  children,
  variant = "primary",
  full = false,
  magnetic = false,
  icon = true,
  className = "",
  ...props
}) {
  const reduceMotion = useReducedMotion();
  const magneticProps = useMagnetic(!magnetic || reduceMotion);
  const variantClass = variant === "secondary" ? styles.secondary : variant === "dark" ? styles.dark : "";

  return (
    <button
      type="button"
      className={`${styles.button} ${variantClass} ${full ? styles.full : ""} ${className}`}
      {...magneticProps}
      {...props}
    >
      {children}
      {icon ? <ArrowRight size={18} aria-hidden="true" /> : null}
    </button>
  );
}

export function SectionTitle({ eyebrow, title, description, align = "left" }) {
  return (
    <div className={`${styles.sectionTitle} ${align === "center" ? styles.center : ""}`}>
      <span className={styles.eyebrow}>{eyebrow}</span>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}

export function AnimatedCounter({ value, prefix = "", suffix = "" }) {
  const spring = useSpring(0, { stiffness: 70, damping: 22 });
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setDisplay(value);
      return;
    }
    spring.set(value);
  }, [inView, reduceMotion, spring, value]);

  useEffect(() => {
    if (reduceMotion) return undefined;
    return spring.on("change", (latest) => setDisplay(Math.round(latest)));
  }, [reduceMotion, spring]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

export function Reveal({ children, delay = 0, y = 24, className = "" }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.62, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Badge({ children }) {
  return <span className={styles.badge}>{children}</span>;
}

export function Accordion({ item, open, onToggle }) {
  const reduceMotion = useReducedMotion();
  return (
    <div className={styles.accordion}>
      <h3>
        <button className={styles.accordionButton} aria-expanded={open} onClick={onToggle}>
          {item.question}
          <Plus className={styles.accordionIcon} size={22} aria-hidden="true" />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            className={styles.accordionPanel}
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.3 }}
          >
            <p>{item.answer}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function Loader() {
  return <span className={styles.loader} aria-hidden="true" />;
}

export function Modal({ open, children, onClose, label }) {
  if (!open) return null;
  return (
    <div className={styles.modalBackdrop} role="presentation" onMouseDown={onClose}>
      <div className={styles.modal} role="dialog" aria-modal="true" aria-label={label} onMouseDown={(event) => event.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export function Carousel({ children, label }) {
  return (
    <div className={styles.carousel} role="region" aria-label={label}>
      {children}
    </div>
  );
}

export function Card({ as: Component = "article", children, className = "", ...props }) {
  return (
    <Component className={`${styles.card} ${className}`} {...props}>
      {children}
    </Component>
  );
}

export function FlipCard({ front, back, label }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <button
      type="button"
      className={styles.flipCard}
      aria-label={label}
      aria-pressed={flipped}
      onClick={() => setFlipped((current) => !current)}
    >
      {flipped ? back : front}
    </button>
  );
}

export function Timeline({ items, label }) {
  return (
    <ol className={styles.timelineList} aria-label={label}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ol>
  );
}
