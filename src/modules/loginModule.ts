// src/modules/loginModule.ts
import { Module } from '@nestjs/common';
import { LoginController } from 'src/controllers/loginController';
import { Login, LoginSchema } from 'src/models/loginModel';
import { LoginService } from 'src/service/loginService';
import { MongooseModule } from '@nestjs/mongoose';
import { Register, RegisterSchema } from 'src/models/registerModel';
import { RegisterService } from 'src/service/registerService';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Login.name, schema: LoginSchema }, { name: Register.name, schema: RegisterSchema }]),
  ],
  controllers: [LoginController],
  providers: [LoginService, RegisterService],
  exports: [LoginModule]
})
export class LoginModule { }
