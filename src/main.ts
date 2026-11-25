import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('API Cine')
    .setDescription('Sistema de gestión de cine: salas, películas, funciones y boletos')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  // Documentación Scalar en http://localhost:3000/reference
  app.use('/reference', apiReference({ content: document }));

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
