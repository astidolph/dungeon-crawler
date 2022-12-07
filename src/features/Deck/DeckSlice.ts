import { createSlice } from "@reduxjs/toolkit";
import loot_cards from "../../app/loot-cards";
import { AppThunk, RootState } from "../../app/store";
import treasure_cards from "../../app/treasure-cards";
import { Card, CardType } from "../../models/Card";
import { addCardToHand, addItem, cardPlayed, playCard } from "../PlayerSlice";

export interface DeckState {
    lootDeck: Card[];
    treasureDeck: Card[];
    lootDiscardPile: Card[];
    treasureDiscardPile: Card[];
}

const initialState: DeckState = {
    lootDeck: loot_cards.cards,
    treasureDeck: treasure_cards.cards,
    lootDiscardPile: [],
    treasureDiscardPile: []
};

export const drawCard =
  (card: Card): AppThunk =>
  dispatch => {
    switch(card.type) {
        case CardType.Loot:
            dispatch(addCardToHand(card));
            dispatch(lootCardDrawn());
            break;
        case CardType.Treasure:
            dispatch(addItem(card));
            dispatch(treasureCardDrawn());
    }
  };

export const deckSlice = createSlice({
    name: 'deck',
    initialState,
    reducers: {
        lootCardDrawn: (state) => {
            state.lootDeck.pop();
        },
        treasureCardDrawn: (state) => {
            state.treasureDeck.pop();
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(cardPlayed, (state, action) => {
                if (action.payload.type === CardType.Loot) {
                    state.lootDiscardPile.push(action.payload);
                }
            })
    }
});

export const { lootCardDrawn, treasureCardDrawn } = deckSlice.actions;

export const selectDeck = (state: RootState, type: CardType) => {
    switch(type) {
        case CardType.Loot:
            return state.deck.lootDeck;
        case CardType.Treasure:
            return state.deck.treasureDeck;    
    }
};

export const selectDeckDiscardPile = (state: RootState, type: CardType) => {
    switch(type) {
        case CardType.Loot:
            return state.deck.lootDiscardPile;
        case CardType.Treasure:
            return state.deck.treasureDiscardPile    
    }
};

export default deckSlice.reducer;