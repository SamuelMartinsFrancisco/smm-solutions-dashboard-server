import * as services from '../services/courses.service.js';
import { validationResult } from 'express-validator';
import { handleRequestError, handleValidationError } from '../utils/errorHandlers.js';

export const getAllCourses = async (req, res) => {
    const operationResult = await services.getAllCourses();
    res.status(200).send(operationResult);
}

export const addCourse = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorResponse = handleValidationError(errors.array());
        res.status(400).send(errorResponse).end();
        return;
    }
    
    try {
        const operationResult = await services.addCourse(req.body);
        res.status(201).send(operationResult).end();
    } catch (error) {
        const errorResponse = handleRequestError(error);
        res.status(errorResponse.status).send({ error: errorResponse.message }).end();
    }
}

export const deleteCourse = async (req, res) => {
    const courseId = req.params?.id;

    if (!courseId) {
        res.status(400).send({ error: 'You need to provided the ID of the course you want to delete' }).end();
    }

    try {
        await services.deleteCourse(courseId);
        res.status(204).end();
    } catch (error) {
        const errorResponse = handleRequestError(error);
        res.status(errorResponse.status).send({ error: errorResponse.message }).end();
    }
}