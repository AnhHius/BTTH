import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import * as express from 'express';
import * as path from 'path';

/*async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.use(cookieParser());

  app.use(
    session({
      secret: process.env.SESSION_SECRET ?? 'change_this_secret',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 1000 * 60 * 60 },
    }),
  );

  // Serve static files (frontend)
  app.use(express.static(path.join(__dirname, '..'), {
    index: 'index.html',
    extensions: ['html', 'css', 'js', 'json', 'txt'],
  }));

  await app.listen(3000);
}
bootstrap();
*/

//sau nhớ đăng xuất git
