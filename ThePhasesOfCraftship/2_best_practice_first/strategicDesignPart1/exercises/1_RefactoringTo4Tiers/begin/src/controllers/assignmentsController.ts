import express, { NextFunction, Request, Response } from 'express';

import { AssignmentsService } from "../services/assignments";
import {
	AssignStudentToAssignmentDTO,
	CreateAssignmentDTO,
	GradeStudentAssignmentDTO,
	SubmitStudentAssignmentDTO,
} from '../dtos/assignments';
import { ErrorHandler } from '../shared/errors';
import { parseForResponse } from '../utils';

export class AssignmentsController {
	private readonly router: express.Router;

	constructor(
		private readonly assignmentsService: AssignmentsService,
		private readonly errorHandler: ErrorHandler
	) {
		this.router = express.Router();
		this.setupRoutes();
		this.setupErrorHandler();
	}

	private setupRoutes() {
		this.router.post('/', this.createAssignment);
		this.router.post('/assign', this.assignStudent);
		this.router.post('/submit', this.submitStudentAssignment);
		this.router.post('/grade', this.gradeStudentAssignment);
		this.router.get('/:id', this.getAssignment);
	}

	getRouter() {
		return this.router;
	}

	private setupErrorHandler() {
		this.router.use(this.errorHandler);
	}

	async createAssignment(
		req: Request,
		res: Response,
		next: NextFunction
	) {
    try {
			const dto = CreateAssignmentDTO.fromRequestBody(req.body);
			const assignment = await this.assignmentsService.createAssignment(dto);    
			res.status(201).json({ error: undefined, data: parseForResponse(assignment), success: true });
    } catch (error) {
			next(error);
    }
	}

	async assignStudent(
		req: Request,
		res: Response,
		next: NextFunction
	) {
    try {
			const dto = AssignStudentToAssignmentDTO.fromRequestBody(req.body);
			const studentAssignment = await this.assignmentsService.assignStudentToAssignment(dto);
			res.status(201).json({ error: undefined, data: parseForResponse(studentAssignment), success: true });
    } catch (error) {
			next(error);
    }
	}

	async submitStudentAssignment(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const dto = SubmitStudentAssignmentDTO.fromRequestBody(req.body);
			const studentAssignmentUpdated = await this.assignmentsService.submitStudentAssignment(dto);
			res.status(200).json({ error: undefined, data: parseForResponse(studentAssignmentUpdated), success: true });
		} catch (error) {
			next(error);
		}
	}

	async gradeStudentAssignment(
		req: Request,
		res: Response,
		next: NextFunction
	) {
    try {
			const dto = GradeStudentAssignmentDTO.fromRequestBody(req.body);
			const studentAssignmentUpdated = await this.assignmentsService.gradeStudentAssignment(dto);
			res.status(200).json({ error: undefined, data: parseForResponse(studentAssignmentUpdated), success: true });
    } catch (error) {
			next(error);
    }
	}

	async getAssignment(
		req: Request,
		res: Response,
		next: NextFunction
	) {
    try {
			const { id } = req.params;
			const assignment = await this.assignmentsService.getAssignment(id);
			res.status(200).json({ error: undefined, data: parseForResponse(assignment), success: true });
    } catch (error) {
			next(error);
    }
	}
}