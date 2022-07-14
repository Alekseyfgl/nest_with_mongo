
import {User, UserDocument, } from "./user.model";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Injectable} from "@nestjs/common";
import {CreateUserDto} from "../auth/dto/createUserDto";
import {UserType} from "./interfaces/users.interfaces";
import {PromiseOptional} from "../optional/optional.interface";


@Injectable()
export class UserRepository {
    constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

    async createUser(createUserDto: CreateUserDto): Promise<User> {
       return new this.UserModel(createUserDto).save();
    }


    async findUserByEmail(email: string) : PromiseOptional<UserType> {
        return this.UserModel.findOne({ email: email })
    }

    async findUserById(id: string) : PromiseOptional<UserType> {
        return this.UserModel.findOne({ _id: id })
    }
}