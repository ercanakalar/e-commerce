import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Auth } from './auth/entities/auth.entity';
import { IAuthPayload } from './auth/interface/auth.interface';

declare module 'express' {
  interface Request {
    user: Auth; // Assuming 'user' contains the current user information
    currentAuth: IAuthPayload; // Define your custom method signature here
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(4000);
}
bootstrap();
