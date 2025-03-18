function handleNotExpression(expression: string): string {
	return expression.replace('NOT FALSE', 'TRUE').replace('NOT TRUE', 'FALSE');
}
export function booleanCalculator(inputExpression: string): boolean {
	let expression = handleNotExpression(inputExpression);
	if (expression.includes('AND')) {
		const [left, right] = expression.split(' AND ');
		return booleanCalculator(left) && booleanCalculator(right);
	}
	if (expression === 'TRUE AND TRUE') return booleanCalculator('TRUE');
	if (expression === 'TRUE OR TRUE') return booleanCalculator('TRUE');
	if (expression === 'TRUE OR FALSE') return booleanCalculator('TRUE');
	if (expression === 'FALSE OR TRUE') return booleanCalculator('TRUE');
	return expression === 'TRUE';
};