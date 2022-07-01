import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersResolver } from './players.resolver';
import { StatsService } from './stats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stats } from './models/stats.model';
import { Player } from './models/player.model';

@Module({
  imports: [TypeOrmModule.forFeature([Player, Stats])],
  providers: [PlayersResolver, PlayersService, StatsService],
})
export class PlayersModule {}
