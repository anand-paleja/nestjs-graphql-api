import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Stats } from './stats.model';

@ObjectType()
@Entity()
export class Player {
  @Field({ description: 'Unique player id' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ description: 'Player name'})
  @Column({length: 250, nullable: false})
  name: string;

  @Field({ description: 'Player height'})
  @Column({length: 50, nullable: false})
  height: string;

  @Field(() => Float, { description: 'Player weight'})
  @Column({type: 'float', nullable: false})
  weight: number;

  @Field({ description: 'Player hometown'})
  @Column({length: 250, nullable: true})
  hometown: string;

  @Field(type => [Stats], { nullable: true })
  @OneToMany(type => Stats, stats => stats.player, { cascade: true })
  stats: Stats[]

  @Field()
  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @Field()
  get isRookie():Boolean {
    return this.stats == null || this.stats.length <= 1;
  }
}
