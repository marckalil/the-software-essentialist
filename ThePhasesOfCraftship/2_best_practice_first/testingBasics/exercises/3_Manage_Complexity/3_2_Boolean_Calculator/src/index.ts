const FALSE = 'FALSE';
const TRUE = 'TRUE';

const AndValues = {
	'FALSE_AND_FALSE': 'FALSE AND FALSE',
	'FALSE_AND_TRUE': 'FALSE AND TRUE',
	'TRUE_AND_FALSE': 'TRUE AND FALSE',
	'TRUE_AND_TRUE': 'TRUE AND TRUE',
} as const;

function handleNotExpression(expression: string): string {
	return expression.replace('NOT FALSE', 'TRUE').replace('NOT TRUE', 'FALSE');
}

function handleAndExpression(expression: string): string {
	if (!expression.includes(' AND ')) return expression;
	switch (expression) {
		case AndValues.FALSE_AND_FALSE:
			return FALSE;
		case AndValues.FALSE_AND_TRUE:
			return FALSE;
		case AndValues.TRUE_AND_FALSE:
			return FALSE;
		case AndValues.TRUE_AND_TRUE:
			return TRUE;
		default:
			return handleAndExpression(expression
				.replace(AndValues.TRUE_AND_TRUE, TRUE)
				.replace(AndValues.FALSE_AND_FALSE, FALSE)
				.replace(AndValues.FALSE_AND_TRUE, FALSE)
				.replace(AndValues.TRUE_AND_FALSE, FALSE));
		}
	}

export function booleanCalculator(inputExpression: string): boolean {
	let expression = handleNotExpression(inputExpression);
	expression = handleAndExpression(expression);
	if (expression === 'TRUE OR TRUE') return booleanCalculator('TRUE');
	if (expression === 'TRUE OR FALSE') return booleanCalculator('TRUE');
	if (expression === 'FALSE OR TRUE') return booleanCalculator('TRUE');
	return expression === 'TRUE';
};