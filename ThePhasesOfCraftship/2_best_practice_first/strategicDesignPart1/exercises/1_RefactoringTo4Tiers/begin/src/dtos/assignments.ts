import { InvalidRequestBodyException } from "../shared/exceptions";
import { isMissingKeys } from "../utils";

export class CreateAssignmentDTO {
	constructor(public classId: string, public title: string) {}
	static fromRequestBody(body: unknown): CreateAssignmentDTO {
			const requiredKeys = ['classId', 'title'];
			const isRequestInvalid = !body || typeof body !== 'object' || isMissingKeys(body, requiredKeys);

			if (isRequestInvalid) throw new InvalidRequestBodyException(requiredKeys);

			const { classId, title } = body as { classId: string; title: string };
			return new CreateAssignmentDTO(classId, title);
	}
}

export class AssignStudentToAssignmentDTO {
	constructor(public studentId: string, public assignmentId: string) {}
	static fromRequestBody(body: unknown): AssignStudentToAssignmentDTO {
			const requiredKeys = ['studentId', 'assignmentId'];
			const isRequestInvalid = !body || typeof body !== 'object' || isMissingKeys(body, requiredKeys);

			if (isRequestInvalid) throw new InvalidRequestBodyException(requiredKeys);

			const { studentId, assignmentId } = body as { studentId: string; assignmentId: string };
			return new AssignStudentToAssignmentDTO(studentId, assignmentId);
	}
}

export class SubmitStudentAssignmentDTO {
	constructor(public id: string) {}
	static fromRequestBody(body: unknown): SubmitStudentAssignmentDTO {
			const requiredKeys = ['id'];

			const isRequestInvalid = !body || typeof body !== 'object' || isMissingKeys(body, requiredKeys);

			if (isRequestInvalid) throw new InvalidRequestBodyException(requiredKeys);
			const { id } = body as { id: string };
			return new SubmitStudentAssignmentDTO(id);
	}
}

export class GradeStudentAssignmentDTO {
	constructor(public id: string, public grade: string) {}
	static fromRequestBody(body: unknown): GradeStudentAssignmentDTO {
			const requiredKeys = ['id', 'grade'];

			const isRequestInvalid = !body || typeof body !== 'object' || isMissingKeys(body, requiredKeys);

			if (isRequestInvalid) throw new InvalidRequestBodyException(requiredKeys);
			const { id, grade } = body as { id: string; grade: string };
			return new GradeStudentAssignmentDTO(id, grade);
	}
}