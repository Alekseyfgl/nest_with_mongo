import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { AuthDto } from './dto/authDto'
import { hash, compare } from 'bcrypt'
import { ERROR_MASSAGES } from '../constans/constans'
import { JwtService } from '@nestjs/jwt'



@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) {
  }


  async createUser(createUserDto: AuthDto) {

    const hashPassword: string = await hash(createUserDto.password, 10)

    const newUser: AuthDto = {
      email: createUserDto.email,
      password: hashPassword,
    }

    const tokens = await this.issueTokenPair(23)

    console.log('tokens===> ', tokens)

    const user = await this.userService.createUser(newUser)

    return {
      user,
      ...tokens
    }
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


  async issueTokenPair(userId) {
    const data = { _id: userId }

    const refreshToken  = await  this.jwtService.signAsync(data, {
      expiresIn: '15d'
    })

    const accessToken  = await  this.jwtService.signAsync(data, {
      expiresIn: '1h'
    })

    console.log('refreshToken=>>>', refreshToken)
    console.log('accessToken=>>>', accessToken)


    return {refreshToken, accessToken}
  }


  returnUserFields(user) {
    return {
      _id: user.id,
      email: user.email,
      isAdmin: user.isAdmin
    }
  }
}
