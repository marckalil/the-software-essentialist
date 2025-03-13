/*
Description:
Your task is to process a sequence of integer numbers to determine the following statistics:
Without using system Math library functions, process a sequence of integers to determine the following statistics:

For example: [2, 4, 21, -8, 53, 40]

- minimum value = -8
- maximum value = 53
- number of elements in the sequence = 6
- average value = 18.666666666667
*/

/*
Some valid examples with average value being a whole number:

[10, 6, 4, 2, 8]

Count = 5
Min = 2
Max = 10
Sum = 10 + 6 + 4 + 2 + 8 = 30
Average = 30 / 5 = 6 ✅

==============================================

[3, -3, 0]

Count = 3
Min = -3
Max = 3
Sum = 3 + (-3) + 0 = 0
Average = 0 / 3 = 0 ✅

==============================================

[35, 5, 25, 15]

Count = 4
Min = 5
Max = 35
Sum = 35 + 5 + 25 + 15 = 80
Average = 80 / 4 = 20 ✅

==============================================

[28, 35, 7, 14, 21]

Count = 5
Min = 7
Max = 35
Sum = 28 + 35 + 7 + 14 + 21 = 105
Average = 105 / 5 = 21 ✅

==============================================

[60, 20, 40, 30, 50, 10]

Count = 6
Min = 10
Max = 60
Sum = 60 + 20 + 40 + 30 + 50 + 10 = 210
Average = 210 / 6 = 35 ✅
*/

import statsCalculator, { Stats } from './index';


type InputWithStats = {
	inputNumbers: number[];
	stats: Stats;
};

const inputsWithStats: InputWithStats[] = [
	{
		inputNumbers: [10, 6, 4, 2, 8],
		stats: {
			average: 6,
			max: 10,
			min: 2,
			nbOfElements: 5,
		},
	},
	{
		inputNumbers: [3, -3, 0],
		stats: {
			average: 0,
			max: 3,
			min: -3,
			nbOfElements: 3,
		},
	},
	{
		inputNumbers: [35, 5, 25, 15],
		stats: {
			average: 20,
			max: 35,
			min: 5,
			nbOfElements: 4,
		},
	}
];

describe('stats calculator', () => {
	describe('Minimum value', () => {
		const minimumValueCases: [number[], number][] = [
			[inputsWithStats[0].inputNumbers, inputsWithStats[0].stats.min],
			[inputsWithStats[1].inputNumbers, inputsWithStats[1].stats.min],
			[inputsWithStats[2].inputNumbers, inputsWithStats[2].stats.min],
		];
		describe.each(minimumValueCases)('When the input is %s', (inputNumbers, expectedMin) => {
			it(`should return ${expectedMin}`, () => {
				expect(statsCalculator(inputNumbers)).toHaveProperty('min', expectedMin);
			});
		});
	});
	describe('Maximum value', () => {
		const maximumValueCases: [number[], number][] = [
			[inputsWithStats[0].inputNumbers, inputsWithStats[0].stats.max],
			[inputsWithStats[1].inputNumbers, inputsWithStats[1].stats.max],
			[inputsWithStats[2].inputNumbers, inputsWithStats[2].stats.max],
		];
		describe.each(maximumValueCases)('When the input is %s', (inputNumbers, expectedMax) => {
			it(`should return ${expectedMax}`, () => {
				expect(statsCalculator(inputNumbers)).toHaveProperty('max', expectedMax);
			});
		});
	});
	describe('Number of elements in the sequence', () => {
		const numberOfElementsCases: [number[], number][] = [
			[inputsWithStats[0].inputNumbers, inputsWithStats[0].stats.nbOfElements],
			[inputsWithStats[1].inputNumbers, inputsWithStats[1].stats.nbOfElements],
			[inputsWithStats[2].inputNumbers, inputsWithStats[2].stats.nbOfElements],
		];
		describe.each(numberOfElementsCases)('When the input is %s', (inputNumbers, expectedNbOfElements) => {
			it(`should return ${expectedNbOfElements}`, () => {
				expect(statsCalculator(inputNumbers)).toHaveProperty('nbOfElements', expectedNbOfElements);
			});
		});
	});
	describe('Average value', () => {
		const averageValueCases: [number[], number][] = [
			[inputsWithStats[0].inputNumbers, inputsWithStats[0].stats.average],
			[inputsWithStats[1].inputNumbers, inputsWithStats[1].stats.average],
			[inputsWithStats[2].inputNumbers, inputsWithStats[2].stats.average],
		];
		describe.each(averageValueCases)('When the input is %s', (inputNumbers, expectedAverage) => {
			it(`should return ${expectedAverage}`, () => {
				expect(statsCalculator(inputNumbers)).toHaveProperty('average', expectedAverage);
			});
		});
	});
});