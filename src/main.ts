import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Validación automática de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,              // elimina propiedades que no están en el DTO
      forbidNonWhitelisted: true,  // lanza error si mandan propiedades extra
      transform: true,             // convierte tipos automáticamente (ej: "10" → 10)
    }),
  );

  //Swagger para probar endpoints en el navegador
  const config = new DocumentBuilder()
    .setTitle('Dinetik API')
    .setDescription('Documentación del API que proporciona los servicios de la app Dinetik')
    .setVersion('1.0')
    .addBearerAuth() // Para poder meter tokens en rutas protegidas
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-dinetik', app, document); // Se monta en http://localhost:3000/api-dinetik

  await app.listen(3000);
}
bootstrap();
