import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PetsModule } from './pets/pets.module';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './pets/pet.entity';
import { OwnersModule } from './owners/owners.module';
import { Owner } from './owners/entities/owner.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'process';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRootAsync({inject:[ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: 'localhost',
          port: configService.get<number>('DBPORT'),
          database: configService.get<string>('DBNAME'),
          username: configService.get<string>('USER'),
          password: configService.get<string>('PASS'),
          synchronize: true,
          entities: [Pet, Owner],
        };
      }
    }),
    PetsModule,
    OwnersModule,ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:'.env'
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
