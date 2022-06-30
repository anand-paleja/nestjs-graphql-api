import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Stats } from './models/stats.model';
import { Repository, FindOneOptions } from 'typeorm';
import { CreatePlayerInput } from './dto/create-player.input';
import { UpdatePlayerInput } from './dto/update-player.input';
import { Player } from './models/player.model';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
  ) {}


  findAll() {
    return this.playerRepository.find();
  }

  async findOne(id: string) {
    return await this.playerRepository.findOneBy({id});
  }

  async create(createPlayerInput: CreatePlayerInput) {
    let newPlayer = new Player();
    newPlayer.name = createPlayerInput.name;
    newPlayer.height = createPlayerInput.height;
    newPlayer.weight = createPlayerInput.weight;
    newPlayer.hometown = createPlayerInput.hometown;
    
    if( createPlayerInput.stats && createPlayerInput.stats.length ){
      newPlayer.stats = [];
      createPlayerInput.stats.forEach( stat => {
        let newPlayerStats = new Stats();
        newPlayerStats.season = stat.season;
        newPlayerStats.points = stat.points;
        newPlayerStats.assists = stat.assists;
        newPlayerStats.rebounds = stat.rebounds;
        newPlayer.stats.push(newPlayerStats);
      });
    }
    console.log(newPlayer);

    return await this.playerRepository.save(newPlayer, { });
  }

  async update(id: string, updatePlayerInput: UpdatePlayerInput) {
    let player = await this.playerRepository.findOneBy({ id });

    if( !player )
      throw new Error('Player not found.');

    
    player.name = updatePlayerInput.name || player.name;
    player.height = updatePlayerInput.height || player.height;
    player.weight = updatePlayerInput.weight || player.weight;
    player.hometown = updatePlayerInput.hometown || player.hometown;

    return await this.playerRepository.save(player);  
  }

  async remove(player: Player) {
    return await this.playerRepository.remove(player);
  }
}
