import { isPalindrome } from './index';

/**
 * Description:
 * Create a palindrome checker that should be able to detect that a string is a palindrome;
 * that is, it is the same word or phrase in reverse. 
 * This means that words like "mom" and "wow" palindromes.
 * It also means that words like "bill" are not palindromes.
 * It should still know that something is a palindrome, even if the casing is off (that means that "Mom" is still a palindrome).
 * Lastly, it should also be able to detect palindromes in phrases like "Was It A Rat I Saw" and "Never Odd or Even" too.
 */

describe('palindrome checker', () => {
	describe('When the input is equal to its reverse', () => {
		describe('And the casing is the same', () => {
			describe('It is detected as a palindrome', () => {
				const palindromeCases = ['mom', 'wow'];
				it.each(palindromeCases)('knows that %s is a palindrome', (input) => {
					expect(isPalindrome(input)).toBe(true);
				});
			});
		});
		describe('And the casing is different', () => {
			describe('It is detected as a palindrome', () => {
				const palindromeCases = ['Mom', 'WooW', 'xMomx'];
				it.each(palindromeCases)('knows that %s is a palindrome', (input) => {
					expect(isPalindrome(input)).toBe(true);
				});
			});
		});

		describe('And the input is a phrase', () => {
			describe('It is detected as a palindrome', () => {
				const palindromeCases = ['Was It A Rat I Saw', 'Never Odd or Even'];
				it.each(palindromeCases)('knows that %s is a palindrome', (input) => {
					expect(isPalindrome(input)).toBe(true);
				});
			});
		});
	});
	it('knows that bill is not a palindrome', () => {
		expect(isPalindrome('bill')).toBe(false)
	});
});