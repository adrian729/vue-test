export const degToRad = (deg) => {
    return (deg * Math.PI) / 180;
};

export const randomRange = (min, max) => {
    return Math.random() * (max - min) + min;
};

export const logToValue = (
    value,
    minpos = 0,
    maxpos = 100,
    minval = 1,
    maxval = 1000,
) => {
    if (minval <= 0) {
        minval = 0.01;
    }
    const minlval = Math.log(minval);
    const maxlval = Math.log(maxval);
    const scale = (maxlval - minlval) / (maxpos - minpos);

    return (Math.log(value) - minlval) / scale + minlval;
};

export function valueToLog(
    value,
    minpos = 0,
    maxpos = 100,
    minval = 1,
    maxval = 1000,
) {
    if (minval <= 0) {
        minval = 0.01;
    }
    const minlval = Math.log(minval);
    const maxlval = Math.log(maxval);
    const scale = (maxlval - minlval) / (maxpos - minpos);

    return Math.exp((value - minpos) * scale + minlval);
}
