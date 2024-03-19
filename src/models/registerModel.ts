// src/models/login.model.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Register extends Document {
    @Prop({ required: true })
    number: number;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;
}

export const RegisterSchema = SchemaFactory.createForClass(Register); 