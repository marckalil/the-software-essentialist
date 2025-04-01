import { InvalidRequestBodyException } from "../shared/exceptions";
import { isMissingKeys } from "../utils";

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