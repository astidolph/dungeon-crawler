import { AnyAction, createAsyncThunk, createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Card } from "../../models/Card";

export interface HandState {
    cards: Card[];
    coins: number;
    lastCardPlayed: Card | null;
}

const initialState: HandState = {
    cards: [],
    coins: 0,
    lastCardPlayed: null
};

export const playCard =
  (card: Card): ThunkAction<void, RootState, unknown, AnyAction> =>
  dispatch => {
    card.effects.forEach(effect => {
        console.log(effect);
    });
    dispatch(cardPlayed(card));
  };

export const handSlice = createSlice({
    name: 'hand',
    initialState,
    reducers: {
        addCard: (state, cardToAdd: PayloadAction<Card>) => {
            return {
                ...state,
                cards: [cardToAdd.payload, ...state.cards]
            }
        },
        cardPlayed: (state, cardToPlay: PayloadAction<Card>) => {
            state.lastCardPlayed = cardToPlay.payload;
            state.cards = state.cards.filter(x => x.id !== cardToPlay.payload.id);
        },
        gainCoins: (state, addCoins: PayloadAction<number>) => {
            state.coins += addCoins.payload;
        }
    }
});

export const { addCard, cardPlayed, gainCoins } = handSlice.actions;

export const selectHand = (state: RootState) => state.hand.cards;

export const selectCoins = (state: RootState) => state.hand.coins;

export default handSlice.reducer;