import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class userDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  pasword: string;
}
