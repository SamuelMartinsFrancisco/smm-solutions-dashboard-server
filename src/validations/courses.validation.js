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

const validateCourseInputs = () => {
    return checkSchema({
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
    });
}

export default validateCourseInputs;