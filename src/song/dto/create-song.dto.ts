import { IsString, IsOptional, IsInt } from 'class-validator';

export class UploadSongDto {
  @IsString()
  title: string;

  @IsString()
  artistId: string;

  @IsString()
  genre: string;

  @IsInt()
  @IsOptional()
  duration?: number; // optional if you want to auto-extract duration from file
}
