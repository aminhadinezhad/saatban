const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

export function toFa(value: string | number): string {
  return String(value).replace(/\d/g, (d) => FA_DIGITS[Number(d)]!);
}

/** 1590000 → "۱٬۵۹۰٬۰۰۰" */
export function formatToman(value: number): string {
  return toFa(Math.round(value).toLocaleString("en-US")).replace(/,/g, "٬");
}

/** Price per month, rounded to the nearest thousand: 491667 → "۴۹۲ هزار" */
export function perMonthLabel(price: number, months: number): string {
  return `${toFa(Math.round(price / months / 1000))} هزار`;
}

export function cn(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}
