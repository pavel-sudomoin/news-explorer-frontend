import {
  EMPTY_MESSAGE,
  WRONG_EMAIL_MESSAGE,
  WRONG_LENGTH_PASSWORD_MESSAGE,
  WRONG_LENGTH_NAME_MESSAGE,
  NO_WHITESPACES_AT_BOTH_ENDS_MESSAGE,
  DEFAULT_MESSAGE,
} from '../constants/error-messages';

export default function returnValidateErrorMessage(name, validity) {
  if (validity.valueMissing) return EMPTY_MESSAGE;
  if (name === 'email') return WRONG_EMAIL_MESSAGE;
  if (validity.patternMismatch) return NO_WHITESPACES_AT_BOTH_ENDS_MESSAGE;
  if (name === 'password') return WRONG_LENGTH_PASSWORD_MESSAGE;
  if (name === 'name') return WRONG_LENGTH_NAME_MESSAGE;
  return DEFAULT_MESSAGE;
}
