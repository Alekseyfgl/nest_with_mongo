import { IsEmail, Length } from 'class-validator'

export class AuthDto {

    @IsEmail()
    readonly email: string;

    @Length(5, 30)
    readonly password: string;
}