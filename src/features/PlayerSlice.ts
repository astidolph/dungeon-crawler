import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../app/store";
import { Card, CardType } from "../models/Card";
import { setCardDrawn } from "./Deck/DeckSlice";

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
    extraReducers: (builder) => {
        builder
            .addCase(setCardDrawn, (state, card) => {
                switch(card.payload.type) {
                    case CardType.Loot:
                        return {
                            ...state,
                            hand: [card.payload, ...state.hand]
                        }
                    case CardType.Treasure:
                        return {
                            ...state,
                            items: [card.payload, ...state.items]
                        }
                    }
            })
    }
});

export const { cardPlayed, gainCoins } = playerSlice.actions;

export const selectHand = (state: RootState) => state.player.hand;

export const selectCoins = (state: RootState) => state.player.coins;

export const selectHealth = (state: RootState) => state.player.currentHealth;

export const selectMaxHealth = (state: RootState) => state.player.totalHealth;

export const selectDamage = (state: RootState) => state.player.currentDamage;

export const selectItems = (state: RootState) => state.player.items;

export default playerSlice.reducer;