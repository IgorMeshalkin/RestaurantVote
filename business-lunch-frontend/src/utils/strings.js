export const conversionStyleWithPxToNumber = (style) => {
    const endIndex = style.length - 2;
    return parseInt(style.slice(0, endIndex), 10)
}
