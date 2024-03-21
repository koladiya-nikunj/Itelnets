//  src/models/authModel.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Auth extends Document {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  image: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
