/**
 * Slices a string to a specified length and adds ellipsis if it's too long.
 *
 * @param {string} txt - The input text that needs to be sliced.
 * @param {number} [max=50] - The maximum length of the sliced text. Defaults to 50 if not provided.
 * @returns {string} - The sliced text with ellipsis if it exceeds the max length, otherwise the original text.
 */

export function txtSlicer(txt: string, max: number = 50):string {
    if(txt.length >= max) return `${txt.slice(0, max)}...`;
    return txt;
}