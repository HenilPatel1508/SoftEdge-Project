import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterDto } from 'src/auth/dto/registerUser.dto';
import { User } from './Schemas/user.Schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}
  async createUser(registerUserDto: RegisterDto) {
    try {
      return await this.UserModel.create({
        fname: registerUserDto.fname,
        lname: registerUserDto.lname,
        email: registerUserDto.email,
        password: registerUserDto.password,
      });
    } catch (err:unknown) {
      console.log(err);
      const e = err as{code?:number}
      const DUPLICATE_KEY_CODE = 11000;
      if(e.code === DUPLICATE_KEY_CODE){
        throw new ConflictException("User With This Email Already Exists")
      }
      throw err;
    }
  }
  async findByEmail(email: string) {
    return await this.UserModel.findOne({ email });
  }
  async getUserById(id:string){
    return await this.UserModel.findOne({_id :id})
  }
}
