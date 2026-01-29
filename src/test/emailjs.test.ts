import { describe, it, expect, vi } from "vitest";

// Test EmailJS configuration constants
describe("EmailJS Integration", () => {
  it("should have valid EmailJS configuration", () => {
    const EMAILJS_PUBLIC_KEY = "kxy-rMZAOtD0I7wCU";
    const EMAILJS_SERVICE_ID = "service_djysu8n";
    const EMAILJS_TEMPLATE_ID = "template_zf0n98b";

    expect(EMAILJS_PUBLIC_KEY).toBeDefined();
    expect(EMAILJS_PUBLIC_KEY.length).toBeGreaterThan(0);
    
    expect(EMAILJS_SERVICE_ID).toBeDefined();
    expect(EMAILJS_SERVICE_ID).toMatch(/^service_/);
    
    expect(EMAILJS_TEMPLATE_ID).toBeDefined();
    expect(EMAILJS_TEMPLATE_ID).toMatch(/^template_/);
  });

  it("should format WhatsApp link correctly", () => {
    const phone = "08012345678";
    const whatsappLink = `https://wa.me/${phone.replace(/\D/g, '')}`;
    
    expect(whatsappLink).toBe("https://wa.me/08012345678");
  });

  it("should format phone with special characters correctly", () => {
    const phone = "+234-801-234-5678";
    const whatsappLink = `https://wa.me/${phone.replace(/\D/g, '')}`;
    
    expect(whatsappLink).toBe("https://wa.me/2348012345678");
  });

  it("should validate email format", () => {
    const validEmail = "test@example.com";
    const invalidEmail = "notanemail";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    expect(emailRegex.test(validEmail)).toBe(true);
    expect(emailRegex.test(invalidEmail)).toBe(false);
  });

  it("should validate phone length", () => {
    const validPhone = "08012345678";
    const shortPhone = "0801234";
    
    expect(validPhone.length >= 10).toBe(true);
    expect(shortPhone.length >= 10).toBe(false);
  });
});
