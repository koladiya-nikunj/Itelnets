// src/controllers/login.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from 'src/service/loginService';

@Controller() 
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post("/login") 
  async login(@Body('email') email: string, @Body('password') password: string) {
    const isAuthenticated = await this.loginService.login(email, password);

    if (isAuthenticated) {
      return {email,password, message: 'Login successful' };
    } else {
      return { message: 'Login failed' };
    }
  }
}
