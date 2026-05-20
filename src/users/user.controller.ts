import {
  Controller,
  Get,
  Patch,
  Delete,
  HttpCode,
  Body,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from '../auth/dto/register.dto';

//Update profile
export class UpdateProfile extends RegisterDto {}

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  // Get profile
  @Get('me:displayName')
  @HttpCode(200)
  async getProfile() {
    return await this.userService.getProfile();
  }

  @Patch('me')
  @HttpCode(200)
  async UpdateProfile(@Body() updateProfileDto: UpdateProfile) {
    return await this.userService.updateProfile(updateProfileDto);
  }

  @Delete('me/:displayName')
  @HttpCode(200)
  async deleteProfile(@Param('displayName') displayName: string) {
    return await this.userService.deleteProfile(displayName);
  }
}
