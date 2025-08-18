import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    express.raw({
      type: 'application/json',
      limit: '10mb',
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
