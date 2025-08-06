import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { SignUpDto } from './dtos/sign-up.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { comparePassword, hashPassword } from 'src/common-utils/common-utils';

@Injectable()
export class AuthService {
    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService
    ) { }
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

        const hashedPassword = await hashPassword(password);

        await this.prismaService.user.create({
            data: {
                email,
                passwordHash: hashedPassword,
                name: name ?? 'placeholder'
            }
        });

        return { message: "User created successfully" };
    }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        const user = await this.prismaService.user.findUnique({
            where: {
                email
            }
        });

        if (!user) throw new ForbiddenException('Invalid credentials');
        const { passwordHash } = user;
        const isSamePassword = await comparePassword(password,passwordHash);
        if (!isSamePassword) {
            throw new ForbiddenException('Invalid credentials');
        }

        const jwtToken = await this.jwtService.signAsync({
            sub: user.id
        });

        return { access_token: jwtToken };
    }

}
