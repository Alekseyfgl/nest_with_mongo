import {Controller, Get, UseGuards} from '@nestjs/common'
import { AuthGuard } from 'src/auth/guards/auth.guard'

import { UsersService } from './users.service'


@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {
  }


  @UseGuards(AuthGuard)
  @Get('info')
  async getCurrentUser() {
    return 'qqqq'
  }
}
