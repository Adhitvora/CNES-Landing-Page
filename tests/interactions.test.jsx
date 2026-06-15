import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import RevenueStreams from "../src/components/RevenueStreams";
import FAQ from "../src/components/FAQ";
import Onboarding from "../src/components/Onboarding";
import { revenueData } from "../src/data/revenueData";
import { faqData } from "../src/data/faqData";
import { onboardingData } from "../src/data/onboardingData";

describe("interactive content", () => {
  it("switches revenue tab content", async () => {
    const user = userEvent.setup();
    render(<RevenueStreams />);
    await user.click(screen.getByRole("tab", { name: revenueData.categories[1].label }));
    expect(await screen.findByText(revenueData.categories[1].title)).toBeVisible();
  });

  it("opens and closes FAQ answers", async () => {
    const user = userEvent.setup();
    render(<FAQ />);
    const secondQuestion = screen.getByRole("button", { name: faqData.items[1].question });
    await user.click(secondQuestion);
    expect(await screen.findByText(faqData.items[1].answer)).toBeVisible();
  });

  it("advances onboarding with the next control", async () => {
    const user = userEvent.setup();
    render(<Onboarding />);
    await user.click(screen.getByRole("button", { name: onboardingData.nextLabel }));
    expect(await screen.findByText(onboardingData.steps[1].lead)).toBeVisible();
  });
});
