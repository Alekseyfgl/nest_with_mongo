
import {User, UserDocument, } from "./user.model";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Injectable} from "@nestjs/common";
import {CreateUserDto} from "../auth/dto/createUserDto";


@Injectable()
export class UserRepository {
    constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const createdCat = new this.UserModel(createUserDto);
        // console.log(createUserDto)
        return createdCat.save();
    }


    async findUserByEmail(email: string) {
        return this.UserModel.findOne({ email: email }) // user | null
    }

    async findUserById(id: string) {
        return this.UserModel.findOne({ _id: id }) // user | null
    }
}