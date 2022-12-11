import { useEffect } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import CardComponent from './features/CardComponent/CardComponent';
import Deck from './features/Deck/Deck';
import { drawCard, selectLootDeck, selectLootDeckActiveCards, selectLootDeckDiscardPile, selectMonsterDeck, selectMonsterDeckActiveCards, 
  selectMonsterDeckDiscardPile, selectTreasureDeck, selectTreasureDeckActiveCards, 
  selectTreasureDeckDiscardPile, setActiveCards } from './features/Deck/DeckSlice';
import Hand from './features/Hand/Hand';
import { gainCoins, selectCoins, selectDamage, selectHealth, selectItems, selectMaxHealth } from './features/PlayerSlice';
import { CardType } from './models/Card';

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
    dispatch(drawCard(CardType.Loot));
    dispatch(drawCard(CardType.Loot));
    dispatch(drawCard(CardType.Loot));
    dispatch(gainCoins(3));
    dispatch(setActiveCards(CardType.Treasure));
    dispatch(setActiveCards(CardType.Monster));
  }, []);
  
  return (
    <div className="App">
      <div className="GameTitleContainer"></div>
      <div className="TreasureDeckContainer">
        <Deck title="Treasure Deck"
          cards={treasureDeck} 
          drawCardEffect={drawCard(CardType.Treasure)}
          discardPileSelector={selectTreasureDeckDiscardPile}
          activeCardsSelector={selectTreasureDeckActiveCards}
        ></Deck>
      </div>
      <div className="MonsterDeckContainer">
        <Deck title="Monster Deck" 
          cards={monsterDeck} 
          drawCardEffect={drawCard(CardType.Monster)}
          discardPileSelector={selectMonsterDeckDiscardPile}
          activeCardsSelector={selectMonsterDeckActiveCards}
        ></Deck>
      </div>
      <div className="GameBoardContainer"></div>
      <div className="LootDeckContainer">
        <Deck title="Loot Deck" 
          cards={lootDeck}
          drawCardEffect={drawCard(CardType.Loot)}
          discardPileSelector={selectLootDeckDiscardPile}
          activeCardsSelector={selectLootDeckActiveCards}
        ></Deck>
      </div>
      <div className="ItemContainer">
        {items.map(card => <CardComponent card={card}></CardComponent>)}
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
