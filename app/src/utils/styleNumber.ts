export const StyleNumber = (value: string | number) => {
    if (typeof value !== "number") {
        value = parseInt(value);
    }
    
    let rounded = Math.round(value);
    let formatted = new Intl.NumberFormat("en-US").format(rounded);
    return formatted;
}