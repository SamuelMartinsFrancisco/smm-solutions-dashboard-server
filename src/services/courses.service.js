import { query } from "../config/database.js";
import { nanoid } from "nanoid";

export const getAllCourses = async () => {
    const { rows } = await query('SELECT * FROM courses');

    return rows;
}

export const addCourse = async (data) => {
    const text = 'INSERT INTO courses(id, title, description, img, link, tags) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *'
    const values = [
        nanoid(), 
        data.title, 
        data.description, 
        data?.img ?? null, 
        data.link, 
        data.tags.toString()
    ];

    const response = await query(text, values);
    
    return response.rows[0];
}

export const deleteCourse = async (courseId) => {
    const text = `DELETE FROM courses WHERE id=$1`;

    await query(text, [courseId]);
    return;
}