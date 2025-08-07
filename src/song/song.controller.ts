import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { SongService } from './song.service';
import { UploadSongDto } from './dto/create-song.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { uploadOptions } from 'src/configs/multer-config';
import { print } from 'src/common-utils/common-utils';

@Controller('song')
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', uploadOptions))
  create(@UploadedFile() file: Express.Multer.File) {
    print("File received:", file);
  }

  // @Get()
  // findAll() {
  //   return this.songService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.songService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSongDto: UpdateSongDto) {
  //   return this.songService.update(+id, updateSongDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.songService.remove(+id);
  // }
}
