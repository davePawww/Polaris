import Container from './Container';
import Footer from './Footer';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="bg-background min-h-svh">
      <Header />
      <Container>
        <main>{children}</main>
      </Container>
      <Footer />
    </div>
  );
}
