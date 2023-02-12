import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Card } from '../../models/Card';
import { attack, drawMonsterCard, selectMonsterDeckActiveCards, selectMonsterDeckDiscardPile } from './MonsterDeckSlice';
import styles from './MonsterDeck.module.css';
import MonsterCardComponent from '../MonsterCardComponent/MonsterCardComponent';

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
          <div>
            ACTIVE
            <div className={styles.ActiveCards}>
              {activeCards.map(card => <MonsterCardComponent onClickEffect={attack(card)} card={card}></MonsterCardComponent>)}
            </div>
          </div>
        }
        <div>
          DISCARD
          <div className={styles.DiscardPile}>
            {discardPile.length > 0 && <MonsterCardComponent card={discardPile[discardPile.length -1]}></MonsterCardComponent>}
          </div>
        </div>
      </div>
  );
};

export default MonsterDeck;
