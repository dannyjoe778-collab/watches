import { CurrencyCode } from '../types';

export const EXCHANGE_RATES: Record<CurrencyCode, { symbol: string; rateFromEUR: number; label: string }> = {
  EUR: { symbol: '€', rateFromEUR: 1.0, label: 'EUR (€)' },
  GBP: { symbol: '£', rateFromEUR: 0.855, label: 'GBP (£)' },
  CHF: { symbol: 'CHF ', rateFromEUR: 0.965, label: 'CHF (Fr.)' },
  USD: { symbol: '$', rateFromEUR: 1.085, label: 'USD ($)' },
};

export function formatPrice(priceEUR: number, currency: CurrencyCode): string {
  const info = EXCHANGE_RATES[currency];
  const converted = Math.round(priceEUR * info.rateFromEUR);
  
  if (currency === 'EUR') {
    return `€${converted.toLocaleString('de-DE')}`;
  } else if (currency === 'GBP') {
    return `£${converted.toLocaleString('en-GB')}`;
  } else if (currency === 'CHF') {
    return `CHF ${converted.toLocaleString('de-CH')}`;
  } else {
    return `$${converted.toLocaleString('en-US')}`;
  }
}

export function getCurrencyDisclaimer(currency: CurrencyCode): string {
  if (currency === 'EUR') {
    return 'Primary transaction currency is Euro (EUR €). Settled securely via insured European bank wire or escrow.';
  }
  return `Displayed in ${currency} for client convenience (1 EUR ≈ ${EXCHANGE_RATES[currency].rateFromEUR} ${currency}). Final settlement is processed in EUR.`;
}
