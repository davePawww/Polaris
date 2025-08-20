import {
  Controller,
  Post,
  Req,
  RawBodyRequest,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request } from 'express';
import { WebhooksService } from './webhooks.service';
import { verifyWebhook } from '@clerk/express/webhooks';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('webhooks')
export class WebhooksController {
  constructor(private readonly webhooksService: WebhooksService) {}

  @Public()
  @Post('clerk')
  async handleClerkWebhook(@Req() req: RawBodyRequest<Request>) {
    try {
      const evt = await verifyWebhook(req);

      // Log the webhook details
      const { id } = evt.data;
      const eventType = evt.type;
      console.log(
        `Received webhook with ID ${id} and event type of ${eventType}`,
      );

      return this.webhooksService.handleClerkWebhook(evt);
    } catch (error) {
      if (error.message.includes('Invalid signature'))
        throw new UnauthorizedException('Invalid webhook signature');
      throw new InternalServerErrorException('Error verifying webhook');
    }
  }
}
