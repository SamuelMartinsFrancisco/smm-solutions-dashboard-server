const splitArrayProps = (someObj) => {
    const splittedArrayProps = {}

    Object.entries(someObj).forEach(([prop, value]) => {
        if (Array.isArray(value)) {
            splittedArrayProps[prop] = value.split(',');
        }
    });

    return splittedArrayProps;
}

export { splitArrayProps };