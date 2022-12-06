import './App.css';
import { useAppSelector } from './app/hooks';
import Deck from './features/Deck/Deck';
import Hand from './features/Hand/Hand';
import { selectCoins } from './features/PlayerSlice';

function App() {
  const coins = useAppSelector(selectCoins);
  return (
    <div className="App">
      <Deck></Deck>
      Coins: {coins}
      <Hand></Hand>
    </div>
  );
}

export default App;
