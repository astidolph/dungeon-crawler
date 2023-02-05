import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('<MonsterCardComponent />', () => {
  test('it should mount', () => {
    // render(<MonsterCardComponent />);
    
    const monsterCardComponent = screen.getByTestId('MonsterCardComponent');

    expect(monsterCardComponent).toBeInTheDocument();
  });
});