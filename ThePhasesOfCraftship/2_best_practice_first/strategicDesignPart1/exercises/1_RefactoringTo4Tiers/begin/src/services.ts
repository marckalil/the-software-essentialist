import { db } from './database';
import { Errors } from './errors';
import { AssignStudentToAssignmentDTO, AssignStudentToClassDTO, ClassNotFoundException, CreateAssignmentDTO, CreateClassDTO, CreateStudentDTO, GradeStudentAssignmentDTO, StudentAssignmentNotFoundException, SubmitStudentAssignmentDTO } from "./dtos";
import { AssignmentNotFoundException, StudentAlreadyEnrolledException, StudentNotFoundException } from "./exceptions";

function isUUID (id: string) {
	return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id);
}

export async function createStudent(dto: CreateStudentDTO){
		const { name } = dto;
		const student = db.students.save(name);
		return student;
}

export async function createClass(dto: CreateClassDTO){
		const { name } = dto;
		const cls = await db.classes.save(name);
		return cls;
}

export async function assignStudentToClass(dto: AssignStudentToClassDTO) {
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

export async function createAssignment(dto: CreateAssignmentDTO) {
		const { classId, title } = dto;
		const assignment = await db.assignments.save(classId, title);
		return assignment;
}

export async function assignStudentToAssignment(dto: AssignStudentToAssignmentDTO) {
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

export async function submitStudentAssignment(dto: SubmitStudentAssignmentDTO) {
		const { id } = dto;
		
		// check if student assignment exists
		const studentAssignment = await db.assignments.getById(id);
		if (!studentAssignment) throw new StudentAssignmentNotFoundException();

		const studentAssignmentUpdated = await db.assignments.submit(id);
		return studentAssignmentUpdated;
}

export async function gradeStudentAssignment(dto: GradeStudentAssignmentDTO) {
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

export async function getAllStudents() {
		const students = await db.students.getAll();
		return students;
}

export async function getStudent(id: string) {
		if(!isUUID(id)) throw new Error(Errors.ValidationError);
		const student = await db.students.getById(id);
		if (!student) throw new StudentNotFoundException();
		return student;
}

export async function getAssignment(id: string) {
		if(!isUUID(id)) throw new Error(Errors.ValidationError);
		const assignment = await db.assignments.getById(id);
		if (!assignment) throw new AssignmentNotFoundException();
		return assignment;
}

export async function getClassAssignments(id: string) {
		if(!isUUID(id)) throw new Error(Errors.ValidationError);

		// check if class exists
		const cls = await db.classes.getById(id);
		if (!cls) throw new ClassNotFoundException(id);

		const assignments = await db.classes.getAssignments(id);
		return assignments;
}

export async function getStudentSubmittedAssignments(id: string) {
		if(!isUUID(id)) throw new Error(Errors.ValidationError);
		// check if student exists
		const student = await db.students.getById(id);
		if (!student) throw new StudentNotFoundException();

		const studentAssignments = await db.students.getAssignments(id);
		return studentAssignments;
}

export async function getStudentGrades(id: string) {
		if(!isUUID(id)) throw new Error(Errors.ValidationError);
		// check if student exists
		const student = await db.students.getById(id);
		if (!student) throw new StudentNotFoundException();

		const studentAssignments = await db.students.getGrades(id);
		return studentAssignments;
}