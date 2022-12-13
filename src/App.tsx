import { useEffect } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import CardComponent from './features/CardComponent/CardComponent';
import { drawLootCard, selectLootDeck, } from './features/LootDeck/LootDeckSlice';
import { selectMonsterDeck, setActiveMonsterCards } from './features/MonsterDeck/MonsterDeckSlice';
import { selectTreasureDeck, setActiveTreasureCards } from './features/TreasureDeck/TreasureDeckSlice';
import Hand from './features/Hand/Hand';
import LootDeck from './features/LootDeck/LootDeck';
import MonsterDeck from './features/MonsterDeck/MonsterDeck';
import { gainCoins, selectCoins, selectDamage, selectHealth, selectItems, selectMaxHealth } from './features/PlayerSlice';
import TreasureDeck from './features/TreasureDeck/TreasureDeck';

function App() {
  const dispatch = useAppDispatch();
  const coins = useAppSelector(selectCoins);
  const health = useAppSelector(selectHealth);
  const maxHealth = useAppSelector(selectMaxHealth);
  const damage = useAppSelector(selectDamage);
  const lootDeck = useAppSelector(selectLootDeck);
  const treasureDeck = useAppSelector(selectTreasureDeck);
  const monsterDeck = useAppSelector(selectMonsterDeck);
  const items = useAppSelector(selectItems);

  useEffect(() => {
    dispatch(drawLootCard());
    dispatch(drawLootCard());
    dispatch(drawLootCard());
    dispatch(gainCoins(3));
    dispatch(setActiveTreasureCards());
    dispatch(setActiveMonsterCards());
  }, [dispatch]);
  
  return (
    <div className="App">
      <div className="GameTitleContainer"></div>
      <div className="TreasureDeckContainer">
        <TreasureDeck title='Treasure Deck' cards={treasureDeck}></TreasureDeck>
      </div>
      <div className="MonsterDeckContainer">
        <MonsterDeck title='Monster Deck' cards={monsterDeck}></MonsterDeck>
      </div>
      <div className="ItemContainer">
        {items.map(card => <CardComponent card={card}></CardComponent>)}
      </div>
      <div className="LootDeckContainer">
        <LootDeck title="Loot Deck" cards={lootDeck}></LootDeck>
      </div>
      <div className="PlayerStatsContainer">
        <p>Coins: {coins}</p>
        <p>Health: {health}/{maxHealth}</p>
        <p>Damage: {damage}</p>
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
