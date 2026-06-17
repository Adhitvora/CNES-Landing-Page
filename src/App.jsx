import { lazy, Suspense } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import MissionVision from "./components/MissionVision";
import Accreditation from "./components/Accreditation";
import { Loader } from "./components/UI";
import DeferredSection from "./components/UI/DeferredSection";
import StructuredData from "./seo/StructuredData";
import { siteData } from "./data/siteData";

const Benefits = lazy(() => import("./components/Benefits"));
const RevenueStreams = lazy(() => import("./components/RevenueStreams"));
const Comparison = lazy(() => import("./components/Comparison"));
const SupportSystem = lazy(() => import("./components/SupportSystem"));
const Investment = lazy(() => import("./components/Investment"));
const Growth = lazy(() => import("./components/Growth"));
const ROI = lazy(() => import("./components/ROI"));
const Onboarding = lazy(() => import("./components/Onboarding"));
const Audience = lazy(() => import("./components/Audience"));
const FutureFitness = lazy(() => import("./components/FutureFitness"));
const CTA = lazy(() => import("./components/CTA"));
const FranchiseForm = lazy(() => import("./components/FranchiseForm"));
const FAQ = lazy(() => import("./components/FAQ"));
const Footer = lazy(() => import("./components/Footer"));

function SectionFallback() {
  return (
    <div
      style={{
        minHeight: 320,
        display: "grid",
        placeItems: "center",
        background: "var(--color-navy-950)",
        color: "var(--color-gold-500)",
      }}
      role="status"
      aria-label={siteData.accessibility.loadingSection}
    >
      <Loader />
    </div>
  );
}

export default function App() {
  return (
    <>
      <StructuredData />
<Header />
      <a className="skip-link" href="#main-content">
        {siteData.accessibility.skipLink}
      </a>

      <main id="main-content">
        <Hero />
        <About />
        <MissionVision />
        <Accreditation />
        <DeferredSection minHeight={900}>
          <Suspense fallback={<SectionFallback />}>
            <Benefits />
          </Suspense>
        </DeferredSection>
        <DeferredSection minHeight={850}>
          <Suspense fallback={<SectionFallback />}>
            <RevenueStreams />
          </Suspense>
        </DeferredSection>
        <DeferredSection>
          <Suspense fallback={<SectionFallback />}>
            <Comparison />
          </Suspense>
        </DeferredSection>
        <DeferredSection minHeight={1000}>
          <Suspense fallback={<SectionFallback />}>
            <SupportSystem />
          </Suspense>
        </DeferredSection>
        <DeferredSection minHeight={500}>
          <Suspense fallback={<SectionFallback />}>
            <Investment />
          </Suspense>
        </DeferredSection>
        <DeferredSection>
          <Suspense fallback={<SectionFallback />}>
            <Growth />
          </Suspense>
        </DeferredSection>
        <DeferredSection>
          <Suspense fallback={<SectionFallback />}>
            <ROI />
          </Suspense>
        </DeferredSection>
        <DeferredSection minHeight={780}>
          <Suspense fallback={<SectionFallback />}>
            <Onboarding />
          </Suspense>
        </DeferredSection>
        <DeferredSection>
          <Suspense fallback={<SectionFallback />}>
            <Audience />
          </Suspense>
        </DeferredSection>
        <DeferredSection>
          <Suspense fallback={<SectionFallback />}>
            <FutureFitness />
          </Suspense>
        </DeferredSection>
        <DeferredSection minHeight={440}>
          <Suspense fallback={<SectionFallback />}>
            <CTA />
          </Suspense>
        </DeferredSection>
        <DeferredSection minHeight={800}>
          <Suspense fallback={<SectionFallback />}>
            <FranchiseForm />
          </Suspense>
        </DeferredSection>
        <DeferredSection>
          <Suspense fallback={<SectionFallback />}>
            <FAQ />
          </Suspense>
        </DeferredSection>
        <Suspense fallback={null}>
        <Footer />
      </Suspense>
      </main>

    </>
  );
}
