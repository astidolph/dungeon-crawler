import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Card } from '../../models/Card';
import CardComponent from '../CardComponent/CardComponent';
import { drawMonsterCard, selectMonsterDeck, selectMonsterDeckActiveCards, selectMonsterDeckDiscardPile } from './MonsterDeckSlice';
import styles from './MonsterDeck.module.css';

interface MonsterDeckProps {
  title: string;
  cards: Card[];
}

const MonsterDeck: FC<MonsterDeckProps> = (props) => {
  const dispatch = useAppDispatch();
  const discardPile = useAppSelector(selectMonsterDeckDiscardPile);
  const activeCards = useAppSelector(selectMonsterDeckActiveCards);
  return (
      <div className={styles.DeckContainer}>
        <div className={styles.Deck} data-testid="Deck" onClick={(_) => {
          dispatch(drawMonsterCard())
        }}>
          <p>{props.title}</p>
          <p>{props.cards.length}</p>
        </div>
        {
          activeCards.length > 0 && 
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

export default MonsterDeck;
