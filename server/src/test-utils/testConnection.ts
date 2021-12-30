import "dotenv/config";
import path from "path";
import { createConnection } from "typeorm";

export const testConnection = async (drop: boolean = false) => {
  return createConnection({
    type: "postgres",
    url: process.env.DATABASE_TEST_URL,
    dropSchema: drop,
    synchronize: drop,
    entities: [path.join(__dirname, "../entity/*.*")],
  });
};
