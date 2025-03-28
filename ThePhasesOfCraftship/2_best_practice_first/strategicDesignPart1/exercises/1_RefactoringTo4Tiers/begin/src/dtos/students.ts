import { InvalidRequestBodyException } from "../exceptions";
import { isMissingKeys } from "../utils";

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