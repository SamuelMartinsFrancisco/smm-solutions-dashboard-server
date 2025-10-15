import { checkSchema } from 'express-validator';

const defaultValidation = {
    in: 'body',
    exists: true,
}

const stringValidation = {
    isString: true,
    trim: true,
    notEmpty: true,
    errorMessage: 'This field is required, and must be a non-empty string'
}

const idValidation = {
    ...stringValidation,
    in: 'params',
    isLength: { 
        options: { min: 8, max: 8 },
        errorMessage: 'This parameter is required and must be an 8-character string'
    },
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
        },
        tags: {
            ...defaultValidation,
            isArray: true,
            custom: { options: (tags) => tags.length > 0 },
            errorMessage: 'This field is required, and must be a non-empty array',
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
            optional: true,
        },
        tags: {
            ...defaultValidation,
            isArray: true,
            custom: { options: (tags) => tags.length > 0 },
            errorMessage: 'This field is required, and must be a non-empty array',
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