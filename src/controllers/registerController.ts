// src/controllers/registerController.ts
import { Controller, Post, Body, HttpStatus, HttpException } from '@nestjs/common';
import { RegisterService } from 'src/service/registerService';

@Controller()
export class RegisterController {
  constructor(private readonly registerService: RegisterService) { }

  @Post("/register")
  async register(@Body() body: any) {
    const { number, email, password } = body;
    if (!number || !email || !password) {
      throw new HttpException('Missing required fields', HttpStatus.BAD_REQUEST);
    }
    // Password validation
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordPattern.test(password)) {
      throw new HttpException('Password must be at least 8 characters with A-Z, a-z, 0-9, and special characters @$!%*#?&', HttpStatus.BAD_REQUEST);
    }

    const emailExists = await this.registerService.existEmail(email);
    const numberExists = await this.registerService.numberExists(number);

    if (emailExists && numberExists) {
      throw new HttpException('Email and mobile number already registered', HttpStatus.CONFLICT);
    } else if (emailExists) {
      throw new HttpException('Email already registered', HttpStatus.CONFLICT);
    } else if (numberExists) {
      throw new HttpException('Mobile number already registered', HttpStatus.CONFLICT);
    } else {
      const isRegistered = await this.registerService.registerSuccess(number, email, password);
      if (isRegistered) {
        throw new HttpException('Registration successful', HttpStatus.CREATED);
      } else {
        throw new HttpException('Registration failed', HttpStatus.UNAUTHORIZED);
      }
    }
  }
}
