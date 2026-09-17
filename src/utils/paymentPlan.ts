import { CurrencyCode } from '../types';
import { formatPrice } from './currency';

export type PaymentPlanTenure = 3 | 6 | 12 | 24;

export interface PaymentPlanCalculation {
  tenureMonths: PaymentPlanTenure;
  totalEUR: number;
  monthlyEUR: number;
  dueTodayEUR: number;
  interestRate: number; // 0 for 0% APR
  totalInterestEUR: number;
  formattedMonthly: string;
  formattedDueToday: string;
  formattedTotal: string;
  schedule: Array<{
    installmentNumber: number;
    dueDateLabel: string;
    amountEUR: number;
    formattedAmount: string;
  }>;
}

/**
 * Calculates zero-interest Maison luxury installment plan
 */
export function calculatePaymentPlan(
  totalEUR: number,
  currency: CurrencyCode = 'EUR',
  tenure: PaymentPlanTenure = 12
): PaymentPlanCalculation {
  const safeTotal = Math.max(0, totalEUR);
  const monthlyEUR = Math.round((safeTotal / tenure) * 100) / 100;
  // First installment adjusts for any slight rounding cent difference
  const dueTodayEUR = Math.round((safeTotal - monthlyEUR * (tenure - 1)) * 100) / 100;

  const now = new Date();
  const schedule = [];

  for (let i = 1; i <= tenure; i++) {
    const dueDate = new Date(now);
    dueDate.setMonth(now.getMonth() + (i - 1));
    const isFirst = i === 1;
    const amount = isFirst ? dueTodayEUR : monthlyEUR;

    const dateStr = isFirst 
      ? 'Due Today (At Order)'
      : dueDate.toLocaleDateString('en-GB', { month: 'short', day: 'numeric', year: 'numeric' });

    schedule.push({
      installmentNumber: i,
      dueDateLabel: dateStr,
      amountEUR: amount,
      formattedAmount: formatPrice(amount, currency),
    });
  }

  return {
    tenureMonths: tenure,
    totalEUR: safeTotal,
    monthlyEUR,
    dueTodayEUR,
    interestRate: 0,
    totalInterestEUR: 0,
    formattedMonthly: formatPrice(monthlyEUR, currency),
    formattedDueToday: formatPrice(dueTodayEUR, currency),
    formattedTotal: formatPrice(safeTotal, currency),
    schedule,
  };
}

export const PAYMENT_PLAN_TENURES: PaymentPlanTenure[] = [3, 6, 12, 24];
