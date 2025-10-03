import { render, screen } from '@testing-library/react';
import App from '../../src/App';

vi.mock('../../src/context/ThemeContext', () => ({
  useTheme: () => ({
    theme: 'light',
    toggleTheme: vi.fn(),
  }),
}));

vi.mock('@axe-core/react', () => ({
  default: vi.fn(),
}));

describe('App', () => {
  it('renders layout and home content', () => {
    render(<App />);
    expect(screen.getByText('Is this a form?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /yes/i })).toBeInTheDocument();
  });
});
