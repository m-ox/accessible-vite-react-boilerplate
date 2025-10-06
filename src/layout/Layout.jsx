import { Theme } from '@radix-ui/themes';
import { useTheme } from '../context/ThemeContext';
import { ThemeToggle } from '../components/ThemeToggle/ThemeToggle';
import '@radix-ui/themes/styles.css';
import './Layout.scss';

export const Layout = ({ children }) => {
  const { theme } = useTheme();

  return (
    <Theme appearance={theme}>
      <div className={`layout ${theme}`}>
        <header className="layout-header">
          <div className="layout-header__brand">My App</div>
          <div className="layout-header__controls">
            <ThemeToggle />
          </div>
        </header>

        <main className="layout-content">{children}</main>

        <footer className="layout-footer">
          <div>© {new Date().getFullYear()}</div>
        </footer>
      </div>
    </Theme>
  );
};
