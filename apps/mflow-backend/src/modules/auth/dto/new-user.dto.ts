import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class NewUserDto {
  @MaxLength(255)
  @MinLength(3)
  @IsNotEmpty()
  username: string;

  @MaxLength(255)
  @MinLength(3)
  @IsNotEmpty()
  password: string;
}
