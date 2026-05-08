import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerUser.dto';
import { LoginDto } from './dto/loginUser.dto';
import { AuthGuard } from './auth.guard';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly userService:UserService
  ) {}

  @Post('register')
  async register(@Body() resgisterUserDto: RegisterDto) {
    const token = await this.authService.registerUser(resgisterUserDto);
    return token;
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const result = await this.authService.loginUser(loginDto);
    console.log('LOGIN SUCCESS:', result);
    return result;
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request()req) {
    const userId = req.user.sub;

    const user = await this.userService.getUserById(userId)

    console.log(user);
    
    return user;
  }
}
