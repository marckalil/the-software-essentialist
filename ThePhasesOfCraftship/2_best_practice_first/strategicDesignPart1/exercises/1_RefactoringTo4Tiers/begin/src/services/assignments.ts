import { Database } from "../database";
import { CreateAssignmentDTO, AssignStudentToAssignmentDTO, SubmitStudentAssignmentDTO, GradeStudentAssignmentDTO } from "../dtos/assignments";
import { Errors } from '../shared/errors';
import {
	StudentNotFoundException,
	AssignmentNotFoundException,
	StudentAssignmentNotFoundException
} from "../shared/exceptions";
import { isUUID } from "../utils";

export class AssignmentsService {
	constructor(private readonly db: Database) {}

	async createAssignment(dto: CreateAssignmentDTO) {
		const { classId, title } = dto;
		const assignment = await this.db.assignments.save(classId, title);
		return assignment;
	}

	async assignStudentToAssignment(dto: AssignStudentToAssignmentDTO) {
		const { studentId, assignmentId } = dto;
		// check if student exists
		const student = await this.db.students.getById(studentId);
		if (!student) throw new StudentNotFoundException();

		// check if assignment exists
		const assignment = await this.db.assignments.getById(assignmentId);
		if (!assignment) throw new AssignmentNotFoundException();

		// assign student to assignment
		const studentAssignment = await this.db.assignments.assignStudent(assignmentId, studentId);
		return studentAssignment;
	}

	async submitStudentAssignment(dto: SubmitStudentAssignmentDTO) {
		const { id } = dto;
		
		// check if student assignment exists
		const studentAssignment = await this.db.assignments.getById(id);
		if (!studentAssignment) throw new StudentAssignmentNotFoundException();

		const studentAssignmentUpdated = await this.db.assignments.submit(id);
		return studentAssignmentUpdated;
	}

	async gradeStudentAssignment(dto: GradeStudentAssignmentDTO) {
		const { id, grade } = dto;

		// validate grade
		if (!['A', 'B', 'C', 'D'].includes(grade)) throw new Error(Errors.ValidationError);
		
		// check if student assignment exists
		const studentAssignment = await this.db.assignments.getById(id);
		if (!studentAssignment) throw new AssignmentNotFoundException();

		// grade student assignment
		const studentAssignmentUpdated = await this.db.assignments.grade(id, grade);
		return studentAssignmentUpdated;
	}

	async getAssignment(id: string) {
		if(!isUUID(id)) throw new Error(Errors.ValidationError);
		const assignment = await this.db.assignments.getById(id);
		if (!assignment) throw new AssignmentNotFoundException();
		return assignment;
	}
}