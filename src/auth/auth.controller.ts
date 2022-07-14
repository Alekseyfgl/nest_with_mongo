import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import {AuthService} from "./auth.service";
import {UsersService} from "../users/users.service";
import {CreateUserDto} from "./dto/createUserDto";

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService,
                private readonly userService: UsersService
    ) {
    }
    @HttpCode(200)
    @Post('/register')
    async register(@Body() createUserDto: CreateUserDto) {
        return await this.authService.createUser(createUserDto)
        // return this.authService.buildUserResponseWithToken(user);
    }

    // @HttpCode(200)
    // @Post('/login')
    // async login(@Body() createUserDto: CreateUserDto) {
    //     return this.authService.login(createUserDto)
    // }
}
