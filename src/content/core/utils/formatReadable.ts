function scaleInt(num: bigint, scale: bigint, decimals: bigint): string {
    const high: bigint = num / scale;
    const low: bigint = (num % scale) * (10n ** decimals) / scale;
    if (low !== 0n)
        return `${high}.${low}`;
    
    return `${high}`;
}

export function formatInteger(num: bigint | number, decimals: bigint | number = 1n): string {
    if (typeof num === 'number') {
        if (!Number.isSafeInteger(num)) {
            console.error(`Attempted to parse non-integer value to integer: ${String(num)}`);
            return '';
        }
        num = BigInt(num);
    }

    decimals = BigInt(decimals);

    if (num < 1_000n)
        return num.toString();

    if (num < 1_000_000n)
        return `${scaleInt(num, 1_000n, decimals)}K`;
    
    if (num < 1_000_000_000n)
        return `${scaleInt(num, 1_000_000n, decimals)}M`;
    
    if (num < 1_000_000_000_000n)
        return `${scaleInt(num, 1_000_000_000n, decimals)}B`;

    if (num < 1_000_000_000_000_000n)
        return `${scaleInt(num, 1_000_000_000_000n, decimals)}T`;

    return `${(num / 1_000_000_000_000_000n)}Qa`;
}

export function formatFloat(num: number, decimals: number = 1): string {
    if (Number.isNaN(num))
        return "NaN";

    if (num === Infinity)
        return "infinite";

    if (num === -Infinity)
        return "-infinite";

    if (num < 1_000) {
        return num.toString();
    }

    let result;
    if (num < 1_000_000)
        result = `${(num / 1000).toFixed(decimals)}K`;
    
    else if (num < 1_000_000_000)
        result = `${(num / 1_000_000).toFixed(decimals)}M`;
    
    else if (num < 1_000_000_000_000)
        result = `${(num / 1_000_000_000).toFixed(decimals)}B`;

    else if (num < 1_000_000_000_000_000)
        result = `${(num / 1_000_000_000_000).toFixed(decimals)}T`;

    else if (num < 1_000_000_000_000_000_000)
        result = `${(num / 1_000_000_000_000_000).toFixed(decimals)}Qa`;

    else if (num < 1_000_000_000_000_000_000_000)
        result = `${(num / 1_000_000_000_000_000_000).toFixed(decimals)}Qi`;

    else
        result = `${(num / 1_000_000_000_000_000_000_000).toFixed(decimals)}Sx`;

    result = result.replace(/\.0(.*)$/, (match: any, suffix: string) => suffix);

    return result;
}
