import './App.css';
import { useAppSelector } from './app/hooks';
import CardComponent from './features/CardComponent/CardComponent';
import Deck from './features/Deck/Deck';
import { selectDeck } from './features/Deck/DeckSlice';
import Hand from './features/Hand/Hand';
import { selectCoins, selectDamage, selectHealth, selectItems, selectMaxHealth } from './features/PlayerSlice';
import { CardType } from './models/Card';

function App() {
  const coins = useAppSelector(selectCoins);
  const health = useAppSelector(selectHealth);
  const maxHealth = useAppSelector(selectMaxHealth);
  const damage = useAppSelector(selectDamage);
  const lootDeck = useAppSelector((state) => selectDeck(state, CardType.Loot));
  const treasureDeck = useAppSelector((state) => selectDeck(state, CardType.Treasure));
  const items = useAppSelector(selectItems);
  
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
