import { createSlice } from "@reduxjs/toolkit";
import monster_cards from "../../app/monster-cards";
import { AppThunk, RootState } from "../../app/store";
import { Card } from "../../models/Card";

export interface DeckState {
    monsterDeck: Card[];
    monsterDiscardPile: Card[];
    activeMonsterCards: Card[];
    maxActiveMonsterCards: number;
}

const initialState: DeckState = {
    monsterDeck: monster_cards.cards,
    monsterDiscardPile: [],
    activeMonsterCards: [],
    maxActiveMonsterCards: 2
};

export const drawMonsterCard = (): AppThunk => (dispatch, getState) => {
    // TO IMPLEMENT
};

export const monsterDeckSlice = createSlice({
    name: 'monsterDeck',
    initialState,
    reducers: {
        setActiveMonsterCards: (state) => {
            const numActiveMonsterCards = state.activeMonsterCards.length;
            const maxActiveMonsterCards = state.maxActiveMonsterCards;
            const monsterCardsToAdd = maxActiveMonsterCards - numActiveMonsterCards;

            if (state.monsterDeck.length > 0 && monsterCardsToAdd > 0) {
                for (let i = 0; i < monsterCardsToAdd; i++) {
                    const drawnCard = state.monsterDeck[state.monsterDeck.length - 1];
                    state.activeMonsterCards.push(drawnCard);
                    state.monsterDeck.pop();
                }
            }
        }
    }
});

export const { setActiveMonsterCards } = monsterDeckSlice.actions;

export const selectMonsterDeck = (state: RootState) => state.monsterDeck.monsterDeck;
export const selectMonsterDeckDiscardPile = (state: RootState) => state.monsterDeck.monsterDiscardPile;
export const selectMonsterDeckActiveCards = (state: RootState) => state.monsterDeck.activeMonsterCards;

export default monsterDeckSlice.reducer;