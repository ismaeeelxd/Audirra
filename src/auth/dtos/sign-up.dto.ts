import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
export class SignUpDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;
    @IsString()
    @IsOptional()
    name?: string;
}