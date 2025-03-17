const militaryTimeRegex = /^(\d{2}:\d{2}) - (\d{2}:\d{2})$/;

export function isMilitaryTime(input: string): boolean {
	const hasValidFormat = militaryTimeRegex.test(input);
	if (!hasValidFormat) return false;

	const [startTime, endTime] = input.split(' - ');
	const startHour = startTime.split(':').map(Number)[0];
	const endHour = endTime.split(':').map(Number)[0];

	const isStartHourOutOfRange = startHour > 23;
	const isEndHourOutOfRange = endHour > 23;
	if (isStartHourOutOfRange || isEndHourOutOfRange) return false;
	
	return true;
}