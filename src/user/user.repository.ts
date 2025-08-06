import { Injectable, NotFoundException, BadRequestException, ConflictException } from "@nestjs/common";
import { Prisma, User } from "generated/prisma";
import { PrismaService } from "src/prisma.service";
import { validateEmail, sanitizeEmail, PrismaConstants, generateRandomNumber } from "src/common-utils/common-utils";

@Injectable()
export class UserRepository {
    private readonly userModel: Prisma.UserDelegate;

    constructor(private readonly prismaService: PrismaService) {
        this.userModel = this.prismaService.user;
    }

    async findById(id: number): Promise<User> {
        if (id <= 0) {
            throw new BadRequestException('Invalid user ID');
        }

        const user = await this.userModel.findUnique({
            where: { id },
        });

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        if (!validateEmail(email)) {
            throw new BadRequestException('Invalid email format');
        }

        return this.userModel.findUnique({
            where: { email: sanitizeEmail(email) },
        });
    }

    async create(email: string, passwordHash: string, name?: string): Promise<User> {
        if (!validateEmail(email)) {
            throw new BadRequestException('Invalid email format');
        }

        try {
            return await this.userModel.create({
                data: {
                    email: sanitizeEmail(email),
                    passwordHash,
                    name : name ?? `User_${generateRandomNumber()}`,
                },
            });
        } catch (error) {
            if (error.code === PrismaConstants.ALREADY_EXISTS) {
                throw new ConflictException('User with this email already exists');
            }
            throw error;
        }
    }

    async updateEmail(currentEmail: string, newEmail: string): Promise<User> {
        if (!validateEmail(currentEmail)) {
            throw new BadRequestException('Invalid current email format');
        }

        if (!validateEmail(newEmail)) {
            throw new BadRequestException('Invalid new email format');
        }

        if (sanitizeEmail(currentEmail) === sanitizeEmail(newEmail)) {
            throw new BadRequestException('New email must be different from current email');
        }

        try {
            return await this.userModel.update({
                where: { email: sanitizeEmail(currentEmail) },
                data: { email: sanitizeEmail(newEmail) },
            });
        } catch (error) {
            if (error.code === PrismaConstants.NOT_FOUND) {
                throw new NotFoundException('User not found');
            }
            if (error.code === PrismaConstants.ALREADY_EXISTS) {
                throw new ConflictException('Email already exists');
            }
            throw error;
        }
    }

    async updatePassword(email: string, passwordHash: string): Promise<User> {
        if (!validateEmail(email)) {
            throw new BadRequestException('Invalid email format');
        }

        try {
            return await this.userModel.update({
                where: { email: sanitizeEmail(email) },
                data: { passwordHash },
            });
        } catch (error) {
                if (error.code === PrismaConstants.NOT_FOUND) {
                    throw new NotFoundException('User not found');
                }
            throw error;
        }
    }

    async deleteByEmail(email: string): Promise<User> {
        if (!validateEmail(email)) {
            throw new BadRequestException('Invalid email format');
        }

        try {
            return await this.userModel.delete({
                where: { email: sanitizeEmail(email) },
            });
        } catch (error) {
                if (error.code === PrismaConstants.NOT_FOUND) {
                    throw new NotFoundException('User not found');
                }
            throw error;
        }
    }

    async isUserExists(email: string): Promise<boolean> {
        if (!validateEmail(email)) {
            return false;
        }
        const user = await this.findByEmail(email);
        return user !== null;
    }

    async update(id: number, data: Prisma.UserUpdateInput): Promise<User> {
        if (id <= 0) {
            throw new BadRequestException('Invalid user ID');
        }

        try {
            return await this.userModel.update({
                where: { id },
                data,
            });
            
        } catch (error) {
            if (error.code === PrismaConstants.NOT_FOUND) {
                throw new NotFoundException(`User with ID ${id} not found`);
            }
            throw error;
        }
    }
}