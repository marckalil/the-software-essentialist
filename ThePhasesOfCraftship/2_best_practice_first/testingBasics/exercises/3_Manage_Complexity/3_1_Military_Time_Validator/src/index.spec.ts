/* 
# Responsibilities
- Validate a string as a military time format: HH:MM - HH:MM
- Hours should be between 00 and 23
- Minutes should be between 00 and 59

# Valid Examples
- 00:00 - 23:59
- 01:12 - 14:32
- 22:00 - 23:12

# Invalid Examples
## Hours out of range
- 24:00 - 23:59
- 00:00 - 24:00
## Minutes out of range
- 00:60 - 23:59
- 00:00 - 23:60
## Invalid format
- 00:00 - 23:59:00
- a0:00 - 23:59
- -01:00 - 23:59
- 00:00 - +2B:59
*/

import { isMilitaryTime } from './index';

const validCases: string[] = [
	'00:00 - 23:59',
	'01:12 - 14:32',
	'22:00 - 23:12'
];

describe('military time validator', () => {
	describe('valid cases', () => {
		it.each(validCases)('%s is a valid Military Time', (input) => {
			expect(isMilitaryTime(input)).toBe(true);
		});
	});
})
