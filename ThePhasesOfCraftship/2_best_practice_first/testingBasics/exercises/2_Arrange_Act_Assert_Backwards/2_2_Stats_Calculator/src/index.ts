export type Stats = {
	min: number;
	max: number;
	nbOfElements: number;
	average: number;
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
		min,
		max,
		nbOfElements,
		average,
	}
}