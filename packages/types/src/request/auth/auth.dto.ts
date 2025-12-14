import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class BasicDto {
  @MaxLength(20)
  @MinLength(3)
  @IsNotEmpty()
  username: string;

  @MaxLength(255)
  @MinLength(3)
  @IsNotEmpty()
  password: string;
}

export class LoginDto extends BasicDto {}

export class NewUserDto extends BasicDto {}
