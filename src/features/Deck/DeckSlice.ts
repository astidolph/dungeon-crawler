import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Card } from "../../models/Card";
import { gainCoins } from "../PlayerSlice";

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
            type: 'hand/gainCoins'
        }
       ] 
    }, 
    {
        id: 1,
        name: 'gain 2 coins',
       effects: [
        {
            payload: 2,
            type: 'hand/gainCoins'
        }
       ] 
    }, 
    {
        id: 2,
        name: 'gain 3 coins',
       effects: [
        {
            payload: 3,
            type: 'hand/gainCoins'
        }
       ] 
    }, 
    {
        id: 3,
        name: 'gain 1 coins',
       effects: [
        {
            payload: 1,
            type: 'hand/gainCoins'
        }
       ] 
    },
    {
        id: 4,
        name: 'gain 5 coins',
       effects: [
        {
            payload: 5,
            type: 'hand/gainCoins'
        }
       ] 
    },
    {
        id: 5,
        name: 'gain 5 coins',
       effects: [
        {
            payload: 5,
            type: 'hand/gainCoins'
        }
       ] 
    },
]
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