type PasswordValidatorResponse = {
	result: boolean;
	errors: string[];
};

export const ErrorTypes = {
	invalidLength: 'InvalidLength'
} as const;

export function passwordValidator(password: string): PasswordValidatorResponse {
	let result = true;
	const errors: string[] = [];

	const hasValidLength = password.length >= 5 && password.length <= 15;
	
	if (!hasValidLength) {
		result = false;
		errors.push(ErrorTypes.invalidLength);
	}
	
	return {
		result,
		errors
	};
}