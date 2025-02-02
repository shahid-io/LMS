import Course from '../models/CourseModel';
import { WhereOptions } from 'sequelize';
import { CourseRepository } from '../repositories/CourseRepositoy';

export class CourseService {

    private courseRepository: CourseRepository;

    constructor() {
        this.courseRepository = new CourseRepository();
    }

    create(role: Course): Promise<Course> {
        return this.courseRepository.create(role);
    }

    async findAll(where?: WhereOptions<Course>) {
        return this.courseRepository.findAll(where);
    }

}