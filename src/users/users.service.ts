import { Injectable } from '@nestjs/common';
import {CreateUserDto} from "../auth/dto/createUserDto";
import {UserRepository} from "./users.repository";

@Injectable()
export class UsersService {
    constructor(
        // @InjectModel(User.name) private UserModel: Model<UserDocument>
        private readonly userRepository: UserRepository,
    ) {



    }

    async createUser(createCatDto: CreateUserDto) {
        return this.userRepository.createUser(createCatDto)
    }
}
