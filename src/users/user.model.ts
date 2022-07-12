import {Base, TimeStamps} from "@typegoose/typegoose/lib/defaultClasses";
import {prop} from "@typegoose/typegoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {timestamp} from "rxjs";


// export interface UserModule extends Base {
// }

//
// export class UserModule extends TimeStamps {
//
//     @prop({unique: true})
//     email: string
//
//     @prop({minlength: 5})
//     password: string
//
//     @prop({default: false})
//     isAdmin?: boolean
// }



export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({
        type: String,
        required: true,
        unique: true
    })
    email: string;

    @Prop({
        type: String,
        required: true,
    })
    password: number;

    @Prop({default: false})
    isAdmin?: boolean

    @Prop({default: Date})
    createAt: Date;


}

export const UserSchema = SchemaFactory.createForClass(User);