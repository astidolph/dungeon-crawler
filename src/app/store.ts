import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import deckReducer from '../features/Deck/DeckSlice';
import playerReducer from '../features/PlayerSlice';

export const store = configureStore({
  reducer: {
    deck: deckReducer,
    player: playerReducer
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
