import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Card } from '../../models/Card';
import { addCard } from '../Hand/HandSlice';
import styles from './Deck.module.css';
import { draw, selectDeckCards } from './DeckSlice';

interface DeckProps {
}

const Deck: FC<DeckProps> = () => {
  const lootCards = useAppSelector(selectDeckCards);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.Deck} data-testid="Deck" onClick={(_) => {dispatch(draw()); dispatch(addCard(lootCards[lootCards.length - 1]));}}>
      {lootCards.map((loot: Card) => <span>{loot.description}</span>)}
    </div>
  );
};

export default Deck;
