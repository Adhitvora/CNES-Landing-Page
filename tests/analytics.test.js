import { beforeEach, describe, expect, it, vi } from "vitest";
import { scrollToEnquiry, trackEvent } from "../src/utils/analytics";

describe("conversion analytics", () => {
  beforeEach(() => {
    window.dataLayer = [];
    document.body.innerHTML = '<div id="enquiry"></div>';
    Element.prototype.scrollIntoView = vi.fn();
  });

  it("pushes structured events to the data layer", () => {
    trackEvent("cta_click", { source: "test" });
    expect(window.dataLayer[0]).toMatchObject({ action: "cta_click", source: "test" });
  });

  it("tracks and scrolls primary conversion actions", () => {
    scrollToEnquiry("hero");
    expect(window.dataLayer[0]).toMatchObject({ action: "cta_click", source: "hero" });
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
  });
});
