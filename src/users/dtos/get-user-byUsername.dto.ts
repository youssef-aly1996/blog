import { IsNotEmpty, IsString } from 'class-validator';
export class GetUserByUsernameDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;
}
