import { WebhookEvent } from '@clerk/express';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { createPrismaErrorHandler } from 'src/common/helpers/prisma-errors.util';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class WebhooksService {
  private readonly handleError = createPrismaErrorHandler('User');
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

  private async handleUserCreated(userId: string): Promise<User> {
    try {
      const newUser = await this.prisma.user.create({
        data: {
          clerkId: userId,
        },
      });

      return newUser;
    } catch (error) {
      return this.handleError(error);
    }
  }

  private async handleUserDeleted(userId: string): Promise<User> {
    try {
      const deletedUser = await this.prisma.user.delete({
        where: { clerkId: userId },
      });

      return deletedUser;
    } catch (error) {
      return this.handleError(error);
    }
  }
}
