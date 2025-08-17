import { ClerkUser } from '../auth/clerk.service';

declare global {
  namespace Express {
    interface Request {
      user?: ClerkUser;
    }
  }
}
