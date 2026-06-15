import { useState } from "react";
import { Phone, Mail } from "lucide-react";
import { faqData } from "../../data/faqData";
import { siteData } from "../../data/siteData";
import { scrollToEnquiry } from "../../utils/analytics";
import { Accordion, Button, SectionTitle } from "../UI";
import section from "../../styles/Sections.module.css";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <section className={`${section.section} ${section.dark}`} id="faq">
      <div className={`container ${section.faqWrap}`}>
        <div className={section.faqSidebar}>
          <SectionTitle eyebrow={faqData.eyebrow} title={faqData.title} />
          <div style={{ display: "grid", gap: 16 }}>
            <p style={{ margin: 0, color: "var(--color-muted)", fontSize: 15 }}>
              Still have questions? Reach out directly.
            </p>
            <a
              href={`tel:${siteData.contact.phoneHref}`}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                color: "var(--color-gold-300)", fontWeight: 700, textDecoration: "none", fontSize: 15,
              }}
            >
              <Phone size={17} aria-hidden="true" />
              {siteData.contact.phoneDisplay}
            </a>
            <a
              href={`mailto:${siteData.contact.email}`}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                color: "var(--color-gold-300)", fontWeight: 700, textDecoration: "none", fontSize: 15,
              }}
            >
              <Mail size={17} aria-hidden="true" />
              {siteData.contact.email}
            </a>
            <Button
              magnetic
              onClick={() => scrollToEnquiry("faq_sidebar")}
              style={{ marginTop: 8 }}
            >
              {siteData.actions.short}
            </Button>
          </div>
        </div>
        <div>
          {faqData.items.map((item, index) => (
            <Accordion
              key={item.question}
              item={item}
              open={openIndex === index}
              onToggle={() => setOpenIndex((current) => (current === index ? -1 : index))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
