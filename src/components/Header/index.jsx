import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { siteData } from "../../data/siteData";
import { scrollToEnquiry, trackEvent } from "../../utils/analytics";
import { Button } from "../UI";
import logo from "../../assets/Logo.png";
import styles from "./Header.module.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  function closeAndTrack(item) {
    setMenuOpen(false);
    trackEvent("navigation_click", { destination: item.href });
  }

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${menuOpen ? styles.open : ""}`}>
        <div className={styles.progress} style={{ width: `${scrollProgress}%` }} aria-hidden="true" />
        <div className={`container ${styles.inner}`}>
          <a className={styles.brand} href="#top" aria-label={siteData.brand.name}>
            <img src={logo} alt="" className={styles.logo} width={130} height={36} />
          </a>

          <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`} aria-label="Primary navigation">
            <div className={styles.navHeader}>
              <a className={styles.brand} href="#top" aria-label={siteData.brand.name} onClick={() => setMenuOpen(false)}>
                <img src={logo} alt="" className={styles.logo} width={130} height={36} />
              </a>
              <button
                type="button"
                className={styles.closeButton}
                aria-label={siteData.actions.menuClose}
                onClick={() => setMenuOpen(false)}
              >
                <X aria-hidden="true" />
              </button>
            </div>

            {siteData.navigation.map((item) => (
              <a key={item.href} href={item.href} onClick={() => closeAndTrack(item)}>
                {item.label}
              </a>
            ))}
            <div className={styles.mobileContact}>
              <a href={`tel:${siteData.contact.phoneHref}`}>{siteData.contact.phoneDisplay}</a>
              <a href={`mailto:${siteData.contact.email}`}>{siteData.contact.email}</a>
            </div>
          </nav>

          <Button className={styles.headerCta}  magnetic
              onClick={() => scrollToEnquiry("faq_sidebar")}
              style={{ marginTop: 8 }}
            >
            {siteData.actions.short}
          </Button>

          <button
            type="button"
            className={styles.menuButton}
            aria-label={menuOpen ? siteData.actions.menuClose : siteData.actions.menuOpen}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </header>

      <button type="button" className={styles.mobileCta} onClick={() => scrollToEnquiry("mobile_sticky")}>
        {siteData.actions.short}
        <ArrowRight size={18} aria-hidden="true" />
      </button>
    </>
  );
}
