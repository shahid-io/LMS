import { CourseService } from "../services/CourseService";
import { Request, Response } from 'express';
import { AppSuccess, AppError, HttpStatusCodes } from '../utils/common'
import message from '../i18n/en/en.json';


export class CourseController {
    private courseService: CourseService;

    constructor() {
        this.courseService = new CourseService();
    }

    async createCourse(req: Request, res: Response) {
        try {
            const course = await this.courseService.create(req.body);
            res.status(HttpStatusCodes.CREATED).json(new AppSuccess(course));
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json(error);
            } else {
                res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(new AppError(message.ERRORS.COURSE.COURSE_CREATION_FAILED, 500));
            }
        }
    }

    async getAllCourses(req: Request, res: Response) {
        try {
            const course = await this.courseService.findAll({});
            res.status(HttpStatusCodes.CREATED).json(new AppSuccess(course));
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json(error);
            } else {
                res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(new AppError(message.ERRORS.COURSE.COURSE_FETCH_FAILED, 500));
            }
        }
    }


}