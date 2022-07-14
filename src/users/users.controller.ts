import { Controller, Get, UseGuards} from '@nestjs/common'
import {AuthGuard} from 'src/auth/guards/auth.guard'
import {UsersService} from './users.service'
import {User} from "./decorators/users.decorators";



@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {
    }


    @UseGuards(AuthGuard)
    @Get('info')
    async getCurrentUser(@User('_id') currentUser: string) {
        return this.userService.getCurrentUser(currentUser)
    }
}
