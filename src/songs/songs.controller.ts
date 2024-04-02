import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { songDto } from '../dto/create-song-dto';
import { ArtistJwtGuard } from 'src/auth/artist.jwt';

@Controller('songs')
export class SongsController {
  constructor(private songService: SongsService) {}

  @Get()
  findAll() {
    try {
      return this.songService.getAll();
    } catch (error) {
      console.log(error);
      throw new HttpException('the error in fatch', HttpStatus.BAD_REQUEST);
    }
  }
  @Post()
  @UseGuards(ArtistJwtGuard)
  post(
    @Body() createSongDto: songDto,
    @Request()
    request,
  ) {
    console.log(request.user, 'the user while creating');
    return this.songService.create(createSongDto);
  }
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.songService.get(id);
  }
}
