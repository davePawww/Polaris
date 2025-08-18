import { WebhookEvent } from '@clerk/express';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class WebhooksService {
  constructor(private readonly prisma: PrismaService) {}

  async handleClerkWebhook(evt: WebhookEvent) {
    switch (evt.type) {
      case 'user.created':
        return this.handleUserCreated(evt.data.id!);
      case 'user.deleted':
        return this.handleUserDeleted(evt.data.id!);
      default:
        console.log(`Unhandled webhook type: ${evt.type}`);
        return { success: true, message: 'Webhook received' };
    }
  }

  private async handleUserCreated(userId: string) {
    const newUser = await this.prisma.user.create({
      data: {
        clerkId: userId,
      },
    });

    return { success: true, message: 'User created', data: newUser };
  }

  private async handleUserDeleted(userId: string) {
    await this.prisma.user.deleteMany({
      where: { clerkId: userId },
    });

    return { success: true, message: 'User deleted' };
  }
}
