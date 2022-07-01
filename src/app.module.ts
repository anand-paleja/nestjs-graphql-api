import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validate } from './config.validation';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const dbPort = Number(config.get('DB_PORT'));
        return {
          type: 'postgres',
          host: config.get('DB_HOST'),
          port: dbPort,
          username: config.get('DB_USERNAME'),
          password: config.get('DB_PASSWORD'),
          database: config.get('DB_NAME'),
          entities: ['dist/**/*.model.js'],
          synchronize: true,
          logging: false
        } as TypeOrmModuleOptions;
      },
    }),
    PlayersModule
  ],
})
export class AppModule {}
