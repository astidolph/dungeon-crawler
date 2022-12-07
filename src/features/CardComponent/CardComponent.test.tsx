import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CardComponent from './CardComponent';

describe('<CardComponent />', () => {
  test('it should mount', () => {
    // render(<CardComponent />);
    
    const cardComponent = screen.getByTestId('CardComponent');

    expect(cardComponent).toBeInTheDocument();
  });
});