import {ConfigService} from "@nestjs/config";

export const getMongoDbConfig = (configService: ConfigService) => ({
    uri: configService.get('MONGO_URI')
})