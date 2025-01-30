import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as crypto from 'crypto';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  if (!global.crypto) {
    global.crypto = {
      subtle: crypto.webcrypto.subtle,
      getRandomValues: (buffer: Uint8Array) => crypto.randomFillSync(buffer),
    } as Crypto;
  }

  const config = new DocumentBuilder()
    .setTitle('Finance Service Api')
    .setDescription('Documentação da API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.setGlobalPrefix('v1');

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`🚀 Server is running at http://localhost:${port}`);
  console.log(`📚 Swagger docs available at http://localhost:${port}/api/docs`);
}

bootstrap();
