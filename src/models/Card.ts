export interface Card {
    id: number;
    name: string;
    description?: string;
    effects: Effect[];
    type: CardType
}

export interface Effect {
    payload: number;
    type: string;
}

export enum CardType {
    Loot,
    Treasure
}