import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./user.model";
import {UserRepository} from "./users.repository";

@Module({
  imports:[MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UsersService, UserRepository],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}
