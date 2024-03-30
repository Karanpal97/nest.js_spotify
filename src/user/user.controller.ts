import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { userDto } from 'src/dto/user-create-dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
 
}
