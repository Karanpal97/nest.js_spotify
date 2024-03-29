import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Song } from './song.entities';
import { songDto } from 'src/dto/create-song-dto';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private songRepository: Repository<Song>,
  ) {}

  private readonly songs = [];

  async create(songDto: songDto): Promise<Song> {
    const song = new Song();
    song.title = songDto.title;
    song.releasedDate = songDto.releasedDate;
    song.duration = songDto.duration;
    song.lyrics = songDto.lyrics;
    song.artists = songDto.artists;
    return await this.songRepository.save(song);
  }

  async getAll(): Promise<Song[]> {
    return this.songRepository.find();
  }

  async get(id: number) {
    return this.songs[id];
  }
}
