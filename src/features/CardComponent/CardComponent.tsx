import { FC } from 'react';
import styles from './CardComponent.module.css';
import { LootCard, MonsterCard, TreasureCard } from '../../models/Card';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AppThunk } from '../../app/store';
import { Action } from '@reduxjs/toolkit';
import { selectMonsterInCombat } from '../MonsterDeck/MonsterDeckSlice';

interface CardComponentProps {
  card: LootCard | TreasureCard | MonsterCard;
  onClickEffect?: AppThunk<void> | Action;
  hoverState?: boolean;
}

const CardComponent: FC<CardComponentProps> = (props) => {
  const dispatch = useAppDispatch();
  const isMonsterInCombat = useAppSelector(selectMonsterInCombat);
  const isMonsterCard = props.card.hasOwnProperty('health');
  
  return (
    <div>
      <div 
      className={`${styles.Card} ${isMonsterCard && styles.MonsterCard} ${props.hoverState ? styles.CardHover : ''} 
      ${isMonsterCard && isMonsterInCombat?.id === props.card.id && styles.InCombat}`}
        onClick={() => props.onClickEffect !== undefined ? dispatch(props.onClickEffect) : null}>
          <div>{props.card.name}</div>
          <div>{props.card.description}</div>
          {isMonsterCard && 
          <div>
            <div className={styles.MonsterStatsContainer}>
              <div>♥:{(props.card as MonsterCard).health}</div>
              <div>⚅:{(props.card as MonsterCard).roll}+</div>
              <div>⚔:{(props.card as MonsterCard).damage}</div>
            </div>
            <div>
              ${(props.card as MonsterCard).reward.payload} 
              {(props.card as MonsterCard).soul && <span>👻{(props.card as MonsterCard).soul}</span>}
            </div>
          </div>
          }
      </div>
    </div>
  );
};


CardComponent.defaultProps = {
  hoverState: false
};

export default CardComponent;
