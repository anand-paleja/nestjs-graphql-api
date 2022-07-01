import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class CareerAverage {
  @Field(() => Float, { nullable: true, description: 'Average Points' })
  points: number;

  @Field(() => Float, { nullable: true, description: 'Average Rebounds' })
  rebounds: number;

  @Field(() => Float, { nullable: true, description: 'Average Assists' })
  assists: number;
}
