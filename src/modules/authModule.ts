// src/modules/authModule.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from 'src/controllers/authController';
import { AuthService } from 'src/service/authService';
import { Auth, AuthSchema } from '../models/authModel';

@Module({
  imports: [ MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
