export function formatNumber(number: number): string {
  const suffixes: string[] = ["", "K", "M", "B", "T"];
  const base: number = 1000;

  if (number < base) {
    return number.toFixed(2);
  }

  const magnitude: number = Math.floor(Math.log10(number) / 3);
  const suffixIndex: number = Math.min(magnitude, suffixes.length - 1);

  const adjustedNumber: number = number / Math.pow(base, suffixIndex);
  return `${adjustedNumber.toFixed(2)}${suffixes[suffixIndex]}`;
}

export function capitalizeFirstLetter(word: string): string {
  if (!word) return word;
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function truncateString(str: string, maxLength: number): string {
  if (str.length > maxLength) {
    let truncatedStr = str.substring(0, maxLength - 3);
    if (truncatedStr.endsWith("-")) {
      truncatedStr = truncatedStr.slice(0, -1);
    }
    return truncatedStr + "...";
  }
  return str;
}

export function addCommas(x: any) {
  x = x?.toString();
  const pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
  return x;
}

export function roundToTwoDecimals(num: number): number {
  return Math.round(num * 100) / 100;
}
