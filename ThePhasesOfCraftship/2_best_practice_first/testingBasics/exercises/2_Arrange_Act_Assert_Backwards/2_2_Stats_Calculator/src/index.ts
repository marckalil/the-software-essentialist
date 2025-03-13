export type Stats = {
	average: number;
	max: number;
	min: number;
	nbOfElements: number;
};

export default function statsCalculator(numbers: number[]): Stats {
	const nbOfElements = numbers.length;
	let min = numbers[0];
	let max = numbers[0];
	let sum = 0;

	numbers.forEach((currentNumber) => {
		if (currentNumber < min) min = currentNumber;
		if (currentNumber > max) max = currentNumber;
		sum += currentNumber;
	});

	const average = sum / nbOfElements;

	return {
		average,
		max,
		min,
		nbOfElements,
	}
}