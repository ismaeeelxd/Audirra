import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';
import { SongModule } from './song/song.module';

@Module({
  imports: [AuthModule, UserModule, SongModule],
  providers: [PrismaService],
})
export class AppModule {}
