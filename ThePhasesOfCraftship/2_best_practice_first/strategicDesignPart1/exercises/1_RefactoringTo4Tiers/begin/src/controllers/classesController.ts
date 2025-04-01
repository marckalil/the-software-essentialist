import express, { NextFunction, Request, Response } from 'express';

import { ClassesService } from "../services/classes";
import { CreateClassDTO, AssignStudentToClassDTO } from '../dtos/classes';
import { parseForResponse } from '../utils';
import { ErrorHandler } from '../shared/errors';

export class ClassesController {
	private readonly router: express.Router;

	constructor(
		private readonly classesService: ClassesService,
		private readonly errorHandler: ErrorHandler
	) {
		this.router = express.Router();
		this.setupRoutes();
		this.setupErrorHandler();
	}

	private setupRoutes() {
		this.router.post('/', this.createClass);
		this.router.post('/enroll', this.enrollStudent);
		this.router.get('/:id/assignments', this.getClassAssignments);
	}

	getRouter() {
		return this.router;
	}

	private setupErrorHandler() {
		this.router.use(this.errorHandler);
	}

	async createClass(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const dto = CreateClassDTO.fromRequestBody(req.body);
			const cls = await this.classesService.createClass(dto);
			res.status(201).json({ error: undefined, data: parseForResponse(cls), success: true });
		} catch (error) {
			next(error);
		}
	}
	
	async enrollStudent(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const dto = AssignStudentToClassDTO.fromRequestBody(req.body);
			const classEnrollment = await this.classesService.enrollStudent(dto);
			res.status(201).json({ error: undefined, data: parseForResponse(classEnrollment), success: true });
		} catch (error) {
			next(error);
		}
	}

	async getClassAssignments(
		req: Request,
		res: Response,
		next: NextFunction
	) {
    try {
			const { id } = req.params;
			const assignments = await this.classesService.getClassAssignments(id);
			res.status(200).json({ error: undefined, data: parseForResponse(assignments), success: true });
    } catch (error) {
			next(error);
    }
	}
}