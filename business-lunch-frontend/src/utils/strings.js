export const conversionStyleWithPxToNumber = (style) => {
    const endIndex = style.length - 2;
    return parseInt(style.slice(0, endIndex), 10)
}

export const splitAddress = (address) => {
    return address.replace("ул.", "").split(" д.");
}

export const combineAddress = (streetName, houseNumber) => {
    return "ул." + streetName.trim() + " д." + houseNumber.trim().toUpperCase().replaceAll(" ", "");
}

export const splitLunchTime = (lunchTime) => {
    return lunchTime.split(" - ");
}

export const combineLunchTime = (startLunch, finishLunch) => {
    return startLunch + " - " + finishLunch;
}
