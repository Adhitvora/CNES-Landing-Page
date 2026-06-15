# CNES Franchise Landing Page

Production-ready React landing page for the Centre for Nutrition & Exercise Sciences franchise opportunity. The canonical deployment path is `https://cnes.online/franchise`.

## 1. Website Design Strategy

The experience presents CNES as a premium education business rather than another gym franchise. It combines authoritative editorial typography, authentic fitness-education imagery, recognised affiliations, structured business information, and repeated conversion opportunities.

The long-form page alternates navy, white, gold, and cyan bands to maintain reading rhythm. High-value interactions are reserved for information that benefits from exploration: revenue tabs, support flip cards, onboarding steps, counters, and FAQs.

## 2. User Journey Flow

1. Establish the category and franchise offer in the hero.
2. Build trust through CNES purpose and professional recognition.
3. Explain demand, benefits, and diversified revenue streams.
4. Contrast the academy model with traditional gym revenue.
5. Reduce perceived risk through the six-part support system.
6. Clarify investment, growth phase, ROI inputs, and onboarding.
7. Help visitors self-identify by operator persona.
8. Reinforce the education opportunity and drive the enquiry.
9. Capture a validated lead or provide direct phone and email contact.

## 3. Complete Folder Structure

```text
public/
  images/
  robots.txt
  sitemap.xml
src/
  components/
    Header/ Hero/ About/ MissionVision/ Accreditation/
    Benefits/ RevenueStreams/ Comparison/ SupportSystem/
    Investment/ Growth/ ROI/ Onboarding/ Audience/
    FutureFitness/ CTA/ FranchiseForm/ FAQ/ Footer/ UI/
  data/
  hooks/
  seo/
  services/
  styles/
  utils/
  App.jsx
  main.jsx
tests/
  e2e/
```

## 4. Design System

- Radius: 4px controls, 8px cards and framed media.
- Container: 1200px maximum with 48px desktop and 32px mobile gutters.
- Gold indicates primary conversion and investment.
- Cyan indicates information, navigation progress, and education.
- Green is reserved for successful lead submission.
- Violet is used sparingly for specialist and ROI accents.
- Shadows are broad and low-opacity to preserve the enterprise tone.

## 5. Color Usage Guidelines

| Role | Value | Usage |
| --- | --- | --- |
| Primary navy | `#071226` | Hero, major dark sections, footer |
| Secondary navy | `#0E1B35` | Panels, support cards, form success |
| Tertiary navy | `#142A52` | Highlighted comparison and card backs |
| Gold | `#FFC328` | Primary CTA, investment, key proof |
| Light gold | `#FFD54A` | Dark-background emphasis |
| Cyan | `#2BC4F3` | Progress, information, section labels |
| Green | `#25D366` | Success state |
| Violet | `#5B5BEF` | Specialist accents |
| Surface | `#F5F7FA` | Light content bands |

## 6. Typography Implementation

Poppins is self-hosted through `@fontsource/poppins` in weights 400–800. Desktop hero type is 72px, section titles are 48px, card headings target 24px, body copy targets 18px, and controls use 16px. Breakpoints use fixed reductions to 58px, 44px, and 36px rather than viewport-based font scaling.

## 7. Section-by-Section Wireframe

- Sticky header: brand, anchored navigation, enquiry action.
- Hero: image background, offer, trust badges, dual CTA, proof strip.
- About and Mission/Vision: image-led context followed by two purpose panels.
- Accreditation: horizontally inspectable recognition rail.
- Benefits: eight business-model benefits.
- Revenue: three accessible program tabs and qualitative portfolio meter.
- Comparison: traditional gym and CNES academy columns.
- Support: six interactive support cards.
- Investment, Growth, ROI: commercial facts with explicit disclaimer.
- Onboarding: six-step accessible progression interface.
- Audience: four operator personas.
- Future Fitness: full-bleed industry-opportunity image section.
- CTA, Form, FAQ, Footer: conversion close and practical reassurance.

## 8. UI Component Architecture

Shared primitives are exported from `src/components/UI`: `Button`, `Card`, `SectionTitle`, `AnimatedCounter`, `Carousel`, `FlipCard`, `Timeline`, `Modal`, `Badge`, `Accordion`, `Loader`, and `Reveal`. `DeferredSection` mounts lower sections close to the viewport while reserving vertical space.

Domain sections receive content only from `src/data`. Components own presentation and interaction state but do not own marketing copy or image URLs.

## 9. Animation System

- Framer Motion handles reveal, tab, accordion, stepper, and counter motion.
- GSAP is dynamically imported only for fine-pointer hero parallax.
- CSS handles hover, flip-card, focus, and navigation transitions.
- Intersection Observer defers lower content and pauses work off-screen.
- `prefers-reduced-motion` removes decorative motion.
- Pointer-based magnetic and parallax effects are disabled on touch devices.

## 10. Data Architecture

Content is split by domain in `src/data`, including hero, about, accreditation, revenue, support, onboarding, FAQ, footer, form, site-wide content, and media. `testimonialsData.js` intentionally remains empty until verified stories are supplied. JSDoc content and enquiry types live in `types.js`.

CMS migration can replace module exports with API responses while preserving each section's data shape.

## 11. API Integration Architecture

`submitFranchiseEnquiry(payload, { signal })` is the single submission boundary. It uses an Axios instance with:

```env
VITE_FRANCHISE_API_URL=
VITE_API_TIMEOUT_MS=10000
VITE_USE_MOCK_API=true
```

When no URL is supplied, the service returns a realistic local success response. Set `VITE_USE_MOCK_API=false` and provide the production endpoint to enable HTTP submission.

## 12. Form Architecture

React Hook Form manages state and duplicate-submit protection. Zod validates required values, Indian mobile format, email, city, selections, and message length. The form supports inline errors, server errors, loading, cancellation, success, and reset. Analytics events never include names, phone numbers, email addresses, or message content.

## 13. SEO Architecture

`index.html` contains canonical, description, Open Graph, Twitter, robots, theme, and preload metadata. `StructuredData.jsx` emits `Organization`, `WebSite`, `WebPage`, `BreadcrumbList`, and `FAQPage` JSON-LD. The project also includes `robots.txt`, `sitemap.xml`, semantic landmarks, one H1, and accessible heading order.

## 14. Performance Optimization Plan

- Local generated hero is preloaded with fixed dimensions.
- Poppins is self-hosted and only required weights are imported.
- Lower sections are split into lazy chunks and mounted near the viewport.
- GSAP loads only for fine-pointer hero interaction.
- Remote images use explicit dimensions and lazy loading.
- Repeated components use stable keys and local state boundaries.
- Layout placeholders reduce large shifts during deferred loading.

For production, convert the hero PNG to AVIF/WebP and host all remote photography on the CNES CDN.

## 15. Responsive Design Strategy

- Mobile starts at 320px with no horizontal overflow.
- Header navigation becomes a focusable slide-in menu below 980px.
- Hero changes from horizontal copy/image composition to a vertical image-to-copy blend.
- Grids collapse progressively from four to two to one column.
- Revenue tabs and onboarding steps become horizontally scrollable controls.
- The timeline becomes vertical on mobile.
- A persistent mobile CTA remains above the viewport edge.

## 16. Complete React Project Structure

The application uses Vite with a `/franchise/` base path. `App.jsx` keeps first-view sections eager and defers the rest. CSS Modules encapsulate component styling while `tokens.css`, `global.css`, and `Sections.module.css` provide shared visual foundations.

## 17. Required Libraries

- React 18 and React DOM
- Vite
- Framer Motion
- GSAP
- React Hook Form and `@hookform/resolvers`
- Zod
- Axios
- Lucide React
- `@fontsource/poppins`
- Vitest and Testing Library
- Playwright

## 18. Best Image Recommendations For Each Section

- Hero: current original CNES-focused education scene in `public/images/cnes-fitness-education-hero.png`.
- About: one-to-one practical coaching in a premium facility.
- Accreditation: replace text marks with approved transparent partner logos after receiving brand files.
- Benefits and revenue: retain typographic and icon-led presentation for speed and clarity.
- Support: optional future images should show classroom planning, counselling, marketing, and placement activity.
- Future Fitness: use a wide modern academy or practical training scene with visible people and equipment.
- Photography should feature authentic Indian professionals, real instruction, realistic equipment, and clean navy-compatible lighting.

## 19. Final Development Notes

Install Node.js 20 or newer, then run:

```bash
npm install
npm run dev
npm test
npm run build
npx playwright install
npm run test:e2e
```

The Vite development URL is normally `http://localhost:5173/franchise/`. Deploy the contents of `dist` so the public route resolves at `/franchise/`. Configure the host to return the generated `index.html` for that path.

Before production launch:

1. Confirm legal approval for every accreditation statement and partner mark.
2. Replace remote Unsplash URLs with optimised CNES-owned/CDN assets.
3. Provide the production enquiry endpoint and expected response contract.
4. Add verified partner or student stories only after written approval.
5. Run Lighthouse and Playwright against the final hosting environment.
