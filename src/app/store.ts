import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import deckReducer from '../features/Deck/DeckSlice';
import playerReducer from '../features/PlayerSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
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
