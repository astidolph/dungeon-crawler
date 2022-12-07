import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addCardToHand } from '../PlayerSlice';
import styles from './Deck.module.css';
import { selectDeckCards } from './DeckSlice';

interface DeckProps {
}

const Deck: FC<DeckProps> = () => {
  const lootCards = useAppSelector(selectDeckCards);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.Deck} data-testid="Deck" onClick={(_) => {dispatch(addCardToHand(lootCards[lootCards.length - 1]));}}>
      {lootCards.length}
    </div>
  );
};

export default Deck;
