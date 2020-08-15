import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders loading indicator', () => {
  const { getByText } = render(<App />);
  const loading = getByText('App loading...');
  expect(loading).toBeInTheDocument();
});
