import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Rating from './Rating';

describe('<Rating />', () => {
  test('it should mount', () => {
    render(<Rating />);

    const rating = screen.getByTestId('Rating');

    expect(rating).toBeInTheDocument();
  });
});