import {Body, Controller, Post} from '@nestjs/common';
import {User} from "./user.model";
import {UsersService} from "./users.service";
import {AuthDto} from "../auth/dto/authDto";

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {
    }

    // @Post()
    // async createUser(@Body() createCatDto: AuthDto): Promise<User> {
    //     console.log('createCatDto', createCatDto)
    //     return this.userService.createUser(createCatDto)
    // }
}
