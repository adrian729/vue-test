export const degToRad = (deg: number): number => (deg * Math.PI) / 180;

export const randomRange = (min: number, max: number): number =>
    Math.random() * (max - min) + min;

export const logToValue = (
    value: number,
    minpos: number = 0,
    maxpos: number = 100,
    minval: number = 1,
    maxval: number = 1000,
): number => {
    if (minval <= 0) {
        minval = 0.01;
    }
    const minlval = Math.log(minval);
    const maxlval = Math.log(maxval);
    const scale = (maxlval - minlval) / (maxpos - minpos);

    return (Math.log(value) - minlval) / scale + minlval;
};

export const valueToLog = (
    value: number,
    minpos: number = 0,
    maxpos: number = 100,
    minval: number = 1,
    maxval: number = 1000,
): number => {
    if (minval <= 0) {
        minval = 0.01;
    }
    const minlval = Math.log(minval);
    const maxlval = Math.log(maxval);
    const scale = (maxlval - minlval) / (maxpos - minpos);

    return Math.exp((value - minpos) * scale + minlval);
};

export const clamp = (num: number, min: number, max: number): number =>
    Math.min(Math.max(num, min), max);
