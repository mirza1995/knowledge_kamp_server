import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin: process.env.FE_URL,
    credentials: true,
  });

  await app.listen(3005);
}
bootstrap();
