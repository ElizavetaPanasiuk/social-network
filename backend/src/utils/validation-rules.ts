import FIELDS_LENGTH from '@/constants/fields-length';

const passwordValidationRules = {
  minLength: FIELDS_LENGTH.PASSWORD.MIN,
  minNumbers: 1,
  minUppercase: 1,
  minSymbols: 0,
};

export { passwordValidationRules };
