import { Transform } from "class-transformer";
import { IsEmail, IsString } from "class-validator";

export class RegisterDto{
    @IsString()
    @Transform(({value}) => value.trim())
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @Transform(({value}) => value.trim())
    password: string;
}