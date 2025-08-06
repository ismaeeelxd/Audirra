import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UserRepository } from './user.repository';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports:[AuthModule],
  controllers: [UserController],
  providers: [UserService ,UserRepository ,PrismaService]
})
export class UserModule {}
