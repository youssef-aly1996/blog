import { UserDocument } from './user.schema';
import { UserEntity } from './user.entity';
import { GetUserByUsernameDto } from './dtos/get-user-byUsername.dto';

export interface IUserService {
  getByEmail(email: string): Promise<UserDocument>;
  create(userEntity: UserEntity): Promise<any>;
  getByUsername(user: GetUserByUsernameDto): Promise<UserDocument>;
  getById(_id: string): Promise<UserDocument>;
  deleteById(_id: string): Promise<UserDocument>;
}
