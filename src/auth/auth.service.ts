import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { SignUpDto } from './dtos/sign-up.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private prismaService: PrismaService) {}
    async signUp(signUpDto: SignUpDto) {
        const { email, password, name } = signUpDto;

        const user = await this.prismaService.user.findUnique({
            where: {
                email
            }
        });

        if (user) {
            throw new ForbiddenException('Email already exists');
        }

        const hash = await bcrypt.hash(password, 10);

        await this.prismaService.user.create({
            data: {
                email,
                passwordHash: hash,
                name: name ?? 'placeholder'
            }
        });

        return { message: "User created successfully" };
    }

}
