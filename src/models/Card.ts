export class Card {
    id!: number;
    name!: string;
    description?: string;
    effects!: Effect[];
    type!: CardType;
}

export class LootCard extends Card {}

export class TreasureCard extends Card {}

export class MonsterCard extends Card {
    health!: number;
    damage!: number;
    roll!: number;
    reward!: Effect;
}

export interface Effect {
    payload: number;
    type: string;
}

export enum CardType {
    Loot,
    Treasure,
    Monster
}