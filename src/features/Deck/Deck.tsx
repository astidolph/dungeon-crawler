import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Card, CardType } from '../../models/Card';
import CardComponent from '../CardComponent/CardComponent';
import { drawCard, selectActiveCards, selectDeckDiscardPile } from '../Deck/DeckSlice';
import styles from './Deck.module.css';

interface DeckProps {
  cards: Card[];
  title: string;
  type: CardType;
}

const Deck: FC<DeckProps> = (props) => {
  const dispatch = useAppDispatch();
  const discardPile = useAppSelector((state) => selectDeckDiscardPile(state, props.type));
  const activeCards = useAppSelector((state) => selectActiveCards(state, props.type));
  return (
      <div className={styles.DeckContainer}>
        <div className={styles.Deck} data-testid="Deck" onClick={(_) => {
          dispatch(
            drawCard(props.type)
          )
        }}>
          <p>{props.title}</p>
          <p>{props.cards.length}</p>
        </div>
        {}
        <div className={styles.ActiveCards}>
          {activeCards.length > 0 && (props.type === CardType.Treasure || props.type === CardType.Monster) &&
          activeCards.map(card => <CardComponent card={card}></CardComponent>)}
        </div>
        <div className={styles.DiscardPile}>
          {(discardPile.length > 0 && (props.type === CardType.Loot || props.type === CardType.Treasure)) && 
          <CardComponent card={discardPile[discardPile.length -1]}></CardComponent>}
        </div>
      </div>
  );
};

export default Deck;
