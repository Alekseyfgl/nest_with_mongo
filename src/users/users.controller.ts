import { Controller, Get } from '@nestjs/common'

import { UsersService } from './users.service'
import { Auth } from '../auth/decorators/auth.decorator'


@Controller()
export class UsersController {
  constructor(private readonly userService: UsersService) {
  }


  @Auth('user')
  @Get('info')
  async getCurrentUser() {
    return 'qqqqq'
  }

}
