import { Module } from '@nestjs/common';
import { LoginController } from 'src/controllers/loginController';
import { Login,LoginSchema } from 'src/models/loginModel';
import { LoginService } from 'src/service/loginService';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Login.name, schema: LoginSchema }]),
  ],
  controllers: [LoginController],
  providers: [LoginService,],
  exports:[LoginModule]
})
export class LoginModule {}
