// src/controllers/authController.ts
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/service/authService';

@Controller('')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post("/api/auth/callback/google")
    async authLogin(@Body() data: any) {
        const { name, email, image } = data;
        await this.authService.saveUser(name, email, image)

        console.log('Received data from frontend:', data);
        return 'Data received successfully';
    }
}
