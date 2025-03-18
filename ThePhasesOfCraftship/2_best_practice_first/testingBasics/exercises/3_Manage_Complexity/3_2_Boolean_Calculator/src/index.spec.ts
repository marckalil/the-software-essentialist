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
 * [X] - OR: TRUE OR TRUE -> true, TRUE OR FALSE -> true, FALSE OR TRUE -> true, FALSE OR FALSE -> false
 * [X] - Multiple operators: TRUE AND FALSE OR TRUE -> true
 * 	[X] - NOT is evaluated first: NOT TRUE AND TRUE -> false
 *  [X] - AND is evaluated second: TRUE AND FALSE OR TRUE -> true
 *  [X] - OR is evaluated last: TRUE AND FALSE OR TRUE -> true
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

	describe('With only 1 operator', () => {
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
			const orOperatorCases: TestCases = [
				['TRUE OR TRUE', true],
				['TRUE OR FALSE', true],
				['FALSE OR TRUE', true],
				['FALSE OR FALSE', false],
			];
			test.each(orOperatorCases)('%s returns %s', (expression, expectedResult) => {
				expect(booleanCalculator(expression)).toBe(expectedResult);
			});
		});
	});

	describe('With multiple operators', () => {
		describe('NOT is evaluated before AND or OR', () => {
			describe('NOT with AND', () => {
				const notWithAndCases: TestCases = [
					['NOT TRUE AND TRUE', false],
					['TRUE AND NOT TRUE', false],
					['NOT FALSE AND TRUE', true],
					['TRUE AND NOT FALSE', true],
					['TRUE AND NOT FALSE AND TRUE', true],
					['FALSE AND NOT TRUE AND FALSE', false],
					['TRUE AND TRUE AND NOT TRUE', false],
				];
				test.each(notWithAndCases)('%s returns %s', (expression, expectedResult) => {
					expect(booleanCalculator(expression)).toBe(expectedResult);
				});
			});
			describe('NOT with OR', () => {
				const notWithOrCases: TestCases = [
					['NOT TRUE OR TRUE', true],
					['TRUE OR NOT TRUE', true],
					['NOT FALSE OR TRUE', true],
					['TRUE OR NOT FALSE', true],
					['TRUE OR NOT FALSE OR TRUE', true],
					['FALSE OR NOT TRUE OR FALSE', false],
					['TRUE OR TRUE OR NOT TRUE', true],
				];
				test.each(notWithOrCases)('%s returns %s', (expression, expectedResult) => {
					expect(booleanCalculator(expression)).toBe(expectedResult);
				});
			});
		});
		describe('AND is evaluated before OR', () => {
			const andBeforeOrCases: TestCases = [
				['TRUE AND FALSE OR TRUE', true],
				['TRUE OR FALSE AND TRUE', true],
				['TRUE AND TRUE OR FALSE', true],
				['FALSE OR TRUE AND TRUE', true],
				['FALSE AND FALSE OR TRUE', true],
				['FALSE OR TRUE AND FALSE', false],
			];
			test.each(andBeforeOrCases)('%s returns %s', (expression, expectedResult) => {
				expect(booleanCalculator(expression)).toBe(expectedResult);
			});
		});
		describe('With NOT, AND and OR', () => {
			const notAndOrCases: TestCases = [
				['NOT TRUE AND FALSE OR TRUE', true],
				['TRUE AND NOT FALSE OR TRUE', true],
				['TRUE OR FALSE AND NOT TRUE', true],
				['FALSE OR TRUE AND NOT FALSE', true],
				['FALSE AND TRUE OR NOT FALSE', true],
				['TRUE OR NOT TRUE AND FALSE', true],
				['TRUE AND FALSE OR NOT TRUE', false],
				['FALSE OR TRUE AND NOT TRUE', false],
				['FALSE AND TRUE OR NOT FALSE', true],
			];
			test.each(notAndOrCases)('%s returns %s', (expression, expectedResult) => {
				expect(booleanCalculator(expression)).toBe(expectedResult);
			});
		});
	});

	describe('With grouped expressions', () => {
		const groupedExpressionCases: TestCases = [
			['(FALSE OR TRUE) AND TRUE', true],
			['(TRUE OR TRUE OR TRUE) AND FALSE' , false],
			['NOT (TRUE AND TRUE)', false],
			['NOT (FALSE AND FALSE)', true],
		]
		test.each(groupedExpressionCases)('%s returns %s', (expression, expectedResult) => {
			expect(booleanCalculator(expression)).toBe(expectedResult);
		});
	});
})
