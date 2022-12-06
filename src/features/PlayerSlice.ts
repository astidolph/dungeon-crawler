import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../app/store";
import { Card } from "../models/Card";

export interface PlayerState {
    cards: Card[];
    coins: number;
    lastCardPlayed: Card | null;
}

const initialState: PlayerState = {
    cards: [],
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

export const { addCard, cardPlayed, gainCoins } = playerSlice.actions;

export const selectHand = (state: RootState) => state.player.cards;

export const selectCoins = (state: RootState) => state.player.coins;

export default playerSlice.reducer;