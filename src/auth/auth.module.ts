import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserRepository } from 'src/user/user.repository';
import { appConfig } from 'src/configs/app-config';

@Module({
  imports: [
    JwtModule.register({
      secret: appConfig['jwtSecret'],
      signOptions: {
        expiresIn: appConfig['jwtExpiry']
      }
    }),
    PassportModule,
  ],
  providers: [PrismaService, AuthService, JwtStrategy, UserRepository],
  controllers: [AuthController],
  exports: [AuthService, JwtModule]
})
export class AuthModule {}
