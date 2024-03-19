// src/controllers/login.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from 'src/service/loginService';
import { RegisterService } from 'src/service/registerService';

@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService, private readonly registerService: RegisterService) { }

  @Post("/login")
  async register(@Body() body: any) {
    const { email, password } = body;
    if (!email || !password) {
      return { message: 'Missing required fields' };
    }
    const emailExists = await this.registerService.emailExists(email);
    if (!emailExists) {
      return { message: 'Email not registered' };
    }

    const passwordMatch = await this.registerService.passwordExists(email, password);
    if (!passwordMatch) {
      return { message: 'Password does not match with the email' };
    }

    const isLoginSuccessful = await this.loginService.login(email, password);
    if (isLoginSuccessful) {
      return { message: 'Login successful' };
    } else {
      return { message: 'Login failed' };
    }
  }
  
}
