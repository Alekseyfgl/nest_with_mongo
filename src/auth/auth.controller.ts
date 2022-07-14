import {Body, Controller, HttpCode, Post, UsePipes, ValidationPipe} from '@nestjs/common'
import {AuthService} from "./auth.service";
import {CreateUserDto} from "./dto/createUserDto";
import {UserResponse} from "../users/interfaces/users.interfaces";

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService,) {
    }

    @HttpCode(200)
    @Post('/register')
    @UsePipes(new ValidationPipe())
    async register(@Body() createUserDto: CreateUserDto): Promise<UserResponse> {
        return await this.authService.createUser(createUserDto)
    }

    @HttpCode(200)
    @Post('/login')
    @UsePipes(new ValidationPipe())
    async login(@Body() createUserDto: CreateUserDto): Promise<UserResponse> {
        return this.authService.login(createUserDto)
    }
}
