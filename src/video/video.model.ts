import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class Video {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  url: string;

  @Field()
  description: string;

  @Field(() => [String], { nullable: true })
  tags?: string[];
}
