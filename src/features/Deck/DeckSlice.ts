import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Card } from "../../models/Card";

export interface DeckState {
    cards: Card[];
}

const initialState: DeckState = {
    cards: [{description: 'test card 1'}, {description: 'test card 2'}, {description: 'test card 3'}]
};

export const deckSlice = createSlice({
    name: 'deck',
    initialState,
    reducers: {
        draw: (state) => {
            state.cards.pop();
        }
    }
});

export const { draw } = deckSlice.actions;

export const selectDeckCards = (state: RootState) => state.deck.cards;

export default deckSlice.reducer;