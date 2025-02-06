function reversedString(input: string): string {
	return input.split('').reverse().join('');
}

function removeWhiteSpaces(input: string): string {
	const whiteSpacesRegex = /\s/g;
return input.replace(whiteSpacesRegex, '');
}

export function isPalindrome(input: string): boolean {
	return removeWhiteSpaces(input.toLowerCase()) === reversedString(removeWhiteSpaces(input)).toLowerCase();
}