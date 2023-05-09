import FIELDS_LENGTH from "src/constants/fields-length";

const passwordValidationRules = {
  minLength: FIELDS_LENGTH.PASSWORD.MIN,
  minNumbers: 1,
  minUppercase: 1,
};

export { passwordValidationRules };
