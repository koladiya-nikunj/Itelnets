import { MiddlewareConsumer, Module, OnModuleInit, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './modules/loginModule';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import * as cors from 'cors';
import { RegisterModule } from './modules/registerModule';
import { AuthModule } from './modules/authModule';

@Module({
  imports: [
    LoginModule,RegisterModule,AuthModule,
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: 'mongodb://localhost:27017/itelnets',
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor() {}

  async onModuleInit() {
    try {
      await mongoose.connect('mongodb://localhost:27017/itelnets', {
     
      });
      console.log('Mongo connected');
    } catch (err) {
      console.error('MongoDB connection error:', err);
    }
  }

 // Received request from forntend
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(cors({
      origin: 'http://localhost:3000', // Allow requests from this origin
      methods: ['GET', 'POST'], // Allow only these HTTP methods
      allowedHeaders: ['Content-Type', 'Authorization'], // Allow only these headers
      credentials: true, // Allow credentials (like cookies) to be included in the request
    }))
      .forRoutes({ path: '*', method: RequestMethod.ALL }); // Enable CORS for all routes and methods
  }

}
