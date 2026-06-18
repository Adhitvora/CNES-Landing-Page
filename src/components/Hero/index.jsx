import { useEffect, useRef } from "react";
import { ArrowDown, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { heroData } from "../../data/heroData";
import { siteData } from "../../data/siteData";
import { scrollToEnquiry, trackEvent } from "../../utils/analytics";
import { AnimatedCounter, Badge, Button, LinkButton } from "../UI";
import logo from "../../assets/Logo.png";
import styles from "./Hero.module.css";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] } },
};

export default function Hero() {
  const mediaRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || !window.matchMedia("(pointer: fine)").matches) return undefined;
    let active = true;
    let cleanup = () => {};

    import("gsap").then(({ gsap }) => {
      if (!active) return;
      const media = mediaRef.current;
      if (!media) return;
      const xTo = gsap.quickTo(media, "x", { duration: 1.1, ease: "power3.out" });
      const yTo = gsap.quickTo(media, "y", { duration: 1.1, ease: "power3.out" });
      const handleMove = (event) => {
        xTo((event.clientX / window.innerWidth - 0.5) * -14);
        yTo((event.clientY / window.innerHeight - 0.5) * -10);
      };
      window.addEventListener("pointermove", handleMove, { passive: true });
      cleanup = () => window.removeEventListener("pointermove", handleMove);
    });

    return () => {
      active = false;
      cleanup();
    };
  }, [reduceMotion]);

  return (
    <section className={styles.hero} id="top" aria-labelledby="hero-title">
      <div className={styles.media} ref={mediaRef}>
        <img
          src={heroData.image.src}
          alt={heroData.image.alt}
          width={heroData.image.width}
          height={heroData.image.height}
          fetchPriority="high"
        />
      </div>

      <div className={styles.grain} aria-hidden="true" />

      <div className="container">
        <motion.div
          className={styles.content}
          variants={reduceMotion ? undefined : stagger}
          initial={reduceMotion ? undefined : "hidden"}
          animate={reduceMotion ? undefined : "show"}
        >
          <motion.img
            src={logo}
            alt="CNES"
            className={styles.heroLogo}
            width={200}
            height={55}
            variants={reduceMotion ? undefined : fadeUp}
          />
          <motion.span className={styles.eyebrow} variants={reduceMotion ? undefined : fadeUp}>
            {heroData.eyebrow}
          </motion.span>
          <motion.h1 id="hero-title" variants={reduceMotion ? undefined : fadeUp}>
            {heroData.title}
          </motion.h1>
          <motion.p className={styles.tagline} variants={reduceMotion ? undefined : fadeUp}>
            {heroData.tagline}
          </motion.p>
          <motion.p className={styles.lead} variants={reduceMotion ? undefined : fadeUp}>
            {heroData.paragraphs[0]}
          </motion.p>

          <motion.div className={styles.actions} variants={reduceMotion ? undefined : fadeUp}>
            <Button magnetic onClick={() => scrollToEnquiry("hero_primary")}>
              {siteData.actions.primary}
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                trackEvent("cta_click", { source: "hero_secondary" });
                document.querySelector("#why-cnes")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {siteData.actions.secondary}
            </Button>
            {/* WhatsApp and Call CTAs - secondary/supporting */}
            {(() => {
              const phone = siteData.contact?.phoneHref || "";
              const phoneDigits = phone.replace(/[^0-9]/g, "");
              const wa = `https://wa.me/${phoneDigits}?text=${encodeURIComponent(
                "Hello, I would like to know more about the CNES Franchise opportunity."
              )}`;
              return (
                <>
                  <LinkButton
                    variant="secondary"
                    external
                    href={wa}
                    className={styles.ctaSmall}
                    onClick={() => trackEvent("cta_click", { source: "hero_whatsapp" })}
                  >
                    Chat on WhatsApp
                  </LinkButton>
    
                </>
              );
            })()}
          </motion.div>

          <motion.div className={styles.trust} aria-label="CNES franchise trust indicators" variants={reduceMotion ? undefined : fadeUp}>
            {heroData.trust.map((item) => (
              <Badge key={item}>
                <ShieldCheck size={14} aria-hidden="true" />
                {item}
              </Badge>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className={styles.scrollCue} aria-hidden="true">
        <ArrowDown size={15} />
      </div>

      <div className={styles.statsBand}>
        <div className={`container ${styles.stats}`}>
          {heroData.stats.map((stat) => (
            <div className={styles.stat} key={stat.label}>
              <strong>
                <AnimatedCounter {...stat} />
              </strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
