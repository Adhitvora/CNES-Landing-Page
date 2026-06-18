import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import MissionVision from "./components/MissionVision";
import Accreditation from "./components/Accreditation";
import Benefits from "./components/Benefits";
import RevenueStreams from "./components/RevenueStreams";
import Comparison from "./components/Comparison";
import SupportSystem from "./components/SupportSystem";
import Investment from "./components/Investment";
import Growth from "./components/Growth";
import ROI from "./components/ROI";
import Onboarding from "./components/Onboarding";
import Audience from "./components/Audience";
import FutureFitness from "./components/FutureFitness";
import CTA from "./components/CTA";
import FranchiseForm from "./components/FranchiseForm";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import StructuredData from "./seo/StructuredData";

export default function App() {
  return (
    <>
      <StructuredData />
      <Header />
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <main id="main-content">
        <Hero />
        <About />
        <MissionVision />
        <Accreditation />
        <Benefits />
        <RevenueStreams />
        <Comparison />
        <SupportSystem />
        <Investment />
        <Growth />
        <ROI />
        <Onboarding />
        <Audience />
        <FutureFitness />
        <CTA />
        <FranchiseForm />
        <FAQ />
        <Footer />
      </main>
    </>
  );
}
