import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'generated/prisma';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@Request() req): Promise<String | null> {
    return await this.userService.getProfile(req.user.id);
  }

  @Post('update')
  @UseGuards(AuthGuard('jwt'))
  async updateProfile(@Request() req, @Body() body : { name?: string, email?: string }): Promise<User> {
    const { name, email } = body;
    return await this.userService.updateProfile(req.user.id, name, email);
  }
}
