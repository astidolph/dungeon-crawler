import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Card } from "../../models/Card";
import { addCardToHand } from "../PlayerSlice";

export interface DeckState {
    cards: Card[];
}

const initialState: DeckState = {
    cards: [
    {
        id: 0,
        name: 'gain 1 coins',
        effects: [
            {
                payload: 1,
                type: 'player/gainCoins'
            }
        ] 
    }, 
    {
        id: 1,
        name: 'gain 2 coins',
        effects: [
            {
                payload: 2,
                type: 'player/gainCoins'
            }
        ] 
    }, 
    {
        id: 2,
        name: 'gain 3 coins',
        effects: [
            {
                payload: 3,
                type: 'player/gainCoins'
            }
        ] 
    }, 
    {
        id: 3,
        name: 'gain 1 coins',
        effects: [
            {
                payload: 1,
                type: 'player/gainCoins'
            }
        ] 
    },
    {
        id: 4,
        name: 'gain 5 coins',
        effects: [
            {
                payload: 5,
                type: 'player/gainCoins'
            }
        ] 
    },
    {
        id: 5,
        name: 'gain 5 coins',
        effects: [
            {
                payload: 5,
                type: 'player/gainCoins'
            }
        ] 
    },
]
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