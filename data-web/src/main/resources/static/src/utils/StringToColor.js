import { DEFAULT_COLOR } from "../config/Settings";

/**
 * Creates a color as a hexadecimal string based on the hash value of an input string.
 *
 * @param {string} str An input string whose color value shall be calculated.
 * @returns {string} A color formatted in "#RRGGBB" (e.g. for #FFFFFF for white).
 */
export default (str) => {
    if (typeof str !== "string") {
        return DEFAULT_COLOR;
    }

    const trimmed = str.trim();

    let hash = 0;
    for (let i = 0; i < trimmed.length; i++) {
        hash = trimmed.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xFF;
        color += (`00${value.toString(16)}`).substr(-2);
    }

    return color;
};
