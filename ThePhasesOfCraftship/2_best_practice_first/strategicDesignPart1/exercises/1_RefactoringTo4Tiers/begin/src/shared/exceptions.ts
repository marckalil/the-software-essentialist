export class InvalidRequestBodyException extends Error {
		constructor(missingKeys: string[]) {
				super("Body is missing required key: " + missingKeys.join(", "));
		}
}
export class StudentNotFoundException extends Error {
		constructor() {
			super("Student not found");
		}
}

export class StudentAlreadyEnrolledException extends Error {
		constructor() {
			super("Student is already enrolled in class");
		}
}

export class AssignmentNotFoundException extends Error {
		constructor() {
				super("Assignment not found");
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