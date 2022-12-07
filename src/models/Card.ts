export interface Card {
    id: number;
    name: string;
    description?: string;
    effects: Effect[];
}

export interface Effect {
    payload: number;
    type: string;
}