export type Stats = {
	min: number;
	max: number;
	nbOfElements: number;
};

export default function statsCalculator(numbers: number[]): Stats {
	const nbOfElements = numbers.length;
	let min = numbers[0];
	let max = numbers[0];

	numbers.forEach((currentNumber) => {
		if (currentNumber < min) min = currentNumber;
		if (currentNumber > max) max = currentNumber;
	});

	return {
		min,
		max,
		nbOfElements,
	}
}