import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import loot_cards from "../../app/loot-cards";
import { AppThunk, RootState } from "../../app/store";
import treasure_cards from "../../app/treasure-cards";
import { Card, CardType } from "../../models/Card";
import { cardPlayed } from "../PlayerSlice";

export interface DeckState {
    lootDeck: Card[];
    lootDiscardPile: Card[];
    lastLootCardplayed: Card | null;
    treasureDeck: Card[];
    treasureDiscardPile: Card[];
    lastTreasureCardPlayed: Card | null;
}

const initialState: DeckState = {
    lootDeck: loot_cards.cards,
    lootDiscardPile: [],
    lastLootCardplayed: null,
    treasureDeck: treasure_cards.cards,
    treasureDiscardPile: [],
    lastTreasureCardPlayed: null
};

export const drawCard =
  (deckType: CardType): AppThunk => (dispatch, getState) => {
    const state = getState();
    switch(deckType) {
        case CardType.Loot:
            let lootDrawn = state.deck.lootDeck[state.deck.lootDeck.length - 1];
            dispatch(draw(lootDrawn));
            break;
        case CardType.Treasure:
            let treasureDrawn = state.deck.treasureDeck[state.deck.treasureDeck.length -1];
            dispatch(draw(treasureDrawn));
    }
  };

export const deckSlice = createSlice({
    name: 'deck',
    initialState,
    reducers: {
        draw: (state, action: PayloadAction<Card>) => {
            switch(action.payload.type) {
                case CardType.Loot:
                    state.lootDeck.pop();
                    break;
                case CardType.Treasure:
                    state.treasureDeck.pop();
                    break;    
            }
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

export const { draw } = deckSlice.actions;

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