import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserRepository } from 'src/user/user.repository';

@Module({
  imports: [
    JwtModule.register({
      secret: 'super-secret-key!!',
      signOptions: {
        expiresIn: '1h'
      }
    }),
    PassportModule,
  ],
  providers: [PrismaService, AuthService, JwtStrategy, UserRepository],
  controllers: [AuthController],
  exports: [AuthService, JwtModule]
})
export class AuthModule {}
