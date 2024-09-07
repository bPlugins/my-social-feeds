
export const ratioCheck = (val = "9:16") => {
    const [width, height] = val.split(':');
    const result = (parseInt(height) / parseInt(width)) * 100;
    return result;
}