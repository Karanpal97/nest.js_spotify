import { Controller, Get } from '@nestjs/common';
import { ArtistService } from './artist.service';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}
  //   @Get()
  //   async getArtist(){
  //     return await this.artistService.findArtist()
  //   }
}
