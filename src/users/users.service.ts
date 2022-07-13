import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { AuthDto } from '../auth/dto/authDto'
import { UserRepository } from './users.repository'
import { ERROR_MASSAGES } from '../constans/constans'
import { use } from 'passport'

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {
  }

  async createUser(createCatDto: AuthDto) {
    const user = await this.getUserByEmail(createCatDto.email)

    if (user) {
      throw new HttpException(
        ERROR_MASSAGES.EMAIL_IS_TAKEN,
        HttpStatus.BAD_REQUEST,
      )
    }

    return this.userRepository.createUser(createCatDto)
  }

  async getUserByEmail(email: string) {

    const user = await this.userRepository.findUserByEmail(email)

    // if(!user) {
    //   throw new HttpException(
    //     ERROR_MASSAGES.USER_DOESNT_EXIST,
    //     HttpStatus.BAD_REQUEST,
    //   )
    // }

    return user
  }


  async getUserById(id: string) {
    const user = await this.userRepository.findUserById(id)

    if (!user) {
      throw new HttpException(
        ERROR_MASSAGES.USER_DOESNT_EXIST,
        HttpStatus.BAD_REQUEST,
      )
    }

    return user
  }
}
