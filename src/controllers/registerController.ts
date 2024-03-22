// src/controllers/registerController.ts
import { Controller, Post, Body } from '@nestjs/common';
import { RegisterService } from 'src/service/registerService';

@Controller() 
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post("/register") 
  async register(@Body() body: any) { 
    const { number, email, password } = body; 
    if (!number || !email || !password) { 
      return { message: 'Missing required fields' };
    }

    const emailExists = await this.registerService.emailExists(email);
    const numberExists = await this.registerService.numberExists(number);

    if (emailExists && numberExists) {
      return { message: 'Email and mobile number already registered' };
    } else if (emailExists) {
      return { message: 'Email already registered' };
    } else if (numberExists) {
      return { message: 'Mobile number already registered' };
    } else {
      const isRegistered = await this.registerService.register(number, email, password);
      if (isRegistered) {
        
        return { message: 'Registration successful' };
      } else {
        return { message: 'Registration failed' };
      }
    }
  }
}
