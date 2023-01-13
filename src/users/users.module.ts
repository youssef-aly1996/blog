import { UserController } from './user.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersServiceMongo } from './users.service';
import { UserPasswordService } from './user-password.service';
import { User, UserSchema } from './user.schema';
import { USER_SERVICE } from 'src/core/constants';

@Module({
  controllers: [UserController],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    {
      provide: USER_SERVICE,
      useClass: UsersServiceMongo,
    },
    UserPasswordService,
  ],
  exports: [USER_SERVICE, UserPasswordService],
})
export class UsersModule {}
