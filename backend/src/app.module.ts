import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
// Services
import { AppService } from './app.service';
import { ClerkService } from './common/auth/clerk.service';
// Modules
import { PrismaModule } from './database/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { WebhooksModule } from './modules/users/webhooks/webhooks.module';
// Guards
import { JwtAuthGuard } from './common/auth/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { GoalsModule } from './modules/goals/goals.module';

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
  ],
})
export class AppModule {}
