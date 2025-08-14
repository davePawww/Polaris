import { Outlet } from 'react-router';

export default function AuthLayout() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center">
      <div className="polaris-container">
        <Outlet />
      </div>
    </main>
  );
}
