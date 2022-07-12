import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { AuthDto } from './dto/authDto'
import { hash, compare } from 'bcrypt'
import { ERROR_MASSAGES } from '../constans/constans'


@Injectable()
export class AuthService {

  constructor(private readonly userService: UsersService) {
  }


  async createUser(createUserDto: AuthDto) {

    const hashPassword: string = await hash(createUserDto.password, 10)

    const newUser: AuthDto = {
      email: createUserDto.email,
      password: hashPassword,
    }

    return this.userService.createUser(newUser)
  }


  async userValidate(createUserDto: AuthDto) {
    const user = await this.userService.getUserByEmail(createUserDto.email)

    if (!user) {
      throw new HttpException(
        ERROR_MASSAGES.USER_DOESNT_EXIST,
        HttpStatus.BAD_REQUEST,
      )
    }

    const isValidPassword: boolean = await compare(createUserDto.password, user.password)

    if (!isValidPassword) {
      throw new HttpException(ERROR_MASSAGES.INCORRECT_DATA, HttpStatus.BAD_REQUEST)
    }

    return user
  }
}
