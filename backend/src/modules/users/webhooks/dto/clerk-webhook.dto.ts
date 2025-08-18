export class ClerkWebhookDto {
  type: string;
  data: ClerkUserData;
  object: string;
}

export class ClerkUserData {
  id: string;
  email_addresses?: ClerkEmailAddress[];
  first_name?: string;
  last_name?: string;
  created_at: number;
  updated_at: number;
}

export class ClerkEmailAddress {
  id: string;
  email_address: string;
  verification: {
    status: string;
    strategy: string;
  };
}
