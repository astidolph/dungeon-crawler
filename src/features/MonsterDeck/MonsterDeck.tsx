import { FC } from 'react';
import { useAppSelector } from '../../app/hooks';
import { MonsterCard } from '../../models/Card';
import { attack, selectMonsterDeckActiveCards, selectMonsterDeckDiscardPile } from './MonsterDeckSlice';
import styles from './MonsterDeck.module.css';
import CardComponent from '../CardComponent/CardComponent';

interface MonsterDeckProps {
  title: string;
  cards: MonsterCard[];
}

const MonsterDeck: FC<MonsterDeckProps> = (props) => {
  const discardPile = useAppSelector(selectMonsterDeckDiscardPile);
  const activeCards = useAppSelector(selectMonsterDeckActiveCards);
  return (
      <div className={styles.DeckContainer}>
        <div className={styles.Deck} data-testid="Deck">
          <p>{props.title}</p>
          <p>{props.cards.length}</p>
        </div>
        {
          activeCards.length > 0 && 
          <div>
            ACTIVE MONSTERS
            <div className={styles.ActiveCards}>
              {activeCards.map(card => <CardComponent onClickEffect={attack(card)} card={card}></CardComponent>)}
            </div>
          </div>
        }
        <div>
          DISCARDED MONSTERS
          <div className={styles.DiscardPile}>
            {discardPile.length > 0 && <CardComponent card={discardPile[discardPile.length -1]}></CardComponent>}
          </div>
        </div>
      </div>
  );
};

export default MonsterDeck;
