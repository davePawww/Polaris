import { Module } from '@nestjs/common';
import { WebhooksController } from './webhooks.controller';
import { WebhooksService } from './webhooks.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports: [ConfigModule, PrismaModule],
  controllers: [WebhooksController],
  providers: [WebhooksService],
})
export class WebhooksModule {}
