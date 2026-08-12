import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  // Habilita CORS
  app.enableCors();

  // Configuração do Swagger OpenAPI
  const config = new DocumentBuilder()
    .setTitle('Olist Data Labs API')
    .setDescription(
      'API REST do Ecossistema de Inteligência Logística e Preditiva - UNIFEOB 2026',
    )
    .setVersion('1.0.0')
    .addTag('Health')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);

  logger.log(
    `🚀 Sua aplicação NestJS está rodando em: http://localhost:${port}`,
  );
  logger.log(
    `📄 Documentação Swagger acessível em: http://localhost:${port}/docs`,
  );
}

void bootstrap();
