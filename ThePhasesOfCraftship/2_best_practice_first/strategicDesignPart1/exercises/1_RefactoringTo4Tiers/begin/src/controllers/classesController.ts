import { Request, Response } from 'express';

import { ClassesService } from "../services/classes";
import { CreateClassDTO, AssignStudentToClassDTO } from '../dtos/classes';
import { Errors } from '../errors';
import { parseForResponse } from '../utils';

export class ClassesController {
	constructor(private readonly classesService: ClassesService) {}

	async createClassController(req: Request, res: Response) {
		try {
			const dto = CreateClassDTO.fromRequestBody(req.body);
			const cls = await this.classesService.createClass(dto);
			res.status(201).json({ error: undefined, data: parseForResponse(cls), success: true });
		} catch (error) {
			res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
		}
	}
	
	async assignStudentToClassController(req: Request, res: Response) {
		try {
			const dto = AssignStudentToClassDTO.fromRequestBody(req.body);
			const classEnrollment = await this.classesService.assignStudentToClass(dto);
			res.status(201).json({ error: undefined, data: parseForResponse(classEnrollment), success: true });
		} catch (error) {
			res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
		}
	}

	async getClassAssignmentsController(req: Request, res: Response) {
    try {
			const { id } = req.params;
			const assignments = await this.classesService.getClassAssignments(id);
			res.status(200).json({ error: undefined, data: parseForResponse(assignments), success: true });
    } catch (error) {
			res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
    }
	}
}