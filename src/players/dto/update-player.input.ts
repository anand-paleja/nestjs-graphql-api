import { CreatePlayerInput } from './create-player.input';
import { InputType, Field, PartialType, OmitType } from '@nestjs/graphql';


@InputType()
export class UpdatePlayerInput extends PartialType( OmitType(CreatePlayerInput, ['stats'] as const) ) {
  @Field()
  id: string;
}
