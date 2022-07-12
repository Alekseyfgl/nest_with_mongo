import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import {UsersModule} from "../users/users.module";

import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { getJWTConfig } from '../config/jwt.config'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
  imports:[
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
     inject:[ConfigService],
      useFactory: getJWTConfig
    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
