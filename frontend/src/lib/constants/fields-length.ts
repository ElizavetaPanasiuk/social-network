const FIELDS_LENGTH = {
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

export default FIELDS_LENGTH;
