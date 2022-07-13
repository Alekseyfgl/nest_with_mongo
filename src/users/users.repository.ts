import { User, UserDocument } from './user.model'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import {  Injectable } from '@nestjs/common'
import { AuthDto } from '../auth/dto/authDto'



@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {
  }

  async createUser(authDto: AuthDto): Promise<User> {
    const createUser = new this.UserModel(authDto)

    return createUser.save()
  }


  async findUserByEmail(email: string) {
    return this.UserModel.findOne({ email: email }) // user | null
  }

  async findUserById(id: string) {
    return this.UserModel.findOne({ _id: id }) // user | null
  }
}