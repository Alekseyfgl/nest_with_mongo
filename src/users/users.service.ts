import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import {UserRepository} from "./users.repository";
import { ERROR_MASSAGES } from '../constans/constans'
import { compare } from 'bcrypt';
import { CreateUserDto } from '../auth/dto/createUserDto'

@Injectable()
export class UsersService {
    constructor(
        private readonly userRepository: UserRepository,
    ) {



    }

    async createUser(userDto) {
        const user = await this.userRepository.findUserByEmail(userDto.email)

        if (user) {
            throw new HttpException('Мыло занято',
              HttpStatus.BAD_REQUEST,
            )
        }

        return this.userRepository.createUser(userDto)
    }


    async getRegisteredUser(userFromDB) {
        const user = await this.userRepository.findUserByEmail(userFromDB.email)

        if (!user) {
            throw new HttpException(
              ERROR_MASSAGES.USER_DOESNT_EXIST,
              HttpStatus.BAD_REQUEST,
            )
        }

        const isPassword: boolean = await compare(
          userFromDB.password,
          user.password,
        );

        if (!isPassword) {
            throw new HttpException(ERROR_MASSAGES.INCORRECT_DATA, HttpStatus.BAD_REQUEST)
        }

        return user
    }


    // async getUserByEmail(user) {
    //
    // }

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
