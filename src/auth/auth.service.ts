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

  async login(createUserDto: CreateUserDto) {
    const user = await this.userService.getRegisteredUser(createUserDto)
    return AuthService.buildUserResponseWithToken(user)
  }

  async createUser(createUserDto: CreateUserDto) {

    const hashPassword: string = await hash(createUserDto.password, 10)
    const newUser = {
      email: createUserDto.email,
      password: hashPassword,
    }
    const user = await this.userService.createUser(newUser)

    return AuthService.buildUserResponseWithToken(user)
  }


  private static generateJwt(userId: string) {
    const data = { _id: userId }
    const refreshToken = sign(data, process.env.JWT_SECRET, { expiresIn: '24h' })
    const successToken = sign(data, process.env.JWT_SECRET, { expiresIn: '500h' })
    return { refreshToken, successToken }
  }


  private static buildUserResponseWithToken(user) {
    const tokens = AuthService.generateJwt(String(user._id))
    return userForResponse(user, tokens)
  }
}




