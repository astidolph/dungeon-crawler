import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import loot_cards from "../../app/loot-cards";
import monster_cards from "../../app/monster-cards";
import { AppThunk, RootState } from "../../app/store";
import treasure_cards from "../../app/treasure-cards";
import { Card, CardType } from "../../models/Card";
import { cardPlayed, playCard } from "../PlayerSlice";

export interface DeckState {
    lootDeck: Card[];
    lootDiscardPile: Card[];
    treasureDeck: Card[];
    treasureDiscardPile: Card[];
    monsterDeck: Card[];
    monsterDiscardPile: Card[];
}

const initialState: DeckState = {
    lootDeck: loot_cards.cards,
    lootDiscardPile: [],
    treasureDeck: treasure_cards.cards,
    treasureDiscardPile: [],
    monsterDeck: monster_cards.cards,
    monsterDiscardPile: []
};

export const drawCard =
  (deckType: CardType): AppThunk => (dispatch, getState) => {
    const state = getState();
    switch(deckType) {
        case CardType.Loot:
            let lootDrawn = state.deck.lootDeck[state.deck.lootDeck.length - 1];
            dispatch(setCardDrawn(lootDrawn));
            break;
        case CardType.Treasure:
            let treasureDrawn = state.deck.treasureDeck[state.deck.treasureDeck.length -1];
            dispatch(setCardDrawn(treasureDrawn));
            dispatch(playCard(treasureDrawn));
    }
  };

export const deckSlice = createSlice({
    name: 'deck',
    initialState,
    reducers: {
        setCardDrawn: (state, action: PayloadAction<Card>) => {
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

export const { setCardDrawn } = deckSlice.actions;

export const selectDeck = (state: RootState, type: CardType) => {
    switch(type) {
        case CardType.Loot:
            return state.deck.lootDeck;
        case CardType.Treasure:
            return state.deck.treasureDeck;
        case CardType.Monster:
            return state.deck.monsterDeck;
    }
};

export const selectDeckDiscardPile = (state: RootState, type: CardType) => {
    switch(type) {
        case CardType.Loot:
            return state.deck.lootDiscardPile;
        case CardType.Treasure:
            return state.deck.treasureDiscardPile;
        case CardType.Monster:
            return state.deck.monsterDeck  
    }
};

export default deckSlice.reducer;