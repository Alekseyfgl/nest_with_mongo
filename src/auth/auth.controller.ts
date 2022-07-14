import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import {AuthService} from "./auth.service";
import {CreateUserDto} from "./dto/createUserDto";

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService,) {}
    @HttpCode(200)
    @Post('/register')
    async register(@Body() createUserDto: CreateUserDto) {
        return await this.authService.createUser(createUserDto)
    }

    @HttpCode(200)
    @Post('/login')
    async login(@Body() createUserDto: CreateUserDto) {
        return this.authService.login(createUserDto)
    }
}
