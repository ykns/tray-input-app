import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const tabs = screen.getAllByRole('tab');
  expect(tabs.length).toBe(3);
});
