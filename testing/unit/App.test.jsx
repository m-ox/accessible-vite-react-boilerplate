import { render, screen } from '@testing-library/react';
import App from './App';

test('renders greeting', () => {
  render(<App />);
  expect(screen.getByText(/Hello Vite \+ React/i)).toBeInTheDocument();
});
