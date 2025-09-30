import express from 'express';
import * as controllers from '../controllers/courses.controller.js';
import validateCourseInputs from '../validations/courses.validation.js';

const coursesRouter = express.Router();

coursesRouter.get('/courses', controllers.getAllCourses);
coursesRouter.post('/courses', validateCourseInputs(), controllers.addCourse);
coursesRouter.delete('/courses/:id', controllers.deleteCourse);

export default coursesRouter;