import { ArrowUp } from "lucide-react";
import { footerData } from "../../data/footerData";
import { siteData } from "../../data/siteData";
import { trackEvent } from "../../utils/analytics";
import logo from "../../assets/Logo.png";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brandColumn}>
            <div className={styles.brand}>
              <img src={logo} alt={siteData.brand.name} className={styles.logo} width={160} height={44} />
            </div>
            <p className={styles.description}>{footerData.description}</p>
          </div>
          {footerData.linkGroups.map((group) => (
            <div className={styles.group} key={group.title}>
              <h3>{group.title}</h3>
              {group.links.map((link) => (
                <a
                  href={link.href}
                  key={link.label}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  onClick={() => trackEvent("footer_link_click", { destination: link.href })}
                >
                  {link.label}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div className={styles.bottom}>
          <span>{footerData.legal}</span>
          <div className={styles.contact}>
            <a href={`tel:${siteData.contact.phoneHref}`}>{siteData.contact.phoneDisplay}</a>
            <a href={`mailto:${siteData.contact.email}`}>{siteData.contact.email}</a>
          </div>
        </div>
      </div>
      <button
        type="button"
        className={styles.backToTop}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        <ArrowUp size={20} aria-hidden="true" />
      </button>
    </footer>
  );
}
