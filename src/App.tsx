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
import { endTurn, gainCoins, selectCoins, selectCurrentTurn, 
  selectDamage, selectHealth, selectItems, selectLives, selectMaxHealth, selectSouls, shuffleAll } from './features/PlayerSlice';
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
  const currentTurn = useAppSelector(selectCurrentTurn);
  const lives = useAppSelector(selectLives);
  const souls = useAppSelector(selectSouls);

  useEffect(() => {
    dispatch(shuffleAll());
    dispatch(drawLootCard());
    dispatch(drawLootCard());
    dispatch(drawLootCard());
    dispatch(gainCoins(3));
    dispatch(setActiveTreasureCards());
    dispatch(setActiveMonsterCards());
  }, [dispatch]);
  
  return (
    <div className="App">
      <div className="GameTitleContainer">TURN {currentTurn}</div>
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
        <p>Lives: {lives}</p>
        <p>Souls: {souls}</p>
      </div>
      <div className="HandContainer">
        <Hand></Hand>
      </div>
      <div className="EndTurnContainer">
        <button onClick={() => dispatch(endTurn())}>End Turn</button>
      </div>

      {lives <= 0 &&
        <div className="Overlay">
          <div className="OverlayText">
            You have died! <button className="NewGameButton">New Game</button>
          </div>
        </div>
      }

      {souls >= 4 &&
        <div className="Overlay">
          <div className="OverlayText">
            Congratulations you have won! <button className="NewGameButton">New Game</button>
          </div>
        </div>
      }
    </div>
  );
}

export default App;
