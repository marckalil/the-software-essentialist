import { Request, Response } from 'express';

import { AssignmentsService } from "../services/assignments";
import {
	CreateAssignmentDTO,
	AssignStudentToAssignmentDTO,
	SubmitStudentAssignmentDTO,
	GradeStudentAssignmentDTO
} from '../dtos/assignments';
import { Errors } from '../errors';
import { parseForResponse } from '../utils';

export class AssignmentsController {
	constructor(private readonly assignmentsService: AssignmentsService) {}

	async createAssignmentController(req: Request, res: Response) {
    try {
			const dto = CreateAssignmentDTO.fromRequestBody(req.body);
			const assignment = await this.assignmentsService.createAssignment(dto);    
			res.status(201).json({ error: undefined, data: parseForResponse(assignment), success: true });
    } catch (error) {
			res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
    }
	}

	async assignStudentToAssignmentController(req: Request, res: Response) {
    try {
			const dto = AssignStudentToAssignmentDTO.fromRequestBody(req.body);
			const studentAssignment = await this.assignmentsService.assignStudentToAssignment(dto);
			res.status(201).json({ error: undefined, data: parseForResponse(studentAssignment), success: true });
    } catch (error) {
        res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
    }
	}

	async submitStudentAssignmentController(req: Request, res: Response) {
		try {
			const dto = SubmitStudentAssignmentDTO.fromRequestBody(req.body);
			const studentAssignmentUpdated = await this.assignmentsService.submitStudentAssignment(dto);
			res.status(200).json({ error: undefined, data: parseForResponse(studentAssignmentUpdated), success: true });
		} catch (error) {
			res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
		}
	}

	async gradeStudentAssignmentController(req: Request, res: Response) {
    try {
			const dto = GradeStudentAssignmentDTO.fromRequestBody(req.body);
			const studentAssignmentUpdated = await this.assignmentsService.gradeStudentAssignment(dto);
			res.status(200).json({ error: undefined, data: parseForResponse(studentAssignmentUpdated), success: true });
    } catch (error) {
			res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
    }
	}

	async getAssignmentController(req: Request, res: Response) {
    try {
			const { id } = req.params;
			const assignment = await this.assignmentsService.getAssignment(id);
			res.status(200).json({ error: undefined, data: parseForResponse(assignment), success: true });
    } catch (error) {
			res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
    }
	}
}