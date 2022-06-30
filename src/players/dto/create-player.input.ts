import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { Stats } from '../models/stats.model';

// TODO: move this to a new file
@InputType()
export class CreateStatsInput{
  @Field({ description: 'Stats Season'})
  season: string;

  @Field(() => Float, { description: 'Average Points Per Game'})
  points: number;

  @Field(() => Float, { description: 'Average Rebounds Per Game'})
  rebounds: number;

  @Field(() => Float, { description: 'Average Assists Per Game'})
  assists: string;
}

@InputType()
export class CreatePlayerInput {
  @Field({ description: 'Player name'})
  name: string;

  @Field({ description: 'Player height'})
  height: string;

  @Field(() => Int, { description: 'Player weight'})
  weight: number;

  @Field({ description: 'Player hometown'})
  hometown: string;

  @Field(type => [CreateStatsInput], { nullable: true })
  stats: CreateStatsInput[]
}

