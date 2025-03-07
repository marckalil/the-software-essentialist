/**
 * Specification:
 * Return an object containing a boolean result and an errors key that — when provided with an invalid password — contains an error message or type for all errors in occurrence. There can be multiple errors at a single time.
 * Between 5 and 15 characters long
 * Contains at least one digit
 * Contains at least one upper case letter
 */

/**
 * Examples:
 * "maxwell1_c" returns a false-y response because of a lack of uppercase characters
 * "maxwellTheBe" returns a false-y response because of a lack of digits
 * "thePhysical1234567" returns a false-y response because of exceeding the 15 character length
 */

/**
 * Valid Examples:
 * "aB123" returns a truth-y response => 5 characters
 * "maxwell1C" returns a truth-y response
 * "thePhysical1234" returns a truth-y response => 15 characters
 */

import { ErrorTypes, passwordValidator } from './index';

describe('password validator', () => {
  describe('Valid password', () => {
    const validCases = ['aB123', 'maxwell1C', 'thePhysical1234'];
    describe.each(validCases)('Password: %s is valid', (password) => {
      it('returns an object with "result" key "true"', () => {
        const response = passwordValidator(password);
        expect(response).toHaveProperty('result', true);
      });
      it('returns an object with an empty "errors" array', () => {
        const response = passwordValidator(password);
        expect(response).toHaveProperty('errors', []);
      });
    });
  });

  describe('Invalid password', () => {
    describe('Password is not between 5 and 15 characters long', () => {
      const lengthErrorCases: [string, string][] = [
        ['aB1', 'short'],
        ['aB34', 'short'],
        ['aB12345678901234', 'long'],
        ['thePhysical1234567', 'long']
      ];
      describe.each(lengthErrorCases)('Password: %s is too %s', (password) => {
        it('returns an object with "result" key "false"', () => {
          const response = passwordValidator(password);
          expect(response).toHaveProperty('result', false);
        });
        it('should return an error message', () => {
          const response = passwordValidator(password);
          expect(response.errors).toHaveLength(1);
          expect(response.errors[0]).toEqual(ErrorTypes.invalidLength);
        });
      });
    });
    describe('Password does not contain at least one digit', () => {
      const digitErrorCases = ['maxwellTheBest', 'thePhysical'];
      describe.each(digitErrorCases)('Password: %s does not contain a digit', (password) => {
        it('returns an object with "result" key "false"', () => {
          const response = passwordValidator(password);
          expect(response).toHaveProperty('result', false);
        });
        it('should return an error message', () => {
          const response = passwordValidator(password);
          expect(response.errors).toHaveLength(1);
          expect(response.errors[0]).toEqual(ErrorTypes.missingDigit);
        });
      });
    });
    describe('Password does not contain at least one uppercase letter', () => {
      const upperCaseErrorCases = ['maxwell1', 'thephysical1234'];
      describe.each(upperCaseErrorCases)('Password: %s does not contain an uppercase letter', (password) => {
        it('returns an object with "result" key "false"', () => {
          const response = passwordValidator(password);
          expect(response).toHaveProperty('result', false);
        });
        it('should return an error message', () => {
          const response = passwordValidator(password);
          expect(response.errors).toHaveLength(1);
          expect(response.errors[0]).toEqual(ErrorTypes.missingUpperCase);
        });
      });
    });
    describe('Password contains multiple errors', () => {
      it('knows "max1" is too short and missing an uppercase letter', () => {
        const response = passwordValidator('max1');
        expect(response).toHaveProperty('result', false);
        expect(response.errors).toHaveLength(2);
        expect(response.errors).toContain(ErrorTypes.invalidLength);
        expect(response.errors).toContain(ErrorTypes.missingUpperCase);
      }
      );
      it('knows "thePhyyyyyyyyyyyyyyysical" is missing a digit and is too long', () => {
        const response = passwordValidator('thePhyyyyyyyyyyyyyyysical');
        expect(response).toHaveProperty('result', false);
        expect(response.errors).toHaveLength(2);
        expect(response.errors).toContain(ErrorTypes.missingDigit);
        expect(response.errors).toContain(ErrorTypes.invalidLength);
      });
      it('knows "max" is too short, missing a digit and an uppercase letter', () => {
        const response = passwordValidator('max');
        expect(response).toHaveProperty('result', false);
        expect(response.errors).toHaveLength(3);
        expect(response.errors).toContain(ErrorTypes.invalidLength);
        expect(response.errors).toContain(ErrorTypes.missingDigit);
        expect(response.errors).toContain(ErrorTypes.missingUpperCase);
      });
      it('knows "thephyyyyyyyyyyyyyyysical" is too long, missing a digit and an uppercase letter', () => {
        const response = passwordValidator('thephyyyyyyyyyyyyyyysical');
        expect(response).toHaveProperty('result', false);
        expect(response.errors).toHaveLength(3);
        expect(response.errors).toContain(ErrorTypes.missingDigit);
        expect(response.errors).toContain(ErrorTypes.invalidLength);
        expect(response.errors).toContain(ErrorTypes.missingUpperCase);
      }); 
    });
  });
})


