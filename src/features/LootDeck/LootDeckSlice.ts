import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import loot_cards from "../../assets/loot-cards";
import { AppThunk, RootState } from "../../app/store";
import { Card, CardType, LootCard } from "../../models/Card";
import { lootCardPlayed, playCardEffects } from "../PlayerSlice";

export interface LootDeckState {
    lootDeck: Card[];
    lootDiscardPile: Card[];
}

const initialState: LootDeckState = {
    lootDeck: loot_cards.cards,
    lootDiscardPile: []
};

const shuffleDeck = (lootCards: LootCard[]): LootCard[] => {
  let i = lootCards.length - 1;
  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = lootCards[i];
    lootCards[i] = lootCards[j];
    lootCards[j] = temp;
  }
  return lootCards;
}

export const drawLootCard = (): AppThunk => (dispatch, getState) => {
    const state = getState();
    const lootDeck = state.lootDeck.lootDeck;
    if (lootDeck.length > 0) {
        let lootDrawn = lootDeck[lootDeck.length - 1];
        dispatch(setLootCardDrawn(lootDrawn));
    }
};

export const playLootCard = (card: Card): AppThunk => (dispatch, getState) => {
    const state = getState();
    if (state.player.numberLootCardsPlayed >= state.player.maxNumberLootCardsToPlay) {
        console.log('ALREADY HIT MAXIMUM LOOT CARDS PLAYED');
        return;
    }

    dispatch(playCardEffects(card));
    dispatch(lootCardPlayed(card));

};

export const lootDeckSlice = createSlice({
    name: 'lootDeck',
    initialState,
    reducers: {
        shuffleLootDeck: (state) => {
            state.lootDeck = shuffleDeck(state.lootDeck);
        },
        setLootCardDrawn: (state, action: PayloadAction<Card>) => {
            state.lootDeck.pop(); 
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(lootCardPlayed, (state, action) => {
                if (action.payload.type === CardType.Loot) {
                    state.lootDiscardPile.push(action.payload);
                }
            })
    }
});

export const { setLootCardDrawn, shuffleLootDeck } = lootDeckSlice.actions;

export const selectLootDeck = (state: RootState) => state.lootDeck.lootDeck;
export const selectLootDeckDiscardPile = (state: RootState) => state.lootDeck.lootDiscardPile;
// TODO: Try to get rid of this line, can't have a conditional hook defined in deck component
export const selectLootDeckActiveCards = (state: RootState) => [];

export default lootDeckSlice.reducer;