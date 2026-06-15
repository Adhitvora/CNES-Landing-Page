import { faqData } from "../data/faqData";
import { siteData } from "../data/siteData";

export default function StructuredData() {
  const graph = [
    {
      "@type": "WebSite",
      "@id": "https://cnes.online/#website",
      url: "https://cnes.online/",
      name: siteData.brand.name,
      publisher: { "@id": "https://cnes.online/#organization" },
      inLanguage: "en-IN",
    },
    {
      "@type": "Organization",
      "@id": "https://cnes.online/#organization",
      name: siteData.brand.name,
      alternateName: siteData.brand.shortName,
      url: "https://cnes.online/",
      email: siteData.contact.email,
      telephone: siteData.contact.phoneHref,
    },
    {
      "@type": "WebPage",
      "@id": "https://cnes.online/franchise#webpage",
      url: "https://cnes.online/franchise",
      name: "CNES Fitness Academy Franchise Opportunity",
      description:
        "Build a premium fitness education academy with accredited programs, multiple revenue streams, and complete franchise support.",
      isPartOf: { "@id": "https://cnes.online/#website" },
      about: { "@id": "https://cnes.online/#organization" },
      inLanguage: "en-IN",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "CNES", item: "https://cnes.online/" },
        { "@type": "ListItem", position: 2, name: "Franchise", item: "https://cnes.online/franchise" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqData.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }}
    />
  );
}
