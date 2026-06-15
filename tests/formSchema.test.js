import { describe, expect, it } from "vitest";
import { franchiseFormSchema } from "../src/utils/formSchema";

const validLead = {
  fullName: "Aarav Sharma",
  mobile: "9876543210",
  email: "aarav@example.com",
  city: "Pune",
  profession: "Gym Owner",
  investmentRange: "₹5–10 Lakhs",
  message: "I want to open a CNES academy in my city.",
};

describe("franchiseFormSchema", () => {
  it("accepts a complete Indian franchise enquiry", () => {
    expect(franchiseFormSchema.safeParse(validLead).success).toBe(true);
  });

  it("rejects invalid contact details and a short message", () => {
    const result = franchiseFormSchema.safeParse({
      ...validLead,
      mobile: "12345",
      email: "not-an-email",
      message: "Too short",
    });
    expect(result.success).toBe(false);
    expect(result.error.flatten().fieldErrors.mobile).toBeTruthy();
    expect(result.error.flatten().fieldErrors.email).toBeTruthy();
    expect(result.error.flatten().fieldErrors.message).toBeTruthy();
  });
});
