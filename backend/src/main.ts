import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as cookieParser from 'cookie-parser'; // ✅ Required for cookie-based auth

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // ✅ Enable cookie parsing middleware
  app.use(cookieParser());

  // ✅ CORS config for frontend communication
  app.enableCors({
    origin: 'http://localhost:5173', // React frontend
    credentials: true,              // Required for cookies
  });

  // ✅ Serve uploaded images (if you're using file upload)
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  await app.listen(3000);
}
bootstrap();
