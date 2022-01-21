import { createHmac } from "crypto";

export const encryptImage = (imageFile: string): string => {
  return createHmac("sha256", imageFile).digest("hex");
};
