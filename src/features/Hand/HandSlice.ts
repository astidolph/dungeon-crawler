import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Card } from "../../models/Card";

export interface HandState {
    cards: Card[];
}

const initialState: HandState = {
    cards: []
};

export const handSlice = createSlice({
    name: 'hand',
    initialState,
    reducers: {
        addCard: (state, cardToAdd: PayloadAction<Card>) => {
            return {
                ...state,
                cards: [cardToAdd.payload, ...state.cards]
            }
        }
    }
});

export const { addCard } = handSlice.actions;

export const selectHand = (state: RootState) => state.hand.cards;

export default handSlice.reducer;