export function formatNumber(number: number): string {
    const suffixes: string[] = ["", "K", "M", "B", "T"];
    const base: number = 1000;

    // If the number is less than 1000, return it as is
    if (number < base) {
        return number.toFixed(2);
    }

    // Calculate the appropriate suffix index based on the order of magnitude
    const magnitude: number = Math.floor(Math.log10(number) / 3);
    const suffixIndex: number = Math.min(magnitude, suffixes.length - 1);

    // Calculate the adjusted number and append the suffix
    const adjustedNumber: number = number / Math.pow(base, suffixIndex);
    return `${adjustedNumber.toFixed(2)}${suffixes[suffixIndex]}`;
}

// Example usage:
// const largeNumber: number = 2740753928780.114;
// const formattedNumber: string = formatNumber(largeNumber);
// console.log(formattedNumber); // Output: "2.74T"
