import { FC } from 'react';
import styles from './MonsterCardComponent.module.css';
import { MonsterCard } from '../../models/Card';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AppThunk } from '../../app/store';
import { Action } from '@reduxjs/toolkit';
import { selectMonsterInCombat } from '../MonsterDeck/MonsterDeckSlice';

interface MonsterCardComponentProps {
  card: MonsterCard;
  onClickEffect?: AppThunk<void> | Action;
  hoverState?: boolean;
}

const MonsterCardComponent: FC<MonsterCardComponentProps> = (props) => {
  const dispatch = useAppDispatch();
  const monsterInCombat = useAppSelector(selectMonsterInCombat);
  
  return (
    <div>
      <div className={`${styles.Card} 
      ${props.hoverState ? styles.CardHover : ''} 
      ${monsterInCombat?.id === props.card.id ? styles.InCombat : ''}`} 
        onClick={() => props.onClickEffect !== undefined ? dispatch(props.onClickEffect) : null}>
          <div>{props.card.name}</div>
          <div>{props.card.description}</div>
          <div className={styles.MonsterStatsContainer}>
            <div>♥:{props.card.health}</div>
            <div>⚅:{props.card.roll}+</div>
            <div>⚔:{props.card.damage}</div>
          </div>
      </div>
    </div>
  );
};

MonsterCardComponent.defaultProps = {
  hoverState: false
};

export default MonsterCardComponent;
