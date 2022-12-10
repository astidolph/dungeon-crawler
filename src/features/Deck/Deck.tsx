import { ThunkAction } from '@reduxjs/toolkit';
import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AppThunk } from '../../app/store';
import { Card, CardType } from '../../models/Card';
import CardComponent from '../CardComponent/CardComponent';
import { drawCard, selectActiveCards, selectDeckDiscardPile } from '../Deck/DeckSlice';
import styles from './Deck.module.css';

interface DeckProps {
  cards: Card[];
  title: string;
  type: CardType;
  drawCardEffect: AppThunk<void>;
  hasActiveCards?: boolean;
  activeCardEffect?: AppThunk<void>;
}

const Deck: FC<DeckProps> = (props) => {
  const dispatch = useAppDispatch();
  const discardPile = useAppSelector((state) => selectDeckDiscardPile(state, props.type));
  const activeCards = useAppSelector((state) => selectActiveCards(state, props.type));
  return (
      <div className={styles.DeckContainer}>
        <div className={styles.Deck} data-testid="Deck" onClick={(_) => {
          dispatch(props.drawCardEffect)
        }}>
          <p>{props.title}</p>
          <p>{props.cards.length}</p>
        </div>
        {}
        <div className={styles.ActiveCards}>
          {props.hasActiveCards && activeCards.length > 0 &&
          activeCards.map(card => <CardComponent card={card}></CardComponent>)}
        </div>
        <div className={styles.DiscardPile}>
          {discardPile.length > 0 && <CardComponent card={discardPile[discardPile.length -1]}></CardComponent>}
        </div>
      </div>
  );
};

export default Deck;
