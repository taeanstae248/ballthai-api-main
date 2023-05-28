import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;
  const clientOrigin =
    configService.get<string>('CLIENT_ORIGIN') || 'http://localhost:3000';
  app.use(helmet());
  app.enableCors({
    origin: clientOrigin,
    credentials: true,
  });
  await app.listen(port);
}
bootstrap();
