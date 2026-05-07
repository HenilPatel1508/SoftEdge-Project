import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerUser.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService:AuthService){
    }

    @Post('register')
    async register(@Body() resgisterUserDto:RegisterDto){
        const token =await this.authService.registerUser(resgisterUserDto)
        return token;
    }
}