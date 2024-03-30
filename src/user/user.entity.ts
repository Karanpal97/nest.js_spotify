import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'karan',
    description: 'the first name of user',
  })
  @Column()
  firstName: string;
  @ApiProperty({
    example: 'gill',
    description: 'the last name of user',
  })
  @Column()
  lastName: string;
  @ApiProperty({
    example: 'karan@gmail.com',
    description: 'the email of user',
  })
  @Column({ unique: true })
  email: string;
  @ApiProperty({
    example: '123',
    description: 'the password to be kept by user',
  })
  @Column()
  password: string;
}
