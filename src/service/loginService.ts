// src/services/login.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Login } from 'src/models/loginModel';
@Injectable()
export class LoginService {
  constructor(@InjectModel(Login.name) private readonly loginModel: Model<Login>) {}

  async login(email: string, password: string): Promise<any> {
    try {
      await this.loginModel.create({ email, password });

      return true;
    } catch (error) {
      console.error('Error while creating document:', error);
      return false;
    }
  }
}
