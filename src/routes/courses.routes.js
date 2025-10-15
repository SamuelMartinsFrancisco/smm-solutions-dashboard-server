import express from 'express';
import * as controllers from '../controllers/courses.controller.js';
import validateCourseInputs from '../validations/courses.validation.js';

const coursesRouter = express.Router();

coursesRouter.get('/courses', controllers.getAllCourses);
coursesRouter.get('/courses/:id', validateCourseInputs.getById(), controllers.getCourse);
coursesRouter.post('/courses', validateCourseInputs.post(), controllers.addCourse);
coursesRouter.patch('/courses/:id', validateCourseInputs.patch(), controllers.updateCourse);
coursesRouter.delete('/courses/:id', validateCourseInputs.delete(), controllers.deleteCourse);

export default coursesRouter;