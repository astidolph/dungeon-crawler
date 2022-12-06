import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../app/store";
import { Card } from "../models/Card";

export interface PlayerState {
    hand: Card[];
    coins: number;
    lastCardPlayed: Card | null;
}

const initialState: PlayerState = {
    hand: [],
    coins: 0,
    lastCardPlayed: null
};

export const playCard =
  (card: Card): AppThunk =>
  dispatch => {
    card.effects.forEach(effect => {
        dispatch(gainCoins(1));
    });
    dispatch(cardPlayed(card));
  };

export const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        addCard: (state, cardToAdd: PayloadAction<Card>) => {
            return {
                ...state,
                hand: [cardToAdd.payload, ...state.hand]
            }
        },
        cardPlayed: (state, cardToPlay: PayloadAction<Card>) => {
            state.lastCardPlayed = cardToPlay.payload;
            state.hand = state.hand.filter(card => card.id !== cardToPlay.payload.id);
        },
        gainCoins: (state, addCoins: PayloadAction<number>) => {
            state.coins += addCoins.payload;
        }
    }
});

export const { addCard, cardPlayed, gainCoins } = playerSlice.actions;

export const selectHand = (state: RootState) => state.player.hand;

export const selectCoins = (state: RootState) => state.player.coins;

export default playerSlice.reducer;