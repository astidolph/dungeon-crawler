import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";
import treasure_cards from "../../app/treasure-cards";
import { Card, CardType } from "../../models/Card";
import { cardPlayed, playCard } from "../PlayerSlice";

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

export const drawTreasureCard = (): AppThunk => (dispatch, getState) => {
    const state = getState();
    let treasureDrawn = state.treasureDeck.treasureDeck[state.treasureDeck.treasureDeck.length -1];
    dispatch(setTreasureCardDrawn(treasureDrawn));
    dispatch(playCard(treasureDrawn));
};

export const treasureDeckSlice = createSlice({
    name: 'treasureDeck',
    initialState,
    reducers: {
        setTreasureCardDrawn: (state, action: PayloadAction<Card>) => {
            state.treasureDeck.pop();
        },
        setActiveTreasureCards: (state) => {
            const numActiveTreasureCards = state.activeTreasureCards.length;
            const maxActiveTreasureCards = state.maxActiveTreasureCards;
            const treasureCardsToAdd = maxActiveTreasureCards - numActiveTreasureCards;

            if (treasureCardsToAdd > 0) {
                for (let i = 0; i < treasureCardsToAdd; i++) {
                    const drawnCard = state.treasureDeck[state.treasureDeck.length - 1];
                    state.activeTreasureCards.push(drawnCard);
                    state.treasureDeck.pop();
                }
            }
        }
    }
});

export const { setActiveTreasureCards, setTreasureCardDrawn } = treasureDeckSlice.actions;

export const selectTreasureDeck = (state: RootState) => state.treasureDeck.treasureDeck;

export const selectTreasureDeckDiscardPile = (state: RootState) => state.treasureDeck.treasureDiscardPile;

export const selectTreasureDeckActiveCards = (state: RootState) => state.treasureDeck.activeTreasureCards;

export default treasureDeckSlice.reducer;