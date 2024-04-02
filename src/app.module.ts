import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { SongsModule } from './songs/songs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Song } from './songs/song.entities';
import { User } from './user/user.entity';
import { Artist } from './artist/artist.entity';
import { Playlist } from './playlist/playlist.entity';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'spotify',
      port: 5432,
      host: 'localhost',
      username: 'postgres',
      password: 'postgres',
      entities: [Song, User, Artist, Playlist],
      synchronize: true,
    }),
    SongsModule,
    AuthModule,
    UserModule,
    ArtistModule,
   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private datasource: DataSource) {
    console.log('connected', datasource.driver.database);
  }
}
