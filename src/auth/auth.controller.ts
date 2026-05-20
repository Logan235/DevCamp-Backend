import {
  Controller,
  Post,
  Body,
  HttpCode,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthGuard } from './guards/local.guard';
import { UserDocument } from '../users/schema/user.schema';

// Register controller with traditional email/password login
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(200)
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }

  // Login
  @Post('login')
  @HttpCode(200)
  @UseGuards(LocalAuthGuard) // This guard will use the LocalStrategy to authenticate the user
  async login(@Request() req: { user: UserDocument }) {
    // req.user is automatically populated by LocalAuthGuard (LocalStrategy)
    return {
      message: 'Login successfully',
      user: req.user,
      ...(await this.authService.login(req.user)),
    };
  }
}
