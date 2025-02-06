function reversedString(input: string): string {
	return input.split('').reverse().join('');
}

function removeWhiteSpaces(input: string): string {
	const whiteSpacesRegex = /\s/g;
return input.replace(whiteSpacesRegex, '');
}

function formatInput(input: string): string {
	return removeWhiteSpaces(input.toLowerCase());
}

export function isPalindrome(input: string): boolean {
	const formattedInput = formatInput(input);
	const reversedInput = reversedString(formattedInput);
	return formattedInput === reversedInput;
}