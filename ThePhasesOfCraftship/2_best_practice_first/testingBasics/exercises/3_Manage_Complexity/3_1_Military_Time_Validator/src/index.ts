function hasValidFormat(input: string): boolean {
	const militaryTimeRegex = /^(\d{2}:\d{2}) - (\d{2}:\d{2})$/;
return militaryTimeRegex.test(input);
}

function isHourInValidRange(hour: number): boolean {
	return hour <= 23;
}

function areMinutesInValidRange(minutes: number): boolean {
	return minutes <= 59;
}

/**
 * Validates if the input string is a valid military time.
 * 
 * @param input - The string to validate.
 * @returns True if the input is a valid military time, false otherwise.
 */
export function isMilitaryTime(input: string): boolean {
	if (!hasValidFormat(input)) return false;

	const [startTime, endTime] = input.split(' - ');
	const [startHour, startMinutes] = startTime.split(':').map(Number);
	const [endHour, endMinutes] = endTime.split(':').map(Number);

	const areTimeHoursInValidRange = isHourInValidRange(startHour) && isHourInValidRange(endHour);
	const areTimeMinutesInValidRange = areMinutesInValidRange(startMinutes) && areMinutesInValidRange(endMinutes);
	const isTimeInValidRange = areTimeHoursInValidRange && areTimeMinutesInValidRange;

	return isTimeInValidRange;
}