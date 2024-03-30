import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Song } from './song.entities';
import { songDto } from '../dto/create-song-dto';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private songsRepository: Repository<Song>,
  ) {}

  async create(songDTO: songDto): Promise<Song> {
    const song = await this.songsRepository.save(songDTO);

    return song;
  }

  async getAll(): Promise<Song[]> {
    return this.songsRepository.find();
  }

  async get(id: number): Promise<Song | undefined> {
    return this.songsRepository.findOneBy({ id });
  }
}
