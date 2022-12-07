import { createSlice } from "@reduxjs/toolkit";
import loot_cards from "../../app/loot-cards";
import { RootState } from "../../app/store";
import { Card } from "../../models/Card";
import { addCardToHand } from "../PlayerSlice";

export interface DeckState {
    cards: Card[];
}

const initialState: DeckState = {
    cards: loot_cards.cards
};

export const deckSlice = createSlice({
    name: 'deck',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(addCardToHand, state => 
        {
            state.cards.pop();
        })
    }
});

export const selectDeckCards = (state: RootState) => state.deck.cards;

export default deckSlice.reducer;