import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../app/store";
import { Card, Effect } from "../models/Card";
import { drawLootCard, setLootCardDrawn } from "./LootDeck/LootDeckSlice";
import { resetMonsterInCombat, setMonsterInCombat } from "./MonsterDeck/MonsterDeckSlice";

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
    maxNumberCombat: number;
    numberCombat: number;
    turn: number;
    lives: number;
    souls: number;
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
    numberTreasureCardsBought: 0,
    maxNumberCombat: 1,
    numberCombat: 0,
    turn: 1,
    lives: 8,
    souls: 0
};

export const playCardEffects =
  (card: Card): AppThunk =>
  dispatch => {
    card.effects.forEach(effect => {
        console.log('PLAY EFFECT: ' + effect.type + ' ' + effect.payload);
        dispatch(effect);
    });
  };

export const playEffect = (effect: Effect): AppThunk => 
  dispatch => {
    console.log('PLAY EFFECT: ' + effect.type + ' ' + effect.payload);
    dispatch(effect);
  };

export const playerAttacked = (damage: number): AppThunk => 
(dispatch, getState) => {
    dispatch(playerHealthDown(damage));

    const playerHealth = selectHealth(getState());
    if (playerHealth <= 0) {
        console.log('PLAYER DIED');
        dispatch(playerDied());
        dispatch(turnEnded());
        dispatch(drawLootCard());
    }
};

export const endTurn = (): AppThunk => 
    dispatch => {
        dispatch(resetMonsterInCombat());
        dispatch(turnEnded());
        dispatch(drawLootCard());
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
            if (state.coins >= 10) {
                state.items.push(action.payload);
                state.coins -= 10;
                state.numberTreasureCardsBought += 1;
            }
        },        
        buyActiveTreasureCard: (state, action: PayloadAction<Card>) => {
            if (state.coins >= 10) {
                state.items.push(action.payload);
                state.coins -= 10;
                state.numberTreasureCardsBought += 1;
            }
        },
        playerHealthDown: (state, action: PayloadAction<number>) => {
            state.currentHealth -= 1;
        },
        playerDied: (state) => {
            state.currentHealth = state.totalHealth;
            state.lives -= 1;
        },
        turnEnded: (state) => {
            state.turn += 1;
            state.lives -= 1;
            state.currentHealth = state.totalHealth;
            state.numberLootCardsPlayed = 0;
            state.numberTreasureCardsBought = 0;
            state.numberCombat = 0;
        },
        increaseSouls: (state) => {
            state.souls += 1;
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
            .addCase(setMonsterInCombat, (state) => {
                state.numberCombat += 1;
            })
    }
});

export const { lootCardPlayed, gainCoins, buyTopTreasureCard, buyActiveTreasureCard, 
    playerHealthDown, playerDied, turnEnded, increaseSouls } = playerSlice.actions;

export const selectHand = (state: RootState) => state.player.hand;

export const selectCoins = (state: RootState) => state.player.coins;

export const selectHealth = (state: RootState) => state.player.currentHealth;

export const selectMaxHealth = (state: RootState) => state.player.totalHealth;

export const selectDamage = (state: RootState) => state.player.currentDamage;

export const selectItems = (state: RootState) => state.player.items;

export const selectCurrentTurn = (state: RootState) => state.player.turn;

export const selectLives = (state: RootState) => state.player.lives;

export const selectSouls = (state: RootState) => state.player.souls;

export default playerSlice.reducer;