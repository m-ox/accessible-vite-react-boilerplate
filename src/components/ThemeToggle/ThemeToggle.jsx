import { useTheme } from '../../context/ThemeContext';
import './ThemeToggle.scss';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-pressed={theme === 'dark'}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      <span className="theme-toggle__icon" aria-hidden="true">
        {theme === 'light' ? '🌙' : '☀️'}
      </span>
    </button>
  );
};
