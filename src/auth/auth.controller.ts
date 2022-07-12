import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/authDto'

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService,
  ) {
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('/register')
  async register(@Body() authDto: AuthDto) {
    return this.authService.createUser(authDto)
  }


  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('/login')
  async login(@Body() authDto: AuthDto) {
    return this.authService.userValidate(authDto)
  }
}
