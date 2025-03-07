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
 * "maxwell1C" returns a truth-y response
 * "0maxwellTheBest" returns a truth-y response
 * "thePhysical123456" returns a truth-y response
 */

import { ErrorTypes, passwordValidator } from './index';

describe('password validator', () => {
  describe('Output object', () => {
    it('should contain a "result" key', () => {
      const response = passwordValidator('');
      expect(response).toHaveProperty('result');
    });
    it('should contain an "errors" key', () => {
      const response = passwordValidator('');
      expect(response).toHaveProperty('errors');
    });
  });
  describe('Valid password', () => {
    const validCases = ['maxwell1C', '0maxwellTheBest', 'thePhysical123456'];
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
  describe('Password is between 5 and 15 characters long', () => {
    const tooShortCases = ['aB1', 'aB34'];
    describe.each(tooShortCases)('Password: %s is too short', (password) => {
      it('should return a false-y response', () => {
        const response = passwordValidator(password);
        expect(response.result).toBeFalsy();
      });
      it('should return an error message', () => {
        const response = passwordValidator(password);
        expect(response.errors).toHaveLength(1);
        expect(response.errors[0]).toEqual(ErrorTypes.invalidLength);
      });
    });
  });
})


