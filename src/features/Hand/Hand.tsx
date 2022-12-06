import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Card } from '../../models/Card';
import { playCard, selectHand } from './HandSlice';
import styles from './Hand.module.css';

interface HandProps {}

const Hand: FC<HandProps> = () => {
  const hand = useAppSelector(selectHand);
  const dispatch = useAppDispatch();
  
  return (
    <div className={styles.Hand}>
      {hand.map((card: Card) => <div className={styles.Card} onClick={() => dispatch(playCard(card))}>{card.name}</div>)}
    </div>
  );
};

export default Hand;
