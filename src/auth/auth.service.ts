import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Login } from 'src/dto/login-dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ArtistService } from 'src/artist/artist.service';
import { PayloadType } from '../Types/payload.types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private artistService: ArtistService,
  ) {}

  async Login(login: Login): Promise<{ accessToken: string }> {
    const user = await this.userService.findOne(login);
    if (!user) {
      throw new UnauthorizedException('the user with email not find');
    }

    const passwordCheck = await bcrypt.compare(login.password, user.password);
    const payLoad: PayloadType = { email: user.email, userId: user.id };
    const artist = await this.artistService.findArtist(user.id);
    if (artist) {
      payLoad.artistId = artist.id;
      console.log('the artist id is ', artist.id);
    }

    if (passwordCheck) {
      return { accessToken: this.jwtService.sign(payLoad) };
    }
  }
}
