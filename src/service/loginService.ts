// src/services/loginService.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Login } from 'src/models/loginModel';
import * as bcrypt from 'bcrypt';


@Injectable()
export class LoginService {
  constructor(@InjectModel(Login.name) private readonly loginModel: Model<Login>) {}

  async emailExists(email: string): Promise<boolean> {
    const userData = await this.loginModel.findOne({ email });
    return !!userData;
  }

  async loginSuccess(email: string, password: string): Promise<boolean> {
    const emailExists = await this.emailExists(email);

    if (emailExists) {
      console.log('Login successful');
      return true; // Email already exists, login successful
    }
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await this.loginModel.create({ email, password:hashedPassword });
      console.log({email,password,hashedPassword});
      return !!user;
    } catch (error) {
      console.error('Error while creating document:', error);
      return false;
    }
  }

  async resetEmailExists(email: string): Promise<boolean> {
    const userData = await this.loginModel.findOne({ email });
    return !!userData;
  }
}
