import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Artist } from './artist.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist) private artistRepo: Repository<Artist>,
  ) {}

  async findArtist(userId: number) {
    return this.artistRepo.findOneBy({ user: { id: userId } });
  }
}
