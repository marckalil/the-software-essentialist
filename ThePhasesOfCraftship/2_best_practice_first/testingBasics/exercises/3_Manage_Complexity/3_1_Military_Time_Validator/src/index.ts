const militaryTimeRegex = /^(\d{2}:\d{2}) - (\d{2}:\d{2})$/;

export function isMilitaryTime(input: string): boolean {
	const hasValidFormat = militaryTimeRegex.test(input);
	if (!hasValidFormat) return false;

	const [startTime, endTime] = input.split(' - ');
	const startHour = startTime.split(':').map(Number)[0];
	const endHour = endTime.split(':').map(Number)[0];
	if (startHour > 23 || endHour > 23) return false;
	return true;
}