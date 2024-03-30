import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { userDto } from 'src/dto/user-create-dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { Login } from 'src/dto/login-dto';
import { JwtAuthGaurd } from './jwt-gaurd';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}
  @Post()
  @ApiOperation({ summary: 'this will create the user' })
  @ApiResponse({
    status: 201,
    description: 'created the user successfully',
  })
  createUser(@Body() userDto: userDto) {
    console.log('the userDto', userDto);
    return this.userService.create(userDto);
  }
  @Get()
  @UseGuards(JwtAuthGaurd)
  @ApiBearerAuth('JWT-auth')
  getUser() {
    return this.userService.getUser();
  }
  @Post('/login')
  @ApiOperation({ summary: 'the login routes' })
  @ApiResponse({
    status: 201,
    description: 'the login for the user',
  })
  async login(@Body() loginDto: Login) {
    console.log('the userDto', loginDto);
    return await this.authService.Login(loginDto);
  }
}
