import React, { FC } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { Card } from '../../models/Card';
import { drawCard } from '../Deck/DeckSlice';
import styles from './Deck.module.css';

interface DeckProps {
  cards: Card[];
  title: string;
}

const Deck: FC<DeckProps> = (props) => {
  const dispatch = useAppDispatch();
  return (
    <div className={styles.Deck} data-testid="Deck" onClick={(_) => {
        dispatch(
          drawCard(props.cards[props.cards.length - 1])
        )
      }}>
      <p>{props.title}</p>
      {props.cards.length}
    </div>
  );
};

export default Deck;
