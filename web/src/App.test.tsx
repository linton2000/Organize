import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('Hello world test case', () => {
  render(<App />);
  //expect(screen.getByText("Hello World")).toBeInTheDocument;
});
