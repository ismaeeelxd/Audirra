import { Injectable } from "@nestjs/common";
import { Prisma, Song } from "generated/prisma";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class SongRepository {
    private readonly songModel: Prisma.SongDelegate;

    constructor(private readonly prismaService: PrismaService) {
        this.songModel = this.prismaService.song;
    }

    async create(song : Song){

    }



}