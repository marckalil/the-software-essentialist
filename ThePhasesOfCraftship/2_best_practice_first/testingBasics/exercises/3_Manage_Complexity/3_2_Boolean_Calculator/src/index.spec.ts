/* BOOLEAN CALCULATOR */

/**
 * Implement a boolean calculator that can evaluate a boolean expression.
 * The expression is a string that contains boolean values (TRUE or FALSE) and operators (AND, OR, NOT).
 * The expression is case-insensitive.
 * The expression can contain spaces.
 * The expression can contain parentheses.
 * The expression can contain multiple operators.
 * The expression can contain multiple operands.
 * The expression can contain multiple parentheses.
 * 
 * The calculator should return the result of the expression.
 * 
 * Example: "(TRUE OR TRUE OR TRUE) AND FALSE" -> false
 */

/**
 * OPERATORS PRIORITIES
 * 1 - NOT
 * 2 - AND
 * 3 - OR
*/

/**
 * STEPS:
 * [X] - Simple values: TRUE->true, FALSE->false
 * [X] - NOT: NOT TRUE -> false, NOT FALSE -> true
 * [X] - AND: TRUE AND TRUE -> true, TRUE AND FALSE -> false, FALSE AND TRUE -> false, FALSE AND FALSE -> false
 * [] - OR: TRUE OR TRUE -> true, TRUE OR FALSE -> true, FALSE OR TRUE -> true, FALSE OR FALSE -> false
 * [] - Multiple operators: TRUE AND FALSE OR TRUE -> true
 * [] - Parentheses: (TRUE AND FALSE) OR TRUE -> true
*/

import { booleanCalculator } from './index';

type TestCases = [expression: string, expectedResult: boolean][];

describe('boolean calculator', () => {
	describe('Simple values', () => {
		const simpleValueCases: TestCases = [
			['TRUE', true],
			['FALSE', false],
		];
		test.each(simpleValueCases)('%s returns %s', (expression, expectedResult) => {
			expect(booleanCalculator(expression)).toBe(expectedResult);
		});
	});

	describe('NOT operator', () => {
		const notOperatorCases: TestCases = [
			['NOT TRUE', false],
			['NOT FALSE', true],
		];
		test.each(notOperatorCases)('%s returns %s', (expression, expectedResult) => {
			expect(booleanCalculator(expression)).toBe(expectedResult);
		});
	});

	describe('AND operator', () => {
		const andOperatorCases: TestCases = [
			['TRUE AND TRUE', true],
			['FALSE AND FALSE', false],
			['TRUE AND FALSE', false],
			['FALSE AND TRUE', false],
		];
		test.each(andOperatorCases)('%s returns %s', (expression, expectedResult) => {
			expect(booleanCalculator(expression)).toBe(expectedResult);
		});
	});

	describe('OR operator', () => {
		test('TRUE OR TRUE returns true', () => {
			expect(booleanCalculator('TRUE OR TRUE')).toBe(true);
		});
		test('TRUE OR FALSE returns true', () => {
			expect(booleanCalculator('TRUE OR FALSE')).toBe(true);
		});
		test('FALSE OR TRUE returns true', () => {
			expect(booleanCalculator('FALSE OR TRUE')).toBe(true);
		});
		test('FALSE OR FALSE returns false', () => {
			expect(booleanCalculator('FALSE OR FALSE')).toBe(false);
		});
	});
})
