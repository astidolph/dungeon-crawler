import { FC } from 'react';
import styles from './CardComponent.module.css';
import { Card, Effect } from '../../models/Card';
import { useAppDispatch } from '../../app/hooks';
import { AppThunk } from '../../app/store';

interface CardComponentProps {
  card: Card;
  effect?: AppThunk<void>;
}

const CardComponent: FC<CardComponentProps> = (props) => {
  const dispatch = useAppDispatch();
  
  return (
    <div>
      <div className={styles.Card} 
        onClick={() => props.effect !== undefined ? dispatch(props.effect) : null}>
          <p>{props.card.name}</p>
          {props.card.description}
      </div>
    </div>
  );
};

export default CardComponent;
