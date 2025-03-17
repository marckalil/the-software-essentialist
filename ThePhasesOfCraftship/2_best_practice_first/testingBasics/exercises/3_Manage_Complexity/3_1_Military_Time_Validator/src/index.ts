const militaryTimeRegex = /^(\d{2}:\d{2}) - (\d{2}:\d{2})$/;

export function isMilitaryTime(input: string): boolean {
	return militaryTimeRegex.test(input);
}