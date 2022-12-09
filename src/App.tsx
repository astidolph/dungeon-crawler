import { useEffect } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import CardComponent from './features/CardComponent/CardComponent';
import Deck from './features/Deck/Deck';
import { drawCard, selectDeck } from './features/Deck/DeckSlice';
import Hand from './features/Hand/Hand';
import { gainCoins, selectCoins, selectDamage, selectHealth, selectItems, selectMaxHealth } from './features/PlayerSlice';
import { Card, CardType } from './models/Card';

function App() {
  const dispatch = useAppDispatch();
  const coins = useAppSelector(selectCoins);
  const health = useAppSelector(selectHealth);
  const maxHealth = useAppSelector(selectMaxHealth);
  const damage = useAppSelector(selectDamage);
  const lootDeck = useAppSelector((state) => selectDeck(state, CardType.Loot));
  const treasureDeck = useAppSelector((state) => selectDeck(state, CardType.Treasure));
  const items = useAppSelector(selectItems);

  const placeholderMonsterCards: Card[] = [{name: 'fake-monster', id: 0, type: CardType.Loot, effects: []}];

  useEffect(() => {
    dispatch(drawCard(CardType.Loot));
    dispatch(drawCard(CardType.Loot));
    dispatch(drawCard(CardType.Loot));
    dispatch(gainCoins(3));
  }, []);
  
  return (
    <div className="App">
      <div className="GameTitleContainer"></div>
      <div className="TreasureDeckContainer">
        <Deck title="Treasure Deck" cards={treasureDeck} type={CardType.Treasure}></Deck>
      </div>
      <div className="MonsterDeckContainer">
        <Deck title="Monster Deck" cards={placeholderMonsterCards} type={CardType.Loot}></Deck>
      </div>
      <div className="GameBoardContainer"></div>
      <div className="LootDeckContainer">
        <Deck title="Loot Deck" cards={lootDeck} type={CardType.Loot}></Deck>
      </div>
      <div className="ItemContainer">
        {items.map(card => <CardComponent card={card}></CardComponent>)}
      </div>
      <div className="PlayerStatsContainer">
        Coins: {coins}
        Health: {health}/{maxHealth}
        Damage: {damage}
      </div>
      <div className="HandContainer">
        <Hand></Hand>
      </div>
      <div className="EndTurnContainer">
        End Turn
      </div>
    </div>
  );
}

export default App;
