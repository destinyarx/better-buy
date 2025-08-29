import { Currency } from '@/types/types'


export function formatMoney(n: number, currency?: Currency) {
    try {
        return new Intl.NumberFormat(currency && currency === "PHP" ? "en-PH" : undefined, {
            style: 'currency',
            currency,
            minimumFractionDigits: 0, 
            maximumFractionDigits: 4,
        }).format(n ?? 0);
    } catch {
        return `${currency} ${n}`;
    }
}

export function formatToDecimals(number: number|null) {
    if (!number) return null

    const str = number.toString();
    const parts = str.split(".");
  
    if (parts.length === 1) return str;
  
    const decimals = parts[1];
  
    if (decimals.length <= 4) return str;
  
    return Number(number).toFixed(4);
}


export function formatDate(ms: number) {
    return new Date(ms).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
}


