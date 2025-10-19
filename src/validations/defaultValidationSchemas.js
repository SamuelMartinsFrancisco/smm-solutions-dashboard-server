import { isStringArray, isEmptyArray } from '../utils/customInputValidations.js';
import { escapeStringArrayItems } from '../utils/customInputSanitizers.js';

const stringValidation = {
    isString: true,
    trim: true,
    notEmpty: true,
    errorMessage: 'This field is required, and must be a non-empty string',
    escape: true
}

const idValidation = {
    ...stringValidation,
    in: 'params',
    isLength: { 
        options: { min: 8, max: 8 },
        errorMessage: 'This parameter is required and must be an 8-character string'
    },
}

const arrayValidation = {
    isArray: true,
    isEmptyArray: { custom: isEmptyArray },
    escapeStringArrayItems: { customSanitizer: escapeStringArrayItems },
    isStringArray: { custom: isStringArray },
    errorMessage: 'This field is required, and must be a non-empty string array',
}

export { stringValidation, idValidation, arrayValidation };