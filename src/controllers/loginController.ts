// src/controllers/login.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from 'src/service/loginService';

@Controller() 
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

 
  @Post("/login") 
  async register(@Body() body: any) { 
    const { email, password } = body; 
    if (!email || !password) { 
      return { message: 'Missing required fields' };
    }

    const emailExists = await this.loginService.emailExists(email);
    const numberExists = await this.loginService.numberExists(password);

    if (emailExists && numberExists) {
      return { message: 'Email and mobile number already registered' };
    } else if (emailExists) {
      return { message: 'Email already registered' };
    } else if (numberExists) {
      return { message: 'Mobile number already registered' };
    } else {
      const isRegistered = await this.loginService.register( email, password);
      if (isRegistered) {
        
        return { message: 'Registration successful' };
      } else {
        return { message: 'Registration failed' };
      }
    }
  }
}
