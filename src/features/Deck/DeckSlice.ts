import { createSlice } from "@reduxjs/toolkit";
import loot_cards from "../../app/loot-cards";
import { AppThunk, RootState } from "../../app/store";
import treasure_cards from "../../app/treasure-cards";
import { Card, CardType } from "../../models/Card";
import { addCardToHand, addItem, playCard } from "../PlayerSlice";

export interface DeckState {
    lootDeck: Card[];
    treasureDeck: Card[];
}

const initialState: DeckState = {
    lootDeck: loot_cards.cards,
    treasureDeck: treasure_cards.cards
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
    }
});

export const { lootCardDrawn, treasureCardDrawn } = deckSlice.actions;

export const selectDeckCards = (state: RootState) => state.deck.lootDeck;

export const selectTreasureCards = (state: RootState) => state.deck.treasureDeck;

export default deckSlice.reducer;