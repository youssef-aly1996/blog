import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetUserByUsernameDto } from './dtos/get-user-byUsername.dto';
import { UserPasswordService } from './user-password.service';
import { UserEntity } from './user.entity';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersServiceMongo {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private userPasswordService: UserPasswordService,
  ) {}

  async getByEmail(email: string): Promise<UserDocument> {
    return await this.userModel.findOne({
      email,
    });
  }

  async create(userEntity: UserEntity): Promise<any> {
    const createUser = new this.userModel(userEntity);
    // Hash Password
    createUser.password = await this.userPasswordService.hash(
      createUser.password,
    );
    await createUser.save();
    return {
      id: createUser._id,
    };
  }

  async getByUsername(user: GetUserByUsernameDto): Promise<UserDocument> {
    return this.userModel
      .findOne({
        username: user.username,
      })
      .exec();
  }

  async getById(_id: string): Promise<UserDocument> {
    return await this.userModel.findById(_id).exec();
  }

  async deleteById(_id: string): Promise<UserDocument> {
    return await this.userModel.findByIdAndDelete(_id).exec();
  }
}
