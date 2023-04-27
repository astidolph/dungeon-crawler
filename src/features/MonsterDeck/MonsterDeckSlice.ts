import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import monster_cards from "../../assets/monster-cards";
import { AppThunk, RootState } from "../../app/store";
import { MonsterCard } from "../../models/Card";
import { Monster } from "../../models/Monster";
import { playEffect, playerAttacked, playerDied } from "../PlayerSlice";

export interface DeckState {
    monsterDeck: MonsterCard[];
    monsterDiscardPile: MonsterCard[];
    activeMonsterCards: MonsterCard[];
    maxActiveMonsterCards: number;
    monsterInCombat: Monster | null;
}

const initialState: DeckState = {
    monsterDeck: monster_cards.cards,
    monsterDiscardPile: [],
    activeMonsterCards: [],
    maxActiveMonsterCards: 2,
    monsterInCombat: null
};

export const attack = (monsterCard: MonsterCard): AppThunk => (dispatch, getState) => {
    const state = getState();

    const monsterInCombat = state.monsterDeck.monsterInCombat;
    if (monsterInCombat === null && state.player.numberCombat >= state.player.maxNumberCombat) {
        console.log('ALREADY HIT MAXIMUM NUMBER COMBATS');
        return;
    }

    if (monsterInCombat === null) {
        console.log('PLAYER ENTERS COMBAT');
        dispatch(setMonsterInCombat(monsterCard));
    }
    else {
        const diceRoll = rollDice();
        console.log('ROLL: ' + diceRoll);
        const isAttackSuccess = hasDiceRollHit(diceRoll, monsterInCombat.roll);
        console.log('ATTACK SUCCESS? ' + isAttackSuccess);

        const playerDamage = state.player.currentDamage;
        isAttackSuccess ? dispatch(attackMonsterInCombat(monsterCard, playerDamage)) : dispatch(playerAttacked(monsterInCombat.damage));
    }
};

export const attackMonsterInCombat = (monsterCard: MonsterCard, damage: number): AppThunk => 
(dispatch, getState) => {
    dispatch(monsterHealthDown(damage));
    const monsterInCombat = selectMonsterInCombat(getState());
    if (monsterInCombat !== null && monsterInCombat.currentHealth <= 0) {
        dispatch(monsterDefeated(monsterCard));
        dispatch(setActiveMonsterCards());
        dispatch(playEffect(monsterCard.reward));
    }
}

const rollDice = () => Math.floor(Math.random() * 6) + 1;

const hasDiceRollHit = (diceRoll: number, monsterSuccessHit: number) => diceRoll >= monsterSuccessHit;

export const monsterDeckSlice = createSlice({
    name: 'monsterDeck',
    initialState,
    reducers: {
        setActiveMonsterCards: (state) => {
            const numActiveMonsterCards = state.activeMonsterCards.length;
            const maxActiveMonsterCards = state.maxActiveMonsterCards;
            const monsterCardsToAdd = maxActiveMonsterCards - numActiveMonsterCards;

            if (state.monsterDeck.length > 0 && monsterCardsToAdd > 0) {
                for (let i = 0; i < monsterCardsToAdd; i++) {
                    const drawnCard = state.monsterDeck[state.monsterDeck.length - 1];
                    state.activeMonsterCards.push(drawnCard);
                    state.monsterDeck.pop();
                }
            }
        },
        setMonsterInCombat: (state, action: PayloadAction<MonsterCard>) => {
            state.monsterInCombat = {
                id: action.payload.id,
                totalHealth: action.payload.health,
                currentHealth: action.payload.health,
                roll: action.payload.roll,
                damage: action.payload.damage
            };
        },
        monsterHealthDown: (state, action: PayloadAction<number>) => {
            if (state.monsterInCombat !== null) {
                state.monsterInCombat.currentHealth -= action.payload;
                console.log('Monster health lowers to: ' + state.monsterInCombat.currentHealth);
            }
        },
        monsterDefeated: (state, action: PayloadAction<MonsterCard>) => {
            return {
                ...state,
                monsterDiscardPile: [action.payload, ...state.monsterDiscardPile],
                activeMonsterCards: state.activeMonsterCards.filter(x => x.id !== action.payload.id),
                monsterInCombat: null
            }   
        },
        resetMonsterInCombat: (state) => {
            state.monsterInCombat = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(playerDied, (state) => {
                state.monsterInCombat = null;
            })
    }
});

export const { setActiveMonsterCards, monsterHealthDown, 
    setMonsterInCombat, monsterDefeated, resetMonsterInCombat } = monsterDeckSlice.actions;

export const selectMonsterDeck = (state: RootState) => state.monsterDeck.monsterDeck;
export const selectMonsterDeckDiscardPile = (state: RootState) => state.monsterDeck.monsterDiscardPile;
export const selectMonsterDeckActiveCards = (state: RootState) => state.monsterDeck.activeMonsterCards;
export const selectMonsterInCombat = (state: RootState) => state.monsterDeck.monsterInCombat;

export default monsterDeckSlice.reducer;