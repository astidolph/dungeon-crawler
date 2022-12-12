import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";
import treasure_cards from "../../app/treasure-cards";
import { Card } from "../../models/Card";
import { buyActiveTreasureCard, buyTopTreasureCard, playCardEffects } from "../PlayerSlice";

export interface TreasureDeckState {
    treasureDeck: Card[];
    treasureDiscardPile: Card[];
    activeTreasureCards: Card[];
    maxActiveTreasureCards: number;
}

const initialState: TreasureDeckState = {
    treasureDeck: treasure_cards.cards,
    treasureDiscardPile: [],
    activeTreasureCards: [],
    maxActiveTreasureCards: 2
};

export const tryBuyTopTreasureCard = (card: Card): AppThunk => (dispatch, getState) => {
    const state = getState();
    if (state.player.maxNumberTreasureCardPurchases > state.player.numberTreasureCardsBought && state.player.coins > 10) {
        dispatch(buyTopTreasureCard(card));
        dispatch(playCardEffects(card));
    }
};

export const tryBuyActiveTreasureCard = (card: Card): AppThunk => (dispatch, getState) => {
    const state = getState();
    if (state.player.maxNumberTreasureCardPurchases > state.player.numberTreasureCardsBought && state.player.coins > 10) {
        dispatch(buyActiveTreasureCard(card));
        dispatch(playCardEffects(card));
        dispatch(setActiveTreasureCards());
    }
};

export const treasureDeckSlice = createSlice({
    name: 'treasureDeck',
    initialState,
    reducers: {
        setActiveTreasureCards: (state) => {
            const numActiveTreasureCards = state.activeTreasureCards.length;
            const maxActiveTreasureCards = state.maxActiveTreasureCards;
            const treasureCardsToAdd = maxActiveTreasureCards - numActiveTreasureCards;

            if (state.treasureDeck.length > 0 && treasureCardsToAdd > 0) {
                for (let i = 0; i < treasureCardsToAdd; i++) {
                    const drawnCard = state.treasureDeck[state.treasureDeck.length - 1];
                    state.activeTreasureCards.push(drawnCard);
                    state.treasureDeck.pop();
                }
            }
        } 
    },
    extraReducers: (builder) => {
        builder
            .addCase(buyActiveTreasureCard, (state, action) => {
                state.activeTreasureCards = state.activeTreasureCards.filter(card => card.id !== action.payload.id);
            })
            .addCase(buyTopTreasureCard, (state, action) => {
                state.treasureDeck.pop();
            })
    }
});

export const { setActiveTreasureCards } = treasureDeckSlice.actions;

export const selectTreasureDeck = (state: RootState) => state.treasureDeck.treasureDeck;

export const selectTreasureDeckDiscardPile = (state: RootState) => state.treasureDeck.treasureDiscardPile;

export const selectTreasureDeckActiveCards = (state: RootState) => state.treasureDeck.activeTreasureCards;

export default treasureDeckSlice.reducer;