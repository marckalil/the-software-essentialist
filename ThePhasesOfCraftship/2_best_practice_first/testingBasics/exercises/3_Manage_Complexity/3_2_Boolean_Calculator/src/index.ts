function handleNotExpression(expression: string): string {
	return expression.replace('NOT FALSE', 'TRUE').replace('NOT TRUE', 'FALSE');
}

function handleAndExpression(expression: string): string {
	if (!expression.includes(' AND ')) return expression;

	if (expression === 'TRUE AND TRUE') return 'TRUE';
	if (expression === 'TRUE AND FALSE') return 'FALSE';
	if (expression === 'FALSE AND TRUE') return 'FALSE';
	if (expression === 'FALSE AND FALSE') return 'FALSE';

	return handleAndExpression(expression
		.replace('TRUE AND TRUE', 'TRUE')
		.replace('TRUE AND FALSE', 'FALSE')
		.replace('FALSE AND TRUE', 'FALSE')
		.replace('FALSE AND FALSE', 'FALSE'));
}

export function booleanCalculator(inputExpression: string): boolean {
	let expression = handleNotExpression(inputExpression);
	expression = handleAndExpression(expression);
	if (expression === 'TRUE OR TRUE') return booleanCalculator('TRUE');
	if (expression === 'TRUE OR FALSE') return booleanCalculator('TRUE');
	if (expression === 'FALSE OR TRUE') return booleanCalculator('TRUE');
	return expression === 'TRUE';
};