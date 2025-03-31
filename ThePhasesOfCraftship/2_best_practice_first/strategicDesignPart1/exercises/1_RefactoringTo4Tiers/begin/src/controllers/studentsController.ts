import { Request, Response } from 'express';

import { CreateStudentDTO } from "../dtos/students";
import { Errors } from "../errors";
import { StudentsService } from "../services/students";
import { parseForResponse } from '../utils';

export class StudentsController {
	constructor(private readonly studentsService: StudentsService) {}

	async createStudentController(req: Request, res: Response) {
		try {
					const dto = CreateStudentDTO.fromRequestBody(req.body);
			const student = await this.studentsService.createStudent(dto);
			res.status(201).json({ error: undefined, data: parseForResponse(student), success: true });
		} catch (error) {
			res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
		}
	}

	async getAllStudentsController(req: Request, res: Response) {
    try {
        const students = await this.studentsService.getAllStudents();
        res.status(200).json({ error: undefined, data: parseForResponse(students), success: true });
    } catch (error) {
        res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
    }
}

	async getStudentController(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const student = await this.studentsService.getStudent(id);
        res.status(200).json({ error: undefined, data: parseForResponse(student), success: true });
    } catch (error) {
        res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
    }
	}

	async getStudentSubmittedAssignmentsController(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const studentAssignments = await this.studentsService.getStudentSubmittedAssignments(id);
        res.status(200).json({ error: undefined, data: parseForResponse(studentAssignments), success: true });
    } catch (error) {
        res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
    }
	}

	async getStudentGradesController(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const studentAssignments = await this.studentsService.getStudentGrades(id);  
        res.status(200).json({ error: undefined, data: parseForResponse(studentAssignments), success: true });
    } catch (error) {
        res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
    }
	}
}