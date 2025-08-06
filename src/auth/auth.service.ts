import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { SignUpDto } from './dtos/sign-up.dto';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { comparePassword, hashPassword } from 'src/common-utils/common-utils';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private readonly userRepository: UserRepository
    ) { }

    async signUp(signUpDto: SignUpDto) {
        const { email, password, name } = signUpDto;

        const hashedPassword = await hashPassword(password);
        await this.userRepository.create(email, hashedPassword, name);
        return { message: "User created successfully" };
    }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        const user = await this.userRepository.findByEmail(email);
        if (!user) throw new ForbiddenException('Invalid credentials');

        const passwordHash = user.passwordHash;
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
