import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { PlayersService } from './players.service';
import { Player } from './models/player.model';
import { CreatePlayerInput } from './dto/create-player.input';
import { UpdatePlayerInput } from './dto/update-player.input';
import { StatsService } from './stats.service';
import { Stats } from './models/stats.model';

@Resolver(() => Player)
export class PlayersResolver {
  constructor(
    private readonly playersService: PlayersService,
    private readonly statsService: StatsService) {}

  @Query(() => [Player], { name: 'players' })
  async findAll() {
    return await this.playersService.findAll();
  }

  @Query(() => Player, { name: 'player', nullable: true })
  async findOne(@Args('id') id: string) {
    return await this.playersService.findOne(id);
  }

  @ResolveField(returns => [Stats])
  async stats(@Parent() player) {
    return await this.statsService.findByPlayer(player);
  }

  @Mutation(() => Player)
  createPlayer(@Args('createPlayerInput') createPlayerInput: CreatePlayerInput) {
    return this.playersService.create(createPlayerInput);
  }

  @Mutation(() => Player)
  updatePlayer(@Args('updatePlayerInput') updatePlayerInput: UpdatePlayerInput) {
    return this.playersService.update(updatePlayerInput.id, updatePlayerInput);
  }

  @Mutation(() => Player)
  async removePlayer(@Args('id') id: string) {
    const removedPlayer = await this.playersService.findOne(id);
    this.playersService.remove(removedPlayer);
    return removedPlayer;
  }
}
