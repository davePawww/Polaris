import { Injectable } from '@nestjs/common';
import { verifyToken } from '@clerk/express';
import { ConfigService } from '@nestjs/config';

export interface ClerkUser {
  id: string;
}

@Injectable()
export class ClerkService {
  constructor(private readonly configService: ConfigService) {}

  async verifyToken(token: string): Promise<ClerkUser> {
    try {
      const payload = await verifyToken(token, {
        secretKey: this.configService.get('CLERK_SECRET_KEY'),
      });
      return {
        id: payload.sub,
      };
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
