import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Login } from 'src/dto/login-dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async Login(login: Login): Promise<{ accessToken: string }> {
    const user = await this.userService.findOne(login);
    if (!user) {
      throw new UnauthorizedException('the user with email not find');
    }

    const passwordCheck = await bcrypt.compare(login.password, user.password);
    if (passwordCheck) {
      const payLoad = { email: user.email, sub: user.id };
      return { accessToken: this.jwtService.sign(payLoad) };
    }
  }
}
