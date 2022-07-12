import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {UserSchema} from "../users/user.model";
import {ModelType} from "@typegoose/typegoose/lib/types";

@Injectable()
export class AuthService {

    // constructor(@InjectModel(UserModule) private readonly UserModule: ModelType<UserModule>) {
    // }
    //
    // async register(dto: any) {
    //     // const newUser = new this.UserModule(dto)
    //     // return this.newUser.save()
    // }
}
