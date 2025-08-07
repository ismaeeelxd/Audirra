import { Module } from '@nestjs/common';
import { SongService } from './song.service';
import { SongController } from './song.controller';
import { SongRepository } from './song.respository';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [SongController],
  providers: [PrismaService, SongService, SongRepository],
})
export class SongModule {}
