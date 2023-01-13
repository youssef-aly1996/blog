import { IsEmail, IsNotEmpty } from 'class-validator';
export class GetUserByEmailDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}
