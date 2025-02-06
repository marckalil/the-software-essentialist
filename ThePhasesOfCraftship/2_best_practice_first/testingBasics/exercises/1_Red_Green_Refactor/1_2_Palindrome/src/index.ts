function reversedString(input: string): string {
	return input.split('').reverse().join('');
}

export function isPalindrome(input: string): boolean {
	return input.toLowerCase() === reversedString(input).toLowerCase();
}