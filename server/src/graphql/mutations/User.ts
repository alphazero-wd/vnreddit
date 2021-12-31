export const SIGNUP_MUTATION = `
mutation($user: SignupInput!) {
  signup(user: $user) {
    user {
      id
      username
      createdAt
      isConfirmed
      token
    }
    error {
      field
      message
    }
  }
}    
`;

export const LOGIN_MUTATION = `
mutation($user: LoginInput!) {
  login(user: $user) {
    user {
      id
      username
      createdAt
      isConfirmed
      token
    }
    error {
      field
      message
    }
  }
}
`;

export const FORGOT_PASSWORD_MUTATION = `
mutation ($email: String!) {
  forgotPassword(email: $email) {
    successMessage
    error {
      field
      message
    }
  }
}
`;

export const RESET_PASSWORD_MUTATION = `
mutation ResetPassword($payload: ResetPasswordInput!) {
  resetPassword(payload: $payload) {
    user {
      id
      username
      createdAt
      isConfirmed
      token
    }
    error {
      field
      message
    }
  }
}
`;

export const UPDATE_USERNAME_MUTATION = `
mutation($username: String!) {
  updateUsername(username: $username) {
    successMessage
    error {
      field
      message
    }
  }
}
`;

export const UPDATE_PASSWORD_MUTATION = `
mutation($confirmPassword: String!, $newPassword: String!, $password: String!) {
  updatePassword(confirmPassword: $confirmPassword, newPassword: $newPassword, password: $password) {
    successMessage
    error {
      field
      message
    }
  }
}
`;

export const DELETE_USER_MUTATION = `
mutation {
  deleteUser
}
`;

export const SEND_CONFIRMATION_EMAIL_MUTATION = `
  mutation {
  sendConfirmationEmail
}
`;

export const CONFIRM_USER_MUTATION = `
  mutation($token: String!) {
  confirmUser(token: $token)
}
`;
