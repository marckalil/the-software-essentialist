type Stats = {
	min: number;
};

export default function statsCalculator(numbers: number[]): Stats {
	let min = numbers[0];
	numbers.forEach((currentNumber) => {
		if (currentNumber < min) {
			min = currentNumber;
		}
	});

	return {
		min,
	}
}