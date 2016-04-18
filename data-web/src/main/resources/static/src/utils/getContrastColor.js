import { DEFAULT_BRIGHT_COLOR, DEFAULT_DARK_COLOR } from "../config/Settings";

const RED_RATIO = 0.299;
const GREEN_RATIO = 0.587;
const BLUE_RATIO = 0.114;

const BRIGHTNESS_THRESHOLD = 186;

const calcWithWeight = (red, green, blue) => {
    return (red*RED_RATIO + green*GREEN_RATIO + blue*BLUE_RATIO);
};

const hexadecToDecimal = (hex) => {
    return parseInt(hex, 16);
};

/**
 * Creates a contrasting color based on a hexadecimal representation of an input color. Contrast can be understood in
 * the sense of brightness.
 *
 * @param {string} hexcode A color in hexadecimal code. Currently the format "#RRGGBB" is accepted (e.g. #FFFFFF for white).
 * @returns {string} A contrasting color in hexadecimal code with fornat "#RRGGBB".
 */
export default (hexcode) => {
    const red = hexadecToDecimal(hexcode.substring(1, 3));
    const green = hexadecToDecimal(hexcode.substring(3, 5));
    const blue = hexadecToDecimal(hexcode.substring(5, 7));

    return calcWithWeight(red, green, blue) > BRIGHTNESS_THRESHOLD ? DEFAULT_DARK_COLOR : DEFAULT_BRIGHT_COLOR;
};
