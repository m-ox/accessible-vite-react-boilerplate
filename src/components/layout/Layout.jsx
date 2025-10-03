// src/components/layout/Layout.jsx
import { useTheme } from '../../context/ThemeContext';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import './Layout.scss';

export const Layout = ({ children }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`layout ${theme}`}>
      <header className="layout-header">
        <div className="layout-header__brand">My App</div>
        <div className="layout-header__controls">
          <ThemeToggle />
        </div>
      </header>

      <main className="layout-content">{children}</main>

      <footer className="layout-footer"><div>© {new Date().getFullYear()}</div></footer>
    </div>
  );
};
