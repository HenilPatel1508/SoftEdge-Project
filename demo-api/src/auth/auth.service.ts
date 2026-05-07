import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/registerUser.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

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

    const payload = {sub:User._id}
    const token = this.jwtService.signAsync(payload);
    console.log('token :', token)
    return token;
  }
}
