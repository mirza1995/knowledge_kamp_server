import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin: process.env.FE_URL,
    credentials: true,
  });

  await app.listen(3005);
}
bootstrap();
