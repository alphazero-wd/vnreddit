import { Community } from "../entity/Community";
import { Field, ObjectType } from "type-graphql";
import { ErrorResponse } from "./ErrorResponse";

@ObjectType()
export class CommunityResponse {
    @Field(() => ErrorResponse, {nullable: true})
    error?: ErrorResponse

    @Field(() => Community, {nullable: true})
    community?: Community
}
