import { Module } from '@nestjs/common';
import { WebhooksController } from './webhooks.controller';
import { WebhooksService } from './webhooks.service';
import { UsersModule } from '../users.module';

@Module({
  controllers: [WebhooksController],
  providers: [WebhooksService],
  imports: [UsersModule],
})
export class WebhooksModule {}
