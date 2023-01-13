import { Module } from '@nestjs/common';
import { config } from 'dotenv';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

//initialize environment variables
config();

const MONGO_URI: string = process.env.DB_URI_DEVELOPMENT;

@Module({
  imports: [MongooseModule.forRoot(MONGO_URI), AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [AuthModule],
})
export class AppModule {}
