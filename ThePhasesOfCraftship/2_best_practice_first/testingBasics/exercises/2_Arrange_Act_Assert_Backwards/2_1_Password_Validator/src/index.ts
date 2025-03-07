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

	if (password.length < 5 || password.length > 15) {
		result = false;
		errors.push(ErrorTypes.invalidLength);
	}
	return {
		result,
		errors
	};
}