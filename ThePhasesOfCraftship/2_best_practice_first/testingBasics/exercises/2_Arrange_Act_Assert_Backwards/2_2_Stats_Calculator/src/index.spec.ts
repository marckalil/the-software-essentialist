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

describe('stats calculator', () => {
	describe('Minimum value', () => {
		describe('When the input is [10, 6, 4, 2, 8]', () => {
			it('Should return 2', () => {
				expect(statsCalculator([10, 6, 4, 2, 8])).toHaveProperty('min', 2);
			});
		});
	});
})