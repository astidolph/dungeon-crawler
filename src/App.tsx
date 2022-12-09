import { useEffect } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import CardComponent from './features/CardComponent/CardComponent';
import Deck from './features/Deck/Deck';
import { drawCard, selectDeck } from './features/Deck/DeckSlice';
import Hand from './features/Hand/Hand';
import { gainCoins, selectCoins, selectDamage, selectHealth, selectItems, selectMaxHealth } from './features/PlayerSlice';
import { CardType } from './models/Card';

function App() {
  const dispatch = useAppDispatch();
  const coins = useAppSelector(selectCoins);
  const health = useAppSelector(selectHealth);
  const maxHealth = useAppSelector(selectMaxHealth);
  const damage = useAppSelector(selectDamage);
  const lootDeck = useAppSelector((state) => selectDeck(state, CardType.Loot));
  const treasureDeck = useAppSelector((state) => selectDeck(state, CardType.Treasure));
  const items = useAppSelector(selectItems);

  useEffect(() => {
    dispatch(drawCard(CardType.Loot));
    dispatch(drawCard(CardType.Loot));
    dispatch(drawCard(CardType.Loot));
    dispatch(gainCoins(3));
  }, []);
  
  return (
    <div className="App">
      <Deck title="Loot" cards={lootDeck} type={CardType.Loot}></Deck>
      <Deck title="Treasure" cards={treasureDeck} type={CardType.Treasure}></Deck>
      Coins: {coins}
      Health: {health}/{maxHealth}
      Damage: {damage}
      Items: {items.map(card => <CardComponent card={card}></CardComponent>)}
      <Hand></Hand>
    </div>
  );
}

export default App;
