type Stats = {
	min: number;
	max: number;
};

export default function statsCalculator(numbers: number[]): Stats {
	let min = numbers[0];
	let max = numbers[0];

	numbers.forEach((currentNumber) => {
		if (currentNumber < min) min = currentNumber;
		if (currentNumber > max) max = currentNumber;
	});

	return {
		min,
		max,
	}
}