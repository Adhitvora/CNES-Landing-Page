import { expect, test } from "@playwright/test";

test("renders the conversion journey without horizontal overflow", async ({ page }) => {
  await page.goto("");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Build a Legacy");
  const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  expect(hasOverflow).toBe(false);
});

test("primary CTA reaches the enquiry form", async ({ page }) => {
  await page.goto("");
  await page.getByRole("button", { name: /Start Your Franchise Journey/i }).first().click();
  await expect(page.locator("#enquiry")).toBeInViewport();
});

test("valid enquiry reaches the success state", async ({ page }) => {
  await page.goto("#enquiry");
  await page.locator("#enquiry").scrollIntoViewIfNeeded();
  await page.getByLabel("Full Name").fill("Aarav Sharma");
  await page.getByLabel("Mobile Number").fill("9876543210");
  await page.getByLabel("Email").fill("aarav@example.com");
  await page.getByLabel("City").fill("Pune");
  await page.getByLabel("Current Profession").selectOption("Gym Owner");
  await page.getByLabel("Investment Range").selectOption("₹5–10 Lakhs");
  await page.getByLabel("Message").fill("I want to understand the CNES academy opportunity in Pune.");
  await page.getByRole("button", { name: /Send Franchise Enquiry/i }).click();
  await expect(page.getByText("Your franchise enquiry is in.")).toBeVisible();
});
