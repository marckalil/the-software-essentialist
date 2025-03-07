type PasswordValidatorResponse = {
	result: boolean;
	errors: string[];
};

export const ErrorTypes = {
	invalidLength: 'InvalidLength'
} as const;

export function passwordValidator(password: string): PasswordValidatorResponse {
	return {
		result: false,
		errors: [ErrorTypes.invalidLength]
	};
}