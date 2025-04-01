import express, { Request, Response } from 'express';

import { ClassesService } from "../services/classes";
import { CreateClassDTO, AssignStudentToClassDTO } from '../dtos/classes';
import { Errors } from '../shared/errors';
import { parseForResponse } from '../utils';

export class ClassesController {
	private readonly router: express.Router;

	constructor(private readonly classesService: ClassesService) {
		this.router = express.Router();
		this.setupRoutes();
	}

	private setupRoutes() {
		this.router.post('/', this.createClass);
		this.router.post('/enroll', this.enrollStudent);
		this.router.get('/:id/assignments', this.getClassAssignments);
	}

	getRouter() {
		return this.router;
	}

	async createClass(req: Request, res: Response) {
		try {
			const dto = CreateClassDTO.fromRequestBody(req.body);
			const cls = await this.classesService.createClass(dto);
			res.status(201).json({ error: undefined, data: parseForResponse(cls), success: true });
		} catch (error) {
			res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
		}
	}
	
	async enrollStudent(req: Request, res: Response) {
		try {
			const dto = AssignStudentToClassDTO.fromRequestBody(req.body);
			const classEnrollment = await this.classesService.enrollStudent(dto);
			res.status(201).json({ error: undefined, data: parseForResponse(classEnrollment), success: true });
		} catch (error) {
			res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
		}
	}

	async getClassAssignments(req: Request, res: Response) {
    try {
			const { id } = req.params;
			const assignments = await this.classesService.getClassAssignments(id);
			res.status(200).json({ error: undefined, data: parseForResponse(assignments), success: true });
    } catch (error) {
			res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
    }
	}
}