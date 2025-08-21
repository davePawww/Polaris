import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
// Services
import { AppService } from './app.service';
import { ClerkService } from './common/auth/clerk.service';
// Modules
import { PrismaModule } from './database/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { WebhooksModule } from './modules/users/webhooks/webhooks.module';
import { GoalsModule } from './modules/goals/goals.module';
// Guards
import { JwtAuthGuard } from './common/auth/jwt-auth.guard';
// Filters
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
// Middleware
import { LoggingMiddleware } from './common/middleware/logging.middleware';
// Zod
import { ZodSerializerInterceptor, ZodValidationPipe } from 'nestjs-zod';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    WebhooksModule,
    UsersModule,
    GoalsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ClerkService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ZodSerializerInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
