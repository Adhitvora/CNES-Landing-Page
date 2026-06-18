import { useEffect, useRef, useState, Children, cloneElement } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion, useSpring } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import { useMagnetic } from "../../hooks/useMagnetic";
import { siteData } from "../../data/siteData";
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

export function AnimatedCounter({ value, prefix = "", suffix = "", duration = 2 }) {
  const spring = useSpring(0, { stiffness: 50, damping: 18, duration: duration * 0.8 });
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

export function Reveal({ children, delay = 0, y = 20, x = 0, scale = 1, className = "" }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y, x, scale }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerReveal({ children, staggerDelay = 0.06, className = "" }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? undefined : "hidden"}
      whileInView={reduceMotion ? undefined : "show"}
      viewport={{ once: true, margin: "-8%" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: staggerDelay } },
      }}
    >
      {Children.map(children, (child) =>
        child
          ? cloneElement(child, {
              ...child.props,
              as: motion.div,
              variants: reduceMotion
                ? undefined
                : {
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
                  },
            })
          : null
      )}
    </motion.div>
  );
}

export function Badge({ children }) {
  return <span className={styles.badge}>{children}</span>;
}

export function Accordion({ item, open, onToggle }) {
  const reduceMotion = useReducedMotion();
  return (
    <div className={`${styles.accordion} ${open ? styles.accordionOpen : ""}`}>
      <h3>
        <button className={styles.accordionButton} aria-expanded={open} onClick={onToggle}>
          {item.question}
          <Plus className={styles.accordionIcon} size={20} aria-hidden="true" />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            className={styles.accordionPanel}
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.16, 1, 0.3, 1] }}
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

export function InfiniteMarquee({ items, speed = 30, className = "" }) {
  const doubled = [...items, ...items];
  return (
    <div
      className={`${styles.marqueeTrack} ${className}`}
      style={{ "--marquee-speed": `${speed}s` }}
    >
      <div className={styles.marqueeSlide}>
        {doubled.map((logo, i) => (
          <div key={`${logo.alt}-${i}`} className={styles.marqueeItem}>
            <img src={logo.src} alt={logo.alt} loading="lazy" />
          </div>
        ))}
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

export function LinkButton({ href, children, variant = "primary", full = false, className = "", icon = true, external = false, ...props }) {
  const variantClass = variant === "secondary" ? styles.secondary : variant === "dark" ? styles.dark : "";
  const classes = `${styles.button} ${variantClass} ${full ? styles.full : ""} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        {...props}
      >
        {children}
        {icon ? <ArrowRight size={18} aria-hidden="true" /> : null}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
      {icon ? <ArrowRight size={18} aria-hidden="true" /> : null}
    </button>
  );
}

export function MobileActionBar() {
  const phone = siteData.contact?.phoneHref || "";
  const phoneDigits = phone.replace(/[^0-9]/g, "");
  const message = encodeURIComponent("Hello, I would like to know more about the CNES Franchise opportunity.");
  const waLink = `https://wa.me/${phoneDigits}?text=${message}`;

  return (
    <div className={styles.mobileActionBar} aria-hidden={false}>
      <div className={styles.mobileActionInner}>
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.button} ${styles.mobileActionButton} ${styles.secondary}`}
          aria-label="Chat on WhatsApp"
        >
          WhatsApp
        </a>

        <a
          href={`tel:${phone}`}
          className={`${styles.button} ${styles.mobileActionButton} ${styles.dark}`}
          aria-label="Call now"
        >
          Call
        </a>

        <a
          href="#enquiry"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#enquiry")?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className={`${styles.button} ${styles.mobileActionButton}`}
          aria-label="Enquire"
        >
          Enquire
        </a>
      </div>
    </div>
  );
}
