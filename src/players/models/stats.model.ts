import { ObjectType, Field, Float } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Player } from './player.model';

@ObjectType()
@Entity()
export class Stats {
  @Field({ description: 'Unique stats id' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ description: 'Stats Season' })
  @Column({ length: 250, nullable: false })
  season: string;

  @Field(() => Float, { description: 'Average Points Per Game' })
  @Column({ type: 'float', nullable: false })
  points: number;

  @Field(() => Float, { description: 'Average Rebounds Per Game' })
  @Column({ type: 'float', nullable: false })
  rebounds: number;

  @Field(() => Float, { description: 'Average Assists Per Game' })
  @Column({ type: 'float', nullable: true })
  assists: number;

  @Field((type) => Player)
  @ManyToOne((type) => Player, (player) => player.stats)
  @JoinColumn({ name: 'player_id' })
  player: Player;

  @Field()
  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
