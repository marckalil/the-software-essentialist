import { Request, Response } from 'express';

import { Errors } from "./errors";
import {
	AssignStudentToAssignmentDTO,
	AssignStudentToClassDTO,
	CreateAssignmentDTO,
	CreateClassDTO,
	CreateStudentDTO,
	GradeStudentAssignmentDTO,
	SubmitStudentAssignmentDTO,
} from "./dtos";
import { createStudent, 
	assignStudentToAssignment,
	assignStudentToClass, 
	createAssignment,
	createClass, 
	getAllStudents,
	getAssignment,
	getClassAssignments,
	getStudent,
	getStudentGrades,
	getStudentSubmittedAssignments,
	gradeStudentAssignment,
	submitStudentAssignment,
} from "./services";

function parseForResponse(data: unknown) {
	return JSON.parse(JSON.stringify(data));
}

export async function createStudentController(req: Request, res: Response) {
	try {
        const dto = CreateStudentDTO.fromRequestBody(req.body);
		const student = await createStudent(dto);
		res.status(201).json({ error: undefined, data: parseForResponse(student), success: true });
	} catch (error) {
		res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
	}
}

export async function createClassController(req: Request, res: Response) {
    try {
        const dto = CreateClassDTO.fromRequestBody(req.body);
        const cls = await createClass(dto);
        res.status(201).json({ error: undefined, data: parseForResponse(cls), success: true });
    } catch (error) {
        res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
    }
}

export async function assignStudentToClassController(req: Request, res: Response) {
    try {
        const dto = AssignStudentToClassDTO.fromRequestBody(req.body);
        const classEnrollment = await assignStudentToClass(dto);
        res.status(201).json({ error: undefined, data: parseForResponse(classEnrollment), success: true });
    } catch (error) {
        res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
    }

}

export async function createAssignmentController(req: Request, res: Response) {
    try {
        const dto = CreateAssignmentDTO.fromRequestBody(req.body);
        const assignment = await createAssignment(dto);    
        res.status(201).json({ error: undefined, data: parseForResponse(assignment), success: true });
    } catch (error) {
        res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
    }
}

export async function assignStudentToAssignmentController(req: Request, res: Response) {
    try {
        const dto = AssignStudentToAssignmentDTO.fromRequestBody(req.body);
        const studentAssignment = await assignStudentToAssignment(dto);
    
        res.status(201).json({ error: undefined, data: parseForResponse(studentAssignment), success: true });
    } catch (error) {
        res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
    }
}

export async function submitStudentAssignmentController(req: Request, res: Response) {
	try {
		const dto = SubmitStudentAssignmentDTO.fromRequestBody(req.body);
		const studentAssignmentUpdated = await submitStudentAssignment(dto);
		res.status(200).json({ error: undefined, data: parseForResponse(studentAssignmentUpdated), success: true });
	} catch (error) {
		res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
	}
}

export async function gradeStudentAssignmentController(req: Request, res: Response) {
    try {
        const dto = GradeStudentAssignmentDTO.fromRequestBody(req.body);
        const studentAssignmentUpdated = await gradeStudentAssignment(dto);
        res.status(200).json({ error: undefined, data: parseForResponse(studentAssignmentUpdated), success: true });
    } catch (error) {
        res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
    }
}

export async function getAllStudentsController(req: Request, res: Response) {
    try {
        const students = await getAllStudents();
        res.status(200).json({ error: undefined, data: parseForResponse(students), success: true });
    } catch (error) {
        res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
    }
}

export async function getStudentController(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const student = await getStudent(id);
        res.status(200).json({ error: undefined, data: parseForResponse(student), success: true });
    } catch (error) {
        res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
    }
}

export async function getAssignmentController(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const assignment = await getAssignment(id);
        res.status(200).json({ error: undefined, data: parseForResponse(assignment), success: true });
    } catch (error) {
        res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
    }
}

export async function getClassAssignmentsController(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const assignments = await getClassAssignments(id);
        res.status(200).json({ error: undefined, data: parseForResponse(assignments), success: true });
    } catch (error) {
        res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
    }
}

export async function getStudentSubmittedAssignmentsController(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const studentAssignments = await getStudentSubmittedAssignments(id);
        res.status(200).json({ error: undefined, data: parseForResponse(studentAssignments), success: true });
    } catch (error) {
        res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
    }
}

export async function getStudentGradesController(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const studentAssignments = await getStudentGrades(id);  
        res.status(200).json({ error: undefined, data: parseForResponse(studentAssignments), success: true });
    } catch (error) {
        res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
    }
}