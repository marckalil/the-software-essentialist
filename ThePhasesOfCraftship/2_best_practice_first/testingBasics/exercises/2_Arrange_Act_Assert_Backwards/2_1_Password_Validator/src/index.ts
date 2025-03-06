type PasswordValidatorResponse = {
	result: boolean;
	errors: string[];
};
export function passwordValidator(password: string): PasswordValidatorResponse {
	return {
		result: false,
		errors: []
	};
}