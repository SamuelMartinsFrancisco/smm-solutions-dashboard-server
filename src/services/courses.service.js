import CoursesRepository from "../repositories/courses.repository.js";
import { NotFoundError } from "../utils/errorHandlers.js";
import { splitArrayProps } from "../utils/splitArrayProps.js";
 
const courses = new CoursesRepository();

export const getAllCourses = async () => {
    return await courses.findAll();
}

export const getCourse = async (id) => {
    const result = await courses.findById(id);
    
    if (!result) throw new NotFoundError("Sorry, the course you're looking for was not be found");

    return result; 
} 

export const addCourse = async (data) => {
    const tags = data.tags.toString();

    return await courses.create({...data, tags});
}

export const updateCourse = async (data, id) => {
    const tags = data?.tags?.toString();
    const treatedData = tags ? {...data, tags} : data;
    const result = await courses.update(treatedData, id);

    if (!result) throw new NotFoundError("Sorry, the course you're trying to edit was not found");

    return result;
}

export const deleteCourse = async (id) => {
    return await courses.delete(id);
}