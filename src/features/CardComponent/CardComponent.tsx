import { FC } from 'react';
import styles from './CardComponent.module.css';
import { Card, MonsterCard } from '../../models/Card';
import { useAppDispatch } from '../../app/hooks';
import { AppThunk } from '../../app/store';
import { Action } from '@reduxjs/toolkit';

interface CardComponentProps {
  card: Card;
  onClickEffect?: AppThunk<void> | Action;
  hoverState?: boolean;
  style?: React.CSSProperties;
}

const CardComponent: FC<CardComponentProps> = (props) => {
  const dispatch = useAppDispatch();
  
  return (
    <div>
      <div className={`${styles.Card} ${props.hoverState ? styles.CardHover : ''}`}  style={props.style}
        onClick={() => props.onClickEffect !== undefined ? dispatch(props.onClickEffect) : null}>
          <div>{props.card.name}</div>
          <div>{props.card.description}</div>
      </div>
    </div>
  );
};


CardComponent.defaultProps = {
  hoverState: false
};

export default CardComponent;
