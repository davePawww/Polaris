import Container from './Container';
import Footer from './Footer';
import Header from './Header';
import { Outlet } from 'react-router';

export default function Layout() {
  return (
    <div className="bg-background min-h-svh">
      <Header />
      <Container>
        <main className="flex min-h-svh flex-col items-center justify-center">
          <Outlet />
        </main>
      </Container>
      <Footer />
    </div>
  );
}
