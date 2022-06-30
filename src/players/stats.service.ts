import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './models/player.model';
import { Stats } from './models/stats.model';

@Injectable()
export class StatsService {
    constructor(
        @InjectRepository(Stats)
        private statsRepository: Repository<Stats>,
      ) {}

    findByPlayer(player: Player) {
        return this.statsRepository.findBy( { player: {id: player.id} });         
    }
}
