// src/service/registerService.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Register } from 'src/models/registerModel';

@Injectable()
export class RegisterService {
  constructor(@InjectModel(Register.name) private readonly registerModel: Model<Register>) {}

  async emailExists(email: string): Promise<boolean> {
    const user = await this.registerModel.findOne({ email });
    return !!user;
  }

  async numberExists(number: string): Promise<boolean> {
    const user = await this.registerModel.findOne({ number });
    return !!user;
  }

  async register(number: string, email: string, password: string): Promise<boolean> {
    try {
      await this.registerModel.create({ number, email, password });
      return true;
    } catch (error) {
      console.error('Error while creating document:', error);
      return false;
    }
  }
}
