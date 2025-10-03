import React, { useEffect } from 'react';
import * as ReactDOM from 'react-dom/client';
import { useTheme } from './context/ThemeContext';
import { Layout } from './components/layout/Layout';
import Home from './pages/Home/Home';
import './styles/main.scss';

function App() {
  const { theme } = useTheme();

  useEffect(() => {
    if (import.meta.env.DEV && typeof window !== 'undefined') {
      import('@axe-core/react').then(({ default: axe }) => {
        axe(React, ReactDOM, 1000);
      });
    }
  }, []);

  return (
    <Layout>
      <Home />
    </Layout>
  );
}

export default App;
