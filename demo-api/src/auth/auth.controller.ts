import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerUser.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService:AuthService){
    }

    @Post('register')
    register(@Body() resgisterUserDto:RegisterDto){

        const result = this.authService.registerUser(resgisterUserDto)
        return result;
    }
}
