import { USER_FRAGMENT } from "../fragments";

export const ME_QUERY = `
  {
    me {
      ${USER_FRAGMENT}
    }
} 
`;
