import {ConfigService} from "@nestjs/config";

export const getJWTConfig = (configService: ConfigService) => ({
    secret: configService.get('JWT_SECRET')
})