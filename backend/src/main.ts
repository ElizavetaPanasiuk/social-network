import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const start = async () => {
  const port = process.env.POST || 5000;
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder().setTitle('Social network api').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  await app.listen(port);
};

start();
