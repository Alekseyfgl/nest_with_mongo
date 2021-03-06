import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import {UsersModule} from "../users/users.module";
import {AuthGuard} from "./guards/auth.guard";


@Module({
  imports:[UsersModule],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard]
})
export class AuthModule {}
