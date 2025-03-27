import express, { Request, Response } from 'express';

import { error } from 'console';
import { get } from 'http';
import { create } from 'domain';

import { db } from './database';

const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

const Errors = {
    ValidationError: 'ValidationError',
    StudentNotFound: 'StudentNotFound',
    ClassNotFound: 'ClassNotFound',
    AssignmentNotFound: 'AssignmentNotFound',
    ServerError: 'ServerError',
    ClientError: 'ClientError',
    StudentAlreadyEnrolled: 'StudentAlreadyEnrolled'
  }


function isMissingKeys (data: any, keysToCheckFor: string[]) {
    for (let key of keysToCheckFor) {
      if (data[key] === undefined) return true;
    } 
    return false;
}

function parseForResponse(data: unknown) {
    return JSON.parse(JSON.stringify(data));
}

function isUUID (id: string) {
    return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id);
}

// API Endpoints

// POST student created
app.post('/students', createStudentController);

// POST class created
app.post('/classes', createClassController);

// POST student assigned to class
app.post('/class-enrollments', assignStudentToClassController);

// POST assignment created
app.post('/assignments', createAssignmentController);


// POST student assigned to assignment
app.post('/student-assignments', assignStudentToAssignmentController);

// POST student submitted assignment
app.post('/student-assignments/submit', submitStudentAssignmentController);

// POST student assignment graded
app.post('/student-assignments/grade', gradeStudentAssignmentController);


// GET all students
app.get('/students', getAllStudentsController);

// GET a student by id
app.get('/students/:id', getStudentController);

// GET assignment by id
app.get('/assignments/:id', getAssignmentController);

// GET all assignments for class
app.get('/classes/:id/assignments', getClassAssignmentsController);

// GET all student submitted assignments
app.get('/student/:id/assignments', getStudentSubmittedAssignmentsController);

// GET all student grades
app.get('/student/:id/grades', getStudentGradesController);

/** ============= EXCEPTIONS ============= */
class InvalidRequestBodyException extends Error {
    constructor(missingKeys: string[]) {
        super("Body is missing required key: " + missingKeys.join(", "));
    }
}
class StudentNotFoundException extends Error {
    constructor() {
      super("Student not found");
    }
}

class StudentAlreadyEnrolledException extends Error {
    constructor() {
      super("Student is already enrolled in class");
    }
}

class AssignmentNotFoundException extends Error {
    constructor() {
        super("Assignment not found");
    }
}

/** ============= DTOs ============= */
class CreateStudentDTO{
    constructor(public name: string) {}
    static fromRequestBody(body: unknown): CreateStudentDTO {
        const requiredKeys = ['name'];
        const isRequestInvalid = !body || typeof body !== 'object' || isMissingKeys(body, requiredKeys);

        if (isRequestInvalid) throw new InvalidRequestBodyException(requiredKeys);

        const { name } = body as { name: string };
        return new CreateStudentDTO(name);
    }
}

class CreateClassDTO {
    constructor(public name: string) {}
    static fromRequestBody(body: unknown): CreateClassDTO {
        const requiredKeys = ['name'];
        const isRequestInvalid = !body || typeof body !== 'object' || isMissingKeys(body, requiredKeys);

        if (isRequestInvalid) throw new InvalidRequestBodyException(requiredKeys);

        const { name } = body as { name: string };
        return new CreateClassDTO(name);
    }
}

class AssignStudentToClassDTO {
    constructor(public studentId: string, public classId: string) {}
    static fromRequestBody(body: unknown): AssignStudentToClassDTO {
        const requiredKeys = ['studentId', 'classId'];
        const isRequestInvalid = !body || typeof body !== 'object' || isMissingKeys(body, requiredKeys);

        if (isRequestInvalid) throw new InvalidRequestBodyException(requiredKeys);

        const { studentId, classId } = body as { studentId: string; classId: string };
        return new AssignStudentToClassDTO(studentId, classId);
    }
}

class CreateAssignmentDTO {
    constructor(public classId: string, public title: string) {}
    static fromRequestBody(body: unknown): CreateAssignmentDTO {
        const requiredKeys = ['classId', 'title'];
        const isRequestInvalid = !body || typeof body !== 'object' || isMissingKeys(body, requiredKeys);

        if (isRequestInvalid) throw new InvalidRequestBodyException(requiredKeys);

        const { classId, title } = body as { classId: string; title: string };
        return new CreateAssignmentDTO(classId, title);
    }
}

class AssignStudentToAssignmentDTO {
    constructor(public studentId: string, public assignmentId: string) {}
    static fromRequestBody(body: unknown): AssignStudentToAssignmentDTO {
        const requiredKeys = ['studentId', 'assignmentId'];
        const isRequestInvalid = !body || typeof body !== 'object' || isMissingKeys(body, requiredKeys);

        if (isRequestInvalid) throw new InvalidRequestBodyException(requiredKeys);

        const { studentId, assignmentId } = body as { studentId: string; assignmentId: string };
        return new AssignStudentToAssignmentDTO(studentId, assignmentId);
    }
}

class SubmitStudentAssignmentDTO {
    constructor(public id: string) {}
    static fromRequestBody(body: unknown): SubmitStudentAssignmentDTO {
        const requiredKeys = ['id'];

        const isRequestInvalid = !body || typeof body !== 'object' || isMissingKeys(body, requiredKeys);

        if (isRequestInvalid) throw new InvalidRequestBodyException(requiredKeys);
        const { id } = body as { id: string };
        return new SubmitStudentAssignmentDTO(id);
    }
}

class GradeStudentAssignmentDTO {
    constructor(public id: string, public grade: string) {}
    static fromRequestBody(body: unknown): GradeStudentAssignmentDTO {
        const requiredKeys = ['id', 'grade'];

        const isRequestInvalid = !body || typeof body !== 'object' || isMissingKeys(body, requiredKeys);

        if (isRequestInvalid) throw new InvalidRequestBodyException(requiredKeys);
        const { id, grade } = body as { id: string; grade: string };
        return new GradeStudentAssignmentDTO(id, grade);
    }
}

class ClassNotFoundException extends Error {
    constructor(id: string) {
      super(`Class with id ${id} not found`);
    }
}

class StudentAssignmentNotFoundException extends Error {
    constructor() {
        super(
        "Student assignment not found. Please, make sure the student is assigned to the assignment."
        );
    }
}

/** ============= SERVICES ============= */
async function createStudent(dto: CreateStudentDTO){
    const { name } = dto;
    const student = db.students.save(name);
    return student;
}

async function createClass(dto: CreateClassDTO){
    const { name } = dto;
    const cls = await db.classes.save(name);
    return cls;
}

async function assignStudentToClass(dto: AssignStudentToClassDTO) {
    const { studentId, classId } = dto;

    // check if student exists
    const student = await db.students.getById(studentId);
    if (!student) throw new StudentNotFoundException();

    // check if class exists
    const cls = await db.classes.getById(classId);
    if (!cls) throw new ClassNotFoundException(classId);

    // check if student is already enrolled in class
    const duplicatedClassEnrollment = await db.classes.getEnrollment(classId, studentId);
    if (duplicatedClassEnrollment) throw new StudentAlreadyEnrolledException();

    // enroll student in class
    const classEnrollment = await db.classes.enrollStudent(classId, studentId);
    return classEnrollment;
}

async function createAssignment(dto: CreateAssignmentDTO) {
    const { classId, title } = dto;
    const assignment = await db.assignments.save(classId, title);
    return assignment;
}

async function assignStudentToAssignment(dto: AssignStudentToAssignmentDTO) {
    const { studentId, assignmentId } = dto;
    // check if student exists
    const student = await db.students.getById(studentId);
    if (!student) throw new StudentNotFoundException();

    // check if assignment exists
    const assignment = await db.assignments.getById(assignmentId);
    if (!assignment) throw new AssignmentNotFoundException();

    // assign student to assignment
    const studentAssignment = await db.assignments.assignStudent(assignmentId, studentId);
    return studentAssignment;
}

async function submitStudentAssignment(dto: SubmitStudentAssignmentDTO) {
    const { id } = dto;
		
    // check if student assignment exists
    const studentAssignment = await db.assignments.getById(id);
    if (!studentAssignment) throw new StudentAssignmentNotFoundException();

    const studentAssignmentUpdated = await db.assignments.submit(id);
    return studentAssignmentUpdated;
}

async function gradeStudentAssignment(dto: GradeStudentAssignmentDTO) {
    const { id, grade } = dto;

    // validate grade
    if (!['A', 'B', 'C', 'D'].includes(grade)) throw new Error(Errors.ValidationError);
    
    // check if student assignment exists
    const studentAssignment = await db.assignments.getById(id);
    if (!studentAssignment) throw new AssignmentNotFoundException();

    // grade student assignment
    const studentAssignmentUpdated = await db.assignments.grade(id, grade);
    return studentAssignmentUpdated;
}

async function getAllStudents() {
    const students = await db.students.getAll();
    return students;
}

async function getStudent(id: string) {
    if(!isUUID(id)) throw new Error(Errors.ValidationError);
    const student = await db.students.getById(id);
    if (!student) throw new StudentNotFoundException();
    return student;
}

async function getAssignment(id: string) {
    if(!isUUID(id)) throw new Error(Errors.ValidationError);
    const assignment = await db.assignments.getById(id);
    if (!assignment) throw new AssignmentNotFoundException();
    return assignment;
}

async function getClassAssignments(id: string) {
    if(!isUUID(id)) throw new Error(Errors.ValidationError);

    // check if class exists
    const cls = await db.classes.getById(id);
    if (!cls) throw new ClassNotFoundException(id);

    const assignments = await db.classes.getAssignments(id);
    return assignments;
}

async function getStudentSubmittedAssignments(id: string) {
    if(!isUUID(id)) throw new Error(Errors.ValidationError);
    // check if student exists
    const student = await db.students.getById(id);
    if (!student) throw new StudentNotFoundException();

    const studentAssignments = await db.students.getAssignments(id);
    return studentAssignments;
}

async function getStudentGrades(id: string) {
    if(!isUUID(id)) throw new Error(Errors.ValidationError);
    // check if student exists
    const student = await db.students.getById(id);
    if (!student) throw new StudentNotFoundException();

    const studentAssignments = await db.students.getGrades(id);
    return studentAssignments;
}

/** ============= CONTROLLERS ============= */
async function createStudentController(req: Request, res: Response) {
	try {
        const dto = CreateStudentDTO.fromRequestBody(req.body);
		const student = await createStudent(dto);
		res.status(201).json({ error: undefined, data: parseForResponse(student), success: true });
	} catch (error) {
		res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
	}
}

async function createClassController(req: Request, res: Response) {
    try {
        const dto = CreateClassDTO.fromRequestBody(req.body);
        const cls = await createClass(dto);
        res.status(201).json({ error: undefined, data: parseForResponse(cls), success: true });
    } catch (error) {
        res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
    }
}

async function assignStudentToClassController(req: Request, res: Response) {
    try {
        const dto = AssignStudentToClassDTO.fromRequestBody(req.body);
        const classEnrollment = await assignStudentToClass(dto);
        res.status(201).json({ error: undefined, data: parseForResponse(classEnrollment), success: true });
    } catch (error) {
        res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
    }

}

async function createAssignmentController(req: Request, res: Response) {
    try {
        const dto = CreateAssignmentDTO.fromRequestBody(req.body);
        const assignment = await createAssignment(dto);    
        res.status(201).json({ error: undefined, data: parseForResponse(assignment), success: true });
    } catch (error) {
        res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
    }
}

async function assignStudentToAssignmentController(req: Request, res: Response) {
    try {
        const dto = AssignStudentToAssignmentDTO.fromRequestBody(req.body);
        const studentAssignment = await assignStudentToAssignment(dto);
    
        res.status(201).json({ error: undefined, data: parseForResponse(studentAssignment), success: true });
    } catch (error) {
        res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
    }
}

async function submitStudentAssignmentController(req: Request, res: Response) {
	try {
		const dto = SubmitStudentAssignmentDTO.fromRequestBody(req.body);
		const studentAssignmentUpdated = await submitStudentAssignment(dto);
		res.status(200).json({ error: undefined, data: parseForResponse(studentAssignmentUpdated), success: true });
	} catch (error) {
		res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
	}
}

async function gradeStudentAssignmentController(req: Request, res: Response) {
    try {
        const dto = GradeStudentAssignmentDTO.fromRequestBody(req.body);
        const studentAssignmentUpdated = await gradeStudentAssignment(dto);
        res.status(200).json({ error: undefined, data: parseForResponse(studentAssignmentUpdated), success: true });
    } catch (error) {
        res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
    }
}

async function getAllStudentsController(req: Request, res: Response) {
    try {
        const students = await getAllStudents();
        res.status(200).json({ error: undefined, data: parseForResponse(students), success: true });
    } catch (error) {
        res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
    }
}

async function getStudentController(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const student = await getStudent(id);
        res.status(200).json({ error: undefined, data: parseForResponse(student), success: true });
    } catch (error) {
        res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
    }
}

async function getAssignmentController(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const assignment = await getAssignment(id);
        res.status(200).json({ error: undefined, data: parseForResponse(assignment), success: true });
    } catch (error) {
        res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
    }
}

async function getClassAssignmentsController(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const assignments = await getClassAssignments(id);
        res.status(200).json({ error: undefined, data: parseForResponse(assignments), success: true });
    } catch (error) {
        res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
    }
}

async function getStudentSubmittedAssignmentsController(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const studentAssignments = await getStudentSubmittedAssignments(id);
        res.status(200).json({ error: undefined, data: parseForResponse(studentAssignments), success: true });
    } catch (error) {
        res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
    }
}

async function getStudentGradesController(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const studentAssignments = await getStudentGrades(id);  
        res.status(200).json({ error: undefined, data: parseForResponse(studentAssignments), success: true });
    } catch (error) {
        res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
    }
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
