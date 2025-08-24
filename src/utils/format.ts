import { Currency, UnitType } from '@/types/types'


export function formatMoney(n: number, currency: Currency, locale?: string) {
    try {
        return new Intl.NumberFormat(locale ?? (currency === "PHP" ? "en-PH" : undefined), {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        }).format(n ?? 0);
    } catch {
        return `${currency} ${n.toFixed(2)}`;
    }
}


