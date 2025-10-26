import BaseRepository from "./base_repository.js";

const availableCourseTableFields = ['title', 'description', 'img', 'tags', 'link'];

export default class CoursesRepository extends BaseRepository {
    constructor() {
        super('courses', availableCourseTableFields);
    }
}