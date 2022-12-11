import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AppSelector, AppThunk } from '../../app/store';
import { Card, CardType } from '../../models/Card';
import CardComponent from '../CardComponent/CardComponent';
import styles from './Deck.module.css';

interface DeckProps {
  cards: Card[];
  title: string;
  drawCardEffect: AppThunk<void>;
  activeCardEffect?: AppThunk<void>;
  activeCardsSelector: AppSelector<Card[]>;
  discardPileSelector: AppSelector<Card[]>;
}

const Deck: FC<DeckProps> = (props) => {
  const dispatch = useAppDispatch();
  const discardPile = useAppSelector(props.discardPileSelector);
  const activeCards = useAppSelector(props.activeCardsSelector);
  return (
      <div className={styles.DeckContainer}>
        <div className={styles.Deck} data-testid="Deck" onClick={(_) => {
          dispatch(props.drawCardEffect)
        }}>
          <p>{props.title}</p>
          <p>{props.cards.length}</p>
        </div>
        {
          props.activeCardsSelector !== undefined && 
          <div className={styles.ActiveCards}>
            {activeCards.map(card => <CardComponent card={card}></CardComponent>)}
          </div>
        }
        <div className={styles.DiscardPile}>
          {discardPile.length > 0 && <CardComponent card={discardPile[discardPile.length -1]}></CardComponent>}
        </div>
      </div>
  );
};

export default Deck;
