import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import playerReducer from '../features/PlayerSlice';
import lootDeckReducer from '../features/Deck/LootDeckSlice';
import treasureDeckReducer from '../features/Deck/TreasureDeckSlice';
import monsterDeckReducer from '../features/Deck/MonsterDeckSlice';

export const store = configureStore({
  reducer: {
    player: playerReducer,
    lootDeck: lootDeckReducer,
    treasureDeck: treasureDeckReducer,
    monsterDeck: monsterDeckReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type AppSelector<Return> = (state: RootState) => Return;
