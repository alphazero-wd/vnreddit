import {
  EMAIL_REGEX,
  PASSWORD_REGEX,
  VALID_COMMUNITY_NAME_REGEX,
  VALID_USERNAME_REGEX,
} from "../constants/constants";

export const validateEmail = (email: string) => {
  return EMAIL_REGEX.test(email);
};

export const validatePassword = (password: string) => {
  return PASSWORD_REGEX.test(password);
};

export const validateCommunityName = (name: string) => {
  return VALID_COMMUNITY_NAME_REGEX.test(name);
};

export const validateUsername = (username: string) => {
  return VALID_USERNAME_REGEX.test(username);
};
