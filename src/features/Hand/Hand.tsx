import { FC } from 'react';
import { useAppSelector } from '../../app/hooks';
import CardComponent from '../CardComponent/CardComponent';
import { playLootCard } from '../LootDeck/LootDeckSlice';
import { selectHand } from '../PlayerSlice';
import styles from './Hand.module.css';

interface HandProps {}

const Hand: FC<HandProps> = () => {
  const hand = useAppSelector(selectHand);
  return (
    <div className={styles.Hand}>
      {
        hand.map((card) => <CardComponent hoverState card={card} onClickEffect={playLootCard(card)}></CardComponent>)
      }
    </div>
  );
};

export default Hand;
