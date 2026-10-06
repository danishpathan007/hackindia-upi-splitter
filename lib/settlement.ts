export type Member = {
  id: string;
  name: string;
};

export type Expense = {
  id: string;
  payerId: string;
  /** Integer paise: ₹900 is 90000. */
  amountPaise: number;
  /** Member ids that share this expense equally. */
  splitAmong: string[];
};

export type Settlement = {
  fromId: string;
  toId: string;
  amountPaise: number;
};

/**
 * Works out who should pay whom so every member ends up even.
 * Each expense is split equally; leftover paise go one each to the
 * first members in splitAmong, so shares always add up to the expense.
 * Throws if an expense has a non-integer or negative amount, an empty or
 * duplicated splitAmong, or a member id that is not in members.
 */
export function calculateSettlements(members: Member[], expenses: Expense[]): Settlement[] {
  // Positive balance: should receive money. Negative: owes money.
  const balances = new Map<string, number>(members.map((member) => [member.id, 0]));

  for (const expense of expenses) {
    validateExpense(expense, balances);
    const memberCount = expense.splitAmong.length;

    const baseShare = Math.floor(expense.amountPaise / memberCount);
    const leftoverPaise = expense.amountPaise - baseShare * memberCount;

    addToBalance(balances, expense.payerId, expense.amountPaise);
    expense.splitAmong.forEach((memberId, index) => {
      const splitAmount = baseShare + (index < leftoverPaise ? 1 : 0);
      addToBalance(balances, memberId, -splitAmount);
    });
  }

  const debtors = [...balances]
    .filter(([, balance]) => balance < 0)
    .map(([id, balance]) => ({ id, owes: -balance }));
  const creditors = [...balances]
    .filter(([, balance]) => balance > 0)
    .map(([id, balance]) => ({ id, receives: balance }));

  const settlements: Settlement[] = [];
  let debtorIndex = 0;
  let creditorIndex = 0;

  while (debtorIndex < debtors.length && creditorIndex < creditors.length) {
    const debtor = debtors[debtorIndex];
    const creditor = creditors[creditorIndex];
    const amountPaise = Math.min(debtor.owes, creditor.receives);

    settlements.push({ fromId: debtor.id, toId: creditor.id, amountPaise });
    debtor.owes -= amountPaise;
    creditor.receives -= amountPaise;

    if (debtor.owes === 0) debtorIndex++;
    if (creditor.receives === 0) creditorIndex++;
  }

  return settlements;
}

function validateExpense(expense: Expense, balances: Map<string, number>) {
  if (!Number.isInteger(expense.amountPaise) || expense.amountPaise < 0) {
    throw new Error(
      `Expense ${expense.id}: amountPaise must be a non-negative integer, got ${expense.amountPaise}`,
    );
  }
  if (expense.splitAmong.length === 0) {
    throw new Error(`Expense ${expense.id}: splitAmong must list at least one member`);
  }
  if (!balances.has(expense.payerId)) {
    throw new Error(`Expense ${expense.id}: payer ${expense.payerId} is not in the group`);
  }

  const seen = new Set<string>();
  for (const memberId of expense.splitAmong) {
    if (!balances.has(memberId)) {
      throw new Error(`Expense ${expense.id}: member ${memberId} is not in the group`);
    }
    if (seen.has(memberId)) {
      throw new Error(`Expense ${expense.id}: member ${memberId} is listed twice in splitAmong`);
    }
    seen.add(memberId);
  }
}

function addToBalance(balances: Map<string, number>, memberId: string, amountPaise: number) {
  balances.set(memberId, (balances.get(memberId) ?? 0) + amountPaise);
}
