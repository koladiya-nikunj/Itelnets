import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RegisterController } from 'src/controllers/registerController';
import { RegisterService } from 'src/service/registerService';
import { Register, RegisterSchema } from 'src/models/registerModel';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Register.name, schema: RegisterSchema }]),
  ],
  controllers: [RegisterController],
  providers: [RegisterService,],
  exports:[RegisterModule]
})
export class RegisterModule {}
