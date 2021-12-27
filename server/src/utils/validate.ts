export const validateEmail = (email: string) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string) => {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;
  return passwordRegex.test(password);
};

export const validateCommunityName = (name: string) => {
  const validCommunityNameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return validCommunityNameRegex.test(name);
};

export const validateUsername = (username: string) => {
  const validUsernameRegex = /^[a-zA-Z0-9_]{3,30}$/;
  return validUsernameRegex.test(username);
};
