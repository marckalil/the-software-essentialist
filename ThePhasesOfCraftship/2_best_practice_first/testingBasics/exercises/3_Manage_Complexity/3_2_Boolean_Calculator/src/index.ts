const FALSE = 'FALSE';
const TRUE = 'TRUE';

const NotValues = {
	'NOT_FALSE': 'NOT FALSE',
	'NOT_TRUE': 'NOT TRUE',
} as const;

const AndValues = {
	'FALSE_AND_FALSE': 'FALSE AND FALSE',
	'FALSE_AND_TRUE': 'FALSE AND TRUE',
	'TRUE_AND_FALSE': 'TRUE AND FALSE',
	'TRUE_AND_TRUE': 'TRUE AND TRUE',
} as const;

const OrValues = {
	'FALSE_OR_FALSE': 'FALSE OR FALSE',
	'FALSE_OR_TRUE': 'FALSE OR TRUE',
	'TRUE_OR_FALSE': 'TRUE OR FALSE',
	'TRUE_OR_TRUE': 'TRUE OR TRUE',
} as const;

function handleNotExpression(expression: string): string {
	return expression.replace(NotValues.NOT_FALSE, TRUE).replace(NotValues.NOT_TRUE, FALSE);
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

function handleOrExpression(expression: string): string {
	const splitExpression = expression.split(' OR ');
	if (splitExpression.length === 1) return expression;
	if (splitExpression.length === 2) return splitExpression.includes(TRUE) ? TRUE : FALSE;
	return handleOrExpression(expression
		.replace(OrValues.TRUE_OR_TRUE, TRUE)
		.replace(OrValues.FALSE_OR_FALSE, FALSE)
		.replace(OrValues.FALSE_OR_TRUE, TRUE)
		.replace(OrValues.TRUE_OR_FALSE, TRUE));
}

export function booleanCalculator(inputExpression: string): boolean {
	let expression = handleNotExpression(inputExpression);
	expression = handleAndExpression(expression);
	expression = handleOrExpression(expression);

	return expression === TRUE;
};