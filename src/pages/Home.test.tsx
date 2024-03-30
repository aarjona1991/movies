import { render, screen } from '@testing-library/react';
import { Home } from '.';

test('Testing Slides in Slider', () => {
  render(<Home />);
  const linkElement = screen.getAllByText('Comprar Ticket');
  expect(linkElement).toBeInTheDocument();
});
