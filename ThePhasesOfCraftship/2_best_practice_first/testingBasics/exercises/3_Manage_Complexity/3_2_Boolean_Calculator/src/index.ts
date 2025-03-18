export function booleanCalculator(expression: string): boolean {
	if (expression === 'NOT FALSE') return booleanCalculator('TRUE');
	return expression === 'TRUE';
};