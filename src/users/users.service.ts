import { HttpException, HttpStatus, Injectable } from '@nestjs/common'

import {UserRepository} from "./users.repository";

@Injectable()
export class UsersService {
    constructor(
        private readonly userRepository: UserRepository,
    ) {



    }

    async createUser(userDto) {
        const user = await this.getUserByEmail(userDto.email)

        if (user) {
            throw new HttpException('Мыло занято',
              HttpStatus.BAD_REQUEST,
            )
        }

        return this.userRepository.createUser(userDto)
    }


    async getUserByEmail(email: string) {

        const user = await this.userRepository.findUserByEmail(email)
        return user
    }

    async getUserById(id: string) {
        const user = await this.userRepository.findUserById(id)

        // if (!user) {
        //     throw new HttpException(
        //       ERROR_MASSAGES.USER_DOESNT_EXIST,
        //       HttpStatus.BAD_REQUEST,
        //     )
        // }

        return user
    }
}
