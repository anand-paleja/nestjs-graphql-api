import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Stats } from './models/stats.model';
import { CreatePlayerInput } from './dto/create-player.input';
import { UpdatePlayerInput } from './dto/update-player.input';
import { Player } from './models/player.model';
import { Repository } from 'typeorm';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player) private playerRepository: Repository<Player>,
  ) {}

  /**
   * Get all players
   */
  findAll() {
    return this.playerRepository.find();
  }

  /**
   * Get a player by id
   * @param id - player id
   */
  async findOne(id: string) {
    return this.playerRepository.findOneBy({ id });
  }

  /**
   * Get hall of fame candidates, based on player stats:
   *  - points >= 25 ||
   *  - assists >= 10 ||
   *  - rebounds >= 15
   */
  async findHallOfFameCandidates() {
    return this.playerRepository
      .createQueryBuilder('player')
      .innerJoin('player.stats', 'stats')
      .where('stats.points >= :points', { points: 25 })
      .orWhere('stats.assists >= :assists', { assists: 10 })
      .orWhere('stats.rebounds >= :rebounds', { rebounds: 15 })
      .getMany();
  }

  /**
   * Create a player
   * @param createPlayerInput - create player data
   */
  async create(createPlayerInput: CreatePlayerInput) {
    const newPlayer = new Player();
    newPlayer.name = createPlayerInput.name;
    newPlayer.height = createPlayerInput.height;
    newPlayer.weight = createPlayerInput.weight;
    newPlayer.hometown = createPlayerInput.hometown;

    // if we have stats, iterate each and add to the new player
    if (createPlayerInput.stats && createPlayerInput.stats.length) {
      newPlayer.stats = [];
      createPlayerInput.stats.forEach((stat) => {
        const newPlayerStats = new Stats();
        newPlayerStats.season = stat.season;
        newPlayerStats.points = stat.points;
        newPlayerStats.assists = stat.assists;
        newPlayerStats.rebounds = stat.rebounds;
        newPlayer.stats.push(newPlayerStats);
      });
    }

    return this.playerRepository.save(newPlayer);
  }

  /**
   * Update a player
   * @param updatePlayerInput - update player data
   */
  async update(id: string, updatePlayerInput: UpdatePlayerInput) {
    const player = await this.playerRepository.findOneBy({ id });

    // throw an error, if we dont find the player to update
    if (!player) throw new Error('Player not found.');

    // update the player, if the update data if it is not null/undefined
    player.name = updatePlayerInput.name || player.name;
    player.height = updatePlayerInput.height || player.height;
    player.weight = updatePlayerInput.weight || player.weight;
    player.hometown = updatePlayerInput.hometown || player.hometown;

    return this.playerRepository.save(player);
  }

  /**
   * Removes a player
   * @param Player - player to remove
   */
  async remove(player: Player) {
    return this.playerRepository.remove(player);
  }
}
