import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable cookie parser middleware
  app.use(cookieParser());

  app.enableCors({
    origin: ['http://localhost:3001', 'http://localhost:4200'], // Your frontend URLs
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true, // If you need cookies/auth headers
    allowedHeaders: ['Content-Type', 'Authorization'],
  });


  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`Leather Waste API running on port ${port}`);
}
bootstrap();
