import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../app/store";
import { Card } from "../models/Card";

export interface PlayerState {
    hand: Card[];
    coins: number;
    items: Card[];
    totalHealth: number;
    totalDamage: number;
    currentHealth: number;
    currentDamage: number;
}

const initialState: PlayerState = {
    hand: [],
    coins: 0,
    items: [],
    totalHealth: 2,
    totalDamage: 1,
    currentHealth: 2,
    currentDamage: 1
};

export const playCard =
  (card: Card): AppThunk =>
  dispatch => {
    card.effects.forEach(effect => {
        dispatch(effect);
    });
    dispatch(cardPlayed(card));
  };

export const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        addCardToHand: (state, cardToAdd: PayloadAction<Card>) => {
            return {
                ...state,
                hand: [cardToAdd.payload, ...state.hand]
            }
        },
        cardPlayed: (state, cardToPlay: PayloadAction<Card>) => {
            state.hand = state.hand.filter(card => card.id !== cardToPlay.payload.id);
        },
        gainCoins: (state, addCoins: PayloadAction<number>) => {
            state.coins += addCoins.payload;
        },
        gainTotalHP: (state, amount: PayloadAction<number>) => {
            state.totalHealth += amount.payload;
            state.currentHealth += amount.payload;
        }
    },
});

export const { addCardToHand, cardPlayed, gainCoins } = playerSlice.actions;

export const selectHand = (state: RootState) => state.player.hand;

export const selectCoins = (state: RootState) => state.player.coins;

export const selectHealth = (state: RootState) => state.player.currentHealth;

export const selectMaxHealth = (state: RootState) => state.player.totalHealth;

export const selectDamage = (state: RootState) => state.player.currentDamage;

export default playerSlice.reducer;