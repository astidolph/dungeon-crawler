import React, { FC } from 'react';
import { useAppSelector } from '../../app/hooks';
import { Card } from '../../models/Card';
import { selectHand } from './HandSlice';

interface HandProps {}

const Hand: FC<HandProps> = () => {
  const hand = useAppSelector(selectHand);

  return (
    <div>
      {hand.map((card: Card) => <span>{card.description}</span>)}
    </div>
  );
};

export default Hand;
