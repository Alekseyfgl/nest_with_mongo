import {Injectable} from '@nestjs/common'
import {UsersService} from '../users/users.service'
import {sign} from 'jsonwebtoken'
import {CreateUserDto} from './dto/createUserDto'
import {hash} from 'bcrypt'
import {userForResponse} from './auth.mapper'
import {TokensInterface, UserIdInterface} from "./interfaces/auth.interfaces";
import {User} from "../users/user.model";
import {UserResponse, UserType} from "../users/interfaces/users.interfaces";
import {EXPIRE_TOKENS} from "../constans/constans";

@Injectable()
export class AuthService {

    constructor(private readonly userService: UsersService) {
    }

    async login(createUserDto: CreateUserDto): Promise<UserResponse> {
        const user: UserType = await this.userService.getRegisteredUser(createUserDto)
        return AuthService.buildUserResponseWithToken(user)
    }

    async createUser(createUserDto: CreateUserDto): Promise<UserResponse> {

        const hashPassword: string = await hash(createUserDto.password, 10)

        const newUser: CreateUserDto = {
            email: createUserDto.email,
            password: hashPassword,
        }
        const user: User  = await this.userService.createUser(newUser)

        return AuthService.buildUserResponseWithToken(user)
    }


    private static generateJwt(userId: string): TokensInterface {
        const data: UserIdInterface = {_id: userId}
        const refreshToken: string = sign(data, process.env.JWT_SECRET, {expiresIn: EXPIRE_TOKENS.refreshToken})
        const accessToken: string = sign(data, process.env.JWT_SECRET, {expiresIn: EXPIRE_TOKENS.accessToken})
        return {refreshToken, accessToken: accessToken}
    }


    private static buildUserResponseWithToken(user): UserResponse {
        const tokens: TokensInterface = AuthService.generateJwt(String(user._id))
        return userForResponse(user, tokens)
    }
}




