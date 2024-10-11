export function roundTo(num: number, precision: number) {
    const factor = Math.pow(10, precision);
    return Math.round(num * factor) / factor;
}

export const percentDiff = (/** @type {number} */ a: number, /** @type {number} */ b: number) => {
    let sol = ((a - b) / b) * 100;
    return roundTo(sol, 2);
};

