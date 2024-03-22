// src/services/loginService.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Login } from 'src/models/loginModel';
@Injectable()
export class LoginService {
  constructor(@InjectModel(Login.name) private readonly loginModel: Model<Login>) {}

  async emailExists(email: string): Promise<boolean> {
    const userData = await this.loginModel.findOne({ email });
    return !!userData;
  }

  async login(email: string, password: string): Promise<boolean> {
    const emailExists = await this.emailExists(email);

    if (emailExists) {
      console.log('Login successful');
      return true; // Email already exists, login successful
    }
    try {
      const user = await this.loginModel.create({ email, password });
      console.log({email,password});
      return !!user;
    } catch (error) {
      console.error('Error while creating document:', error);
      return false;
    }
  }
}