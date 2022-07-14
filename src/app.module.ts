import {MiddlewareConsumer, Module, RequestMethod} from '@nestjs/common';

import {ConfigModule, ConfigService} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";
import {getMongoDbConfig} from "./config/mongo.config";
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuthMiddleware } from './auth/middleware/auth.middleware';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getMongoDbConfig
        }),
        AuthModule,
        UsersModule,
    ]
})

export class AppModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(AuthMiddleware).forRoutes({
            path: '*',
            method: RequestMethod.ALL,
        });
    }
}