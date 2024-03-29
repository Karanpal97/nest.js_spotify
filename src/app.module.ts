import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Song } from './songs/song.entities';
import { User } from './user/user.entity';
import { Artist } from './artist/artist.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'spotify',
      port: 5432,
      host: 'localhost',
      username: 'postgres',
      password: 'postgres',
      entities: [Song, User, Artist],
      synchronize: true,
    }),
    SongsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private datasource: DataSource) {
    console.log('connected', datasource.driver.database);
  }
}
