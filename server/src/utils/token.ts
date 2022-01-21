import { sign } from "jsonwebtoken";
import { User } from "../entity/User";

export const createAccessToken = (user: User) => {
  return sign({ userId: user.id }, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: "1h",
  });
};

export const createRefreshToken = (user: User) => {
  return sign({ userId: user.id }, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: "1h",
  });
};
