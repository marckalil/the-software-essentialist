const whiteSpacesRegex = /\s/g;

function reversedString(input: string): string {
	return input.split('').reverse().join('');
}

export function isPalindrome(input: string): boolean {
	return input.toLowerCase().replace(whiteSpacesRegex, '') === reversedString(input).toLowerCase().replace(whiteSpacesRegex, '');
}