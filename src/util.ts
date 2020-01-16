// not hardened in any way
export function parsePercent(ps: string) {
    return parseFloat(ps) / 100.0;
}

export function formatDollarValue(amt: number): string {
    return '$' + amt.toFixed(2);
}
