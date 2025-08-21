import { WebhookEvent } from '@clerk/express';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export class WebhooksService {
  constructor(private readonly usersService: UsersService) {}

  async handleClerkWebhook(evt: WebhookEvent) {
    switch (evt.type) {
      case 'user.created':
        return await this.usersService.create({
          clerkId: evt.data.id,
        });
      case 'user.deleted':
        return await this.usersService.delete({
          clerkId: evt.data.id,
        });
      default:
        return { success: true, message: 'Webhook received' };
    }
  }
}
