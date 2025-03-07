type PasswordValidatorResponse = {
	result: boolean;
	errors: string[];
};

export const ErrorTypes = {
	invalidLength: 'InvalidLength',
	missingDigit: 'MissingDigit'
} as const;

export function passwordValidator(password: string): PasswordValidatorResponse {
	let result = true;
	const errors: string[] = [];

	const hasValidLength = password.length >= 5 && password.length <= 15;
	const containsDigit = /\d/.test(password);
	
	if (!hasValidLength) {
		result = false;
		errors.push(ErrorTypes.invalidLength);
	}

	if (!containsDigit) {
		result = false;
		errors.push(ErrorTypes.missingDigit);
	}

	return {
		result,
		errors
	};
}