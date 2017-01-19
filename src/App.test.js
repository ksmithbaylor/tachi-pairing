import React from 'react';
import { render } from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<App />, div);
});

it('is awesome', () => {
  expect(true).toBe(true);
});
