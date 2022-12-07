import { createSlice } from "@reduxjs/toolkit";
import loot_cards from "../../app/loot-cards";
import { RootState } from "../../app/store";
import treasure_cards from "../../app/treasure-cards";
import { Card } from "../../models/Card";
import { addCardToHand } from "../PlayerSlice";

export interface DeckState {
    cards: Card[];
    treasureDeck: Card[];
}

const initialState: DeckState = {
    cards: loot_cards.cards,
    treasureDeck: treasure_cards.cards
};

export const deckSlice = createSlice({
    name: 'deck',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(addCardToHand, (state, action) => 
        {
            
            state.cards.pop();
        })
    }
});

export const selectDeckCards = (state: RootState) => state.deck.cards;

export const selectTreasureCards = (state: RootState) => state.deck.treasureDeck;

export default deckSlice.reducer;