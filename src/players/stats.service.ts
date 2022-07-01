import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CareerAverage } from './models/careerAverage.model';
import { Player } from './models/player.model';
import { Stats } from './models/stats.model';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Stats)
    private statsRepository: Repository<Stats>,
  ) {}

  /**
   * Get a player's stats
   * @param player
   */
  async findByPlayer(player: Player) {
    return this.statsRepository.findBy({ player: { id: player.id } });
  }

  /**
   * Get a player's career average
   * @param player
   */
  async findCareerAverage(player: Player): Promise<CareerAverage> {
    // initial response
    let averages: CareerAverage = {
      points: 0,
      assists: 0,
      rebounds: 0,
    };

    // query the db
    const rawResult: CareerAverage[] = await this.statsRepository.query(
      `
					SELECT 
							AVG(s.points) as points, 
							AVG(s.rebounds) as rebounds,
							AVG(s.assists) as assists
					FROM player as p
					JOIN stats s ON p.id = s.player_id
					WHERE p.id = $1
        `,
      [player.id],
    );

    // if we have results, update the averages
    if (rawResult && rawResult.length) {
      const data = rawResult[0];
      averages = {
        points: data.points ? Number(data.points.toFixed(2)) : 0,
        rebounds: data.rebounds ? Number(data.rebounds.toFixed(2)) : 0,
        assists: data.assists ? Number(data.assists.toFixed(2)) : 0,
      };
    }

    return averages;
  }
}
