import "dotenv/config";
import "reflect-metadata";
import path from "path";
import { ApolloServer } from "apollo-server-express";
import { createConnection } from "typeorm";
import { __prod__ } from "./constants/constants";
import express from "express";
import { buildSchema } from "type-graphql";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";

const main = async () => {
  try {
    await createConnection({
      type: "postgres",
      url: process.env.DATABASE_URL,
      synchronize: !__prod__,
      logging: !__prod__,
      entities: [path.join(__dirname, "entity/*.*")],
    });

    const schema = await buildSchema({
      resolvers: [PostResolver, UserResolver],
      validate: false,
    });

    const apolloServer = new ApolloServer({ schema });

    const app = express();
    await apolloServer.start();

    apolloServer.applyMiddleware({ app });

    const PORT = process.env.PORT || 4000;

    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

main();
