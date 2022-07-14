import {IsEmail, Length} from "class-validator";

export class CreateUserDto {

    @IsEmail()
    readonly email: string;

    @Length(3, 40)
    readonly password: string;
}