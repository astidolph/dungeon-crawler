import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../app/store";
import { Card } from "../models/Card";
import { setLootCardDrawn } from "./LootDeck/LootDeckSlice";

export interface PlayerState {
    hand: Card[];
    coins: number;
    items: Card[];
    totalHealth: number;
    totalDamage: number;
    currentHealth: number;
    currentDamage: number;
    maxNumberLootCardsToPlay: number;
    numberLootCardsPlayed: number;
    maxNumberTreasureCardPurchases: number;
    numberTreasureCardsBought: number;
}

const initialState: PlayerState = {
    hand: [],
    coins: 0,
    items: [],
    totalHealth: 2,
    totalDamage: 1,
    currentHealth: 2,
    currentDamage: 1,
    maxNumberLootCardsToPlay: 1,
    numberLootCardsPlayed: 0,
    maxNumberTreasureCardPurchases: 1,
    numberTreasureCardsBought: 0
};

export const playCardEffects =
  (card: Card): AppThunk =>
  dispatch => {
    card.effects.forEach(effect => {
        dispatch(effect);
    });
  };

export const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        lootCardPlayed: (state, cardToPlay: PayloadAction<Card>) => {
            state.hand = state.hand.filter(card => card.id !== cardToPlay.payload.id);
            state.numberLootCardsPlayed += 1;
        },
        gainCoins: (state, addCoins: PayloadAction<number>) => {
            state.coins += addCoins.payload;
        },
        gainTotalHP: (state, amount: PayloadAction<number>) => {
            state.totalHealth += amount.payload;
            state.currentHealth += amount.payload;
        },
        gainTotalDMG: (state, amount: PayloadAction<number>) => {
            state.totalDamage += amount.payload;
            state.currentDamage += amount.payload;
        },
        buyTopTreasureCard: (state, action: PayloadAction<Card>) => {
            if (state.coins > 10) {
                state.items.push(action.payload);
                state.coins -= 10;
                state.numberTreasureCardsBought += 1;
            }
        },        
        buyActiveTreasureCard: (state, action: PayloadAction<Card>) => {
            if (state.coins > 10) {
                state.items.push(action.payload);
                state.coins -= 10;
                state.numberTreasureCardsBought += 1;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(setLootCardDrawn, (state, card) => {
                return {
                    ...state,
                    hand: [card.payload, ...state.hand]
                }
            })
    }
});

export const { lootCardPlayed, gainCoins, buyTopTreasureCard, buyActiveTreasureCard } = playerSlice.actions;

export const selectHand = (state: RootState) => state.player.hand;

export const selectCoins = (state: RootState) => state.player.coins;

export const selectHealth = (state: RootState) => state.player.currentHealth;

export const selectMaxHealth = (state: RootState) => state.player.totalHealth;

export const selectDamage = (state: RootState) => state.player.currentDamage;

export const selectItems = (state: RootState) => state.player.items;

export default playerSlice.reducer;