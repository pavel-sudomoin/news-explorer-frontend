import {
  EMPTY_MESSAGE,
  WRONG_EMAIL_MESSAGE,
  WRONG_PASSWORD_MESSAGE,
  WRONG_SYMBOL_IN_PASSWORD_MESSAGE,
  NO_NUMBERS_IN_PASSWORD_MESSAGE,
  NO_LETTERS_IN_PASSWORD_MESSAGE,
  WRONG_LENGTH_PASSWORD_MESSAGE,
  WRONG_LENGTH_NAME_MESSAGE,
  WHITESPACES_AT_BOTH_ENDS_MESSAGE,
  DEFAULT_MESSAGE,
} from '../constants/error-messages';

export default function returnValidateErrorMessage(name, validity, value = '') {
  if (validity.valueMissing) return EMPTY_MESSAGE;
  if (name === 'email') {
    return WRONG_EMAIL_MESSAGE;
  }
  if (name === 'password') {
    if (validity.tooShort || validity.tooLong) return WRONG_LENGTH_PASSWORD_MESSAGE;
    if (validity.patternMismatch) {
      if (!/^[A-Za-z\d]*$/.test(value)) return WRONG_SYMBOL_IN_PASSWORD_MESSAGE;
      if (!/^(?=.*\d)/.test(value)) return NO_NUMBERS_IN_PASSWORD_MESSAGE;
      if (!/^(?=.*[A-Za-z])/.test(value)) return NO_LETTERS_IN_PASSWORD_MESSAGE;
      return WRONG_PASSWORD_MESSAGE;
    }
  }
  if (name === 'username') {
    if (validity.tooShort || validity.tooLong) return WRONG_LENGTH_NAME_MESSAGE;
    if (validity.patternMismatch) return WHITESPACES_AT_BOTH_ENDS_MESSAGE;
  }
  return DEFAULT_MESSAGE;
}
