export function isPalindrome(input: string): boolean {
	return input === input.split('').reverse().join('');
}