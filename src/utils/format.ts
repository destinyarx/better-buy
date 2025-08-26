import { Currency } from '@/types/types'


export function formatMoney(n: number, currency: Currency) {
    try {
        return new Intl.NumberFormat(currency === "PHP" ? "en-PH" : undefined, {
            style: 'currency',
            currency,
            minimumFractionDigits: 2,
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


