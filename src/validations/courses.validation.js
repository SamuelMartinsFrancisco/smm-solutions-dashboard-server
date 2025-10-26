import { checkSchema } from 'express-validator';
import { stringValidation, idValidation, arrayValidation } from './defaultValidationSchemas.js';

const defaultValidation = {
    in: 'body',
    exists: true,
}

const validateCourseInputs = {
    getById: () => checkSchema({
        id: idValidation
    }),
    post: () => checkSchema({
        title: { 
            ...defaultValidation,
            ...stringValidation,
        },
        description: { 
            ...defaultValidation,
            ...stringValidation,
        },
        link: { 
            ...defaultValidation,
            ...stringValidation,
            escape: false,
            blacklist: {
                options: '<>',
            },
        },
        tags: {
            ...defaultValidation,
            ...arrayValidation,
        },
        img: { 
            ...defaultValidation, 
            ...stringValidation, 
            errorMessage: 'This field is optional, and must be a non-empty string',
            optional: true,
        }, 
    }),
    patch: () => checkSchema({
        title: { 
            ...defaultValidation,
            ...stringValidation,
            optional: true,
        },
        description: { 
            ...defaultValidation,
            ...stringValidation,
            optional: true,
        },
        link: { 
            ...defaultValidation,
            ...stringValidation,
            escape: false,
            blacklist: {
                options: '<>',
            },
            optional: true,
        },
        tags: {
            ...defaultValidation,
            ...arrayValidation,
            optional: true,
        },
        img: { 
            ...defaultValidation, 
            ...stringValidation, 
            errorMessage: 'This field is optional, and must be a non-empty string',
            optional: true,
        }, 
        id: idValidation
    }),
    delete: () => checkSchema({
        id: idValidation
    })
}

export default validateCourseInputs;