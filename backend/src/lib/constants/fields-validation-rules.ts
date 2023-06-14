const FIELDS_VALIDATION_RULES = {
  FIRST_NAME: {
    MIN: 2,
    MAX: 24,
  },
  LAST_NAME: {
    MIN: 2,
    MAX: 24,
  },
  COUNTRY: {
    MIN: 2,
    MAX: 50,
  },
  CITY: {
    MIN: 2,
    MAX: 50,
  },
  EMAIL: {
    MIN: 2,
    MAX: 50,
  },
  PASSWORD: { MIN: 8, MAX: 24 },
  COMMENT_TEXT: {
    MIN: 1,
    MAX: 256,
  },
  POST_TEXT: {
    MIN: 1,
    MAX: 256,
  },
  MESSAGE_TEXT: {
    MIN: 1,
    MAX: 256,
  },
};

const PASSWORD_VALIDATION_RULES = {
  minLength: FIELDS_VALIDATION_RULES.PASSWORD.MIN,
  minNumbers: 1,
  minUppercase: 1,
  minSymbols: 0,
};

export { FIELDS_VALIDATION_RULES, PASSWORD_VALIDATION_RULES };
