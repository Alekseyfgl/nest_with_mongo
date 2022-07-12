import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {UsersService} from "../users/users.service";
import {CreateUserDto} from "./dto/createUserDto";

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService,
                private readonly userService: UsersService
    ) {
    }

    @Post('/register')
    async register(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto)
    }
}
