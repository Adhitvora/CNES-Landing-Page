export const formData = {
  eyebrow: "Franchise enquiry",
  title: "Let’s explore your city and business goals",
  intro:
    "Share a few details with the CNES franchise team. We will use them to understand your location, investment capacity, and academy potential.",
  privacy:
    "By submitting this form, you agree to be contacted by the CNES franchise team regarding this enquiry.",
  success: {
    title: "Your franchise enquiry is in.",
    message: "Thank you for your interest in CNES. Our franchise team will review your details and connect with you.",
  },
  error: {
    title: "We could not send your enquiry.",
    message: "Please try again, or contact the franchise team directly by phone or email.",
  },
  fields: {
    fullName: {
      label: "Full Name",
      placeholder: "Enter your full name",
      autoComplete: "name",
    },
    mobile: {
      label: "Mobile Number",
      placeholder: "10-digit mobile number",
      autoComplete: "tel",
    },
    email: {
      label: "Email",
      placeholder: "you@example.com",
      autoComplete: "email",
    },
    city: {
      label: "City",
      placeholder: "Your preferred franchise city",
      autoComplete: "address-level2",
    },
    profession: {
      label: "Current Profession",
      placeholder: "Select your profession",
      options: ["Gym Owner", "Fitness Professional", "Entrepreneur", "Investor", "Training Institute", "Other"],
    },
    investmentRange: {
      label: "Investment Range",
      placeholder: "Select an investment range",
      options: ["₹5–10 Lakhs", "₹10–20 Lakhs", "₹20 Lakhs+", "Prefer to discuss"],
    },
    message: {
      label: "Message",
      placeholder: "Tell us about your goals, facility, or preferred location",
      hint: "Minimum 20 characters",
    },
  },
};
