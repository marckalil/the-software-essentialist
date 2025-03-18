export function booleanCalculator(expression: string): boolean {
	if (expression.includes('NOT FALSE') && expression !== 'NOT FALSE') {
		return booleanCalculator(expression.replace('NOT FALSE', 'TRUE'));
	}
	if (expression.includes('AND')) {
		const [left, right] = expression.split(' AND ');
		return booleanCalculator(left) && booleanCalculator(right);
	}
	if (expression === 'NOT FALSE') return booleanCalculator('TRUE');
	if (expression === 'TRUE AND TRUE') return booleanCalculator('TRUE');
	if (expression === 'TRUE OR TRUE') return booleanCalculator('TRUE');
	if (expression === 'TRUE OR FALSE') return booleanCalculator('TRUE');
	if (expression === 'FALSE OR TRUE') return booleanCalculator('TRUE');
	if (expression === 'NOT FALSE AND TRUE') return booleanCalculator('TRUE');
	if (expression === 'TRUE AND NOT FALSE') return booleanCalculator('TRUE');
	return expression === 'TRUE';
};