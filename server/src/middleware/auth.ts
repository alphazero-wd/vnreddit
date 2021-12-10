import { MyContext } from "../types/MyContext";
import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";

export const auth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  const authHeaders = context.req.headers.authorization;
  console.log(authHeaders);

  if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
    throw new Error("You are not authorized.");
  }
  const token = authHeaders.split(" ")[1];
  const payload = verify(token, process.env.JWT_ACCESS_SECRET!);
  context.payload = payload as any;

  return next();
};