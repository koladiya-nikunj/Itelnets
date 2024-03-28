// src/controllers/loginController.ts
import { Controller, Post, Body, HttpStatus, HttpException } from '@nestjs/common';
import { LoginService } from 'src/service/loginService';
import { RegisterService } from 'src/service/registerService';

@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService, private readonly registerService: RegisterService) { }

  @Post("/login")
  async register(@Body() body: any) {
    const { email, password } = body;
    if (!email || !password) {
      throw new HttpException('Missing required fields', HttpStatus.BAD_REQUEST);
    }
     // Password validation
     const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
     if (!passwordPattern.test(password)) {
       throw new HttpException('Password must be at least 8 characters with A-Z, a-z, 0-9, and special characters @$!%*#?&', HttpStatus.BAD_REQUEST);
     }

    const emailExists = await this.registerService.existEmail(email);
    if (!emailExists) {
      throw new HttpException('Email not registered', HttpStatus.NOT_FOUND);
    }

    const passwordMatch = await this.registerService.passwordExists(email, password);
    if (!passwordMatch) {
      throw new HttpException('Email and Password does not match', HttpStatus.UNAUTHORIZED);
    }

    const isLoginSuccessful = await this.loginService.loginSuccess(email, password);
    if (isLoginSuccessful) {
      throw new HttpException('Login successful', HttpStatus.CREATED);
    } else {
      throw new HttpException('Login failed', HttpStatus.UNAUTHORIZED);
    }
  }


  @Post("/resetpassword")
  async resetpassword(@Body() body: any) {
    const { email, password } = body;
    if (!email) {
      return { message: 'Missing required fields' };
    }
    const emailExists = await this.loginService.resetEmailExists(email);
    if (!emailExists) {
      return { message: 'Email not registered' };
    }

    const isLoginSuccessful = await this.loginService.loginSuccess(email, password);
    if (isLoginSuccessful) {
      return { message: 'Password reset link send to your email' };
    } else {
      return { message: 'Password reset failed' };
    }
  }

}
