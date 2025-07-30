import { IsEmail, IsNotEmpty, IsString } from "class-validator";
export class SignUpDto {
    email: string;
    password: string;
    name?: string;
}