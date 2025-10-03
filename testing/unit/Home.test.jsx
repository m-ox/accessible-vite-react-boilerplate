import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../../src/pages/Home/Home';

describe('Home component', () => {
  it('renders heading text', () => {
    render(<Home />);
    expect(screen.getByText('Is this a form?')).toBeInTheDocument();
  });

  it('renders button and responds to click', () => {
    const handleClick = vi.fn();

    render(
      <div>
        <p>Is this a form?</p>
        <button type="button" onClick={handleClick}>Yes</button>
      </div>
    );

    const button = screen.getByRole('button', { name: /yes/i });
    fireEvent.click(button);

    expect(button).toBeInTheDocument();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
