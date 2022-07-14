import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { sign } from 'jsonwebtoken'
import { CreateUserDto } from './dto/createUserDto'
import { hash } from 'bcrypt'
import { userForResponse } from './auth.mapper'

@Injectable()
export class AuthService {

  constructor(private readonly userService: UsersService) {

  }


  async createUser(createUserDto: CreateUserDto) {

    const hashPassword: string = await hash(createUserDto.password, 10)


    const newUser = {
      email: createUserDto.email,
      password: hashPassword,
    }

    const user = await this.userService.createUser(newUser)
    const userFromDBWithId = await this.userService.getUserByEmail(user.email)
    // console.log('currentUserWithId====>', currentUserWithId)

    return this.buildUserResponseWithToken(userFromDBWithId)


    // console.log('tokens====>', tokens)
    // return user
    // return {
    //   currentUserWithId,
    //   ...tokens
    // }
  }

  static generateJwt(userId: string) {
    const data = { _id: userId }
    // console.log(data)
    const refreshToken = sign(data, process.env.JWT_SECRET, { expiresIn: '24h' })
    const successToken = sign(data, process.env.JWT_SECRET, { expiresIn: '500h' })
    // console.log('refreshToken===>>>', refreshToken)

    return { refreshToken, successToken }
  }

  public buildUserResponseWithToken(user) {
    const tokens = AuthService.generateJwt(String(user._id))
      return userForResponse(user, tokens);
  }
}


