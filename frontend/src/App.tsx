import Layout from './components/layout/Layout';
import { Button } from './components/ui/button';

function App() {
  return (
    <Layout>
      <div className="flex min-h-svh flex-col items-center justify-center">
        <Button className="polaris-shadow-sm m-4">Click me</Button>
        <Button className="polaris-shadow-md m-4">Click me</Button>
        <Button className="polaris-shadow-lg m-4">Click me</Button>
      </div>
    </Layout>
  );
}

export default App;
