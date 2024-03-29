import {
  IsNotEmpty,
  IsDateString,
  IsMilitaryTime,
  IsString,
  IsArray,
  IsOptional,
} from 'class-validator';

export class songDto {
  @IsString()
  @IsNotEmpty()
  readonly title;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  readonly artists;

  @IsNotEmpty()
  @IsDateString()
  readonly releasedDate: Date;

  @IsMilitaryTime()
  @IsNotEmpty()
  readonly duration: Date;

  @IsString()
  @IsOptional()
  readonly lyrics: string;
}
