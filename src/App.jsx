import { useTheme } from './context/ThemeContext';
import { Layout } from './components/layout/Layout';
import Home from './pages/Home/Home';
import './styles/main.scss';

function App() {
  const { theme } = useTheme();

  return (
    <Layout>
      <Home />
    </Layout>
  );
}

export default App;
