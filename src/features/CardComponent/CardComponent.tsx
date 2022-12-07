import { FC } from 'react';
import styles from './CardComponent.module.css';
import { Card } from '../../models/Card';
import { useAppDispatch } from '../../app/hooks';
import { playCard } from '../PlayerSlice';

interface CardComponentProps {
  card: Card;
}

const CardComponent: FC<CardComponentProps> = (props) => {
  const dispatch = useAppDispatch();
  
  return (
    <div className={styles.Card} 
      onClick={() => dispatch(playCard(props.card))}>
        <p>{props.card.name}</p>
        {props.card.description}
    </div>
  );
};

export default CardComponent;
