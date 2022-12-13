import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Card } from '../../models/Card';
import CardComponent from '../CardComponent/CardComponent';
import { selectTreasureDeckActiveCards, selectTreasureDeckDiscardPile, 
  tryBuyActiveTreasureCard, tryBuyTopTreasureCard } from './TreasureDeckSlice';
import styles from './TreasureDeck.module.css';

interface TreasureDeckProps {
  title: string;
  cards: Card[];
}

const TreasureDeck: FC<TreasureDeckProps> = (props) => {
  const dispatch = useAppDispatch();
  const discardPile = useAppSelector(selectTreasureDeckDiscardPile);
  const activeCards = useAppSelector(selectTreasureDeckActiveCards);
  return (
      <div className={styles.DeckContainer}>
        <div className={styles.Deck} data-testid="Deck" onClick={(_) => {
          dispatch(tryBuyTopTreasureCard(props.cards[props.cards.length - 1]))
        }}>
          <p>{props.title}</p>
          <p>{props.cards.length}</p>
        </div>
        {
          activeCards.length > 0 && 
          <div className={styles.ActiveCards}>
            {activeCards.map(card => <CardComponent card={card} onClickEffect={tryBuyActiveTreasureCard(card)}></CardComponent>)}
          </div>
        }
        <div className={styles.DiscardPile}>
          {discardPile.length > 0 && <CardComponent card={discardPile[discardPile.length -1]}></CardComponent>}
        </div>
      </div>
  );
};

export default TreasureDeck;
