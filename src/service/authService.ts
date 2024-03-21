// src/service/authService.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth } from 'src/models/authModel';

@Injectable()
export class AuthService {
  constructor(@InjectModel(Auth.name) private readonly authModel: Model<Auth>) {}
    
  async saveUser(name: string,email:string,image:string): Promise<boolean> {
    const existingUser = await this.authModel.findOne({ email });

    if (existingUser) {
      return false;
    }

    const authUser = await this.authModel.create({name,email,image})
    
    return !!authUser
  }
}
