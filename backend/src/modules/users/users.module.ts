import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { WebhooksService } from './webhooks/webhooks.service';
import { WebhooksModule } from './webhooks/webhooks.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, WebhooksService],
  imports: [WebhooksModule],
})
export class UsersModule {}
