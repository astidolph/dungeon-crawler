import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import deckReducer from '../features/Deck/DeckSlice';
import handReducer from '../features/Hand/HandSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    deck: deckReducer,
    hand: handReducer
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
