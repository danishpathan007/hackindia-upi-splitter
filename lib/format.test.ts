import { describe, expect, test } from "vitest";
import { formatRupees } from "./format";

describe("formatRupees", () => {
  test("drops paise when the amount is whole rupees", () => {
    expect(formatRupees(30000)).toBe("₹300");
  });

  test("shows two decimal places when there are paise", () => {
    expect(formatRupees(30050)).toBe("₹300.50");
  });

  test("uses Indian digit grouping for large amounts", () => {
    expect(formatRupees(10000000)).toBe("₹1,00,000");
  });

  test("formats zero", () => {
    expect(formatRupees(0)).toBe("₹0");
  });

  test("puts the minus sign before the rupee symbol", () => {
    expect(formatRupees(-5050)).toBe("-₹50.50");
  });
});
