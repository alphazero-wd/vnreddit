import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class ErrorResponse {
  @Field({ nullable: true })
  field?: string;

  @Field()
  message: string;
}
