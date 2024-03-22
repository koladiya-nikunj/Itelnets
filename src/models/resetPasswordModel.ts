// src/models/resetPasswordModel.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ResetPassword extends Document {

    @Prop({ required: true })
    email: string;

}

export const RegisterSchema = SchemaFactory.createForClass(ResetPassword); 