import {UsersModule} from "./users.module";
import {User, UserDocument, UserSchema} from "./user.model";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Injectable} from "@nestjs/common";
import {CreateUserDto} from "../auth/dto/createUserDto";


@Injectable()
export class UserRepository {
    constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

    async createUser(createCatDto: CreateUserDto): Promise<User> {
        const createdCat = new this.UserModel(createCatDto);
        console.log(createdCat)
        return createdCat.save();
    }
}