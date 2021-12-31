export const __prod__ = process.env.NODE_ENV === "production";
export const PASSWORD_REGEX =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;
export const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const VALID_COMMUNITY_NAME_REGEX = /^[a-zA-Z0-9_]{3,20}$/;
export const VALID_USERNAME_REGEX = /^[a-zA-Z0-9_]{3,30}$/;
