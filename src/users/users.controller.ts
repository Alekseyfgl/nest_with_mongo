import {Body, Controller, Post} from '@nestjs/common';
import {User} from "./user.model";
import {UsersService} from "./users.service";
import {CreateUserDto} from "../auth/dto/createUserDto";

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {
    }

    // @Post()
    // async createUser(@Body() createCatDto: CreateUserDto): Promise<User> {
    //     console.log('createCatDto', createCatDto)
    //     return this.userService.createUser(createCatDto)
    // }
}
