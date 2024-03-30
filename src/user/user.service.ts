import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { userDto } from 'src/dto/user-create-dto';
import * as bcrypt from 'bcrypt';
import { Login } from 'src/dto/login-dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}
  async create(userDto: userDto) {
    const salt = await bcrypt.genSalt();
    const hashPasswod = await bcrypt.hash(userDto.pasword, salt);
    const newuser = this.userRepo.create({
      ...userDto,
      password: hashPasswod,
    });

    const user = await this.userRepo.save(newuser);
    delete user.password;
    return user;
  }
  async getUser() {
    return await this.userRepo.find();
  }
  async findOne(data: Login): Promise<User> {
    const user = await this.userRepo.findOneBy({ email: data.email });
    if (!user) {
      throw new UnauthorizedException('Could not find user');
    }
    return user;
  }
}
