const handleRequestError = (error) => {
    const response = {
        status: 500,
        message: `some error ocurred in our side while processing your request: ${error}`,
    };

    switch (error.status) {
        case 401:
            response.status = 401;
            response.message = 'missing or invalid authentication token';
            break;
        case 404: 
            response.status = 404;
            response.message = "the resource you're looking for was not found";
        default: 
            break;
    }

    return response;
}

const handleValidationError = (errors) => {
    const errorResponse = {
        error: 'invalid data',
        details: []
    }

    errors.forEach((err) => {
        const errorAlreadyMapped = Boolean(errorResponse.details.find(error => error.field === err.path))
        
        if (!errorAlreadyMapped){
            errorResponse.details.push({
                field: err.path,
                justification: err.msg,
            })
        }
    })

    return errorResponse;
}

export { handleRequestError, handleValidationError };