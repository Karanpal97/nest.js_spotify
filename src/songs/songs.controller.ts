import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { songDto } from '../dto/create-song-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from './song.entities';

@Controller('songs')
export class SongsController {
  constructor(
    @InjectRepository(Song)
    private songService: SongsService,
  ) {}

  @Get()
  findAll() {
    try {
      return this.songService.getAll;
    } catch (error) {
      console.log(error);
      throw new HttpException('the error in fatch', HttpStatus.BAD_REQUEST);
    }
  }
  @Post()
  post(@Body() createSongDto: songDto) {
    return this.songService.create(createSongDto);
  }
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.songService.get(id);
  }
}
