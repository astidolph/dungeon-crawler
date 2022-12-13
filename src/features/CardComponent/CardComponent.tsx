import { FC } from 'react';
import styles from './CardComponent.module.css';
import { Card } from '../../models/Card';
import { useAppDispatch } from '../../app/hooks';
import { AppThunk } from '../../app/store';
import { Action } from '@reduxjs/toolkit';

interface CardComponentProps {
  card: Card;
  onClickEffect?: AppThunk<void> | Action;
  hoverState?: boolean;
}

const CardComponent: FC<CardComponentProps> = (props) => {
  const dispatch = useAppDispatch();
  
  return (
    <div>
      <div className={`${styles.Card} ${props.hoverState ? styles.CardHover : ''}`} 
        onClick={() => props.onClickEffect !== undefined ? dispatch(props.onClickEffect) : null}>
          <div>{props.card.name}</div>
          <div>{props.card.description}</div>
          <div className={styles.MonsterStatsContainer}>
            {props.card.health !== undefined && <div>♥:{props.card.health}</div>}
            {props.card.roll !== undefined && <div>⚅:{props.card.roll}+</div>}
            {props.card.damage !== undefined && <div>⚔:{props.card.damage}</div>}
          </div>
      </div>
    </div>
  );
};


CardComponent.defaultProps = {
  hoverState: false
};

export default CardComponent;
