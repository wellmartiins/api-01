import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors() //habilitar o Cors na API

  app.useGlobalPipes(new ValidationPipe()); //para validar globalmente qualquer rota pelo DTO

  await app.listen(3001);
}
bootstrap();