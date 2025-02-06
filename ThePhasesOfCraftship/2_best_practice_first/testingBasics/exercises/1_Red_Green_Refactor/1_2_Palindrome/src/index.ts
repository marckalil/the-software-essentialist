export function isPalindrome(input: string): boolean {
	return input.toLowerCase() === input.split('').reverse().join('').toLowerCase();
}