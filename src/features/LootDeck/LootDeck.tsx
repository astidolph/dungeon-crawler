import { FC } from 'react';
import { useAppSelector } from '../../app/hooks';
import { Card } from '../../models/Card';
import CardComponent from '../CardComponent/CardComponent';
import { selectLootDeckDiscardPile } from './LootDeckSlice';
import styles from './LootDeck.module.css';

interface LootDeckProps {
  title: string;
  cards: Card[];
}

const LootDeck: FC<LootDeckProps> = (props) => {
  const discardPile = useAppSelector(selectLootDeckDiscardPile);
  return (
      <div className={styles.DeckContainer}>
        <div className={styles.Deck} data-testid="Deck">
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
