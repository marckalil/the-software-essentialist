const militaryTimeRegex = /^(\d{2}:\d{2}) - (\d{2}:\d{2})$/;

export function isMilitaryTime(input: string): boolean {
	const hasValidFormat = militaryTimeRegex.test(input);
	if (!hasValidFormat) return false;

	const [startTime, endTime] = input.split(' - ');
	const [startHour, startMinutes] = startTime.split(':').map(Number);
	const [endHour, endMinutes] = endTime.split(':').map(Number);

	const isStartHourOutOfRange = startHour > 23;
	const isEndHourOutOfRange = endHour > 23;
	if (isStartHourOutOfRange || isEndHourOutOfRange) return false;
	
	const isStartMinutesOutOfRange = startMinutes > 59;
	const isEndMinutesOutOfRange = endMinutes > 59;
	if (isStartMinutesOutOfRange || isEndMinutesOutOfRange) return false;
	
	return true;
}