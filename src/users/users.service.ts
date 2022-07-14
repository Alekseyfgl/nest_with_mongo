import {HttpException, HttpStatus, Injectable} from '@nestjs/common'
import {UserRepository} from "./users.repository";
import {ERROR_MASSAGES} from '../constans/constans'
import {compare} from 'bcrypt';
import {currentUserResponse} from "./users.mapper";
import {CurrentUserResponse, UserType} from "./interfaces/users.interfaces";
import {Optional} from "../optional/optional.interface";
import {User} from "./user.model";

@Injectable()
export class UsersService {
    constructor(
        private readonly userRepository: UserRepository,
    ) {


    }

    async createUser(userDto): Promise<User> {
        const user: Optional<UserType> = await this.userRepository.findUserByEmail(userDto.email)

        if (user) {
            throw new HttpException(ERROR_MASSAGES.EMAIL_IS_TAKEN,
                HttpStatus.BAD_REQUEST,
            )
        }

        return this.userRepository.createUser(userDto)
    }


    async getRegisteredUser(userFromDB): Promise<UserType> {
        const user: Optional<UserType> = await this.userRepository.findUserByEmail(userFromDB.email)

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


    async getUserById(id: string): Promise<UserType> {
        const user: Optional<UserType> = await this.userRepository.findUserById(id)
        if (!user) {
            throw new HttpException(
                ERROR_MASSAGES.USER_DOESNT_EXIST,
                HttpStatus.BAD_REQUEST,
            )
        }
        return user
    }

    async getCurrentUser(id: string): Promise<CurrentUserResponse> {
        const user: Optional<UserType> = await this.userRepository.findUserById(id)
        if (!user) {
            throw new HttpException(
                ERROR_MASSAGES.USER_DOESNT_EXIST,
                HttpStatus.BAD_REQUEST,
            )
        }
        return currentUserResponse(user)
    }
}
