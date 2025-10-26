export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

export class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

const handleRequestError = (error) => {
  const response = {
    status: 500,
    message: `some error ocurred in our side while processing your request` + (error.message ? `: ${error.message}` : ''),
  };

  switch (error.status) {
    case 400: 
      response.status = 400;
      response.message = error.message ?? 'is something wrong with the data provided in your request; check it, please';
      break;
    case 401:
      response.status = 401;
      response.message = 'missing or invalid authentication token';
      break;
    case 404:
      response.status = 404;
      response.message = error.message ?? "the resource you're looking for was not found";
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

    if (!errorAlreadyMapped) {
      errorResponse.details.push({
        field: err.path,
        justification: err.msg,
      })
    }
  })

  return errorResponse;
}

const throwNotFoundError = (message) => {
  throw new NotFoundError(
    message ?? "the resource you're looking for was not found"
  );
}

export { handleRequestError, handleValidationError, throwNotFoundError };