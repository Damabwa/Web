export const VALIDATION = {
  NICKNAME_USER: {
    MIN: 2,
    MAX: 7,
    REGEX: /^[가-힣a-zA-Z0-9]+$/,
  },
  NICKNAME_PHOTOGRAPHER: {
    MIN: 2,
    MAX: 18,
    REGEX: /^[가-힣a-zA-Z0-9\s]+$/,
  },
  INSTAGRAM_ID: {
    MAX: 30,
    REGEX: /[^0-9a-z._]/g,
  },
  EVENT_TITLE: {
    MIN: 3,
    MAX: 30,
  },
  EVENT_CONTENT: {
    MAX: 500,
  },
  EVENT_IMAGES: {
    MAX: 10,
  },
} as const;

export const PAGE_SIZE = {
  EVENT: 5,
} as const;
