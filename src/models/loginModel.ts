// src/models/loginModel.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Login extends Document {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const LoginSchema = SchemaFactory.createForClass(Login); 
