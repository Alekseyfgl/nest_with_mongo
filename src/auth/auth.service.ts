import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { AuthDto } from './dto/authDto'
import { hash, compare } from 'bcrypt'
import { ERROR_MASSAGES } from '../constans/constans'
import { JwtService } from '@nestjs/jwt'
import { RefreshTokenDto } from './dto/refreshToken.dto'


@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {
  }

// signup
  async createUser(createUserDto: AuthDto) {

    const hashPassword: string = await hash(createUserDto.password, 10)

    const newUser: AuthDto = {
      email: createUserDto.email,
      password: hashPassword,
    }

    const user = await this.userService.createUser(newUser)
    const currentUserWithId = await this.userService.getUserByEmail(user.email)
    const tokens = await this.issueTokenPair(String(currentUserWithId._id))

    return {
      user,
      ...tokens,
    }
  }

// login
  async validateUser(createUserDto: AuthDto) {
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


  // create tokens
  async issueTokenPair(userId: string) {
    const data = { _id: userId }

    const refreshToken = await this.jwtService.signAsync(data, {
      expiresIn: '15d',
    })

    const accessToken = await this.jwtService.signAsync(data, {
      expiresIn: '1h',
    })

    console.log('refreshToken=>>>', refreshToken)
    console.log('accessToken=>>>', accessToken)


    return { refreshToken, accessToken }
  }


  //update tokens
  async getNewTokens({ refreshToken }: RefreshTokenDto) {

    if (!refreshToken) {
      throw new HttpException(
        ERROR_MASSAGES.NOT_AUTHORIZED,
        HttpStatus.UNAUTHORIZED,
      )
    }


    try {
      const result = await this.jwtService.verifyAsync(refreshToken)
      const user = await this.userService.getUserById(result._id)
      const tokens = await this.issueTokenPair(String(user._id))

      return {
        user,
        ...tokens,
      }

    } catch (e) {
      throw new HttpException(
        ERROR_MASSAGES.TOKEN_IS_NOT_VALID,
        HttpStatus.UNAUTHORIZED)
    }

  }

  //mapper
  returnUserFields(user) {
    return {
      _id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    }
  }
}
