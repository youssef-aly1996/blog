import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  readonly _id?: string;

  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
