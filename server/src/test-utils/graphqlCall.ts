import { graphql, GraphQLSchema, Source } from "graphql";
import { buildSchema } from "type-graphql";
import { Maybe } from "graphql/jsutils/Maybe";
import path from "path";

interface Props {
  source: string | Source;
  variableValues?: Maybe<{
    [key: string]: any;
  }>;
  userId?: number;
  token?: string;
}

let schema: GraphQLSchema;
export const graphqlCall = async ({
  variableValues,
  source,
  userId,
  token,
}: Props) => {
  if (!schema) {
    schema = await buildSchema({
      resolvers: [path.join(__dirname, "../resolvers/*.*")],
    });
  }
  return graphql({
    variableValues,
    source,
    schema,
    contextValue: {
      req: {
        headers: {
          authorization: `Bearer ${token}`,
        },
        payload: {
          userId,
        },
      },
    },
  });
};
