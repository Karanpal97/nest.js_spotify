import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { userDto } from 'src/dto/user-create-dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { Login } from 'src/dto/login-dto';
import { JwtAuthGaurd } from './jwt-gaurd';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}
  @Post()
  createUser(@Body() userDto: userDto) {
    console.log('the userDto', userDto);
    return this.userService.create(userDto);
  }
  @Get()
  @UseGuards(JwtAuthGaurd)
  getUser() {
    return this.userService.getUser();
  }
  @Post('/login')
  async login(@Body() loginDto: Login) {
    console.log('the userDto', loginDto);
    return await this.authService.Login(loginDto);
  }
}
