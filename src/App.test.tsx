import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders about headline', () => {
  render(<App />);
  const heading = screen.getByText(/Hi! I'm Ryan!/i);
  expect(heading).toBeInTheDocument();
});
