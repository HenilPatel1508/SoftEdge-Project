import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterDto } from 'src/auth/dto/registerUser.dto';
import { User } from './Schemas/user.Schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
     constructor(@InjectModel(User.name) private UserModel: Model<User>) {}
    async createUser(registerUserDto : RegisterDto){
        return await this.UserModel.create({
            fname:registerUserDto.fname,
            lname:registerUserDto.lname,
            email:registerUserDto.email,
            password:registerUserDto.password,
        })
        
    }
}
