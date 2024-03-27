// src/service/registerService.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Register } from 'src/models/registerModel';
import * as bcrypt from 'bcrypt';


@Injectable()
export class RegisterService {
  constructor(@InjectModel(Register.name) private readonly registerModel: Model<Register>) {}

  async existEmail(email: string): Promise<boolean> {
    const user = await this.registerModel.findOne({ email });
    return !!user;
  }

  async numberExists(number: number): Promise<boolean> {
    const user = await this.registerModel.findOne({ number });
    return !!user;
  }
  async passwordExists(email:string,password: string): Promise<boolean> {
    const user = await this.registerModel.findOne({ email });
    const passwordMatch = await bcrypt.compare(password, user.password);
    return !!passwordMatch;
  }

  async register(number: number, email: string, password: string): Promise<boolean> {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await this.registerModel.create({ number, email, password:hashedPassword });
      console.log({number,email,password,hashedPassword});
      return true;
    } catch (error) {
      console.error('Error while creating document:', error);
      return false;
    }
  }
}
