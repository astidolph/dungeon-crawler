import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Card } from '../../models/Card';
import CardComponent from '../CardComponent/CardComponent';
import { drawLootCard, selectLootDeckDiscardPile } from './LootDeckSlice';
import styles from './LootDeck.module.css';

interface LootDeckProps {
  title: string;
  cards: Card[];
}

const LootDeck: FC<LootDeckProps> = (props) => {
  const dispatch = useAppDispatch();
  const discardPile = useAppSelector(selectLootDeckDiscardPile);
  return (
      <div className={styles.DeckContainer}>
        <div className={styles.Deck} data-testid="Deck" onClick={(_) => {
          dispatch(drawLootCard())
        }}>
          <p>{props.title}</p>
          <p>{props.cards.length}</p>
        </div>
        <div className={styles.DiscardPile}>
          {discardPile.length > 0 && <CardComponent card={discardPile[discardPile.length -1]}></CardComponent>}
        </div>
      </div>
  );
};

export default LootDeck;
