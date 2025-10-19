import validator from 'validator';

const escapeStringArrayItems = (list) => {
    if (!Array.isArray(list)) return [];

    return list.filter(item => item).map(item => {
        if (typeof item !== 'string') return item;

        return validator.escape(
            item.trim()
        );
    })
}

export { escapeStringArrayItems };