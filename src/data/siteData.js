import { mediaData } from "./mediaData";

export const siteData = {
  brand: {
    shortName: "CNES",
    name: "Centre for Nutrition & Exercise Sciences",
    website: "cnes.online",
    tagline: "Educate • Upskill • Inspire",
    logoLabel: "Centre for Nutrition & Exercise Sciences",
  },
  contact: {
    phoneDisplay: "87082 18446",
    phoneHref: "+918708218446",
    email: "contactus@cnes.online",
  },
  navigation: [
    { label: "Why CNES", href: "#about" },
    { label: "Revenue", href: "#revenue" },
    { label: "Support", href: "#support" },
    { label: "Investment", href: "#investment" },
    { label: "Process", href: "#onboarding" },
  ],
  actions: {
    primary: "Start Your Franchise Journey",
    secondary: "Explore The Model",
    short: "Enquire Now",
    call: "Call Franchise Team",
    submit: "Send Franchise Enquiry",
    submitting: "Sending Enquiry",
    reset: "Submit Another Enquiry",
    menuOpen: "Open navigation",
    menuClose: "Close navigation",
  },
  accessibility: {
    skipLink: "Skip to main content",
    loadingSection: "Loading section",
  },
  benefits: {
    eyebrow: "Built for sustainable growth",
    title: "Why Invest in a CNES Franchise?",
    intro:
      "The global fitness industry continues to grow, creating increasing demand for qualified trainers, nutritionists, wellness coaches, and fitness professionals.",
    body:
      "Unlike traditional gyms that depend primarily on monthly memberships, a fitness education academy creates structured and diversified revenue streams.",
    items: [
      { title: "Premium Brand Positioning", description: "Lead with a specialised education brand built around credibility and career outcomes.", icon: "Crown" },
      { title: "High-Growth Industry", description: "Serve the rising demand for qualified fitness and wellness professionals.", icon: "TrendingUp" },
      { title: "Multiple Revenue Streams", description: "Build revenue across courses, certifications, workshops, and practical training.", icon: "Layers3" },
      { title: "Low Inventory Requirements", description: "Operate an education-led model without the inventory burden of product businesses.", icon: "Boxes" },
      { title: "Education-Based Recurring Income", description: "Plan new batches and continuing education programs throughout the year.", icon: "RefreshCw" },
      { title: "Scalable Business Structure", description: "Expand through additional batches, programs, and regional opportunities.", icon: "Network" },
      { title: "Career-Focused Programs", description: "Offer programs designed around professional skills and industry readiness.", icon: "BriefcaseBusiness" },
      { title: "Strong Market Demand", description: "Address a growing need for practical, recognised fitness education.", icon: "UsersRound" },
    ],
  },
  comparison: {
    eyebrow: "A more resilient model",
    title: "Why This Model Is Better Than a Traditional Gym",
    intro:
      "A fitness education academy creates a more structured and predictable business model with long-term growth potential.",
    columns: [
      {
        label: "Traditional Gym Revenue",
        tone: "muted",
        items: [
          "Limited Membership-Based Income",
          "Dependence on Daily Gym Attendance",
          "High Client Dropout Rates",
          "Difficult Revenue Forecasting",
          "Constant Price Competition",
          "Limited Scalability"
        ]

      },
      {
        label: "CNES Academy Revenue",
        tone: "accent",
        items: [
          "Multiple Educational Revenue Streams",
          "Admissions, Workshops & Certifications",
          "Structured Academic Programs",
          "Predictable Batch-Based Income",
          "Premium Certification Authority",
          "Scalable Education Business Model"
        ],
      },
    ],
  },
  investment: {
    eyebrow: "Practical. Scalable. Growth-oriented.",
    title: "Investment Opportunity",
    intro: "CNES has designed a franchise model that is practical, scalable, and growth-oriented.",
    label: "Estimated Investment",
    amount: "Starting From ₹5 Lakhs+",
    note: "Investment may vary depending upon:",
    factors: ["City", "Infrastructure", "Academy Size", "Existing Facility Availability", "Expansion Requirements"],
  },
  growth: {
    eyebrow: "From setup to first batches",
    title: "Expected Growth Phase",
    duration: "3–6 Months",
    intro: "The initial phase focuses on:",
    stages: ["Setup", "Marketing", "Brand Awareness", "Admission Development", "Batch Launching"],
  },
  roi: {
    eyebrow: "Diversified earning potential",
    title: "Return on Investment Potential",
    intro: "A successful franchise can generate revenue through:",
    streams: [
      "Course Admissions",
      "Workshops",
      "Certification Programs",
      "Practical Training Programs",
      "Student Services",
      "Career Development Programs",
    ],
    disclaimer:
      "Business performance depends on market conditions, local execution, admissions, marketing activities, and partner involvement.",
  },
  audience: {
    eyebrow: "A model for ambitious operators",
    title: "Who Should Apply?",
    items: [
      {
        title: "Gym Owners",
        description: "Transform your existing facility into a premium education center and create an additional income stream.",
        icon: "Dumbbell",
      },
      {
        title: "Fitness Professionals",
        description:
          "Build your own academy with a structured business model, recognized certifications, and professional support.",
        icon: "BadgeCheck",
      },
      {
        title: "Entrepreneurs & Investors",
        description: "Enter one of India's fastest-growing industries with a proven education-focused model.",
        icon: "ChartNoAxesCombined",
      },
      {
        title: "Training Institutes",
        description: "Expand existing educational operations with fitness, nutrition, and wellness certifications.",
        icon: "GraduationCap",
      },
    ],
  },
  future: {
    eyebrow: "Industry opportunity",
    title: "The Future of Fitness Is Education",
    paragraphs: [
      "Thousands of aspiring fitness professionals are looking for quality education, practical training, and career opportunities.",
      "CNES provides the systems, support, and brand framework to help franchise partners build a respected and profitable academy in their city.",
      "This is your opportunity to become a leader in the fitness education industry.",
    ],
    image: mediaData.future,
    points: ["Quality Education", "Practical Training", "Career Opportunities"],
  },
  cta: {
    eyebrow: "Become a CNES Franchise Partner",
    title: "Build a Business That Changes Lives.",
    lines: [
      "Create Career Opportunities.",
      "Generate Sustainable Revenue.",
      "Grow With a Nationally Expanding Brand.",
    ],
    body:
      "Join the Centre for Nutrition & Exercise Sciences and become part of India's next generation of fitness education leaders.",
  },
  analytics: {
    eventName: "cnes_conversion_event",
  },
};
