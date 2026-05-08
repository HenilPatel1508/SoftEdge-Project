import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/registerUser.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/loginUser.dto';

@Injectable()
export class AuthService {
  //Logic for user registeration

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async registerUser(resgisterUserDto: RegisterDto) {
    console.log('register Dto :', resgisterUserDto);

    const saltRounds = 10;
    const hash = await bcrypt.hash(resgisterUserDto.password, saltRounds);

    const User = await this.userService.createUser({
      ...resgisterUserDto,
      password: hash,
    });

    const payload = { sub: User._id };
    const token = await this.jwtService.signAsync(payload);
    console.log('token :', token);
    return { access_token: token };
  }

 async loginUser(loginDto: LoginDto) {
  const user = await this.userService.findByEmail(loginDto.email);

  if (!user) {
    throw new UnauthorizedException('Invalid Email or Password');
  }

  const isPasswordMatched = await bcrypt.compare(
    loginDto.password,
    user.password,
  );

  if (!isPasswordMatched) {
    throw new UnauthorizedException('Invalid Email or Password');
  }

  const payload = { sub: user._id };

  const token = await this.jwtService.signAsync(payload);

  const response = {"message": "Login Success ", "user": user, "access_token": token };

  console.log('LOGIN USER:', user.email);
  console.log('TOKEN GENERATED:', token);

  return response;
}
}
