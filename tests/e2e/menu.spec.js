import { expect, test } from "@playwright/test";

test("mobile menu opens full-viewport and close button is inside drawer", async ({ page }) => {
  // Emulate a mobile viewport
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("");

  // Open the mobile menu via the accessible button
  const openButton = page.getByRole("button", { name: /Open navigation/i });
  await expect(openButton).toBeVisible();
  await openButton.click();

  // Drawer (nav) should be visible and occupy the viewport height
  const nav = page.locator("nav");
  await expect(nav).toBeVisible();

  const box = await nav.boundingBox();
  const vp = page.viewportSize();
  if (box && vp) {
    // Allow a small tolerance for safe-area/pixel rounding
    expect(box.y).toBeLessThanOrEqual(8);
    expect(box.height).toBeGreaterThanOrEqual(vp.height - 8);
  }

  // Close button must be inside the nav container and visible
  const closeInNav = nav.locator('button[aria-label="Close navigation"]');
  await expect(closeInNav).toBeVisible();

  // Close the drawer
  await closeInNav.click();
  await expect(nav).not.toBeVisible();
});

test("header background remains visible while scrolling", async ({ page }) => {
  await page.goto("");

  // Check header background is not transparent at top and after scroll
  const header = page.locator("header");
  await expect(header).toBeVisible();

  const bgTop = await header.evaluate((el) => getComputedStyle(el).backgroundColor);
  expect(bgTop).not.toMatch(/transparent|rgba\(0, 0, 0, 0\)/i);

  await page.evaluate(() => window.scrollTo(0, 800));
  const bgScrolled = await header.evaluate((el) => getComputedStyle(el).backgroundColor);
  expect(bgScrolled).not.toMatch(/transparent|rgba\(0, 0, 0, 0\)/i);
});
