// src/services/login.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Login } from 'src/models/loginModel';
@Injectable()
export class LoginService {
  constructor(@InjectModel(Login.name) private readonly loginModel: Model<Login>) {}

  async emailExists(email: string): Promise<boolean> {
    const user = await this.loginModel.findOne({ email });
    return !!user;
  }

  async numberExists(email: string): Promise<boolean> {
    const user = await this.loginModel.findOne({ email });
    return !!user;
  }

  async register(email: string, password: string): Promise<boolean> {
    try {
      await this.loginModel.create({ email, password });
      return true;
    } catch (error) {
      console.error('Error while creating document:', error);
      return false;
    }
  }
}
