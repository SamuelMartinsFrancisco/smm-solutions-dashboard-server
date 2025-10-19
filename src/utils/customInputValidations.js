const isStringArray = (list) => {
    if (!Array.isArray(list)) return false;

    let validationResult = true;

    list.forEach(item => {
        if (item && typeof item !== 'string' && validationResult) {
            validationResult = false;
        }
    })

    return validationResult;
}

const isEmptyArray = (list) => {
    if (!Array.isArray(list)) return false;

    return list.length > 0;
}

export { isStringArray, isEmptyArray };