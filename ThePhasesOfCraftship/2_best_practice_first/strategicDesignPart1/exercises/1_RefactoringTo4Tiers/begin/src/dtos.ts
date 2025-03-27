import { InvalidRequestBodyException } from "./exceptions";

function isMissingKeys (data: any, keysToCheckFor: string[]) {
	for (let key of keysToCheckFor) {
		if (data[key] === undefined) return true;
	} 
	return false;
}

export class CreateStudentDTO{
		constructor(public name: string) {}
		static fromRequestBody(body: unknown): CreateStudentDTO {
				const requiredKeys = ['name'];
				const isRequestInvalid = !body || typeof body !== 'object' || isMissingKeys(body, requiredKeys);

				if (isRequestInvalid) throw new InvalidRequestBodyException(requiredKeys);

				const { name } = body as { name: string };
				return new CreateStudentDTO(name);
		}
}

export class CreateClassDTO {
		constructor(public name: string) {}
		static fromRequestBody(body: unknown): CreateClassDTO {
				const requiredKeys = ['name'];
				const isRequestInvalid = !body || typeof body !== 'object' || isMissingKeys(body, requiredKeys);

				if (isRequestInvalid) throw new InvalidRequestBodyException(requiredKeys);

				const { name } = body as { name: string };
				return new CreateClassDTO(name);
		}
}

export class AssignStudentToClassDTO {
		constructor(public studentId: string, public classId: string) {}
		static fromRequestBody(body: unknown): AssignStudentToClassDTO {
				const requiredKeys = ['studentId', 'classId'];
				const isRequestInvalid = !body || typeof body !== 'object' || isMissingKeys(body, requiredKeys);

				if (isRequestInvalid) throw new InvalidRequestBodyException(requiredKeys);

				const { studentId, classId } = body as { studentId: string; classId: string };
				return new AssignStudentToClassDTO(studentId, classId);
		}
}

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

export class ClassNotFoundException extends Error {
		constructor(id: string) {
			super(`Class with id ${id} not found`);
		}
}

export class StudentAssignmentNotFoundException extends Error {
		constructor() {
				super(
				"Student assignment not found. Please, make sure the student is assigned to the assignment."
				);
		}
}