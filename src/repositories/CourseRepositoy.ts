import Course from '../models/CourseModel';
import { IRepository } from './IRepository';
import { WhereOptions } from 'sequelize';

export class CourseRepository implements IRepository<Course> {
    async findAll(where?: WhereOptions<Course>): Promise<Course[]> {
        return await Course.findAll({ where });
    }

    async findById(id: number): Promise<Course | null> {
        return await Course.findByPk(id);
    }
    async findOne(where?: WhereOptions<Course>): Promise<Course | null> {
        return await Course.findOne({ where });
    }

    async create(payload: Course): Promise<Course> {
        return await Course.create(payload);
    }

    async update(id: number, payload: Course): Promise<Course> {
        const foundCourse = await Course.findByPk(id);
        if (foundCourse) {
            return await foundCourse.update(payload);
        }
        throw new Error('Course not found');
    }

    async delete(id: number): Promise<void> {
        const response = await Course.findByPk(id);
        if (response) {
            await response.destroy();
        } else {
            throw new Error('Course not found');
        }
    }

}