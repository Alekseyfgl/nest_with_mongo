import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";



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
    password: string;

    @Prop({default: false})
    isAdmin: boolean

    @Prop({default: Date})
    createAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);