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
  
  /**
   * Get all players
   */
  @Query(() => [Player], { name: 'players' })
  async findAll() {
    return this.playersService.findAll();
  }

  /**
   * Get a player by id
   * @param id - player id   
   */
  @Query(() => Player, { name: 'player', nullable: true })
  async findOne(@Args('id') id: string) {
    return this.playersService.findOne(id);
  }

  /**
   * Player stats resolver
   * @param player    
   */
  @ResolveField(returns => [Stats])
  async stats(@Parent() player) {
    return this.statsService.findByPlayer(player);
  }

  /**
   * Create a player
   * @param createPlayerInput - create player data   
   */
  @Mutation(() => Player)
  createPlayer(@Args('createPlayerInput') createPlayerInput: CreatePlayerInput) {
    return this.playersService.create(createPlayerInput);
  }

  /**
   * Update a player
   * @param updatePlayerInput - update player data   
   */
  @Mutation(() => Player)
  updatePlayer(@Args('updatePlayerInput') updatePlayerInput: UpdatePlayerInput) {
    return this.playersService.update(updatePlayerInput.id, updatePlayerInput);
  }

  /**
   * Removes a player
   * @param id - player id   
   */
  @Mutation(() => Player)
  async removePlayer(@Args('id') id: string) {
    // get the player first, so we can return it after removing
    const removedPlayer = await this.playersService.findOne(id);
    this.playersService.remove(removedPlayer);    
    return removedPlayer;
  }
}
