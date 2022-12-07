import { usePatchesInScope } from 'immer/dist/internal';
import './App.css';
import { useAppSelector } from './app/hooks';
import Deck from './features/Deck/Deck';
import { selectDeckCards, selectTreasureCards } from './features/Deck/DeckSlice';
import Hand from './features/Hand/Hand';
import { selectCoins, selectDamage, selectHealth, selectItems, selectMaxHealth } from './features/PlayerSlice';

function App() {
  const coins = useAppSelector(selectCoins);
  const health = useAppSelector(selectHealth);
  const maxHealth = useAppSelector(selectMaxHealth);
  const damage = useAppSelector(selectDamage);
  const lootDeck = useAppSelector(selectDeckCards);
  const treasureDeck = useAppSelector(selectTreasureCards);
  const items = useAppSelector(selectItems);
  
  return (
    <div className="App">
      <Deck title="Loot" cards={lootDeck}></Deck>
      <Deck title="Treasure" cards={treasureDeck}></Deck>
      Coins: {coins}
      Health: {health}/{maxHealth}
      Damage: {damage}
      Items: {items.map(x => x.name + ' ' + x.description)}
      <Hand></Hand>
    </div>
  );
}

export default App;
