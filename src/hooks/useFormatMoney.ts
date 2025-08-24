import { useEffect, useState } from "react";

export function useFormatMoney(
  amount: number,
  currency: string,
  locale?: string
) {
  const [formatted, setFormatted] = useState<string>("");

  useEffect(() => {
    try {
      const formatter = new Intl.NumberFormat(
        locale ?? (currency === "PHP" ? "en-PH" : "en-US"),
        {
          style: "currency",
          currency,
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }
      );
      setFormatted(formatter.format(amount ?? 0));
    } catch {
      setFormatted(`${currency} ${amount.toFixed(2)}`);
    }
  }, [amount, currency, locale]);

  return formatted;
}
