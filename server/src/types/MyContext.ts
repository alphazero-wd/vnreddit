import { Request, Response } from "express";

export interface MyContext {
  req: Request & { payload?: { userId: number } };
  res: Response;
}
