import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
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
    activeTreasures: Card[];
    maxActiveTreasureCards: number;
    activeMonsterCards: Card[];
    maxActiveMonsterCards: number;
}

const initialState: DeckState = {
    lootDeck: loot_cards.cards,
    lootDiscardPile: [],
    treasureDeck: treasure_cards.cards,
    treasureDiscardPile: [],
    monsterDeck: monster_cards.cards,
    monsterDiscardPile: [],
    activeTreasures: [],
    maxActiveTreasureCards: 2,
    activeMonsterCards: [],
    maxActiveMonsterCards: 2
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
        },
        setActiveCards: (state, action: PayloadAction<CardType>) => {
            switch(action.payload) {
                case CardType.Treasure:
                    const numActiveTreasureCards = state.activeTreasures.length;
                    const maxActiveTreasureCards = state.maxActiveTreasureCards;
                    const treasureCardsToAdd = maxActiveTreasureCards - numActiveTreasureCards;

                    if (treasureCardsToAdd > 0) {
                        for (let i = 0; i < treasureCardsToAdd; i++) {
                            const drawnCard = state.treasureDeck[state.treasureDeck.length - 1];
                            state.activeTreasures.push(drawnCard);
                            state.treasureDeck.pop();
                        }
                    }
                    break;
                case CardType.Monster:
                    const numActiveMonsterCards = state.activeMonsterCards.length;
                    const maxActiveMonsterCards = state.maxActiveMonsterCards;
                    const monsterCardsToAdd = maxActiveMonsterCards - numActiveMonsterCards;

                    if (monsterCardsToAdd > 0) {
                        for (let i = 0; i < monsterCardsToAdd; i++) {
                            const drawnCard = state.monsterDeck[state.monsterDeck.length - 1];
                            state.activeMonsterCards.push(drawnCard);
                            state.monsterDeck.pop();
                        }
                    }
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

export const { setCardDrawn, setActiveCards } = deckSlice.actions;

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
            return state.deck.monsterDiscardPile; 
    }
};

export const selectActiveCards = (state: RootState, type: CardType) => {
        switch(type) {
        case CardType.Loot:
            return [];
        case CardType.Treasure:
            return state.deck.activeTreasures;
        case CardType.Monster:
            return state.deck.activeMonsterCards;  
    }
}

export default deckSlice.reducer;