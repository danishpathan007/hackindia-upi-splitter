import { describe, expect, test } from "vitest";
import { calculateSettlements, type Expense, type Member } from "./settlement";

const asha: Member = { id: "asha", name: "Asha" };
const ravi: Member = { id: "ravi", name: "Ravi" };
const meera: Member = { id: "meera", name: "Meera" };
const members = [asha, ravi, meera];

describe("calculateSettlements", () => {
  test("splits ₹900 paid by Asha equally between three members", () => {
    const expenses: Expense[] = [
      { id: "e1", payerId: "asha", amountPaise: 90000, splitAmong: ["asha", "ravi", "meera"] },
    ];

    expect(calculateSettlements(members, expenses)).toEqual([
      { fromId: "ravi", toId: "asha", amountPaise: 30000 },
      { fromId: "meera", toId: "asha", amountPaise: 30000 },
    ]);
  });

  test("gives leftover paise to the first members so shares add up to ₹100", () => {
    // Shares are 3334 (Asha), 3333 (Ravi), 3333 (Meera).
    const expenses: Expense[] = [
      { id: "e1", payerId: "asha", amountPaise: 10000, splitAmong: ["asha", "ravi", "meera"] },
    ];

    const settlements = calculateSettlements(members, expenses);

    expect(settlements).toEqual([
      { fromId: "ravi", toId: "asha", amountPaise: 3333 },
      { fromId: "meera", toId: "asha", amountPaise: 3333 },
    ]);
    const ashaShare = 10000 - settlements.reduce((sum, s) => sum + s.amountPaise, 0);
    expect(ashaShare).toBe(3334);
  });

  test("returns no settlements when there are no expenses", () => {
    expect(calculateSettlements(members, [])).toEqual([]);
  });
});
