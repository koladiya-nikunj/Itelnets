import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import mongoose from 'mongoose';

// mongoose.connect('mongodb://localhost:27017/itelnets')
// .then(()=>{console.log('mongo connected')})
// .catch(err => console.error('MongoDB connection error:', err))

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
