import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/clerk-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-black text-white">
      <div className="polaris-container flex items-center justify-between">
        <h1>Header</h1>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}
