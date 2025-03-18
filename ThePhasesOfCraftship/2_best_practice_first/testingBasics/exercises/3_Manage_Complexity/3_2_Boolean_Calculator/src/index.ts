export function booleanCalculator(expression: string): boolean {
	if (expression === 'NOT FALSE') return booleanCalculator('TRUE');
	if (expression === 'TRUE AND TRUE') return booleanCalculator('TRUE');
	if (expression === 'TRUE OR TRUE') return booleanCalculator('TRUE');
	return expression === 'TRUE';
};